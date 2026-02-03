"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isConfigured: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
    signInWithOTP: (phone: string) => Promise<{ error: Error | null }>;
    verifyOTP: (phone: string, token: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);

    const supabase = createClient();
    const isConfigured = supabase !== null;

    useEffect(() => {
        // Skip if Supabase is not configured
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Get initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);

            // Check premium status
            if (session?.user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('is_premium, premium_expires_at')
                    .eq('id', session.user.id)
                    .single();

                if (data) {
                    const isActive = data.is_premium &&
                        (!data.premium_expires_at || new Date(data.premium_expires_at) > new Date());
                    setIsPremium(isActive);
                }
            }

            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase]);

    const signInWithGoogle = async () => {
        if (!supabase) {
            console.warn("Supabase not configured");
            return;
        }
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const signInWithEmail = async (email: string, password: string) => {
        if (!supabase) {
            return { error: new Error("Supabase not configured") };
        }
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error: error as Error | null };
    };

    const signUpWithEmail = async (email: string, password: string, name: string) => {
        if (!supabase) {
            return { error: new Error("Supabase not configured") };
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });
        return { error: error as Error | null };
    };

    const signInWithOTP = async (phone: string) => {
        if (!supabase) {
            return { error: new Error("Supabase not configured") };
        }
        const { error } = await supabase.auth.signInWithOtp({
            phone,
        });
        return { error: error as Error | null };
    };

    const verifyOTP = async (phone: string, token: string) => {
        if (!supabase) {
            return { error: new Error("Supabase not configured") };
        }
        const { error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        });
        return { error: error as Error | null };
    };

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setIsPremium(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                isConfigured,
                signInWithGoogle,
                signInWithEmail,
                signUpWithEmail,
                signInWithOTP,
                verifyOTP,
                signOut,
                isPremium,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
