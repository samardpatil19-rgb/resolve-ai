// E-Commerce Fraud Sub-Categories and their specific checklists

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

export const ecommerceSubCategories: SubCategory[] = [
    {
        id: "non-delivery",
        title: "Non-Delivery / Missing Order",
        icon: "📦",
        description: "Order marked delivered but never received, or stuck in transit",
        timeframe: "Report within 48 hours of expected delivery",
        steps: [
            {
                stepNumber: 1,
                title: "Check Tracking & Delivery Proof",
                description: "Verify tracking status and request delivery proof from carrier",
                priority: "critical",
                details: [
                    "Check tracking on platform (Amazon/Flipkart/Myntra)",
                    "Note down AWB/tracking number",
                    "Check if 'delivered' shows any signature/photo proof",
                    "Check with neighbors and security if applicable"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Report to Platform Immediately",
                description: "Use the platform's help section to report non-delivery",
                priority: "critical",
                details: [
                    "Amazon: Orders → Track → Problem with order → Item not received",
                    "Flipkart: My Orders → Need Help → Delivery Issues",
                    "Screenshot the complaint before submitting",
                    "Note your complaint/ticket number"
                ],
                links: [
                    { text: "Amazon Help", url: "https://www.amazon.in/gp/help/customer/contact-us" },
                    { text: "Flipkart Help", url: "https://www.flipkart.com/helpcentre" }
                ]
            },
            {
                stepNumber: 3,
                title: "Contact Customer Care",
                description: "If online complaint doesn't resolve, call directly",
                priority: "urgent",
                details: [
                    "Amazon: 1800-3000-9009 (24x7)",
                    "Flipkart: 1800-202-9898",
                    "Myntra: 080-46100000",
                    "Request escalation if first response is unsatisfactory"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Email Grievance Officer",
                description: "Escalate to the platform's grievance officer",
                priority: "urgent",
                details: [
                    "Every platform has a designated Grievance Officer (legal requirement)",
                    "Amazon: grievance-officer@amazon.in",
                    "Flipkart: grievance.officer@flipkart.com",
                    "Include order ID, timeline, and previous complaint reference"
                ],
                links: [],
                premiumTemplate: "grievance-email"
            },
            {
                stepNumber: 5,
                title: "File Complaint on NCH Portal",
                description: "National Consumer Helpline for formal complaint",
                priority: "important",
                details: [
                    "Call 14404 or 1800-11-4000 (toll-free)",
                    "Or file online at consumerhelpline.gov.in",
                    "They mediate between you and the company",
                    "Resolution usually within 15-30 days"
                ],
                links: [
                    { text: "National Consumer Helpline", url: "https://consumerhelpline.gov.in" }
                ]
            },
            {
                stepNumber: 6,
                title: "Request Chargeback (for Card/UPI)",
                description: "Dispute the transaction with your bank/card",
                priority: "important",
                details: [
                    "Contact your bank's customer care",
                    "Provide order details and non-delivery proof",
                    "Chargeback timeline: 45-120 days",
                    "Works for credit/debit cards"
                ],
                links: []
            },
            {
                stepNumber: 7,
                title: "File on E-Daakhil (Consumer Court)",
                description: "If all else fails, file in consumer court online",
                priority: "normal",
                details: [
                    "E-Daakhil is the online consumer court portal",
                    "File case for amounts up to ₹50 lakhs",
                    "Fees: ₹200 for claims up to ₹5 lakhs",
                    "Can claim refund + compensation"
                ],
                links: [
                    { text: "E-Daakhil Portal", url: "https://edaakhil.nic.in" }
                ],
                premiumTemplate: "consumer-court-filing"
            }
        ]
    },
    {
        id: "fake-product",
        title: "Fake / Counterfeit Product",
        icon: "🚫",
        description: "Received fake, duplicate, or counterfeit item instead of genuine",
        timeframe: "Report within 7 days of delivery for easy return",
        steps: [
            {
                stepNumber: 1,
                title: "Document Everything",
                description: "Take photos/videos as evidence before anything else",
                priority: "critical",
                details: [
                    "Photograph the product from multiple angles",
                    "Video while unboxing (if you haven't opened yet)",
                    "Keep all packaging, bills, and tags",
                    "Compare with genuine product images online"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Initiate Return/Refund",
                description: "Request return through the platform",
                priority: "critical",
                details: [
                    "Select reason: 'Item not as described' or 'Fake/Counterfeit'",
                    "Upload your evidence photos",
                    "Don't select 'wrong size' or other generic reasons",
                    "Screenshot confirmation of return request"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Report the Seller",
                description: "Flag the seller for selling counterfeits",
                priority: "urgent",
                details: [
                    "Use 'Report Seller' option on product page",
                    "Select 'Counterfeit/Fake product' category",
                    "This helps protect other buyers",
                    "Note seller name and ID for your records"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Contact Brand for Verification",
                description: "Get confirmation from original brand if possible",
                priority: "important",
                details: [
                    "Contact the original brand's India customer care",
                    "Share product photos for authenticity check",
                    "A brand confirmation letter helps in disputes",
                    "Major brands have anti-counterfeiting teams"
                ],
                links: []
            },
            {
                stepNumber: 5,
                title: "Escalate to Platform Grievance",
                description: "If return denied, escalate formally",
                priority: "important",
                details: [
                    "Email grievance officer with all evidence",
                    "Reference the brand's fake confirmation if obtained",
                    "Mention 'Sale of counterfeit goods is illegal under Trademark Act'",
                    "Give 48-hour deadline for response"
                ],
                links: [],
                premiumTemplate: "counterfeit-complaint"
            },
            {
                stepNumber: 6,
                title: "File Police Complaint",
                description: "For valuable items, file a formal complaint",
                priority: "important",
                details: [
                    "Selling counterfeits is a criminal offense",
                    "File at cybercrime.gov.in",
                    "Or visit local police station with evidence",
                    "FIR strengthens consumer court case"
                ],
                links: [
                    { text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }
                ]
            },
            {
                stepNumber: 7,
                title: "Consumer Forum Complaint",
                description: "File for refund + damages in consumer court",
                priority: "normal",
                details: [
                    "Use E-Daakhil for online filing",
                    "Claim refund + compensation for harassment",
                    "Include all communications and evidence",
                    "Legal representation not mandatory"
                ],
                links: [
                    { text: "E-Daakhil Portal", url: "https://edaakhil.nic.in" }
                ]
            }
        ]
    },
    {
        id: "wrong-item",
        title: "Wrong Item Delivered",
        icon: "🔄",
        description: "Received completely different product than what was ordered",
        timeframe: "Report within 24-48 hours for quick replacement",
        steps: [
            {
                stepNumber: 1,
                title: "Don't Use the Wrong Item",
                description: "Keep item unused and in original packaging",
                priority: "critical",
                details: [
                    "Don't remove tags or try to use the item",
                    "Keep all original packaging intact",
                    "Take photos of what you received vs what you ordered",
                    "Screenshot your original order details"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Request Replacement/Return",
                description: "Use platform's order issue option",
                priority: "critical",
                details: [
                    "Go to order history → Report issue",
                    "Select 'Wrong item delivered'",
                    "Choose replacement or refund",
                    "Upload photos showing wrong item"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Schedule Pickup",
                description: "Arrange for the wrong item to be picked up",
                priority: "urgent",
                details: [
                    "Don't ship back on your own unless asked",
                    "Wait for platform to schedule reverse pickup",
                    "Keep pickup receipt/proof",
                    "Refund usually within 5-7 days of pickup"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Follow Up if Delayed",
                description: "Escalate if replacement/refund is delayed",
                priority: "important",
                details: [
                    "Call customer care after 3 days if no update",
                    "Reference your original complaint number",
                    "Ask for supervisor if needed",
                    "Email grievance officer if persistent issue"
                ],
                links: []
            }
        ]
    },
    {
        id: "damaged-product",
        title: "Damaged / Defective Product",
        icon: "💔",
        description: "Product arrived broken, damaged, or doesn't work properly",
        timeframe: "Report damage immediately upon delivery",
        steps: [
            {
                stepNumber: 1,
                title: "Document Damage Immediately",
                description: "Photo/video evidence is crucial for damaged items",
                priority: "critical",
                details: [
                    "Take photos of outer packaging showing damage",
                    "Video unboxing if possible",
                    "Photograph the damaged product clearly",
                    "Note delivery agent details if they're still present"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Report Within Return Window",
                description: "File damage report on the platform",
                priority: "critical",
                details: [
                    "Select 'Damaged' or 'Defective' as reason",
                    "Upload all damage photos",
                    "For electronics: note specific defects",
                    "Request refund rather than replacement for damaged items"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Contact Seller for High-Value Items",
                description: "Reach out to seller directly for expensive products",
                priority: "urgent",
                details: [
                    "Use 'Contact Seller' option on order page",
                    "Explain damage with photos",
                    "Ask about warranty and service options",
                    "Some sellers offer direct replacement"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Warranty Claim (for Electronics)",
                description: "Use manufacturer warranty if applicable",
                priority: "important",
                details: [
                    "Check warranty card in packaging",
                    "Register product on manufacturer website",
                    "Contact manufacturer service center",
                    "Keep invoice for warranty claims"
                ],
                links: []
            },
            {
                stepNumber: 5,
                title: "Request Chargeback if Refund Denied",
                description: "Dispute with bank as last resort",
                priority: "normal",
                details: [
                    "Contact your bank's customer care",
                    "Provide damage evidence and refund denial proof",
                    "Chargeback protects you when seller doesn't",
                    "Works for credit and some debit cards"
                ],
                links: []
            }
        ]
    },
    {
        id: "refund-not-received",
        title: "Refund Not Received",
        icon: "💸",
        description: "Return completed but refund not credited to your account",
        timeframe: "Wait 7-10 business days, then escalate",
        steps: [
            {
                stepNumber: 1,
                title: "Check Refund Status",
                description: "Verify refund status on the platform",
                priority: "critical",
                details: [
                    "Go to order → Return details → Refund status",
                    "Note the refund reference number (ARN)",
                    "Check promised refund timeline",
                    "Verify refund method (original payment source)"
                ],
                links: []
            },
            {
                stepNumber: 2,
                title: "Check Your Bank/Card Statement",
                description: "Sometimes refunds appear with different names",
                priority: "critical",
                details: [
                    "Check for credits around the expected date",
                    "Look for merchant name variations",
                    "Check card statement if paid by card",
                    "Check UPI transaction history"
                ],
                links: []
            },
            {
                stepNumber: 3,
                title: "Contact Platform Support",
                description: "Request refund confirmation with ARN",
                priority: "urgent",
                details: [
                    "Call customer care with order ID",
                    "Ask for ARN (Acquirer Reference Number)",
                    "ARN helps bank trace the refund",
                    "Get expected credit date in writing"
                ],
                links: []
            },
            {
                stepNumber: 4,
                title: "Contact Your Bank with ARN",
                description: "Use ARN to trace refund with your bank",
                priority: "urgent",
                details: [
                    "Call bank with the ARN number",
                    "Bank can trace if refund was received",
                    "Sometimes refunds fail and return to merchant",
                    "Bank may need to raise internal investigation"
                ],
                links: []
            },
            {
                stepNumber: 5,
                title: "File Payment Dispute",
                description: "If refund is lost, dispute with bank",
                priority: "important",
                details: [
                    "Provide: Original transaction ID, return proof, ARN",
                    "Bank investigates with merchant's bank",
                    "Timeline: 30-60 days for resolution",
                    "Keep all communication records"
                ],
                links: []
            },
            {
                stepNumber: 6,
                title: "Consumer Helpline Complaint",
                description: "NCH can intervene for stuck refunds",
                priority: "normal",
                details: [
                    "Call 14404 with all details",
                    "They'll coordinate with the e-commerce platform",
                    "Write to grievance officer with NCH complaint",
                    "Usually resolves within 15 days"
                ],
                links: [
                    { text: "Consumer Helpline", url: "https://consumerhelpline.gov.in" }
                ]
            }
        ]
    }
];

// Helper function to get sub-category by ID
export function getSubCategory(id: string): SubCategory | undefined {
    return ecommerceSubCategories.find(sub => sub.id === id);
}
