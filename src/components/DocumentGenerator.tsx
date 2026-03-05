"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Zap, Copy, Download, CheckCircle2, Loader2, Lock } from "lucide-react";

export type DocumentType =
    | "fir-draft"
    | "complaint-letter"
    | "grievance-email"
    | "escalation-letter"
    | "insurance-claim"
    | "ceir-application";

interface DocumentGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    documentType: DocumentType;
    title: string;
    description: string;
    isPremium: boolean;
    contextHints?: Record<string, string>; // Pre-filled context
}

const DOCUMENT_FIELDS: Record<DocumentType, Array<{ key: string; label: string; placeholder: string; multiline?: boolean }>> = {
    "fir-draft": [
        { key: "incidentDate", label: "Date & Time of Incident", placeholder: "e.g., 15th Feb 2026, around 3:30 PM" },
        { key: "location", label: "Location of Incident", placeholder: "e.g., MG Road Metro Station, Bangalore" },
        { key: "deviceDetails", label: "Phone Make & Model", placeholder: "e.g., Samsung Galaxy S24 Ultra, Black" },
        { key: "imei", label: "IMEI Number", placeholder: "e.g., 356938035643809 (dial *#06# from another phone)" },
        { key: "description", label: "Describe what happened", placeholder: "e.g., Phone was snatched from my hand while I was making a call...", multiline: true },
        { key: "estimatedValue", label: "Estimated Value (₹)", placeholder: "e.g., 85000" },
    ],
    "complaint-letter": [
        { key: "bankName", label: "Bank Name & Branch", placeholder: "e.g., State Bank of India, Koramangala Branch" },
        { key: "accountNumber", label: "Account Number (last 4 digits)", placeholder: "e.g., XXXX1234" },
        { key: "transactionDate", label: "Date of Fraudulent Transaction", placeholder: "e.g., 14th Feb 2026" },
        { key: "amount", label: "Amount Lost (₹)", placeholder: "e.g., 25000" },
        { key: "transactionType", label: "Type of Transaction", placeholder: "e.g., UPI transfer, debit card, net banking" },
        { key: "description", label: "How did the fraud happen?", placeholder: "e.g., Received a fake call claiming to be from bank...", multiline: true },
    ],
    "grievance-email": [
        { key: "platform", label: "E-Commerce Platform", placeholder: "e.g., Amazon, Flipkart, Meesho" },
        { key: "orderNumber", label: "Order Number", placeholder: "e.g., 402-1234567-8901234" },
        { key: "orderDate", label: "Order Date", placeholder: "e.g., 10th Feb 2026" },
        { key: "productName", label: "Product Ordered", placeholder: "e.g., iPhone 15 Pro Max 256GB" },
        { key: "amountPaid", label: "Amount Paid (₹)", placeholder: "e.g., 149900" },
        { key: "issue", label: "Describe the issue", placeholder: "e.g., Received a fake product / empty box / wrong item...", multiline: true },
    ],
    "escalation-letter": [
        { key: "authority", label: "Escalating To", placeholder: "e.g., Banking Ombudsman / NCDRC / Consumer Forum" },
        { key: "previousComplaint", label: "Previous Complaint Details", placeholder: "e.g., Complaint #12345 filed with SBI on 15th Feb" },
        { key: "amount", label: "Amount in Dispute (₹)", placeholder: "e.g., 50000" },
        { key: "timeline", label: "Timeline of Events", placeholder: "e.g., Filed complaint on 15th Feb, no response for 30 days...", multiline: true },
        { key: "relief", label: "Relief Sought", placeholder: "e.g., Full refund of ₹50,000 + compensation for mental agony" },
    ],
    "insurance-claim": [
        { key: "insuranceCompany", label: "Insurance Company", placeholder: "e.g., HDFC Ergo, ICICI Lombard, AppleCare+" },
        { key: "policyNumber", label: "Policy/Plan Number", placeholder: "e.g., POL-2026-12345" },
        { key: "deviceDetails", label: "Device Details", placeholder: "e.g., iPhone 15 Pro, 256GB, Space Black" },
        { key: "purchaseDate", label: "Purchase Date", placeholder: "e.g., 1st Jan 2026" },
        { key: "incidentDate", label: "Date of Theft/Loss", placeholder: "e.g., 15th Feb 2026" },
        { key: "firNumber", label: "FIR Number", placeholder: "e.g., FIR/2026/KOR/001234" },
        { key: "deviceValue", label: "Device Value (₹)", placeholder: "e.g., 149900" },
    ],
    "ceir-application": [
        { key: "deviceDetails", label: "Phone Make & Model", placeholder: "e.g., Samsung Galaxy S24 Ultra" },
        { key: "imei", label: "IMEI Number", placeholder: "e.g., 356938035643809" },
        { key: "purchaseDate", label: "Purchase Date", placeholder: "e.g., 1st Jan 2026" },
        { key: "telecomOperator", label: "Telecom Operator", placeholder: "e.g., Jio, Airtel, Vi" },
        { key: "mobileNumber", label: "Mobile Number", placeholder: "e.g., 9876543210" },
        { key: "firNumber", label: "FIR Number & Date", placeholder: "e.g., FIR/2026/KOR/001234, dated 15th Feb 2026" },
    ],
};

const DOCUMENT_TITLES: Record<DocumentType, string> = {
    "fir-draft": "FIR Complaint Draft",
    "complaint-letter": "Bank Complaint Letter",
    "grievance-email": "Consumer Grievance Email",
    "escalation-letter": "Escalation Letter",
    "insurance-claim": "Insurance Claim Letter",
    "ceir-application": "CEIR Application",
};

export function DocumentGenerator({
    isOpen,
    onClose,
    documentType,
    title,
    description,
    isPremium,
    contextHints,
}: DocumentGeneratorProps) {
    const [formData, setFormData] = useState<Record<string, string>>(contextHints || {});
    const [generatedDoc, setGeneratedDoc] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string>("");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setGeneratedDoc("");
            setError("");
            setCopied(false);
            setIsGenerating(false);
            setFormData(contextHints || {});
        }
    }, [isOpen, contextHints]);

    if (!isOpen) return null;

    const fields = DOCUMENT_FIELDS[documentType] || [];

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError("");

        try {
            const response = await fetch("/api/generate-document", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: documentType,
                    context: title,
                    userInputs: formData,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to generate document");
            }

            const data = await response.json();
            setGeneratedDoc(data.document);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedDoc);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([generatedDoc], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${DOCUMENT_TITLES[documentType] || "document"}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border rounded-2xl" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                {/* Header */}
                <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                                <FileText className="w-5 h-5 text-background" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-foreground">{title}</h2>
                                <p className="text-xs text-secondary">{description}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center text-muted hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!isPremium ? (
                        /* Premium Gate */
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Premium Feature</h3>
                            <p className="text-secondary text-sm mb-6 max-w-sm mx-auto">
                                AI document generation is available for Premium users. Upgrade to generate professional complaint letters, FIR drafts, and more instantly.
                            </p>
                            <button className="btn-primary px-8 py-3">
                                Upgrade to Premium — ₹199/month
                            </button>
                            <p className="text-xs text-muted mt-3">Cancel anytime. 7-day free trial.</p>
                        </div>
                    ) : !generatedDoc ? (
                        /* Input Form */
                        <div className="space-y-4">
                            <p className="text-sm text-secondary mb-4">
                                Fill in the details below. The more information you provide, the better the generated document will be.
                            </p>

                            {fields.map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        {field.label}
                                    </label>
                                    {field.multiline ? (
                                        <textarea
                                            value={formData[field.key] || ""}
                                            onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            placeholder={field.placeholder}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-border-hover focus:border-transparent resize-none text-sm"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={formData[field.key] || ""}
                                            onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-border-hover focus:border-transparent text-sm"
                                        />
                                    )}
                                </div>
                            ))}

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating with AI...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        Generate {DOCUMENT_TITLES[documentType]}
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* Generated Document */
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm text-secondary">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    Document generated successfully
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface transition-colors text-secondary hover:text-foreground"
                                    >
                                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface transition-colors text-secondary hover:text-foreground"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div className="bg-surface border border-border rounded-xl p-5 font-mono text-xs leading-relaxed text-secondary max-h-[400px] overflow-y-auto whitespace-pre-wrap">
                                {generatedDoc}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setGeneratedDoc(""); setError(""); }}
                                    className="flex-1 py-2.5 text-sm rounded-xl border border-border hover:bg-surface text-secondary hover:text-foreground transition-colors"
                                >
                                    Edit & Regenerate
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 btn-primary py-2.5 text-sm"
                                >
                                    Done
                                </button>
                            </div>

                            <p className="text-xs text-muted text-center">
                                ⚠️ Review the generated document carefully before using it. Modify as needed for accuracy.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

// Small inline button for StepCards
export function GenerateDocButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity duration-150"
        >
            <Zap className="w-3 h-3 flex-shrink-0" />
            <span>{label}</span>
        </button>
    );
}
