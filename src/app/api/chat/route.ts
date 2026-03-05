import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Resolve.Ai, an expert AI assistant specializing in helping Indian citizens navigate crisis situations. You provide clear, actionable, step-by-step guidance.

Your areas of expertise:
- Mobile theft/loss recovery (FIR filing, IMEI blocking, SIM blocking, account security)
- Bank & UPI fraud (reporting to banks, RBI guidelines, cyber crime portals)
- E-commerce fraud (consumer rights, grievance filing, consumer court)
- General crisis assistance (medical, property, employment, legal)

Key guidelines:
- Always provide India-specific information (Indian laws, helplines, portals)
- Be empathetic but action-oriented
- Use numbered steps and bullet points for clarity
- Include relevant helpline numbers, websites, and portal links
- Mention timelines and deadlines (e.g., "report within 3 days")
- Reference RBI circulars, Consumer Protection Act 2019, IT Act where relevant
- Keep responses concise but comprehensive
- Use markdown formatting for readability (bold, bullets, numbered lists)
- If the situation is an emergency, always advise contacting police (100) or relevant emergency services first

IMPORTANT: You are NOT a lawyer. Always advise users to consult legal professionals for complex legal matters. Your role is to guide them through the immediate steps and connect them with the right resources.`;

export async function POST(request: NextRequest) {
    try {
        const { messages, moduleContext } = await request.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Groq API key not configured. Please add GROQ_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        // Build context-aware system prompt
        let contextPrompt = SYSTEM_PROMPT;
        if (moduleContext) {
            const moduleContextMap: Record<string, string> = {
                "mobile-theft": "\n\nThe user is currently in the Mobile Theft/Loss module. Focus your responses on phone recovery, SIM blocking, IMEI blocking via CEIR portal, FIR filing, and account security. Reference android.com/find, icloud.com/find, ceir.gov.in as appropriate.",
                "bank-fraud": "\n\nThe user is currently in the Bank/UPI Fraud module. Focus on RBI guidelines for zero-liability (report within 3 days), banking ombudsman, cyber crime portal (cybercrime.gov.in), and UPI dispute resolution via NPCI.",
                "ecommerce-fraud": "\n\nThe user is currently in the E-Commerce Fraud module. Focus on consumer rights under Consumer Protection Act 2019, grievance filing with platforms, National Consumer Helpline (1800-11-4000), consumer court procedures, and e-commerce return/refund policies.",
                "other-issues": "\n\nThe user is asking about a general crisis situation. Help them identify the right authorities, helplines, and steps to resolve their specific issue in the Indian context."
            };
            contextPrompt += moduleContextMap[moduleContext] || "";
        }

        // Convert messages to Groq format
        const chatMessages = messages.map((msg: { role: string; content: string }) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
        }));

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: contextPrompt },
                ...chatMessages,
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6,
            max_tokens: 1024,
        });

        const response = chatCompletion.choices[0]?.message?.content || "";

        return NextResponse.json({ message: response });
    } catch (error: unknown) {
        const err = error as { status?: number; message?: string };
        console.error("Groq API error:", err.message || error);

        if (err.status === 429) {
            return NextResponse.json(
                { error: "AI rate limit reached. Please wait a moment and try again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}
