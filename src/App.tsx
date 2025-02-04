import { useState, useEffect } from 'react';

// Third party
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

// Custom components
import { Footer, Header } from './components';

// Helper
import authService from './appwrite/auth';

import { login, logout } from './store/feature/authSlice';

// Style
import './App.css';

function App() {
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();

    const fetchUserDetails = async () => {
        fetchUserDetails();
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;
