import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 lg:pt-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-primary">
                            <ShieldCheck className="mr-1 h-4 w-4" />
                            Secure & AI-Powered
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                            Empowering Financial <br className="hidden lg:block" />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                                Inclusion
                            </span> for Everyone
                        </h1>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                            Access fair and fast loans regardless of your banking history. Our AI
                            analyzes real financial behavior to give you the credit you deserve.
                            Approval in as fast as 24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/apply">
                                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/20">
                                    Apply for Loan <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/banks">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    View Partner Banks
                                </Button>
                            </Link>
                        </div>

                        <div className="text-sm text-gray-500 pt-4">
                            <span className="font-semibold text-gray-900">10k+</span> loans approved this month
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
                            {/* Decorative UI Mockup */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Credit Limit</div>
                                        <div className="text-2xl font-bold text-gray-900">₹5,00,000</div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Approved</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-100 rounded-full w-full"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                                </div>
                                <div className="pt-4 flex justify-between items-center">
                                    <div className="text-xs text-gray-400">Powered by AI Analysis</div>
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">AI</div>
                                </div>
                            </div>
                        </div>

                        {/* Background blobs removed for cleaner layout */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
