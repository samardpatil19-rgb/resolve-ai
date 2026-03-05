"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIChatbot } from "@/components/AIChatbot";

const quickPrompts = [
    { icon: "🏥", label: "Medical Emergency", prompt: "I need help with a medical emergency situation" },
    { icon: "🏠", label: "Property Dispute", prompt: "I have a property or real estate dispute" },
    { icon: "💼", label: "Employment Issue", prompt: "I'm facing an employment or workplace issue" },
    { icon: "🎓", label: "Education Related", prompt: "I need help with an education-related problem" },
    { icon: "✈️", label: "Travel Issue", prompt: "I have a travel or transportation problem" },
    { icon: "📄", label: "Document/ID Issue", prompt: "I need help with documents or ID cards" },
];

export default function OtherIssuesPage() {
    const [selectedPrompt, setSelectedPrompt] = useState<string>("");

    return (
        <div className="min-h-screen flex flex-col">
            <div className="gradient-bg" />

            {/* Navigation */}
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
                        <Link href="/" className="text-secondary hover:text-foreground transition-colors text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Modules
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 pt-20 flex flex-col">
                <div className="container-main max-w-4xl flex-1 flex flex-col py-6">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
                            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-secondary">AI-Powered Assistance</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                            Other Issues? <span className="text-secondary">Ask AI</span>
                        </h1>
                        <p className="text-secondary text-sm max-w-xl mx-auto">
                            Describe any crisis situation and our AI assistant will guide you with actionable steps.
                        </p>
                    </div>

                    {/* Quick Prompts */}
                    <div className="glass-card p-4 mb-4">
                        <p className="text-xs text-muted mb-3">Quick topics:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((prompt) => (
                                <button
                                    key={prompt.label}
                                    onClick={() => setSelectedPrompt(prompt.prompt)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border text-xs transition-all cursor-pointer ${selectedPrompt === prompt.prompt
                                            ? 'border-foreground text-foreground'
                                            : 'border-border text-secondary hover:text-foreground hover:border-border-hover'
                                        }`}
                                >
                                    <span>{prompt.icon}</span>
                                    <span>{prompt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="flex-1 glass-card overflow-hidden min-h-[400px]">
                        <AIChatbot
                            moduleContext="other-issues"
                            quickPrompt={selectedPrompt}
                            welcomeMessage="Hi! I'm your AI crisis assistant. I can help you navigate various challenging situations that may not fit into our main categories.

Whether it's a medical emergency, property dispute, employment issue, or any other crisis - describe your situation, and I'll provide step-by-step guidance on how to resolve it.

What can I help you with today?"
                            placeholder="Describe your situation... (e.g., 'My landlord is refusing to return my security deposit')"
                        />
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <p className="text-xs text-orange-400/80 text-center">
                            <strong>Disclaimer:</strong> AI assistance is for guidance only. For emergencies, contact relevant authorities immediately.
                            Always verify advice with qualified professionals.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
