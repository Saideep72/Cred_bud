import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import Input from '../common/Input';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const FormStep2 = ({ defaultValues, onNext, onBack }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            monthlyIncome: '',
            totalAssets: '',
            existingDebtsCount: '0',
            totalDebtAmount: '0',
            monthlyEMI: '0',
            ...defaultValues
        }
    });

    const onSubmit = (data) => {
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6">
                Please provide accurate financial information. This data will be analyzed by our AI to determine your creditworthiness.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Monthly Income (₹)"
                    type="number"
                    placeholder="e.g. 25000"
                    error={errors.monthlyIncome?.message}
                    {...register('monthlyIncome', {
                        required: 'Monthly Income is required',
                        min: { value: 1000, message: "Minimum income 1000" }
                    })}
                />
                <Input
                    label="Total Assets Value (₹)"
                    type="number"
                    placeholder="House, Vehicle, Gold etc."
                    error={errors.totalAssets?.message}
                    {...register('totalAssets', { required: 'Assets value is required' })}
                />

                <div className="col-span-1 md:col-span-2 border-t pt-4 mt-2">
                    <h3 className="font-medium text-gray-900 mb-4">Liability Information</h3>
                </div>

                <Input
                    label="Number of Existing Loans"
                    type="number"
                    defaultValue="0"
                    error={errors.existingDebtsCount?.message}
                    {...register('existingDebtsCount', { min: 0 })}
                />
                <Input
                    label="Total Outstanding Debt (₹)"
                    type="number"
                    defaultValue="0"
                    error={errors.totalDebtAmount?.message}
                    {...register('totalDebtAmount', { min: 0 })}
                />
                <Input
                    label="Monthly EMI Outflow (₹)"
                    type="number"
                    defaultValue="0"
                    error={errors.monthlyEMI?.message}
                    {...register('monthlyEMI', { min: 0 })}
                />
            </div>

            <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" size="lg">
                    Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

export default FormStep2;
