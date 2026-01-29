import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Features = () => {
    const benefits = [
        "Financial behavior analysis beyond just CIBIL score",
        "Compare offers from multiple partner banks",
        "Real-time application tracking dashboard",
        "Secure document upload and verification",
        "Personalized tips to improve creditworthiness",
        "Integration with UPI for seamless transactions"
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                            Features Designed for Your Financial Growth
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Our platform gives you the tools you need to secure credit and build a stronger financial future.
                        </p>

                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle2 className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-8">
                                <div className="h-40 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
                                    <div className="h-8 w-8 rounded-full bg-blue-100"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-16 bg-gray-200 rounded"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-56 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
                                    <div className="h-8 w-8 rounded-full bg-green-100"></div>
                                    <div className="h-24 w-full bg-gray-50 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-56 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
                                    <div className="h-8 w-8 rounded-full bg-purple-100"></div>
                                    <div className="flex gap-2">
                                        <div className="h-16 w-4 bg-blue-200 rounded-t-lg mt-auto"></div>
                                        <div className="h-24 w-4 bg-blue-400 rounded-t-lg mt-auto"></div>
                                        <div className="h-12 w-4 bg-blue-200 rounded-t-lg mt-auto"></div>
                                    </div>
                                </div>
                                <div className="h-40 w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
                                    <div className="h-8 w-8 rounded-full bg-orange-100"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                        <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
