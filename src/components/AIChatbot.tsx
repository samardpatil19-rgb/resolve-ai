"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AIChatbotProps {
    moduleContext?: string; // e.g., "mobile-theft", "bank-fraud", etc.
    placeholder?: string;
    welcomeMessage?: string;
    quickPrompt?: string; // Auto-send this message when set
}

function formatMarkdown(text: string): string {
    // 1. Escape HTML entities to prevent XSS and broken rendering
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 2. Handle inline code (backticks) — preserve content inside
    html = html.replace(/`([^`]+)`/g, '<code class="bg-surface px-1.5 py-0.5 rounded text-xs">$1</code>');

    // 3. Headings (must come before bold since ### starts lines)
    html = html.replace(/^### (.*$)/gm, '<h4 class="font-semibold mt-3 mb-1">$1</h4>');
    html = html.replace(/^## (.*$)/gm, '<h3 class="font-semibold text-base mt-3 mb-1">$1</h3>');

    // 4. Bold and italic (non-greedy, process bold first to avoid conflict)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

    // 5. List items
    html = html.replace(/^[-•] (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>');

    // 6. Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/((?:<li class="ml-4 list-disc">.*<\/li>\n?)+)/g, '<ul class="my-1">$1</ul>');
    html = html.replace(/((?:<li class="ml-4 list-decimal">.*<\/li>\n?)+)/g, '<ol class="my-1">$1</ol>');

    // 7. Line breaks (but not after block elements)
    html = html.replace(/\n/g, '<br/>');

    // 8. Clean up excessive <br/> after block elements
    html = html.replace(/(<\/h[34]>)<br\/>/g, '$1');
    html = html.replace(/(<\/ul>)<br\/>/g, '$1');
    html = html.replace(/(<\/ol>)<br\/>/g, '$1');
    html = html.replace(/(<\/li>)<br\/>/g, '$1');

    return html;
}

export function AIChatbot({
    moduleContext,
    placeholder = "Describe your issue in detail...",
    welcomeMessage = "Hi! I'm your AI assistant. Tell me about your situation and I'll help you find the best solution.",
    quickPrompt
}: AIChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: welcomeMessage,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-send quick prompt when set
    useEffect(() => {
        if (quickPrompt && messages.length === 1) {
            const userMessage: Message = {
                id: Date.now().toString(),
                role: "user",
                content: quickPrompt,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMessage]);
            getAIResponse(quickPrompt, [messages[0], userMessage]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quickPrompt]);

    const getAIResponse = async (userMessage: string, allMessages: Message[]) => {
        setIsTyping(true);

        try {
            // Build message history for Groq (exclude welcome message)
            const chatMessages = allMessages
                .filter(m => m.id !== "welcome")
                .map(m => ({ role: m.role, content: m.content }));

            // Add current user message
            chatMessages.push({ role: "user", content: userMessage });

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: chatMessages,
                    moduleContext,
                }),
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();

            const aiMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: data.message,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "I'm sorry, I encountered an error. Please try again. If the issue persists, check your internet connection.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        getAIResponse(input.trim(), [...messages, userMessage]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                ? "bg-foreground text-background"
                                : "glass-card"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                                        <span className="text-background text-xs font-bold">R</span>
                                    </div>
                                    <span className="text-xs text-muted">Resolve.Ai Assistant</span>
                                </div>
                            )}
                            <div className="text-sm leading-relaxed prose-chat"
                                dangerouslySetInnerHTML={{
                                    __html: message.role === "assistant"
                                        ? formatMarkdown(message.content)
                                        : message.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')
                                }}
                            />
                            <div className={`text-xs mt-2 ${message.role === "user" ? "text-background/60" : "text-muted"}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="glass-card rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                                    <span className="text-background text-xs font-bold">R</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            rows={1}
                            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-border-hover focus:border-transparent resize-none text-sm"
                            style={{ minHeight: "48px", maxHeight: "120px" }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="btn-primary px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </form>
                <p className="text-xs text-muted mt-2 text-center">
                    Powered by Groq AI • Your data is secure and private
                </p>
            </div>
        </div>
    );
}

// Floating chat button for module pages
export function FloatingChatButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-foreground text-background shadow-lg hover:opacity-90 transition-all hover:scale-110 flex items-center justify-center z-40"
            title="Chat with AI Assistant"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </button>
    );
}

// Chat modal/drawer for module pages
export function ChatDrawer({ isOpen, onClose, moduleContext, welcomeMessage }: {
    isOpen: boolean;
    onClose: () => void;
    moduleContext?: string;
    welcomeMessage?: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full sm:w-[480px] h-[70vh] sm:h-[600px] sm:rounded-2xl overflow-hidden glass-card border border-border animate-fade-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                            <span className="text-background font-bold text-sm">R</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">AI Assistant</h3>
                            <p className="text-xs text-muted">Powered by Groq</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center text-muted hover:text-foreground transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Content */}
                <div className="h-[calc(100%-72px)]">
                    <AIChatbot
                        moduleContext={moduleContext}
                        welcomeMessage={welcomeMessage}
                    />
                </div>
            </div>
        </div>
    );
}
