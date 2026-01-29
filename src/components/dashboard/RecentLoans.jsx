import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { useLoan } from '../../context/LoanContext';
import { formatCurrency } from '../../utils/helpers';
import { BadgeCheck, Clock, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

const StatusBadge = ({ status }) => {
    switch (status) {
        case 'Approved':
            return <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium"><BadgeCheck className="w-3 h-3 mr-1" /> Approved</div>;
        case 'Rejected':
            return <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-medium"><XCircle className="w-3 h-3 mr-1" /> Rejected</div>;
        default:
            return <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs font-medium"><Clock className="w-3 h-3 mr-1" /> Pending</div>;
    }
};

const RecentLoans = () => {
    const { loans } = useLoan();

    // Create dummy loans if empty for display
    const displayLoans = loans.length > 0 ? loans : [
        { id: 1, appliedDate: '2025-11-15', monthlyIncome: 45000, totalDebtAmount: 500000, status: 'Approved', acceptanceRate: 92 },
        { id: 2, appliedDate: '2025-10-20', monthlyIncome: 30000, totalDebtAmount: 200000, status: 'Pending', acceptanceRate: 65 },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="py-3 px-4">Application ID</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Chance</th>
                                <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {displayLoans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-900">#{loan.id}</td>
                                    <td className="py-3 px-4 text-gray-500">
                                        {loan.appliedDate ? new Date(loan.appliedDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 text-gray-900">{formatCurrency(loan.totalDebtAmount || 0)}</td>
                                    <td className="py-3 px-4"><StatusBadge status={loan.status} /></td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                                                <div
                                                    className={`h-1.5 rounded-full ${(loan.acceptanceRate || 70) > 80 ? 'bg-green-500' :
                                                            (loan.acceptanceRate || 70) > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${loan.acceptanceRate || 70}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500">{loan.acceptanceRate || 70}%</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentLoans;
