import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import Input from '../components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/common/Card';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        // Test Backend Connection
        fetch('/api/health')
            .then(res => {
                if (res.ok) console.log("✅ Backend Connected");
                else console.error("❌ Backend Error:", res.status);
            })
            .catch(err => {
                console.error("❌ Backend Connectivity Check Failed:", err);
                toast.error("Warning: Cannot connect to Backend. Registration may fail.");
            });
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const result = await registerUser(data);

            if (result?.needsEmailVerification) {
                toast.success("Account created! Please check your email to verify your account.");
                // Optionally redirect to a verification pending page
            } else {
                toast.success("Account created successfully!");
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to get started with Cred Bud
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {isLoading && <LoadingSpinner fullScreen text="Creating your account..." />}
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            error={errors.full_name?.message}
                            {...register('full_name', { required: 'Name is required' })}
                        />
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
                            label="Phone Number"
                            type="tel"
                            placeholder="9876543210"
                            error={errors.phone?.message}
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Please enter a valid 10-digit number'
                                }
                            })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City Tier</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register('city_tier', {
                                    required: 'City tier is required',
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">Select city tier</option>
                                <option value="1">Tier 1 (Metro cities)</option>
                                <option value="2">Tier 2 (Major cities)</option>
                                <option value="3">Tier 3 (Smaller cities)</option>
                            </select>
                            {errors.city_tier && (
                                <p className="text-sm text-red-600">{errors.city_tier.message}</p>
                            )}
                        </div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
