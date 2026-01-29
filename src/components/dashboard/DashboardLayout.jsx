import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, History, Upload, BarChart2, PieChart, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';
import Header from '../common/Header';

const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        end={to === "/dashboard"}
        onClick={onClick}
        className={({ isActive }) => cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1",
            isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
    >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-grow container mx-auto px-4 py-8 md:px-6 gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full sticky top-24">
                        <div className="mb-6 px-4">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h2>
                        </div>
                        <nav className="flex flex-col space-y-1">
                            <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
                            <SidebarItem to="/dashboard/recent" icon={FileText} label="Recent Loans" />
                            <SidebarItem to="/dashboard/past" icon={History} label="Past Loans" />
                            <SidebarItem to="/dashboard/upload" icon={Upload} label="Upload Transactions" />
                            <SidebarItem to="/dashboard/behavior" icon={BarChart2} label="Financial Score" />
                            <SidebarItem to="/dashboard/analytics" icon={PieChart} label="Analytics" />
                            <div className="my-4 border-t border-gray-100"></div>
                            <SidebarItem to="/dashboard/settings" icon={Settings} label="Settings" />

                            <div className="px-4 py-2 mt-4 border-t border-gray-100 pt-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase">Signed in as</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.user_metadata?.full_name || 'User'}</p>
                            </div>

                            <button
                                onClick={logout}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 text-gray-600 hover:bg-red-50 hover:text-red-600 w-full text-left"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Log Out</span>
                            </button>
                        </nav>

                        <div className="mt-8 bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="bg-blue-100 p-1.5 rounded-full">
                                    <CreditCard className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-semibold text-sm text-blue-900">Need a Loan?</span>
                            </div>
                            <p className="text-xs text-blue-700 mb-3">Apply now and get approved in 24 hours.</p>
                            <Link to="/apply" className="text-xs font-semibold text-primary hover:underline">Apply Now →</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
