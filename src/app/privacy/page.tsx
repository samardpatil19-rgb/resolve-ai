"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                <div className="container-main max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-secondary mb-8">Last updated: March 5, 2026</p>

                    <div className="prose prose-invert max-w-none space-y-8 text-secondary">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly, such as your email address, name, and any details you enter while using our crisis resolution modules. We also collect usage data to improve our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                            <p>
                                Your information is used to provide personalized crisis resolution guidance, track your progress, and send you relevant notifications. We do not sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
                            <p>
                                We use industry-standard encryption (AES-256 at rest, TLS 1.3 in transit) via Supabase to protect your data. Access to user data is strictly limited to authorized personnel and automated systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. AI Processing</h2>
                            <p>
                                Data submitted to our AI tools (Groq) is processed for the sole purpose of generating your requested outputs. Your data is not stored or used for training.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
                            <p>
                                You have the right to access, correct, or delete your personal data at any time. Contact us at gamingvalorant838@gmail.com to exercise these rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies & Local Storage</h2>
                            <p>
                                Resolve.Ai uses cookies and local storage to save your theme preferences and track your progress through crisis resolution steps. We do not use tracking cookies for advertising purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Third-Party Services</h2>
                            <p>
                                We use the following third-party services: Supabase (authentication & database), Groq (AI processing), and Vercel (hosting). Each service has its own privacy policy that governs how they handle data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                            <p>
                                For any privacy-related questions, please reach out to us at <a href="mailto:gamingvalorant838@gmail.com" className="text-primary underline">gamingvalorant838@gmail.com</a>.
                            </p>
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
