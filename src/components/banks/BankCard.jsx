import React from 'react';
import { Button } from '../common/Button';
import { Star, Clock, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const BankCard = ({ bank, onDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border">
                        {bank.logo_url ? (
                            <img src={bank.logo_url} alt={bank.name} className="h-full w-full object-contain p-1" />
                        ) : (
                            <span className="font-bold text-gray-400 text-xl">{bank.name.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{bank.name}</h3>
                        <div className="flex items-center text-sm text-yellow-500">
                            <Star className="h-3 w-3 fill-yellow-500 mr-1" />
                            <span className="font-medium">{bank.rating}</span>
                            <span className="text-gray-400 ml-1">({bank.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    High Approval
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Interest</div>
                    <div className="font-bold text-primary">{bank.interestRate}%</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Processing</div>
                    <div className="font-bold text-gray-900">{bank.processingFee}%</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Tenure</div>
                    <div className="font-medium text-gray-900">{bank.tenure}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Max Amount</div>
                    <div className="font-medium text-gray-900">{formatCurrency(bank.maxAmount)}</div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" /> {bank.approvalTime}
                </div>
                <Button variant="outline" size="sm" onClick={() => onDetails(bank)}>
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default BankCard;
