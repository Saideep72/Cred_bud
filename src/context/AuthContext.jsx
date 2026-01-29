import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        setUser(data.user);
        return data.user;
    };

    const register = async (userData) => {
        // Register with Supabase Auth (with email confirmation enabled)
        const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                emailRedirectTo: `${window.location.origin}/dashboard`,
                data: {
                    full_name: userData.full_name,
                    phone: userData.phone,
                    city_tier: userData.city_tier,
                },
            },
        });

        if (error) throw error;

        // Create profile in backend database
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...userData,
                id: data.user.id
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Backend registration failed');
        }

        setUser(data.user);
        return {
            user: data.user,
            needsEmailVerification: !data.user?.email_confirmed_at,
        };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const resendVerificationEmail = async () => {
        if (!user?.email) throw new Error('No user email found');

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: user.email,
        });

        if (error) throw error;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading,
            resendVerificationEmail
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
