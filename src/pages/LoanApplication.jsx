import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoanForm from '../components/loan/LoanForm';

const LoanApplication = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Apply for a Loan</h1>
                        <p className="text-gray-600 mt-2">Complete the form below to get an instant credit decision.</p>
                    </div>
                    <LoanForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoanApplication;
