import React from 'react';

const StatCard = ({ number, label, subtext }) => (
    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow border border-gray-100">
        <div className="text-4xl font-extrabold text-primary mb-2">{number}</div>
        <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
        <div className="text-sm text-gray-500">{subtext}</div>
    </div>
);

const Stats = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard
                        number="2M+"
                        label="Users Empowered"
                        subtext="Across 500+ cities"
                    />
                    <StatCard
                        number="95%"
                        label="Approval Rate"
                        subtext="For qualified applicants"
                    />
                    <StatCard
                        number="48h"
                        label="Fast Processing"
                        subtext="Average disbursal time"
                    />
                    <StatCard
                        number="15+"
                        label="Partner Banks"
                        subtext="Trusted financial institutions"
                    />
                </div>
            </div>
        </section>
    );
};

export default Stats;
