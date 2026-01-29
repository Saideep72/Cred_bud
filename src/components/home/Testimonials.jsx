import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, content, rating }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
            ))}
        </div>
        <p className="text-gray-600 mb-6 italic">"{content}"</p>
        <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="ml-3">
                <div className="font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-gray-500">{role}</div>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        {
            name: "Rajesh Kumar",
            role: "Small Business Owner",
            content: "I was rejected by 3 banks because I didn't have a credit history. Cred Bud looked at my business transactions and approved my loan in 2 days.",
            rating: 5
        },
        {
            name: "Priya Sharma",
            role: "Freelance Designer",
            content: "The process was so simple and transparent. No hidden fees, and I could track every step of my application on the dashboard.",
            rating: 5
        },
        {
            name: "Amit Patel",
            role: "Retail Shopkeeper",
            content: "Finally a platform that understands cash-based businesses. Got the capital I needed to expand my shop before Diwali.",
            rating: 4
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
                    Trusted by Thousands
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-block p-8 bg-blue-600 rounded-2xl shadow-xl text-white w-full max-w-4xl">
                        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                        <p className="mb-8 text-blue-100">Join thousands of others who have taken control of their financial future.</p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            Apply for Loan Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
