import React from 'react';
import { BrainCircuit, Clock, MessageSquare, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Icon className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
);

const WhyUs = () => {
    const features = [
        {
            icon: BrainCircuit,
            title: "AI-Powered Decisions",
            description: "Our advanced algorithms analyze alternative data points to provide fair, unbiased credit assessments."
        },
        {
            icon: Clock,
            title: "Quick Processing",
            description: "Get loan decisions in 24-48 hours. No more weeks of waiting for a response."
        },
        {
            icon: MessageSquare,
            title: "Transparent Feedback",
            description: "We provide clear explanations for every decision, helping you improve your financial health."
        },
        {
            icon: Users,
            title: "Inclusive Approach",
            description: "Designed specifically for underbanked users who may lack traditional credit history."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Why Choose Cred Bud?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We're revolutionizing the lending landscape with technology that puts people first.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
