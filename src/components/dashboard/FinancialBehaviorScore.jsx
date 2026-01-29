import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Check, X } from 'lucide-react';

const FinancialBehaviorScore = () => {
    // Mock data
    const score = 7.8;
    const categories = [
        { name: 'Transport', spent: 15, threshold: 20, status: 'good' },
        { name: 'Education', spent: 30, threshold: 25, status: 'warning' },
        { name: 'Medical', spent: 10, threshold: 15, status: 'good' },
        { name: 'Shopping', spent: 25, threshold: 20, status: 'bad' },
        { name: 'Others', spent: 20, threshold: 10, status: 'bad' },
    ];

    const data = [
        { name: 'Score', value: score },
        { name: 'Remaining', value: 10 - score },
    ];
    const COLORS = ['#10b981', '#e5e7eb'];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Behavior Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Gauge */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-center">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-48 h-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={180}
                                        endAngle={0}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-4">
                                <div className="text-4xl font-bold text-gray-900">{score}</div>
                                <div className="text-sm text-green-600 font-medium">Excellent</div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Your financial health is in the top 10% of users.
                        </p>
                    </CardContent>
                </Card>

                {/* Breakdown */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-900">{cat.name}</div>
                                        <div className="text-sm text-gray-500">Spent: {cat.spent}% / Max: {cat.threshold}%</div>
                                    </div>
                                    <div className="flex items-center">
                                        {cat.status === 'good' ? (
                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                <X className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FinancialBehaviorScore;
