"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton, ChatDrawer } from "@/components/AIChatbot";
import { DocumentGenerator, GenerateDocButton, type DocumentType } from "@/components/DocumentGenerator";
import { Smartphone, Apple, Bell } from "lucide-react";

// Priority badge
function PriorityBadge({ level }: { level: "critical" | "urgent" | "important" | "normal" }) {
    const styles = {
        critical: "bg-foreground text-background",
        urgent: "bg-surface text-foreground border border-border",
        important: "bg-surface text-secondary border border-border",
        normal: "bg-surface text-muted border border-border"
    };

    const labels = {
        critical: "Critical (0-4 hrs)",
        urgent: "Urgent (4-24 hrs)",
        important: "Important (1-3 days)",
        normal: "Follow-up"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[level]}`}>
            {labels[level]}
        </span>
    );
}

// Step card
function StepCard({
    stepNumber,
    title,
    description,
    priority,
    details,
    links,
    isCompleted,
    onToggle,
    generatorType,
    generatorTitle
}: {
    stepNumber: number;
    title: string;
    description: string;
    priority: "critical" | "urgent" | "important" | "normal";
    details: string[];
    links?: { text: string; url: string; }[];
    isCompleted: boolean;
    onToggle: () => void;
    generatorType?: DocumentType;
    generatorTitle?: string;
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
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${isCompleted
                        ? 'bg-foreground border-foreground'
                        : 'border-border hover:border-secondary'
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
                        <span className="text-muted text-sm font-medium">Step {stepNumber}</span>
                        <PriorityBadge level={priority} />
                    </div>

                    <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'line-through text-muted' : 'text-foreground'}`}>
                        {title}
                    </h3>

                    <p className="text-secondary text-sm mb-4">{description}</p>

                    <div className="flex items-center justify-between mb-4">
                        <button className="text-xs flex items-center gap-1.5 text-muted hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-surface border border-transparent hover:border-border">
                            <Bell className="w-3.5 h-3.5" />
                            Set Reminder
                        </button>
                        {generatorType && (
                            <GenerateDocButton
                                label={`Generate ${generatorTitle || 'Draft'}`}
                                onClick={handleGenerateClick}
                            />
                        )}
                    </div>

                    {generatorType && (
                        <DocumentGenerator
                            isOpen={showGenerator}
                            onClose={() => setShowGenerator(false)}
                            documentType={generatorType}
                            title={generatorTitle || 'Generate Document'}
                            description={`AI-powered ${generatorTitle || 'document'} generator for your situation`}
                            isPremium={true}
                        />
                    )}

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-secondary text-sm font-medium flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                        <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                            <ul className="space-y-2">
                                {details.map((detail, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                                        <span className="text-foreground mt-1">•</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {links && links.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-2 bg-surface border border-border text-secondary rounded-lg text-sm hover:text-foreground hover:border-border-hover transition-colors"
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

// Device type selector (iOS vs Android)
function DeviceSelector({ onDeviceSelect }: { onDeviceSelect: (device: "android" | "ios") => void }) {
    const [selected, setSelected] = useState<"android" | "ios" | null>(null);

    const devices = [
        { id: "android" as const, name: "Android", desc: "Samsung, Pixel, OnePlus, etc.", Icon: Smartphone },
        { id: "ios" as const, name: "iPhone", desc: "All Apple iPhones", Icon: Apple },
    ];

    return (
        <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-2">What type of device?</h2>
            <p className="text-secondary text-sm mb-6">This helps us show relevant steps and links</p>

            <div className="grid grid-cols-2 gap-4">
                {devices.map((device) => (
                    <button
                        key={device.id}
                        onClick={() => {
                            setSelected(device.id);
                            onDeviceSelect(device.id);
                        }}
                        className={`p-6 rounded-xl border-2 transition-all text-center ${selected === device.id
                            ? 'border-foreground bg-surface'
                            : 'border-border hover:border-secondary'
                            }`}
                    >
                        <device.Icon className={`w-10 h-10 mx-auto mb-3 ${selected === device.id ? 'text-foreground' : 'text-muted'}`} />
                        <div className="font-semibold text-foreground">{device.name}</div>
                        <div className="text-xs text-muted mt-1">{device.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Time selector
function TimeSelector({ onTimeSelect }: { onTimeSelect: (hours: number) => void }) {
    const [selected, setSelected] = useState<number | null>(null);

    const options = [
        { hours: 1, label: "Just now", desc: "Less than 1 hour" },
        { hours: 4, label: "Few hours", desc: "1-4 hours ago" },
        { hours: 24, label: "Today", desc: "4-24 hours ago" },
        { hours: 72, label: "This week", desc: "1-3 days ago" },
    ];

    return (
        <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-2">When did this happen?</h2>
            <p className="text-secondary text-sm mb-6">This helps us prioritize your actions</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {options.map((option) => (
                    <button
                        key={option.hours}
                        onClick={() => {
                            setSelected(option.hours);
                            onTimeSelect(option.hours);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${selected === option.hours
                            ? 'border-foreground bg-surface'
                            : 'border-border hover:border-secondary'
                            }`}
                    >
                        <div className="font-semibold text-foreground">{option.label}</div>
                        <div className="text-xs text-muted">{option.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function MobileTheftPage() {
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [timeframe, setTimeframe] = useState<number | null>(null);
    const [deviceType, setDeviceType] = useState<"android" | "ios" | null>(null);
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

    const androidSteps = [
        {
            stepNumber: 1,
            title: "Remote Lock & Wipe via Find My Device",
            description: "Use Google's Find My Device to immediately locate, lock, or erase your Android phone.",
            priority: "critical" as const,
            details: [
                "Visit android.com/find from any browser",
                "Sign in with the same Google account on your phone",
                "Select your lost device from the list",
                "Click 'Secure Device' to lock with a custom message & number",
                "Use 'Play Sound' to ring even if on silent",
                "If recovery seems unlikely, use 'Erase Device'",
                "Even if phone is offline, it will lock when it reconnects",
                "Works on Samsung, Pixel, OnePlus, Realme, etc."
            ],
            links: [
                { text: "Find My Device", url: "https://www.google.com/android/find" },
                { text: "Google Account Security", url: "https://myaccount.google.com/security" }
            ]
        },
        {
            stepNumber: 2,
            title: "Track Your Android Phone's Location",
            description: "Use Find My Device to see your phone's real-time or last known location on a map.",
            priority: "critical" as const,
            details: [
                "Go to android.com/find and sign in",
                "Map will show phone's current or last known location",
                "Location updates every few minutes when online",
                "On Samsung: also try smartthingsfind.samsung.com",
                "Share location with police if filing FIR",
                "Screenshot the location as evidence",
                "DO NOT attempt to recover the phone yourself — contact police",
                "If location is unavailable, phone may be off or factory reset"
            ],
            links: [
                { text: "Google Find My Device", url: "https://www.google.com/android/find" },
                { text: "Samsung SmartThings Find", url: "https://smartthingsfind.samsung.com" }
            ]
        },
        {
            stepNumber: 3,
            title: "Block Your SIM Card",
            description: "Call your telecom provider immediately to block the SIM and prevent misuse.",
            priority: "critical" as const,
            details: [
                "Airtel: Call 121 or visit nearest store",
                "Jio: Call 198 or use MyJio app from another device",
                "Vi (Vodafone-Idea): Call 199",
                "BSNL: Call 1800-180-1503",
                "Carry ID proof when visiting store",
                "Request new SIM with same number (takes 2-4 hours)",
                "Ask for confirmation SMS/email of SIM block"
            ],
            links: [
                { text: "Airtel Customer Care", url: "https://www.airtel.in/contact-us" },
                { text: "Jio Support", url: "https://www.jio.com/en-in/customer-care" }
            ]
        },
        {
            stepNumber: 4,
            title: "Secure UPI & Banking Apps",
            description: "Contact your bank to block UPI, GPay, PhonePe, and mobile banking immediately.",
            priority: "critical" as const,
            details: [
                "Call your bank's 24x7 helpline immediately",
                "SBI: 1800-111-211 | HDFC: 1800-267-6161",
                "ICICI: 1800-102-4242 | Axis: 1860-419-5555",
                "Request blocking of mobile banking & UPI",
                "De-register from GPay: payments.google.com → Settings",
                "PhonePe: Contact support to delink number",
                "Paytm: Call 0120-4456-456 to block wallet",
                "Get a reference number for each blocking request"
            ],
            links: [
                { text: "NPCI UPI Helpline", url: "https://www.npci.org.in/what-we-do/upi/faqs" }
            ]
        },
        {
            stepNumber: 5,
            title: "File e-FIR / Police Complaint",
            description: "File an online FIR on your state's citizen portal or visit the nearest police station.",
            priority: "urgent" as const,
            details: [
                "Many states allow e-FIR for mobile theft",
                "Delhi: delhipolice.gov.in",
                "Maharashtra: citizen.mahapolice.gov.in",
                "Karnataka: ksp.karnataka.gov.in",
                "Keep IMEI number ready (check phone box or Google dashboard)",
                "Find IMEI: Settings → About Phone → IMEI (on another phone)",
                "Note FIR number — needed for insurance & CEIR",
                "Visit station within 3 days if filed online"
            ],
            links: [
                { text: "Delhi Police e-FIR", url: "https://delhipolice.gov.in/" },
                { text: "Maharashtra e-FIR", url: "https://citizen.mahapolice.gov.in/" }
            ],
            generatorType: "fir-draft" as DocumentType,
            generatorTitle: "FIR Draft"
        },
        {
            stepNumber: 6,
            title: "Block IMEI via CEIR Portal",
            description: "Register your lost phone on the Central Equipment Identity Register to block it nationally.",
            priority: "urgent" as const,
            details: [
                "Visit ceir.gov.in",
                "Click 'Block Lost/Stolen Mobile'",
                "Enter IMEI number (found on box or Google dashboard)",
                "Upload copy of FIR report",
                "Upload ID proof (Aadhaar/PAN)",
                "Phone will be blacklisted across all Indian networks",
                "Can unblock later if phone is recovered"
            ],
            links: [
                { text: "CEIR Portal", url: "https://www.ceir.gov.in/" }
            ],
            generatorType: "ceir-application" as DocumentType,
            generatorTitle: "CEIR Application"
        },
        {
            stepNumber: 7,
            title: "Change Google Account & Passwords",
            description: "Secure your Google account and change passwords from a trusted device.",
            priority: "important" as const,
            details: [
                "Go to myaccount.google.com/security",
                "Change Google password immediately",
                "Review 'Your devices' and sign out the lost phone",
                "Check 'Recent security activity' for suspicious logins",
                "Revoke access from third-party apps",
                "Update Gmail recovery phone/email",
                "Enable 2-Step Verification if not already on",
                "Review Google Pay transaction history"
            ],
            links: [
                { text: "Google Security Checkup", url: "https://myaccount.google.com/security-checkup" },
                { text: "Google Devices", url: "https://myaccount.google.com/device-activity" }
            ]
        },
        {
            stepNumber: 8,
            title: "Secure Social Media Accounts",
            description: "Log out of all sessions and enable 2FA on social platforms.",
            priority: "important" as const,
            details: [
                "WhatsApp: Linked Devices → Log out all (from another phone)",
                "Instagram: Settings → Security → Login Activity → Log out suspicious",
                "Facebook: Settings → Security → Where You're Logged In",
                "Twitter/X: Settings → Security → Apps and Sessions",
                "Telegram: Settings → Devices → Terminate all other sessions",
                "Enable login alerts on all platforms",
                "Review and remove unknown devices"
            ],
            links: [
                { text: "Facebook Security", url: "https://www.facebook.com/settings?tab=security" },
                { text: "Instagram Security", url: "https://www.instagram.com/accounts/login_activity/" }
            ]
        },
        {
            stepNumber: 9,
            title: "File Insurance Claim (If Applicable)",
            description: "If your phone was insured, initiate the claim process with required documents.",
            priority: "normal" as const,
            details: [
                "Check if phone has theft/loss coverage",
                "Common insurers: Bajaj Allianz, HDFC Ergo, OneAssist",
                "Documents needed: FIR copy, CEIR acknowledgment",
                "Original invoice/purchase proof",
                "ID proof and filled claim form",
                "Most claims must be filed within 48-72 hours",
                "Track claim status regularly"
            ],
            links: [],
            generatorType: "insurance-claim" as DocumentType,
            generatorTitle: "Insurance Claim"
        }
    ];

    const iosSteps = [
        {
            stepNumber: 1,
            title: "Activate Lost Mode via Find My iPhone",
            description: "Use Apple's Find My to immediately lock your iPhone and display a contact message.",
            priority: "critical" as const,
            details: [
                "Visit icloud.com/find from any browser",
                "Sign in with your Apple ID",
                "Select your lost iPhone from the list",
                "Click 'Mark As Lost' to enable Lost Mode",
                "Enter a contact number to display on lock screen",
                "Lost Mode locks the device and disables Apple Pay",
                "Activation Lock prevents anyone from erasing and reusing it",
                "If recovery seems unlikely, click 'Erase iPhone'"
            ],
            links: [
                { text: "Find My iPhone", url: "https://www.icloud.com/find" },
                { text: "Apple ID Security", url: "https://appleid.apple.com/" }
            ]
        },
        {
            stepNumber: 2,
            title: "Track Your iPhone's Location",
            description: "Use Find My or another Apple device to see your iPhone's real-time or last known location.",
            priority: "critical" as const,
            details: [
                "Go to icloud.com/find and sign in with Apple ID",
                "Map will display current or last known location",
                "If you have another Apple device, use the Find My app",
                "Enable 'Notify When Found' for offline iPhones",
                "Find My network uses other Apple devices to locate yours",
                "AirTag-like tracking works even when iPhone is off (iPhone 15+)",
                "Share location screenshot with police as evidence",
                "DO NOT attempt to recover yourself — contact police"
            ],
            links: [
                { text: "iCloud Find My", url: "https://www.icloud.com/find" },
                { text: "Apple Find My Support", url: "https://support.apple.com/en-in/find-my" }
            ]
        },
        {
            stepNumber: 3,
            title: "Block Your SIM Card",
            description: "Call your telecom provider immediately to block the SIM and prevent misuse.",
            priority: "critical" as const,
            details: [
                "Airtel: Call 121 or visit nearest store",
                "Jio: Call 198 or use MyJio app from another device",
                "Vi (Vodafone-Idea): Call 199",
                "BSNL: Call 1800-180-1503",
                "For eSIM: call carrier to deactivate remotely",
                "Request new SIM/eSIM with same number",
                "Ask for confirmation of SIM block"
            ],
            links: [
                { text: "Airtel Customer Care", url: "https://www.airtel.in/contact-us" },
                { text: "Jio Support", url: "https://www.jio.com/en-in/customer-care" }
            ]
        },
        {
            stepNumber: 4,
            title: "Secure UPI & Banking Apps",
            description: "Contact your bank to block UPI, Apple Pay, and mobile banking immediately.",
            priority: "critical" as const,
            details: [
                "Call your bank's 24x7 helpline immediately",
                "SBI: 1800-111-211 | HDFC: 1800-267-6161",
                "ICICI: 1800-102-4242 | Axis: 1860-419-5555",
                "Apple Pay is auto-disabled in Lost Mode",
                "Still call bank to block UPI linked to your number",
                "PhonePe/GPay: Contact support to delink number",
                "Paytm: Call 0120-4456-456 to block wallet",
                "Get a reference number for each blocking request"
            ],
            links: [
                { text: "NPCI UPI Helpline", url: "https://www.npci.org.in/what-we-do/upi/faqs" }
            ]
        },
        {
            stepNumber: 5,
            title: "File e-FIR / Police Complaint",
            description: "File an online FIR on your state's citizen portal or visit the nearest police station.",
            priority: "urgent" as const,
            details: [
                "Many states allow e-FIR for mobile theft",
                "Delhi: delhipolice.gov.in",
                "Maharashtra: citizen.mahapolice.gov.in",
                "Karnataka: ksp.karnataka.gov.in",
                "Find IMEI: Check original box, Apple ID account, or iTunes backup",
                "Go to appleid.apple.com → Devices → select iPhone for IMEI",
                "Note FIR number — needed for insurance & CEIR",
                "Visit station within 3 days if filed online"
            ],
            links: [
                { text: "Delhi Police e-FIR", url: "https://delhipolice.gov.in/" },
                { text: "Maharashtra e-FIR", url: "https://citizen.mahapolice.gov.in/" }
            ],
            generatorType: "fir-draft" as DocumentType,
            generatorTitle: "FIR Draft"
        },
        {
            stepNumber: 6,
            title: "Block IMEI via CEIR Portal",
            description: "Register your lost iPhone on the Central Equipment Identity Register to block it nationally.",
            priority: "urgent" as const,
            details: [
                "Visit ceir.gov.in",
                "Click 'Block Lost/Stolen Mobile'",
                "Enter IMEI number (found on box or appleid.apple.com)",
                "Upload copy of FIR report",
                "Upload ID proof (Aadhaar/PAN)",
                "iPhone will be blacklisted across all Indian networks",
                "Can unblock later if phone is recovered"
            ],
            links: [
                { text: "CEIR Portal", url: "https://www.ceir.gov.in/" }
            ],
            generatorType: "ceir-application" as DocumentType,
            generatorTitle: "CEIR Application"
        },
        {
            stepNumber: 7,
            title: "Change Apple ID & iCloud Password",
            description: "Secure your Apple account and change passwords from a trusted device.",
            priority: "important" as const,
            details: [
                "Go to appleid.apple.com",
                "Change Apple ID password immediately",
                "Review 'Devices' and remove the lost iPhone",
                "Check for unrecognized sign-ins",
                "Update iCloud Keychain if compromised",
                "Review App Store & iTunes purchase history",
                "Enable Two-Factor Authentication if not already on",
                "Update trusted phone number to your new SIM"
            ],
            links: [
                { text: "Apple ID Account", url: "https://appleid.apple.com/" },
                { text: "Apple Support", url: "https://support.apple.com/en-in/apple-id" }
            ]
        },
        {
            stepNumber: 8,
            title: "Secure Social Media Accounts",
            description: "Log out of all sessions and enable 2FA on social platforms.",
            priority: "important" as const,
            details: [
                "WhatsApp: Linked Devices → Log out all (from another phone)",
                "iMessage: Will stop automatically when SIM is blocked",
                "Instagram: Settings → Security → Login Activity → Log out suspicious",
                "Facebook: Settings → Security → Where You're Logged In",
                "Twitter/X: Settings → Security → Apps and Sessions",
                "Telegram: Settings → Devices → Terminate all other sessions",
                "Enable login alerts on all platforms"
            ],
            links: [
                { text: "Facebook Security", url: "https://www.facebook.com/settings?tab=security" },
                { text: "Instagram Security", url: "https://www.instagram.com/accounts/login_activity/" }
            ]
        },
        {
            stepNumber: 9,
            title: "File Insurance Claim (If Applicable)",
            description: "If your iPhone was covered under AppleCare+ with Theft & Loss or another insurer.",
            priority: "normal" as const,
            details: [
                "AppleCare+ with Theft & Loss: File at support.apple.com",
                "Requires Find My to have been enabled before loss",
                "Other insurers: Bajaj Allianz, HDFC Ergo, OneAssist",
                "Documents needed: FIR copy, CEIR acknowledgment",
                "Original invoice/purchase proof",
                "ID proof and filled claim form",
                "Most claims must be filed within 48-72 hours"
            ],
            links: [
                { text: "AppleCare+ Claims", url: "https://support.apple.com/en-in/applecare" }
            ],
            generatorType: "insurance-claim" as DocumentType,
            generatorTitle: "Insurance Claim"
        }
    ];

    const steps = deviceType === 'ios' ? iosSteps : androidSteps;

    const completedCount = completedSteps.size;
    const totalSteps = steps.length;
    const progressPercent = (completedCount / totalSteps) * 100;

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
            <main className="pt-24 md:pt-32 pb-20">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
                            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-secondary">Mobile Theft / Loss Module</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                            Phone Lost or Stolen?
                        </h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Follow these steps in order. Critical actions first, then secure your accounts and file reports.
                        </p>
                    </div>

                    {/* Device Selector */}
                    <DeviceSelector onDeviceSelect={(device) => setDeviceType(device)} />

                    {/* Only show instructions after device is selected */}
                    {deviceType ? (
                        <>
                            {/* Selected device indicator */}
                            <div className="glass-card p-4 mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {deviceType === 'android' ? <Smartphone className="w-5 h-5 text-foreground" /> : <Apple className="w-5 h-5 text-foreground" />}
                                    <span className="text-sm text-secondary">
                                        Showing steps for <span className="text-foreground font-semibold">{deviceType === 'android' ? 'Android' : 'iPhone'}</span>
                                    </span>
                                </div>
                                <button onClick={() => setDeviceType(null)} className="text-xs text-muted hover:text-foreground transition-colors">
                                    Change
                                </button>
                            </div>

                            {/* Time Selector */}
                            <TimeSelector onTimeSelect={(hours) => setTimeframe(hours)} />

                            {/* Progress Bar */}
                            <div className="glass-card p-4 mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-secondary">Progress</span>
                                    <span className="text-sm font-medium text-foreground">{completedCount} of {totalSteps} completed</span>
                                </div>
                                <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border">
                                    <div
                                        className="h-full bg-foreground rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                {completedCount === totalSteps && (
                                    <div className="mt-4 p-4 bg-surface border border-border rounded-xl text-center">
                                        <svg className="w-8 h-8 mx-auto mb-2 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-foreground font-medium">All steps completed! Great job securing your accounts.</p>
                                    </div>
                                )}
                            </div>

                            {/* Steps List */}
                            <div className="space-y-4">
                                {steps.map((step) => (
                                    <StepCard
                                        key={step.stepNumber}
                                        {...step}
                                        isCompleted={completedSteps.has(step.stepNumber)}
                                        onToggle={() => toggleStep(step.stepNumber)}
                                    />
                                ))}
                            </div>

                            {/* Premium Upsell */}
                            <div className="mt-12 glass-card p-8">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center flex-shrink-0">
                                        <svg className="w-7 h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-xl font-bold text-foreground mb-2">Need faster resolution?</h3>
                                        <p className="text-secondary">
                                            Upgrade to Pro for AI-powered FIR drafting, auto-filled CEIR forms, and personalized complaint emails.
                                        </p>
                                    </div>
                                    <button className="btn-primary whitespace-nowrap">
                                        Upgrade to Pro - ₹199
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 text-muted">
                            <Smartphone className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg">Select your device type above to see the recovery steps</p>
                        </div>
                    )}
                </div>
            </main>

            {/* AI Chat */}
            <FloatingChatButton onClick={() => setIsChatOpen(true)} requiresPremium={true} />
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                moduleContext="mobile-theft"
                welcomeMessage="Hi! I'm here to help with your mobile theft or loss situation. If your issue is unique or the steps don't cover your specific case, describe it here and I'll provide personalized guidance."
            />
        </div>
    );
}
