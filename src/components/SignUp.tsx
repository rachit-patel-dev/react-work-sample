import { useState } from 'react';

// Third party
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';

// Custom components
import { Logo, Input, Button } from '.';

// Helper
import authService from '../appwrite/auth';

import { login } from '../store/feature/authSlice';

// Type
import { ISignUpFormData } from '../types';

const SignUp = () => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm<ISignUpFormData>();

    const onSignUp: SubmitHandler<ISignUpFormData> = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);

            if (userData) {
                const user = await authService.getCurrentUser();

                if (user) dispatch(login(user));
                navigate('/');
            }
        } catch (error: any) {
            setError(error?.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(onSignUp)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register('name', {
                                required: true,
                            })}
                        />

                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
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
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
