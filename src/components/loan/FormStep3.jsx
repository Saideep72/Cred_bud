import React, { useState } from 'react';
import { Button } from '../common/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLoan } from '../../context/LoanContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FormStep3 = ({ formData, onBack }) => {
    const { applyForLoan } = useLoan();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Combine data from steps
    const fullData = { ...formData.personal, ...formData.financial };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await applyForLoan(fullData);
            toast.success("Application submitted successfully!");
            navigate('/dashboard');
        } catch (error) {
            toast.error("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const InfoRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="text-gray-900 font-medium text-sm text-right">{value || '-'}</span>
        </div>
    );

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                    Almost done! Please review your details carefully before submitting.
                    Once submitted, you cannot edit this application.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 bg-gray-50 p-2 rounded">Personal Details</h3>
                    <div className="space-y-1">
                        <InfoRow label="Full Name" value={fullData.fullName} />
                        <InfoRow label="Email" value={fullData.email} />
                        <InfoRow label="Phone" value={fullData.phone} />
                        <InfoRow label="Date of Birth" value={fullData.dob} />
                        <InfoRow label="Address" value={fullData.address} />
                        <InfoRow label="City Tier" value={fullData.cityTier} />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 bg-gray-50 p-2 rounded">Financial Details</h3>
                    <div className="space-y-1">
                        <InfoRow label="Monthly Income" value={`₹${fullData.monthlyIncome}`} />
                        <InfoRow label="Total Assets" value={`₹${fullData.totalAssets}`} />
                        <InfoRow label="Existing Loans" value={fullData.existingDebtsCount} />
                        <InfoRow label="Total Debt" value={`₹${fullData.totalDebtAmount}`} />
                        <InfoRow label="Monthly EMI" value={`₹${fullData.monthlyEMI}`} />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
                <input type="checkbox" id="terms" className="rounded border-gray-300 text-primary" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <span className="text-primary underline">Terms & Conditions</span> and authorize Cred Bud to fetch my credit report.
                </label>
            </div>

            <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleSubmit} size="lg" isLoading={isSubmitting}>
                    Submit Application
                </Button>
            </div>
        </div>
    );
};

export default FormStep3;
