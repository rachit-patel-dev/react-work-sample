import { useCallback, useEffect, FC } from 'react';

// Third party
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Models } from 'appwrite';

// Custom components
import { Button, Input, RTE, Select } from '../index';

// Helpers
import fileService from '../../appwrite/file';
import postService from '../../appwrite/post';

// Store
import { RootState } from '../../store/store';

// Type
import { IPostFormData } from '../../types';

interface IPostForm {
    post?: Models.Document;
}

const PostForm: FC<IPostForm> = ({ post }) => {
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, getValues, control } =
        useForm<IPostFormData>({
            defaultValues: {
                title: post?.title || '',
                content: post?.content || '',
                status: post?.status || 'active',
                slug: post?.$id || '',
            },
        });

    const transformToSlug = useCallback((value: string) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-');

        return '';
    }, []);

    const onPost: SubmitHandler<IPostFormData> = async (data) => {
        if (post) {
            const file = data?.image?.[0]
                ? await fileService.uploadFile(data.image[0])
                : null;

            if (file) {
                await fileService.deleteFile(post?.featuredImage);
            }

            const updatedPost = await postService.updatePost(post?.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (updatedPost) {
                navigate(`/post/${updatedPost.$id}`);
            }
        } else {
            const file = await fileService.uploadFile(data?.image?.[0]);

            if (file) {
                const newPost = await postService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData?.$id || '',
                });

                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            }
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', transformToSlug(value.title || ''), {
                    shouldValidate: true,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, transformToSlug, setValue]);

    return (
        <form onSubmit={handleSubmit(onPost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue(
                            'slug',
                            transformToSlug(e.currentTarget.value),
                            {
                                shouldValidate: true,
                            }
                        );
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={
                                fileService.getFilePreview(
                                    post.featuredImage
                                ) as string
                            }
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full"
                >
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
