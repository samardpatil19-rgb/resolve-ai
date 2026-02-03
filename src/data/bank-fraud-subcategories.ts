// Bank Fraud Sub-Categories and their specific checklists

export interface Step {
    stepNumber: number;
    title: string;
    description: string;
    priority: "critical" | "urgent" | "important" | "normal";
    details: string[];
    links: { text: string; url: string }[];
    premiumTemplate?: string;
}

export interface SubCategory {
    id: string;
    title: string;
    icon: string;
    description: string;
    timeframe: string;
    steps: Step[];
}

export const bankFraudSubCategories: SubCategory[] = [
    {
        id: "upi-fraud",
        title: "UPI Fraud",
        icon: "📱",
        description: "Unauthorized UPI transactions, QR code scams, or UPI PIN compromise",
        timeframe: "Report within 24 hours for best recovery chances",
        steps: [
            {
                stepNumber: 1,
                title: "Block UPI ID Immediately",
                description: "Disable your UPI ID in your payment app right now",
                priority: "critical",
                details: [
                    "Open your UPI app (GPay, PhonePe, Paytm)",
                    "Go to Settings → UPI Settings → Deactivate/Block UPI",
                    "Also call your bank to block UPI from their end",
                    "Note: This stops any further unauthorized transactions"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Call 1930 - Cyber Crime Helpline",
                description: "Report to the national helpline within the first hour if possible",
                priority: "critical",
                details: [
                    "1930 is available 24x7",
                    "They can initiate fund recovery process",
                    "Provide: Transaction ID, amount, time, your bank details",
                    "Get complaint number for tracking"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            },
            {
                stepNumber: 3,
                title: "File NPCI Dispute",
                description: "Lodge complaint with National Payments Corporation of India",
                priority: "urgent",
                details: [
                    "Visit NPCI dispute portal",
                    "Select 'UPI Transaction Dispute'",
                    "Upload transaction screenshot",
                    "NPCI coordinates between banks for resolution"
                ],
                links: [
                    { text: "NPCI Dispute Redressal", url: "https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism" }
                ]
            },
            {
                stepNumber: 4,
                title: "Report to Your Bank",
                description: "File written complaint with your bank's fraud department",
                priority: "urgent",
                details: [
                    "Call bank's 24x7 helpline first",
                    "Follow up with written complaint via email",
                    "Request reference number",
                    "Bank must respond within 3 working days"
                ],
                links: [],
                premiumTemplate: "bank-upi-complaint"
            },
            {
                stepNumber: 5,
                title: "Report to Destination Bank",
                description: "If you know the fraud UPI ID, report to that bank too",
                priority: "important",
                details: [
                    "UPI ID format: name@bankcode (e.g., xyz@oksbi)",
                    "Find the bank from the UPI ID suffix",
                    "Call their fraud department",
                    "This helps freeze the fraudster's account"
                ],
                links: []
            },
            {
                stepNumber: 6,
                title: "Change All UPI PINs",
                description: "Reset UPI PINs for all linked bank accounts",
                priority: "important",
                details: [
                    "Change PIN in each UPI app you use",
                    "Use different PINs for different apps",
                    "Don't reuse old PINs",
                    "Enable transaction alerts"
                ],
                links: []
            },
            {
                stepNumber: 7,
                title: "File Police FIR",
                description: "File an FIR at your local police station for investigation",
                priority: "important",
                details: [
                    "Carry all transaction proofs",
                    "Include 1930 complaint number",
                    "Get FIR copy for bank dispute",
                    "Many states allow e-FIR online"
                ],
                links: [
                    { text: "e-FIR Portal", url: "https://digitalpolice.gov.in" }
                ]
            },
            {
                stepNumber: 8,
                title: "Follow Up Weekly",
                description: "Track complaint status with all authorities",
                priority: "normal",
                details: [
                    "Check 1930 complaint status online",
                    "Call bank every 3-5 days",
                    "Escalate to Banking Ombudsman if no response in 30 days",
                    "Keep all communication records"
                ],
                links: [
                    { text: "RBI Ombudsman", url: "https://cms.rbi.org.in" }
                ]
            }
        ]
    },
    {
        id: "card-fraud",
        title: "Credit/Debit Card Fraud",
        icon: "💳",
        description: "Unauthorized card transactions, cloning, or compromised card details",
        timeframe: "Block card within 30 minutes to prevent further loss",
        steps: [
            {
                stepNumber: 1,
                title: "Block Your Card Immediately",
                description: "Call bank or use app to block the compromised card",
                priority: "critical",
                details: [
                    "Use your banking app → Cards → Block Card",
                    "Or call bank's 24x7 helpline",
                    "Also block international transactions if not already",
                    "Request new card issuance"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Report Within 3 Days for Zero Liability",
                description: "RBI's Zero Liability rule protects you if reported within 3 days",
                priority: "critical",
                details: [
                    "Report to bank within 3 working days",
                    "Customer has zero liability for unauthorized transactions",
                    "Get written acknowledgment from bank",
                    "This is RBI mandate - banks must comply"
                ],
                links: [
                    { text: "RBI Zero Liability Guidelines", url: "https://rbi.org.in/Scripts/NotificationUser.aspx?Id=11040" }
                ]
            },
            {
                stepNumber: 3,
                title: "File for Chargeback",
                description: "Initiate chargeback process for disputed transactions",
                priority: "urgent",
                details: [
                    "For credit cards: Call and initiate chargeback",
                    "For debit cards: File dispute with bank",
                    "Provide: Transaction details, statement copy",
                    "Chargeback timeline: Usually 45-90 days"
                ],
                links: [],
                premiumTemplate: "chargeback-request"
            },
            {
                stepNumber: 4,
                title: "File Cyber Crime Complaint",
                description: "Report to 1930 and online portal",
                priority: "urgent",
                details: [
                    "Call 1930 immediately",
                    "Also file online at cybercrime.gov.in",
                    "Category: Online Financial Fraud",
                    "Attach card statement and unauthorized transactions"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            },
            {
                stepNumber: 5,
                title: "Check for Data Breach",
                description: "Verify if your card was part of any data breach",
                priority: "important",
                details: [
                    "Check haveibeenpwned.com for email",
                    "Review recent transactions at merchants",
                    "Consider if card was used on suspicious websites",
                    "Check ATM skimming reports in your area"
                ],
                links: [
                    { text: "Have I Been Pwned", url: "https://haveibeenpwned.com" }
                ]
            },
            {
                stepNumber: 6,
                title: "Review All Linked Services",
                description: "Check subscriptions and saved card details online",
                priority: "important",
                details: [
                    "Remove card from e-commerce sites",
                    "Cancel recurring payments using this card",
                    "Update subscription services with new card",
                    "Check Google Pay/Apple Pay linked cards"
                ],
                links: []
            },
            {
                stepNumber: 7,
                title: "Escalate to Banking Ombudsman",
                description: "If bank doesn't resolve in 30 days, escalate to RBI",
                priority: "normal",
                details: [
                    "Wait 30 days after bank complaint",
                    "File at CMS portal with all documents",
                    "Ombudsman can order compensation",
                    "Decision usually within 30-60 days"
                ],
                links: [
                    { text: "RBI CMS Portal", url: "https://cms.rbi.org.in" }
                ]
            }
        ]
    },
    {
        id: "phishing",
        title: "Phishing / Vishing",
        icon: "🎣",
        description: "Tricked into sharing OTP, passwords, or bank details",
        timeframe: "Change passwords immediately, report within 24 hours",
        steps: [
            {
                stepNumber: 1,
                title: "Change All Passwords NOW",
                description: "Immediately update passwords for all financial accounts",
                priority: "critical",
                details: [
                    "Start with net banking password",
                    "Update UPI PINs",
                    "Change email password (often used for recovery)",
                    "Use unique passwords for each service"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Enable/Re-enable 2FA",
                description: "Set up fresh two-factor authentication",
                priority: "critical",
                details: [
                    "Disable and re-enable 2FA",
                    "Use authenticator app instead of SMS if possible",
                    "Regenerate backup codes",
                    "Update recovery email/phone"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Check for Unauthorized Access",
                description: "Review recent activity in all accounts",
                priority: "urgent",
                details: [
                    "Check bank transaction history",
                    "Review email login history",
                    "Check if any beneficiaries were added",
                    "Look for new UPI IDs linked"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Report to Bank",
                description: "Alert bank about potential compromise",
                priority: "urgent",
                details: [
                    "Call bank's security helpline",
                    "Request enhanced monitoring on account",
                    "Consider temporary account freeze if severe",
                    "Update registered mobile/email if compromised"
                ],
                links: [],
                premiumTemplate: "security-breach-alert"
            },
            {
                stepNumber: 5,
                title: "Report Phishing URL/Number",
                description: "Report the fraudulent source to authorities",
                priority: "important",
                details: [
                    "Report fake URLs to Google Safe Browsing",
                    "Report numbers to TRAI DND portal",
                    "Forward phishing SMS to 1909 (TRAI)",
                    "Report fake apps to Google Play/App Store"
                ],
                links: [
                    { text: "Google Safe Browsing Report", url: "https://safebrowsing.google.com/safebrowsing/report_phish/" },
                    { text: "TRAI DND App", url: "https://trai.gov.in/dnd" }
                ]
            },
            {
                stepNumber: 6,
                title: "File Cyber Crime Complaint",
                description: "Report the phishing attempt officially",
                priority: "important",
                details: [
                    "Even if no money lost, file report",
                    "Helps authorities track phishing rings",
                    "Keep screenshots of phishing messages",
                    "Include phone numbers/URLs used"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            }
        ]
    },
    {
        id: "sim-swap",
        title: "SIM Swap Fraud",
        icon: "📶",
        description: "Someone fraudulently obtained a duplicate of your SIM card",
        timeframe: "Act within minutes - SIM swap frauds drain accounts fast",
        steps: [
            {
                stepNumber: 1,
                title: "Contact Telecom Provider IMMEDIATELY",
                description: "Block the fraudulent SIM and restore your number",
                priority: "critical",
                details: [
                    "Call from another phone",
                    "Airtel: 121 | Jio: 199 | Vi: 198",
                    "Request immediate SIM block",
                    "Visit store with ID proof for new SIM"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Alert All Banks",
                description: "Freeze accounts temporarily until SIM is restored",
                priority: "critical",
                details: [
                    "Call each bank's fraud helpline",
                    "Request temporary freeze on net banking",
                    "Block UPI and mobile banking",
                    "Provide alternate contact number"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "File Police FIR",
                description: "SIM fraud is a criminal offense - file FIR immediately",
                priority: "critical",
                details: [
                    "This is identity theft",
                    "Carry telecom complaint receipt",
                    "Include timeline of events",
                    "FIR helps in fund recovery"
                ],
                links: [
                    { text: "e-FIR Portal", url: "https://digitalpolice.gov.in" }
                ],
                premiumTemplate: "sim-swap-fir"
            },
            {
                stepNumber: 4,
                title: "Report to DoT",
                description: "File complaint with Department of Telecom",
                priority: "urgent",
                details: [
                    "Use Sanchar Saathi portal",
                    "They can investigate telecom fraud",
                    "Can blacklist fraud numbers",
                    "Helps prevent future frauds"
                ],
                links: [
                    { text: "Sanchar Saathi", url: "https://sancharsaathi.gov.in" }
                ]
            },
            {
                stepNumber: 5,
                title: "Check All OTP-Based Services",
                description: "Review what was accessed with your number",
                priority: "urgent",
                details: [
                    "Check email recovery options",
                    "Review WhatsApp, social media",
                    "Check if Aadhaar was misused",
                    "Look for new accounts opened"
                ],
                links: []
            },
            {
                stepNumber: 6,
                title: "Report to Cyber Crime",
                description: "File detailed complaint at 1930 and portal",
                priority: "important",
                details: [
                    "Provide timeline of SIM deactivation",
                    "Include bank fraud details if any",
                    "Attach telecom and bank complaints",
                    "Request coordination between agencies"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            },
            {
                stepNumber: 7,
                title: "Set Up Enhanced Security",
                description: "After restoration, implement stronger security",
                priority: "important",
                details: [
                    "Add SIM lock PIN with telecom provider",
                    "Use authenticator apps instead of SMS OTP",
                    "Enable login alerts on all accounts",
                    "Consider number change if severely compromised"
                ],
                links: []
            },
            {
                stepNumber: 8,
                title: "File Insurance Claim",
                description: "If you have cyber insurance, file claim",
                priority: "normal",
                details: [
                    "Check if you have cyber insurance",
                    "Many credit cards include cyber coverage",
                    "Provide all complaint receipts",
                    "Insurance can cover financial losses"
                ],
                links: []
            }
        ]
    },
    {
        id: "qr-scam",
        title: "QR Code Scam",
        icon: "📷",
        description: "Scanned a fake QR code that led to money deduction",
        timeframe: "Report immediately, money may still be recoverable",
        steps: [
            {
                stepNumber: 1,
                title: "Call 1930 Immediately",
                description: "National helpline can help freeze destination account",
                priority: "critical",
                details: [
                    "Provide transaction ID",
                    "Share QR code screenshot if you have it",
                    "Time is critical for fund freezing",
                    "Note down complaint number"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Report to Your Bank",
                description: "File urgent complaint with your bank",
                priority: "critical",
                details: [
                    "Call bank's fraud helpline",
                    "Provide exact transaction time",
                    "Request they contact destination bank",
                    "Get complaint reference number"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Report the Fraudulent UPI ID",
                description: "Help block the scammer's account",
                priority: "urgent",
                details: [
                    "Report UPI ID to NPCI",
                    "Report in your UPI app (Report Fraud option)",
                    "Share UPI ID with bank",
                    "This helps prevent future victims"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "File Cyber Crime Complaint",
                description: "Official complaint helps in investigation",
                priority: "urgent",
                details: [
                    "Visit cybercrime.gov.in",
                    "Category: Online Financial Fraud → UPI Fraud",
                    "Upload QR screenshot if available",
                    "Include context of where you scanned it"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            },
            {
                stepNumber: 5,
                title: "Report Merchant/Location",
                description: "If QR was at a store/location, report them",
                priority: "important",
                details: [
                    "Note the location where you scanned",
                    "Report to local police",
                    "Fake QR overlays are common at petrol pumps, shops",
                    "Help authorities identify the fraud ring"
                ],
                links: []
            }
        ]
    }
];

// Helper function to get sub-category by ID
export function getSubCategory(id: string): SubCategory | undefined {
    return bankFraudSubCategories.find(sub => sub.id === id);
}
