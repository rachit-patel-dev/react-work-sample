import { useState } from 'react';

// Third party
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

// Custom components
import { Logo, Input, Button } from '.';

// Helper
import { login } from '../store/feature/authSlice';

import authService from '../appwrite/auth';

// Type
import { ILoginFormData } from '../types';

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    
    const { register, handleSubmit } = useForm<ILoginFormData>();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogin: SubmitHandler<ILoginFormData> = async (data) => {
        setError('');

        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate('/');
                }
            }
        } catch (error:any) {
            setError(error?.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(onLogin)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: true,
                            })}
                        />

                        <Button type="submit" className="w-full">
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
