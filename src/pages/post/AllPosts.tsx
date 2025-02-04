import { useEffect, useState } from 'react';

import { Container, PostCard } from '../../components';

import postService from '../../appwrite/post';

import { Models } from 'appwrite';

const AllPosts = () => {
    const [posts, setPosts] = useState<Models.Document[]>([]);

    const getPosts = async () => {
        const postsResponse = await postService.getPosts();
        if (postsResponse && postsResponse.documents.length > 0) {
            setPosts(postsResponse.documents);
        } else {
            setPosts([]);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
