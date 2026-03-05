"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck, Zap, Lock, ArrowLeft, Database } from "lucide-react";

export default function ProtocolsPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="container-main flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back</span>
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-24 pb-16">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Our Protocols
                        </h1>
                        <p className="text-xl text-secondary leading-relaxed">
                            How Resolve.Ai ensures accuracy, speed, and security in crisis resolution.
                        </p>
                    </div>

                    {/* Protocol Sections */}
                    <div className="space-y-12">
                        {/* Protocol 1 */}
                        <section className="glass-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">1. Rapid Response Protocol</h2>
                                    <p className="text-secondary leading-relaxed">
                                        Every second counts in a crisis. Our system is designed to provide actionable steps within 30 seconds of accessing a module.
                                    </p>
                                </div>
                            </div>
                            <ul className="space-y-3 text-secondary ml-16">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Pre-compiled action steps based on Indian regulatory frameworks
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Priority-ordered tasks to ensure critical actions (like blocking cards) happen first
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Direct links to official portals (Cyber Crime, RBI, TRAI)
                                </li>
                            </ul>
                        </section>

                        {/* Protocol 2 */}
                        <section className="glass-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">2. Data Accuracy Protocol</h2>
                                    <p className="text-secondary leading-relaxed">
                                        Our information is sourced directly from official government and regulatory bodies.
                                    </p>
                                </div>
                            </div>
                            <ul className="space-y-3 text-secondary ml-16">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Regular updates from RBI circulars, DoT guidelines, and MHA advisories
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Cross-verified helpline numbers and portal URLs
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    Clear disclaimers where professional legal advice is recommended
                                </li>
                            </ul>
                        </section>

                        {/* Protocol 3 */}
                        <section className="glass-card p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">3. Privacy &amp; Security</h2>
                                    <p className="text-secondary leading-relaxed mb-4">
                                        User data is encrypted at rest using AES-256 (via Supabase) and in transit via TLS 1.3. We adhere to a strict &quot;Need to Know&quot; policy where sensitive data is only accessible to the user and the automated resolution engine.
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <Link href="/privacy" className="text-sm font-medium border-b border-foreground/30 hover:border-foreground transition-colors">
                                            Privacy Policy →
                                        </Link>
                                        <Link href="/terms" className="text-sm font-medium border-b border-foreground/30 hover:border-foreground transition-colors">
                                            Terms of Service →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* AI Disclaimer */}
                        <section className="glass-card p-8 border-l-4 border-primary">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">AI Assistance Disclaimer</h3>
                                    <p className="text-secondary leading-relaxed">
                                        Resolve.Ai uses AI (Groq - Llama 3.3) to help draft documents and provide contextual assistance. While we strive for accuracy, AI-generated content should be reviewed by the user. For complex legal matters, always consult a qualified professional.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container-main text-center text-secondary text-sm">
                    <p>&copy; {new Date().getFullYear()} Resolve.Ai. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
