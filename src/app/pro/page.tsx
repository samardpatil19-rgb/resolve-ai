"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Check, Zap, Shield, FileText, MessageSquare, Crown, Loader2, CreditCard, X } from "lucide-react";

export default function ProPage() {
    const { user, isPremium, refreshPremium } = useAuth();
    const router = useRouter();
    const [showPayment, setShowPayment] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    // Payment form state
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardName, setCardName] = useState("");
    const [upiId, setUpiId] = useState("");

    const handlePayment = async () => {
        setProcessing(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const res = await fetch("/api/activate-premium", { method: "POST" });
            const data = await res.json();

            if (data.success) {
                await refreshPremium();
                setSuccess(true);
                setTimeout(() => router.push("/"), 3000);
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch {
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\D/g, "").substring(0, 16);
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.join(" ");
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\D/g, "").substring(0, 4);
        if (v.length > 2) return v.substring(0, 2) + "/" + v.substring(2);
        return v;
    };

    if (isPremium) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="gradient-bg" />
                <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-lg border-b border-border">
                    <div className="container-main flex items-center justify-between h-16 md:h-20">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                                <span className="text-background font-bold text-sm">R</span>
                            </div>
                            <span className="text-xl font-bold text-foreground">Resolve<span className="text-secondary">.Ai</span></span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>
                <main className="flex-1 flex items-center justify-center pt-20 px-4">
                    <div className="glass-card p-8 max-w-md w-full text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <Crown className="w-8 h-8 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">You&apos;re Already Premium!</h1>
                        <p className="text-secondary mb-6">You have full access to all features including AI document generation and chat assistance.</p>
                        <Link href="/" className="btn-primary inline-block">Go to Dashboard</Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="gradient-bg" />

            <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-lg border-b border-border">
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                            <span className="text-background font-bold text-sm">R</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Resolve<span className="text-secondary">.Ai</span></span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/" className="text-secondary hover:text-foreground transition-colors text-sm">← Back</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-24 pb-16 px-4">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-secondary">Upgrade to Pro</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                            Unlock <span className="text-secondary">Full Power</span>
                        </h1>
                        <p className="text-secondary text-lg max-w-xl mx-auto">
                            Get AI-powered document generation and personalized chat assistance for all crisis modules.
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="max-w-lg mx-auto">
                        <div className="glass-card p-8 border border-foreground/20 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="bg-foreground text-background text-xs font-bold px-4 py-1.5 rounded-full">
                                    BEST VALUE
                                </span>
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold text-foreground mb-1">
                                    ₹199
                                </div>
                                <p className="text-muted">One-time payment • 30 days access</p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {[
                                    { icon: FileText, text: "AI Document Generator (FIR, Complaints, Grievances)" },
                                    { icon: MessageSquare, text: "AI Chat Assistant (Mobile Theft, Bank Fraud, E-Commerce)" },
                                    { icon: Zap, text: "Powered by Groq AI (Llama 3.3 70B)" },
                                    { icon: Shield, text: "Legally formatted, India-specific documents" },
                                    { icon: Crown, text: "Priority support" },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-4 h-4 text-foreground" />
                                        </div>
                                        <span className="text-secondary text-sm">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {!user ? (
                                <div className="text-center">
                                    <p className="text-muted text-sm mb-4">You need to sign in first</p>
                                    <Link href="/login" className="btn-primary w-full inline-block text-center">
                                        Sign In to Upgrade
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Pay ₹199 Now
                                </button>
                            )}

                            <p className="text-center text-muted text-xs mt-4">
                                Secure payment • Instant activation • No auto-renewal
                            </p>
                        </div>

                        {/* Free tier reminder */}
                        <div className="mt-6 glass-card p-4 text-center">
                            <p className="text-secondary text-sm">
                                <strong className="text-foreground">Free features still available:</strong> Step-by-step guides, helpline numbers, portal links, and the Other Issues AI chatbot.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <div className="w-full max-w-md bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl">
                        {success ? (
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <Check className="w-10 h-10 text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
                                <p className="text-secondary mb-2">Welcome to Resolve.Ai Pro 🎉</p>
                                <p className="text-muted text-sm">Redirecting to dashboard...</p>
                            </div>
                        ) : (
                            <>
                                {/* Payment Header */}
                                <div className="bg-surface border-b border-border p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                                            <span className="text-background font-bold text-xs">R</span>
                                        </div>
                                        <div>
                                            <p className="text-foreground font-semibold text-sm">Resolve.Ai Pro</p>
                                            <p className="text-muted text-xs">Secure Payment Gateway</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowPayment(false)} className="text-muted hover:text-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Amount */}
                                <div className="p-4 bg-surface/50 border-b border-border text-center">
                                    <p className="text-muted text-xs">Amount to pay</p>
                                    <p className="text-3xl font-bold text-foreground">₹199.00</p>
                                </div>

                                {/* Payment Method Tabs */}
                                <div className="p-4">
                                    <div className="flex gap-2 mb-4 p-1 bg-surface border border-border rounded-xl">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${paymentMethod === "card" ? "bg-foreground text-background" : "text-secondary"
                                                }`}
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            Card
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("upi")}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === "upi" ? "bg-foreground text-background" : "text-secondary"
                                                }`}
                                        >
                                            UPI
                                        </button>
                                    </div>

                                    {paymentMethod === "card" ? (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs text-muted mb-1">Card Number</label>
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                    className="w-full p-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-foreground/30 text-sm"
                                                    placeholder="4242 4242 4242 4242"
                                                    maxLength={19}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-muted mb-1">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value)}
                                                    className="w-full p-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-foreground/30 text-sm"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-muted mb-1">Expiry</label>
                                                    <input
                                                        type="text"
                                                        value={cardExpiry}
                                                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                                        className="w-full p-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-foreground/30 text-sm"
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-muted mb-1">CVV</label>
                                                    <input
                                                        type="password"
                                                        value={cardCvv}
                                                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                                                        className="w-full p-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-foreground/30 text-sm"
                                                        placeholder="•••"
                                                        maxLength={3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-xs text-muted mb-1">UPI ID</label>
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                className="w-full p-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:border-foreground/30 text-sm"
                                                placeholder="yourname@upi"
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={handlePayment}
                                        disabled={processing}
                                        className="w-full btn-primary mt-4 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-4 h-4" />
                                                Pay ₹199 Securely
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-muted text-xs mt-3 flex items-center justify-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        256-bit SSL Encrypted • Demo Payment
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
