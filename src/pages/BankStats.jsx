import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BankFilters from '../components/banks/BankFilters';
import BankCard from '../components/banks/BankCard';
import Modal from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import api from '../services/api';

const BankStats = () => {
    const [filters, setFilters] = useState({ search: '', minAmount: '', maxRate: '' });
    const [selectedBank, setSelectedBank] = useState(null);
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await api.get('/banks');
                // Backend fields might be snake_case, frontend uses camelCase usually
                // But simplified BankCard uses direct prop access. Let's map if needed.
                // Looking at BankCard, it uses `bank.name`, `bank.interestRate` etc.
                // The backend returns snake_case. I should map it.

                const mappedBanks = response.data.map(bank => ({
                    id: bank.id,
                    name: bank.name,
                    interestRate: bank.interest_rate,
                    processingFee: bank.processing_fee,
                    tenure: bank.tenure,
                    maxAmount: bank.max_loan_amount,
                    rating: bank.rating,
                    reviews: bank.reviews,
                    approvalTime: bank.approval_time,
                    logo_url: bank.logo_url
                }));
                setBanks(mappedBanks);
            } catch (error) {
                console.error("Failed to fetch banks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanks();
    }, []);

    const filteredBanks = banks.filter(bank => {
        if (filters.search && !bank.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.maxRate && bank.interestRate > Number(filters.maxRate)) return false;
        if (filters.minAmount && bank.maxAmount < Number(filters.minAmount)) return false;
        return true;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Partner Banks</h1>
                    <p className="text-gray-600 mt-2">Compare interest rates and approval times to find your best match.</p>
                </div>

                <BankFilters filters={filters} setFilters={setFilters} />

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        Error loading banks: {error}. Please ensure backend is running.
                    </div>
                )}

                {loading && (
                    <div className="text-center py-10">Loading banks...</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBanks.map(bank => (
                        <BankCard key={bank.id} bank={bank} onDetails={setSelectedBank} />
                    ))}
                </div>

                {filteredBanks.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No banks found matching your filters.
                    </div>
                )}
            </main>
            <Footer />

            <Modal
                isOpen={!!selectedBank}
                onClose={() => setSelectedBank(null)}
                title={selectedBank?.name}
            >
                {selectedBank && (
                    <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <strong>Recommended for you!</strong> Based on your profile, you have a high chance of approval with {selectedBank.name}.
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Key Features</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Instant approval within {selectedBank.approvalTime}</li>
                                <li>Minimal documentation required (Aadhar + Pan)</li>
                                <li>Flexible repayment options up to {selectedBank.tenure}</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Fees & Charges</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-gray-500">Processing Fee</div>
                                <div className="font-medium">{selectedBank.processingFee}%</div>
                                <div className="text-gray-500">Pre-closure Charges</div>
                                <div className="font-medium">2% (After 6 months)</div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" className="flex-1" onClick={() => setSelectedBank(null)}>Close</Button>
                            <Link to="/apply" className="flex-1">
                                <Button className="w-full">Apply Now</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BankStats;
