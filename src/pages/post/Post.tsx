import { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Models } from 'appwrite';

import { Button, Container } from '../../components';

import postService from '../../appwrite/post';
import fileService from '../../appwrite/file';

import { RootState } from '../../store/store';

const Post = () => {
    const [post, setPost] = useState<Models.Document | null>(null);

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.auth.userData);

    const isAuthor = post && userData && post.userId === userData.$id;

    const fetchPostDetails = async () => {
        postService.getPost(slug as string).then((post) => {
            if (post) {
                setPost(post);
            } else {
                navigate('/');
            }
        });
    };

    useEffect(() => {
        if (slug) {
            fetchPostDetails();
        } else navigate('/');
    }, [slug, navigate]);

    const deletePost = () => {
        postService.deletePost(post?.$id || '').then((status) => {
            if (status) {
                fileService.deleteFile(post?.featuredImage || '');
                navigate('/');
            }
        });
    };

    return (
        post && (
            <div className="py-8">
                <Container>
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={
                                fileService.getFilePreview(
                                    post.featuredImage
                                ) as string
                            }
                            alt={post.title}
                            className="rounded-xl"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-500"
                                        className="mr-3"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">{parse(post.content)}</div>
                </Container>
            </div>
        )
    );
};

export default Post;
