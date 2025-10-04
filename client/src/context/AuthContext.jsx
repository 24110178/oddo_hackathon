// This is the original, correct code for this file.
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setupAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);

            if (session?.user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
                setRole(profile?.role);
            }
            setLoading(false);
        };
        setupAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
                setRole(profile?.role);
            } else {
                setRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const value = { user, role, loading };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);