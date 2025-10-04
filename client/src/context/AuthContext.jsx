// import React, { createContext, useState, useEffect, useContext } from 'react';
// // Make sure you have your supabaseClient file configured
// import { supabase } from "../supabaseClient";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [role, setRole] = useState(null); 
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const getSession = async () => {
//             const { data: { session } } = await supabase.auth.getSession();
//             setUser(session?.user ?? null);
            
//             // MOCK ROLES FOR DEMO:
//             if (session?.user) {
//                 if (session.user.email.includes('admin')) setRole('Admin');
//                 else if (session.user.email.includes('manager')) setRole('Manager');
//                 else setRole('Employee');
//             }
            
//             setLoading(false);
//         };

//         getSession();

//         const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//             setUser(session?.user ?? null);
//             if (session?.user) {
//                 if (session.user.email.includes('admin')) setRole('Admin');
//                 else if (session.user.email.includes('manager')) setRole('Manager');
//                 else setRole('Employee');
//             } else {
//                 setRole(null);
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, []);

//     const value = { user, role, loading };

//     return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // --- HARDCODE USER ROLE HERE ---
    // Change which lines are commented to see different dashboards.

    // To see the Employee dashboard:
    const [user, setUser] = useState({ id: 'mock-employee-id', email: 'employee@example.com' });
    const [role, setRole] = useState('Employee');

    // To see the Manager dashboard (uncomment these lines and comment out the Employee ones):
    // const [user, setUser] = useState({ id: 'mock-manager-id', email: 'manager@example.com' });
    // const [role, setRole] = useState('Manager');

    // To see the Admin dashboard (uncomment these lines and comment out the others):
    // const [user, setUser] = useState({ id: 'mock-admin-id', email: 'admin@example.com' });
    // const [role, setRole] = useState('Admin');


    // We set loading to false so the app loads immediately
    const [loading, setLoading] = useState(false);

    // The original useEffect that calls Supabase is removed for this demo.

    const value = {
        user,
        role,
        loading
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};