# Resolve.Ai ⚡

**🟢 Live Demo:** [resolve-ai-eta.vercel.app](https://resolve-ai-eta.vercel.app/)

**AI-powered crisis navigation platform for Indian citizens.** From panic to plan in 2 minutes — get step-by-step guidance for mobile theft, bank fraud, e-commerce disputes, and more.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=flat&logo=groq&logoColor=white)

---

## 🚀 What It Does

Resolve.Ai provides **priority-based, time-sensitive action plans** when you're hit with a crisis in India. Each module walks you through exactly what to do, in what order, with direct links to official portals, helplines, and legal procedures.

### Crisis Modules

| Module | What It Covers |
|--------|---------------|
| 📱 **Mobile Theft/Loss** | IMEI blocking (CEIR), e-FIR filing, SIM lockdown, bank account security, remote wipe — with separate flows for Android & iOS |
| 🏦 **UPI/Bank Fraud** | Phishing, vishing, QR scams, SIM swap fraud — with RBI zero-liability timelines and bank-specific complaint processes |
| 🛒 **E-Commerce Fraud** | Non-delivery, counterfeit products, refund failures — with platform-specific guides, consumer court filing, and chargeback processes |
| 💬 **Other Issues** | Free AI chatbot for any crisis — medical emergencies, property disputes, employment issues, education, travel, and more |

---

## ✨ Key Features

### AI-Powered Assistance (Groq — Llama 3.3 70B)
- **Document Generator** — Produces legally-formatted FIR drafts, bank complaint letters, grievance emails, escalation letters, insurance claims, and CEIR applications
- **Context-Aware Chatbot** — Module-specific AI chat with India-specific legal knowledge, helpline numbers, and procedures
- **Quick Prompts** — One-click prompts in the Other Issues module for instant AI guidance

### Smart Crisis Navigation
- **Priority-Based Checklists** — Steps ordered by urgency (Critical → Urgent → Important → Normal) with time windows
- **Sub-Category Routing** — Each module has specialized flows (e.g., Bank Fraud → Phishing / Vishing / QR Code / SIM Swap)
- **Progress Tracking** — Mark steps as complete, track your recovery journey
- **Set Reminders** — Never miss a deadline for complaints or follow-ups

### Authentication & Premium
- **Multi-Method Auth** — Google OAuth, Email/Password, Phone OTP (via Supabase)
- **Freemium Model** — Free: full step-by-step guides + Other Issues chatbot. Pro (₹199): AI document generation + AI chat in paid modules
- **Payment Gateway** — Simulated Card & UPI payment flow with instant premium activation

### Design
- **Dark/Light Theme** — System-aware theme toggle
- **Glassmorphism UI** — Modern glass-card design with smooth animations
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript, React 19 |
| **Styling** | Vanilla CSS with custom design tokens |
| **Auth & Database** | Supabase (PostgreSQL, Auth, Row Level Security) |
| **AI** | Groq SDK — Llama 3.3 70B Versatile |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── mobile-theft/          # Mobile theft module
│   ├── bank-fraud/            # Bank fraud module (5 sub-categories)
│   ├── ecommerce-fraud/       # E-commerce fraud module (5 sub-categories)
│   ├── other-issues/          # Free AI chatbot module
│   ├── pro/                   # Premium upgrade & payment page
│   ├── login/                 # Authentication (Google, Email, OTP)
│   ├── auth/callback/         # OAuth callback handler
│   ├── api/
│   │   ├── chat/              # Groq AI chat endpoint
│   │   ├── generate-document/ # Groq AI document generation endpoint
│   │   └── activate-premium/  # Premium activation endpoint
│   ├── about/                 # About page
│   ├── privacy/               # Privacy policy
│   ├── terms/                 # Terms of service
│   └── contact/               # Contact page
├── components/
│   ├── AIChatbot.tsx          # Chat UI, FloatingChatButton, ChatDrawer
│   ├── DocumentGenerator.tsx  # Document generation modal & form
│   └── ThemeToggle.tsx        # Dark/light mode toggle
├── context/
│   └── AuthContext.tsx        # Auth state, premium status, Google/Email/OTP
├── data/
│   ├── bank-fraud-subcategories.ts
│   └── ecommerce-subcategories.ts
└── lib/
    └── supabase/              # Supabase client & server utilities
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Groq API key ([console.groq.com](https://console.groq.com))

### Installation

```bash
git clone https://github.com/samardpatil19-rgb/resolve-ai.git
cd resolve-ai
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### Database Setup

Run in Supabase SQL Editor:

```sql
-- Profiles table for premium status
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  is_premium BOOLEAN DEFAULT false,
  premium_expires_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 💰 Pricing Model

| | Free | Pro (₹199) |
|---|---|---|
| Step-by-step guides | ✅ | ✅ |
| Helpline numbers & portal links | ✅ | ✅ |
| Other Issues AI chatbot | ✅ | ✅ |
| AI Document Generator | 🔒 | ✅ |
| AI Chat (Mobile Theft) | 🔒 | ✅ |
| AI Chat (Bank Fraud) | 🔒 | ✅ |
| AI Chat (E-Commerce) | 🔒 | ✅ |

---

## 🙏 Acknowledgements

- [RBI Zero-Liability Framework](https://rbi.org.in) — Bank fraud timelines
- [CEIR Portal](https://ceir.gov.in) — IMEI blocking
- [Cyber Crime Portal](https://cybercrime.gov.in) — Online FIR filing
- [National Consumer Helpline](https://consumerhelpline.gov.in) — 14404
- [Groq](https://groq.com) — Lightning-fast AI inference

---

## 📄 License

MIT License — © 2026 Resolve.Ai
