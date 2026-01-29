import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Menu, X, CreditCard, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold text-gray-900">Cred Bud</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link to="/banks" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                            Partner Banks
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-4 ml-4">
                                    <span className="text-sm font-medium text-gray-900">Hi, {user.name}</span>
                                    <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link to="/apply">
                                    <Button size="sm">Apply Now</Button>
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <Link to="/" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link to="/banks" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>
                            Partner Banks
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>
                                    Dashboard
                                </Link>
                                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Log in</Button>
                                </Link>
                                <Link to="/apply" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full text-white">Apply Now</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
