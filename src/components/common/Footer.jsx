import React from 'react';
import { CreditCard, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <CreditCard className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold text-gray-900">Cred Bud</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Empowering financial inclusion for underbanked communities through AI-powered credit decisioning.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/apply" className="hover:text-primary">Personal Loan</Link></li>
                            <li><Link to="/banks" className="hover:text-primary">Partner Banks</Link></li>
                            <li><Link to="/dashboard" className="hover:text-primary">Financial Score</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link to="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link to="#" className="hover:text-primary">Contact</Link></li>
                            <li><Link to="#" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Cred Bud. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
