import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const DOCUMENT_PROMPTS: Record<string, string> = {
    "fir-draft": `Generate a formal First Information Report (FIR) complaint letter for filing with Indian police. 
Format it professionally with:
- "To: The Station House Officer" header
- Date and subject line
- Detailed incident description based on user input
- Request for FIR registration under relevant IPC sections
- IMEI number, device details if provided
- Closing with "I request you to kindly register an FIR and take necessary action"
- Space for signature and contact details
Use formal English. Reference relevant Indian laws.`,

    "complaint-letter": `Generate a formal complaint letter to a bank branch manager regarding unauthorized transactions/fraud.
Format it with:
- Bank branch address header
- Reference to RBI Circular on Limiting Liability (DBR.No.Leg.BC.78/09.07.005/2017-18)
- Mention of 3-day reporting window for zero liability
- Account details placeholder
- Transaction details from user input
- Request for immediate reversal and investigation
- Mention escalation to Banking Ombudsman if unresolved
Use formal business letter format.`,

    "grievance-email": `Generate a formal consumer grievance email for an e-commerce fraud/issue.
Format it with:
- Subject line referencing order number
- Reference to Consumer Protection Act 2019
- Platform's grievance officer as addressee
- Order details and issue description from user input
- Reference to platform's return/refund policy
- Clear demand (refund, replacement, compensation)
- Mention escalation to National Consumer Helpline (1800-11-4000) and Consumer Court
Use professional but firm tone.`,

    "escalation-letter": `Generate a formal escalation letter to a regulatory body (RBI Banking Ombudsman or National Consumer Disputes Redressal Commission).
Format it with:
- Proper regulatory body address
- Reference to previous complaint (with bank/platform)
- Timeline of events showing no resolution
- Amount in dispute
- Relief sought
- Supporting documents list
- Legal references (Consumer Protection Act 2019, RBI guidelines)
Use formal legal letter format.`,

    "insurance-claim": `Generate an insurance claim letter for a lost/stolen mobile phone.
Format it with:
- Insurance company address
- Policy number placeholder
- Incident date, time, and location
- FIR number reference
- CEIR block request reference
- Device details (make, model, IMEI)
- Purchase date and value
- Request for claim processing
- List of attached documents
Use formal claim letter format.`,

    "ceir-application": `Generate a supporting application letter for CEIR (Central Equipment Identity Register) IMEI blocking.
Format it with:
- Declaration of phone theft/loss
- Device details (make, model, IMEI, purchase date)
- FIR number and date
- Telecom operator details
- Request for IMEI blocking across all networks
- Declaration that information is true
Use formal application format.`
};

export async function POST(request: NextRequest) {
    try {
        const { type, context, userInputs } = await request.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Groq API key not configured. Please add GROQ_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        const documentPrompt = DOCUMENT_PROMPTS[type];
        if (!documentPrompt) {
            return NextResponse.json(
                { error: "Invalid document type" },
                { status: 400 }
            );
        }

        const prompt = `${documentPrompt}

User's situation details:
${JSON.stringify(userInputs, null, 2)}

Additional context: ${context || "None provided"}

Generate the complete document now. Make it ready to use with proper formatting. Fill in all details from the user input and use [PLACEHOLDER] for anything not provided.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a professional legal document generator for Indian citizens dealing with crisis situations. Generate well-formatted, legally sound documents that can be directly used by the person. Use placeholder brackets [YOUR NAME], [DATE], etc. for information not provided. Always include relevant Indian legal references. Output clean text without markdown code blocks."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            max_tokens: 2048,
        });

        const document = chatCompletion.choices[0]?.message?.content || "";

        return NextResponse.json({ document });
    } catch (error: unknown) {
        const err = error as { status?: number; message?: string };
        console.error("Document generation error:", err.message || error);

        if (err.status === 429) {
            return NextResponse.json(
                { error: "AI rate limit reached. Please wait a moment and try again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate document. Please try again." },
            { status: 500 }
        );
    }
}
