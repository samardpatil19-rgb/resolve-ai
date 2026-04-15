"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton, ChatDrawer } from "@/components/AIChatbot";
import { DocumentGenerator, GenerateDocButton, type DocumentType } from "@/components/DocumentGenerator";
import { bankFraudSubCategories, type SubCategory, type Step } from "@/data/bank-fraud-subcategories";
import { Smartphone, CreditCard, Fish, Radio, QrCode, FileText, Zap, Bell, type LucideIcon } from "lucide-react";

// Icon mapping for subcategories
const subcategoryIcons: Record<string, LucideIcon> = {
    "upi-fraud": Smartphone,
    "card-fraud": CreditCard,
    "phishing": Fish,
    "sim-swap": Radio,
    "qr-scam": QrCode,
};

// Priority Badge Component
function PriorityBadge({ level }: { level: "critical" | "urgent" | "important" | "normal" }) {
    const styles = {
        critical: "bg-foreground text-background",
        urgent: "bg-surface text-foreground border border-border",
        important: "bg-surface text-secondary border border-border",
        normal: "bg-surface text-muted border border-border"
    };
    const labels = {
        critical: "Critical",
        urgent: "Urgent",
        important: "Important",
        normal: "Follow-up"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[level]}`}>
            {labels[level]}
        </span>
    );
}

// Sub-Category Selection Card
function SubCategoryCard({ subCategory, onClick }: { subCategory: SubCategory; onClick: () => void }) {
    const IconComponent = subcategoryIcons[subCategory.id] || Smartphone;
    return (
        <button
            onClick={onClick}
            className="glass-card p-6 text-left hover:border-border-hover transition-all group"
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">
                        {subCategory.title}
                    </h3>
                    <p className="text-secondary text-sm mb-3">{subCategory.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {subCategory.timeframe}
                    </div>
                </div>
                <svg className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
}

// RBI Liability Info Component
function RBILiabilityInfo() {
    return (
        <div className="glass-card p-6 mb-8">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">RBI Zero Liability Protection</h3>
                    <p className="text-secondary text-sm leading-relaxed mb-3">
                        Under RBI guidelines, if you report unauthorized transactions <span className="text-foreground font-semibold">within 3 working days</span>,
                        your liability is <span className="text-foreground font-bold">₹0 (zero)</span> for amounts debited.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        <div className="bg-surface border border-border rounded-lg p-3">
                            <div className="font-bold text-foreground">Within 3 Days</div>
                            <div className="text-muted">₹0 Liability</div>
                        </div>
                        <div className="bg-surface border border-border rounded-lg p-3">
                            <div className="font-bold text-secondary">4-7 Days</div>
                            <div className="text-muted">Limited Liability</div>
                        </div>
                        <div className="bg-surface border border-border rounded-lg p-3">
                            <div className="font-bold text-muted">After 7 Days</div>
                            <div className="text-muted">As per bank policy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// AI Complaint Generator - Real Implementation
function ComplaintGenerator() {
    const [showGenerator, setShowGenerator] = useState(false);
    return (
        <>
            <div className="glass-card p-6 mb-8 border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Zap className="w-24 h-24 text-foreground/5 group-hover:text-foreground/10 transition-colors" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                            <FileText className="w-5 h-5 text-background" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">AI Complaint Drafter</h3>
                            <p className="text-xs text-secondary">Powered by Groq AI</p>
                        </div>
                    </div>

                    <p className="text-secondary text-sm mb-6 max-w-lg">
                        Instantly generate a professional complaint letter for your bank or the police.
                        Our AI formats it perfectly with all necessary legal details.
                    </p>

                    <div className="bg-surface rounded-lg p-4 mb-6 border border-border/50 font-mono text-xs text-muted">
                        <p className="mb-2">To: The Branch Manager...</p>
                        <p className="mb-2">Subject: Unauthorized Transaction Report...</p>
                        <p>Referencing RBI Circular DBR.No.Leg.BC.78/09.07.005...</p>
                        <div className="mt-2 h-2 w-20 bg-border/50 rounded animate-pulse"></div>
                    </div>

                    <button
                        onClick={() => setShowGenerator(true)}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        Generate Draft
                    </button>
                </div>
            </div>

            <DocumentGenerator
                isOpen={showGenerator}
                onClose={() => setShowGenerator(false)}
                documentType="complaint-letter"
                title="Bank Complaint Letter"
                description="AI-powered complaint letter generator for bank fraud"
                isPremium={true}
            />
        </>
    );
}

// Step Card Component
function StepCard({ step, isCompleted, onToggle }: {
    step: Step;
    isCompleted: boolean;
    onToggle: () => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const { isPremium } = useAuth();
    const router = useRouter();

    const handleGenerateClick = () => {
        if (!isPremium) {
            router.push('/pro');
            return;
        }
        setShowGenerator(true);
    };

    return (
        <div className={`glass-card p-6 transition-all ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={onToggle}
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${isCompleted ? 'bg-foreground border-foreground' : 'border-border hover:border-secondary'
                        }`}
                >
                    {isCompleted && (
                        <svg className="w-4 h-4 text-background" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
                <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-muted text-sm font-medium">Step {step.stepNumber}</span>
                        <PriorityBadge level={step.priority} />
                        {step.premiumTemplate && (
                            <span className="px-2 py-0.5 rounded bg-surface text-secondary text-xs border border-border">
                                Pro Template
                            </span>
                        )}
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'line-through text-muted' : 'text-foreground'}`}>
                        {step.title}
                    </h3>
                    <p className="text-secondary text-sm mb-4">{step.description}</p>

                    <div className="flex items-center justify-between mb-4">
                        <button className="text-xs flex items-center gap-1.5 text-muted hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-surface border border-transparent hover:border-border">
                            <Bell className="w-3.5 h-3.5" />
                            Set Reminder
                        </button>
                        {step.generatorType && (
                            <GenerateDocButton
                                label={`Generate ${step.generatorTitle || 'Draft'}`}
                                onClick={handleGenerateClick}
                            />
                        )}
                    </div>

                    {step.generatorType && (
                        <DocumentGenerator
                            isOpen={showGenerator}
                            onClose={() => setShowGenerator(false)}
                            documentType={step.generatorType as DocumentType}
                            title={step.generatorTitle || 'Generate Document'}
                            description={`AI-powered ${step.generatorTitle || 'document'} generator`}
                            isPremium={true}
                        />
                    )}

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-secondary text-sm font-medium flex items-center gap-1 hover:text-foreground"
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
                                    <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                                        <span className="text-foreground mt-1">•</span>
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
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface border border-border rounded-lg text-secondary text-sm hover:text-foreground hover:border-border-hover transition-colors"
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
                        {selectedSubCategory ? (
                            <button
                                onClick={() => { setSelectedSubCategory(null); setCompletedSteps(new Set()); }}
                                className="text-secondary hover:text-foreground transition-colors text-sm flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Change Type
                            </button>
                        ) : (
                            <Link href="/" className="text-secondary hover:text-foreground transition-colors text-sm flex items-center gap-1">
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
                            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-sm text-secondary">UPI / Bank Fraud Module</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {selectedSubCategory ? selectedSubCategory.title : "Report Bank Fraud"}
                        </h1>
                        <p className="text-secondary max-w-xl mx-auto">
                            {selectedSubCategory
                                ? selectedSubCategory.description
                                : "Select your fraud type below for a tailored action plan"}
                        </p>
                    </div>

                    {/* RBI Info - Always show */}
                    <RBILiabilityInfo />

                    <ComplaintGenerator />

                    {/* Sub-Category Selection OR Steps */}
                    {!selectedSubCategory ? (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground mb-4">What type of fraud occurred?</h2>
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
                                    <span className="text-sm text-secondary">
                                        Your Progress: {completedSteps.size} of {selectedSubCategory.steps.length} steps
                                    </span>
                                    <span className="text-sm font-medium text-foreground">{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border">
                                    <div
                                        className="h-full bg-foreground rounded-full transition-all duration-500"
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
                            <div className="mt-12 glass-card p-8">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
                                        <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-xl font-bold text-foreground mb-2">Let AI Handle the Paperwork</h3>
                                        <p className="text-secondary">
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
            <FloatingChatButton onClick={() => setIsChatOpen(true)} requiresPremium={true} />
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
