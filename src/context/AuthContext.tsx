"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: number;
    email: string;
    nicename: string;
    firstName: string;
    lastName: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, userData: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("sigma_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem("sigma_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, userData: any) => {
        const newUser: User = {
            id: userData.id || 0,
            email: userData.user_email || userData.email,
            nicename: userData.user_nicename || userData.nicename,
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            token,
        };
        setUser(newUser);
        localStorage.setItem("sigma_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("sigma_user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
