import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import {
    AddPost,
    AllPosts,
    EditPost,
    Home,
    Login,
    Post,
    SignUp,
} from './pages';

import App from './App';
import { AuthLayout } from './components';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route
                path="/login"
                element={
                    <AuthLayout isAuthRequired={false}>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="/register"
                element={
                    <AuthLayout isAuthRequired={false}>
                        <SignUp />
                    </AuthLayout>
                }
            />
            <Route
                path="/all-posts"
                element={
                    <AuthLayout isAuthRequired>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="/add-post"
                element={
                    <AuthLayout isAuthRequired>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="/edit-post/:slug"
                element={
                    <AuthLayout isAuthRequired>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route
                path="/post/:slug"
                element={
                    <AuthLayout isAuthRequired>
                        <Post />
                    </AuthLayout>
                }
            />
        </Route>
    )
);
