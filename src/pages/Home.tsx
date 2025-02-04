import { useEffect, useState } from 'react';

// Custom components
import { Container, PostCard } from '../components';

// Helper
import postService from '../appwrite/post';
import { Models } from 'appwrite';

const Home = () => {
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

    if (posts?.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

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

export default Home;
