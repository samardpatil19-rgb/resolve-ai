"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton, ChatDrawer } from "@/components/AIChatbot";
import { bankFraudSubCategories, type SubCategory, type Step } from "@/data/bank-fraud-subcategories";

// Priority Badge Component
function PriorityBadge({ level }: { level: "critical" | "urgent" | "important" | "normal" }) {
    const colors = {
        critical: "bg-red-500/20 text-red-400 border-red-500/30",
        urgent: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        important: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        normal: "bg-green-500/20 text-green-400 border-green-500/30"
    };
    const labels = {
        critical: "🔴 Critical",
        urgent: "🟠 Urgent",
        important: "🟡 Important",
        normal: "🟢 Follow-up"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
            {labels[level]}
        </span>
    );
}

// Sub-Category Selection Card
function SubCategoryCard({ subCategory, onClick }: { subCategory: SubCategory; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="glass-card p-6 text-left hover:border-purple-500/50 transition-all group"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl">{subCategory.icon}</div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {subCategory.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{subCategory.description}</p>
                    <div className="flex items-center gap-2 text-xs text-orange-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {subCategory.timeframe}
                    </div>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
}

// RBI Liability Info Component
function RBILiabilityInfo() {
    return (
        <div className="glass-card p-6 mb-8 border-green-500/20 bg-green-500/5">
            <div className="flex items-start gap-4">
                <div className="text-3xl">⚖️</div>
                <div>
                    <h3 className="font-bold text-green-400 text-lg mb-1">RBI Zero Liability Protection</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Under RBI guidelines, if you report unauthorized transactions <span className="text-white font-semibold">within 3 working days</span>,
                        your liability is <span className="text-green-400 font-bold">₹0 (zero)</span> for amounts debited.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        <div className="bg-green-500/10 rounded-lg p-3">
                            <div className="font-bold text-green-400">Within 3 Days</div>
                            <div className="text-gray-400">₹0 Liability</div>
                        </div>
                        <div className="bg-orange-500/10 rounded-lg p-3">
                            <div className="font-bold text-orange-400">4-7 Days</div>
                            <div className="text-gray-400">Limited Liability</div>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-3">
                            <div className="font-bold text-red-400">After 7 Days</div>
                            <div className="text-gray-400">As per bank policy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Step Card Component
function StepCard({ step, isCompleted, onToggle }: {
    step: Step;
    isCompleted: boolean;
    onToggle: () => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`glass-card p-6 transition-all ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={onToggle}
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-gray-400'
                        }`}
                >
                    {isCompleted && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
                <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-gray-500 text-sm font-medium">Step {step.stepNumber}</span>
                        <PriorityBadge level={step.priority} />
                        {step.premiumTemplate && (
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">
                                ✨ Pro Template
                            </span>
                        )}
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
                        {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{step.description}</p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-purple-400 text-sm font-medium flex items-center gap-1 hover:text-purple-300"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                        <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-3">
                            <ul className="space-y-2">
                                {step.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                            {step.links && step.links.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {step.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-500/20 transition-colors"
                                        >
                                            {link.text}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BankFraudPage() {
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleStep = (stepNumber: number) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(stepNumber)) {
            newCompleted.delete(stepNumber);
        } else {
            newCompleted.add(stepNumber);
        }
        setCompletedSteps(newCompleted);
    };

    const progressPercent = selectedSubCategory
        ? (completedSteps.size / selectedSubCategory.steps.length) * 100
        : 0;

    return (
        <div className="min-h-screen">
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
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {selectedSubCategory ? (
                            <button
                                onClick={() => { setSelectedSubCategory(null); setCompletedSteps(new Set()); }}
                                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Change Type
                            </button>
                        ) : (
                            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Modules
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-16">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
                            <span className="text-2xl">💳</span>
                            <span className="text-sm text-gray-300">UPI / Bank Fraud Module</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {selectedSubCategory ? selectedSubCategory.title : "Report Bank Fraud"}
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            {selectedSubCategory
                                ? selectedSubCategory.description
                                : "Select your fraud type below for a tailored action plan"}
                        </p>
                    </div>

                    {/* RBI Info - Always show */}
                    <RBILiabilityInfo />

                    {/* Sub-Category Selection OR Steps */}
                    {!selectedSubCategory ? (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white mb-4">What type of fraud occurred?</h2>
                            <div className="grid gap-4">
                                {bankFraudSubCategories.map((subCat) => (
                                    <SubCategoryCard
                                        key={subCat.id}
                                        subCategory={subCat}
                                        onClick={() => setSelectedSubCategory(subCat)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-400">
                                        Your Progress: {completedSteps.size} of {selectedSubCategory.steps.length} steps
                                    </span>
                                    <span className="text-sm font-medium text-purple-400">{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            {/* Steps List */}
                            <div className="space-y-4">
                                {selectedSubCategory.steps.map((step) => (
                                    <StepCard
                                        key={step.stepNumber}
                                        step={step}
                                        isCompleted={completedSteps.has(step.stepNumber)}
                                        onToggle={() => toggleStep(step.stepNumber)}
                                    />
                                ))}
                            </div>

                            {/* Pro Upgrade Card */}
                            <div className="mt-12 glass-card p-8 border-purple-500/20 bg-purple-500/5">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="text-5xl">⚡</div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-xl font-bold text-white mb-2">Let AI Handle the Paperwork</h3>
                                        <p className="text-gray-400">
                                            Upgrade to Pro for AI-drafted complaint letters, auto-filled forms, and priority support.
                                        </p>
                                    </div>
                                    <button className="btn-primary whitespace-nowrap">
                                        Upgrade to Pro - ₹199
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* AI Chat */}
            <FloatingChatButton onClick={() => setIsChatOpen(true)} />
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                moduleContext="bank-fraud"
                welcomeMessage={selectedSubCategory
                    ? `Hi! I see you're dealing with ${selectedSubCategory.title}. How can I help you further?`
                    : "Hi! I'm here to help with your bank fraud situation. Select a fraud type above, or describe your issue here if it doesn't fit the categories."
                }
            />
        </div>
    );
}
