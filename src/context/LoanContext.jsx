import { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';

const LoanContext = createContext(null);

export const useLoan = () => {
    const context = useContext(LoanContext);
    if (!context) {
        throw new Error("useLoan must be used within a LoanProvider");
    }
    return context;
};

export const LoanProvider = ({ children }) => {
    const [currentLoan, setCurrentLoan] = useState(null);
    const [loans, setLoans] = useState([]);

    const applyForLoan = async (loanData) => {
        // Get current session token
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/loans/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(loanData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Loan application failed');
        }

        const newLoan = await response.json();
        setLoans((prev) => [...prev, newLoan]);
        setCurrentLoan(newLoan);

        return newLoan;
    };

    return (
        <LoanContext.Provider value={{ currentLoan, loans, applyForLoan }}>
            {children}
        </LoanContext.Provider>
    );
};
