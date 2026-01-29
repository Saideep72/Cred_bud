import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import Input from '../components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/common/Card';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            toast.success("Successfully logged in!");
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="m@example.com"
                            error={errors.email?.message}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password', { required: 'Password is required' })}
                        />
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <span>Remember me</span>
                            </label>
                            <Link to="#" className="text-primary hover:underline font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
