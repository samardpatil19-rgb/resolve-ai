"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to an API
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

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
                <div className="container-main max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-secondary mb-12">
                        Have questions or feedback? We&apos;d love to hear from you.
                    </p>

                    {submitted ? (
                        <div className="glass-card p-8 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                            <p className="text-secondary mb-6">
                                Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({ name: "", email: "", subject: "", message: "" });
                                }}
                                className="btn-secondary"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <select
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="bug">Bug Report</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    )}

                    {/* Alternative Contact Methods */}
                    <div className="mt-12 grid md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 text-center">
                            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
                            <h3 className="font-bold mb-2">Email Us</h3>
                            <a href="mailto:gamingvalorant838@gmail.com" className="text-secondary hover:text-foreground transition-colors">
                                gamingvalorant838@gmail.com
                            </a>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-primary" />
                            <h3 className="font-bold mb-2">Live Chat</h3>
                            <p className="text-secondary">Available 9 AM - 6 PM IST</p>
                        </div>
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
