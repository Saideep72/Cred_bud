import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import { Button } from '../common/Button';
import { Filter, RotateCcw } from 'lucide-react';

const BankFilters = ({ filters, setFilters }) => {
    const handleReset = () => {
        setFilters({
            search: '',
            minAmount: '',
            maxRate: '',
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-500">
                    <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    placeholder="Search bank name..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <Select
                    options={[
                        { value: '10', label: 'Under 10%' },
                        { value: '12', label: 'Under 12%' },
                        { value: '15', label: 'Under 15%' },
                    ]}
                    value={filters.maxRate}
                    onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
                    label=""
                    placeholder="Max Interest Rate"
                />
                <Select
                    options={[
                        { value: '50000', label: 'Up to ₹50,000' },
                        { value: '100000', label: 'Up to ₹1,00,000' },
                        { value: '500000', label: 'Up to ₹5,00,000' },
                    ]}
                    value={filters.minAmount}
                    onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                    label=""
                    placeholder="Loan Amount"
                />
            </div>
        </div>
    );
};

export default BankFilters;
