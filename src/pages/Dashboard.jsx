import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import RecentLoans from '../components/dashboard/RecentLoans';
import TransactionUpload from '../components/dashboard/TransactionUpload';
import FinancialBehaviorScore from '../components/dashboard/FinancialBehaviorScore';
import Analytics from '../components/dashboard/Analytics';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { TrendingUp, UserCheck, AlertTriangle, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

// Dashboard Overview Widget
const Overview = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
                    <p className="text-gray-500">Here's what's happening with your loan applications.</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                    Last login: {new Date().toLocaleDateString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100 uppercase tracking-wider">Financial Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">780</div>
                        <div className="mt-2 flex items-center text-blue-100 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12 pts this month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Loans</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <div className="mt-1 text-sm text-gray-500">Total: {formatCurrency(250000)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Approval Chance</CardTitle>
                        <UserCheck className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">High</div>
                        <div className="mt-1 text-sm text-gray-500">Based on recent data</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Tasks</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">2</div>
                        <div className="mt-1 text-sm text-gray-500">Upload documents</div>
                    </CardContent>
                </Card>
            </div>

            <RecentLoans />
        </div>
    );
};

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="recent" element={<RecentLoans />} />
                <Route path="upload" element={<TransactionUpload />} />
                <Route path="behavior" element={<FinancialBehaviorScore />} />
                <Route path="analytics" element={<Analytics />} />
                {/* Fallback */}
                <Route path="*" element={<Overview />} />
            </Route>
        </Routes>
    );
};

export default Dashboard;
