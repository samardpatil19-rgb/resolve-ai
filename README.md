# Resolve.Ai

AI-powered crisis navigation platform for Indian citizens dealing with mobile theft, bank fraud, and e-commerce disputes.

## Overview

Resolve.Ai provides step-by-step guidance for handling common crisis situations in India. Each module offers priority-based checklists, relevant official links, and AI assistance to help users navigate complex reporting and recovery processes.

## Features

### Current Modules

- **Mobile Theft** - IMEI blocking, FIR filing, carrier lockdown procedures
- **Bank Fraud** - UPI fraud, card fraud, phishing, SIM swap, QR code scams with RBI zero-liability guidance
- **E-Commerce Fraud** - Non-delivery, counterfeit products, refund issues, consumer court filing
- **Other Issues** - AI chatbot for miscellaneous crisis situations

### Technical Features

- Priority-based action checklists with progress tracking
- Sub-category selection for tailored guidance
- Dark/Light theme toggle
- AI chat assistant integration (Gemini API)
- User authentication (Google, Email, Phone OTP)
- Responsive design optimized for mobile

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: CSS with glassmorphism design
- **Backend**: Supabase (PostgreSQL, Auth, Row Level Security)
- **AI**: Google Gemini API (planned)
- **Payments**: Razorpay (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resolve-ai.git
cd resolve-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# Located at: supabase/schema.sql
```

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── bank-fraud/       # Bank fraud module
│   ├── mobile-theft/     # Mobile theft module
│   ├── ecommerce-fraud/  # E-commerce module
│   ├── other-issues/     # AI chatbot module
│   ├── login/            # Authentication page
│   └── auth/             # OAuth callback routes
├── components/           # Reusable React components
├── context/              # React context providers
├── data/                 # Module sub-categories and checklists
└── lib/                  # Utility functions and Supabase clients
```

## Roadmap

### Phase 1 (Current)
- Core module implementation
- User authentication
- Sub-category checklists

### Phase 2 (Planned)
- Gemini AI integration for chat
- Progress saving to database
- Premium subscription tier

### Phase 3 (Planned)
- AI-generated complaint letters
- PDF form generation
- WhatsApp/Telegram notifications

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

## License

MIT License

## Acknowledgements

- RBI guidelines for zero-liability framework
- National Consumer Helpline (14404)
- Cyber Crime Portal (cybercrime.gov.in)
