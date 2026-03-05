"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
                        Terms of Service
                    </h1>
                    <p className="text-secondary mb-8">Last updated: March 5, 2026</p>

                    <div className="prose prose-invert max-w-none space-y-8 text-secondary">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Resolve.Ai, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Description</h2>
                            <p>
                                Resolve.Ai provides AI-powered guidance for crisis situations in India, including mobile theft, bank fraud, and e-commerce disputes. Our service offers step-by-step instructions but does not replace professional legal advice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
                            <p>
                                You are responsible for the accuracy of information you provide. You agree not to misuse our services or attempt to access systems without authorization.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Disclaimer</h2>
                            <p>
                                While we strive for accuracy, Resolve.Ai provides guidance &quot;as is&quot; without warranties. We are not liable for outcomes resulting from following our recommendations. For complex legal matters, consult a qualified professional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                            <p>
                                All content, design, and code on Resolve.Ai is owned by us or our licensors. You may not copy, modify, or distribute our materials without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                            <p>
                                Resolve.Ai and its team shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our services, including but not limited to reliance on AI-generated documents or guidance. Maximum liability is limited to the amount paid by you for the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
                            <p>
                                These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
                            <p>
                                We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or in-app notification.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact</h2>
                            <p>
                                For questions about these terms, contact us at <a href="mailto:gamingvalorant838@gmail.com" className="text-primary underline">gamingvalorant838@gmail.com</a>.
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
