"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

type AuthMode = "login" | "signup" | "otp";

export default function LoginPage() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInWithOTP, verifyOTP } = useAuth();

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "signup") {
                const { error } = await signUpWithEmail(email, password, name);
                if (error) throw error;
                setSuccess("Check your email for a confirmation link!");
            } else {
                const { error } = await signInWithEmail(email, password);
                if (error) throw error;
                window.location.href = "/";
            }
        } catch (err: unknown) {
            setError((err as Error).message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
            const { error } = await signInWithOTP(formattedPhone);
            if (error) throw error;
            setOtpSent(true);
            setSuccess("OTP sent to your phone!");
        } catch (err: unknown) {
            setError((err as Error).message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
            const { error } = await verifyOTP(formattedPhone, otp);
            if (error) throw error;
            window.location.href = "/";
        } catch (err: unknown) {
            setError((err as Error).message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="gradient-bg" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-lg border-b border-white/5">
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">R</span>
                        </div>
                        <span className="text-xl font-bold text-primary">Resolve<span className="gradient-text">.Ai</span></span>
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center pt-20 pb-10 px-4">
                <div className="w-full max-w-md">
                    <div className="glass-card p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                {mode === "signup" ? "Create Account" : "Welcome Back"}
                            </h1>
                            <p className="text-gray-400 text-sm">
                                {mode === "signup"
                                    ? "Join Resolve.Ai to save your progress"
                                    : "Sign in to continue your crisis navigation"}
                            </p>
                        </div>

                        {/* Auth Mode Tabs */}
                        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
                            <button
                                onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "login" ? "bg-purple-500 text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Email Login
                            </button>
                            <button
                                onClick={() => { setMode("otp"); setError(""); setSuccess(""); setOtpSent(false); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "otp" ? "bg-purple-500 text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Phone OTP
                            </button>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                                {success}
                            </div>
                        )}

                        {/* Google Sign In */}
                        <button
                            onClick={signInWithGoogle}
                            className="w-full flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all mb-4"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-white/10"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        {/* Email/Password Form */}
                        {mode !== "otp" && (
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                {mode === "signup" && (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50"
                                >
                                    {loading ? "Loading..." : mode === "signup" ? "Create Account" : "Sign In"}
                                </button>
                            </form>
                        )}

                        {/* Phone OTP Form */}
                        {mode === "otp" && (
                            <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                    <div className="flex gap-2">
                                        <div className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-center">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                            className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            placeholder="9876543210"
                                            required
                                            maxLength={10}
                                            disabled={otpSent}
                                        />
                                    </div>
                                </div>

                                {otpSent && (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Enter OTP</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-center text-2xl tracking-widest"
                                            placeholder="000000"
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50"
                                >
                                    {loading ? "Loading..." : otpSent ? "Verify OTP" : "Send OTP"}
                                </button>

                                {otpSent && (
                                    <button
                                        type="button"
                                        onClick={() => { setOtpSent(false); setOtp(""); }}
                                        className="w-full text-gray-400 text-sm hover:text-white"
                                    >
                                        Change phone number
                                    </button>
                                )}
                            </form>
                        )}

                        {/* Toggle Login/Signup */}
                        {mode !== "otp" && (
                            <p className="mt-6 text-center text-gray-400 text-sm">
                                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    {mode === "login" ? "Sign up" : "Sign in"}
                                </button>
                            </p>
                        )}
                    </div>

                    {/* Privacy Note */}
                    <p className="mt-4 text-center text-gray-500 text-xs">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </main>
        </div>
    );
}
