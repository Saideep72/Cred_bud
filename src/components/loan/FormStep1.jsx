import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { ArrowRight } from 'lucide-react';

const FormStep1 = ({ defaultValues, onNext }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            dob: '',
            address: '',
            cityTier: '',
            ...defaultValues
        }
    });

    const onSubmit = (data) => {
        onNext(data);
    };

    const cityTierOptions = [
        { value: 'Tier 1', label: 'Tier 1 (Metro)' },
        { value: 'Tier 2', label: 'Tier 2 (Urban)' },
        { value: 'Tier 3', label: 'Tier 3 (Semi-Urban/Rural)' }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    placeholder="As per PAN card"
                    error={errors.fullName?.message}
                    {...register('fullName', { required: 'Full Name is required' })}
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })}
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="10-digit number"
                    error={errors.phone?.message}
                    {...register('phone', {
                        required: 'Phone Number is required',
                        pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
                    })}
                />
                <Input
                    label="Date of Birth"
                    type="date"
                    error={errors.dob?.message}
                    {...register('dob', { required: 'Date of Birth is required' })}
                />
                <div className="md:col-span-2">
                    <Input
                        label="Current Address"
                        placeholder="House No, Street, Landmark"
                        error={errors.address?.message}
                        {...register('address', { required: 'Address is required' })}
                    />
                </div>
                <div className="md:col-span-2">
                    <Select
                        label="City Tier"
                        options={cityTierOptions}
                        error={errors.cityTier?.message}
                        {...register('cityTier', { required: 'City Tier is required' })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Tier 1: Major Metros (Delhi, Mumbai, etc.) | Tier 2: State Capitals | Tier 3: Others
                    </p>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" size="lg">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

export default FormStep1;
