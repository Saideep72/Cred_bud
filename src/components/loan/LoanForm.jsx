import React, { useState } from 'react';
import { Card, CardContent } from '../common/Card';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import { Check } from 'lucide-react';

const LoanForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        personal: {},
        financial: {}
    });

    const handleNextStep = (stepData, stepName) => {
        setFormData(prev => ({
            ...prev,
            [stepName]: stepData
        }));
        setStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const steps = [
        { number: 1, title: "Personal Details" },
        { number: 2, title: "Financial Info" },
        { number: 3, title: "Review & Submit" }
    ];

    return (
        <div className="space-y-8">
            {/* Progress Steps */}
            <div className="relative flex justify-between items-center w-full px-4">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -z-10 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((s) => (
                    <div key={s.number} className="flex flex-col items-center bg-gray-50 px-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 
                ${step >= s.number
                                    ? "bg-primary border-primary text-white scale-110"
                                    : "bg-white border-gray-300 text-gray-500"}`}
                        >
                            {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${step >= s.number ? "text-primary" : "text-gray-500"}`}>
                            {s.title}
                        </span>
                    </div>
                ))}
            </div>

            <Card className="shadow-lg border-t-4 border-t-primary">
                <CardContent className="pt-6">
                    {step === 1 && (
                        <FormStep1
                            defaultValues={formData.personal}
                            onNext={(data) => handleNextStep(data, 'personal')}
                        />
                    )}
                    {step === 2 && (
                        <FormStep2
                            defaultValues={formData.financial}
                            onNext={(data) => handleNextStep(data, 'financial')}
                            onBack={handleBack}
                        />
                    )}
                    {step === 3 && (
                        <FormStep3
                            formData={formData}
                            onBack={handleBack}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LoanForm;
