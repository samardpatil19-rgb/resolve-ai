"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { Smartphone, CreditCard, ShoppingBag, Zap, Bot, MapPin, HelpCircle, Stethoscope, Car, Plane, Wifi, Target, Clock, CheckCircle2, Check, User, LogOut } from "lucide-react";

// Crisis Module Card Component
function CrisisCard({
  title,
  description,
  icon: Icon,
  href,
  features,
  isComingSoon = false,
  delay = "delay-300"
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  features: string[];
  isComingSoon?: boolean;
  delay?: string;
}) {
  return (
    <div className={`glass-card p-6 md:p-8 flex flex-col h-full animate-fade-slide-up ${delay} ${isComingSoon ? 'opacity-60' : ''}`}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-foreground" />
      </div>

      {/* Title with Coming Soon badge */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
        {isComingSoon && <span className="text-xs font-medium px-2 py-1 bg-surface border border-border rounded-full text-secondary">Coming Soon</span>}
      </div>

      {/* Description */}
      <p className="text-secondary mb-5 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-secondary">
            <svg className="w-4 h-4 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {!isComingSoon ? (
        <Link href={href} className="btn-primary text-center w-full">
          Get Started →
        </Link>
      ) : (
        <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">
          Notify Me
        </button>
      )}
    </div>
  );
}

// Auth Button - Dynamic login/user button
function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) {
    return <div className="w-20 h-9 bg-surface animate-pulse rounded-lg hidden md:block" />;
  }

  if (user) {
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    return (
      <div className="relative hidden md:block">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="btn-secondary py-2 px-4 text-sm flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          <span className="max-w-24 truncate">{displayName}</span>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 glass-card border border-border rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm text-muted truncate">{user.email}</p>
            </div>
            <button
              onClick={() => { signOut(); setShowDropdown(false); }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-foreground hover:bg-surface transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-secondary hidden md:block py-2 px-4 text-sm">
      Login
    </Link>
  );
}

// Stats Section with Icons
function StatsSection() {
  const stats = [
    { value: "2 min", label: "Time to First Action", Icon: Zap },
    { value: "24/7", label: "AI Assistance", Icon: Bot },
    { value: "100%", label: "India-Specific", Icon: MapPin },
    { value: "Free", label: "Core Features", Icon: Check },
  ];

  return (
    <div className="stats-card animate-fade-slide-up delay-500">
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <stat.Icon className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-secondary text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Trusted By Section
function TrustedBy() {
  return (
    <div className="animate-fade-slide-up delay-600">
      <p className="text-center text-muted text-sm mb-6">Trusted by users across India</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
        {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"].map((city, i) => (
          <span key={i} className="text-secondary text-sm font-medium">{city}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="gradient-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl nav-blur border-b border-border">
        <div className="container-main flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 animate-fade-slide-down">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">Resolve<span className="text-secondary">.Ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 animate-fade-slide-down delay-100">
            <button onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })} className="text-secondary hover:text-foreground transition-colors text-sm">Modules</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-secondary hover:text-foreground transition-colors text-sm">How It Works</button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-secondary hover:text-foreground transition-colors text-sm">Pricing</button>
          </div>

          <div className="flex items-center gap-3 animate-fade-slide-down delay-200">
            <ThemeToggle />
            <AuthButton />
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary py-2 px-4 text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="container-main text-center">
          {/* Crisis indicator badge */}
          <div className="badge-glass mb-8 animate-fade-slide-up">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-gray-300">Crisis? We&apos;ve got your back 24/7</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-slide-up delay-100">
            From <span className="gradient-text">Panic</span> to <span className="gradient-text">Plan</span>
            <br />
            <span className="text-gray-500">in 2 Minutes</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-slide-up delay-200">
            AI-powered crisis navigation for India. Phone stolen? Bank fraud? E-commerce scam?
            Get step-by-step guidance with priority-based action plans.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-slide-up delay-300">
            <button
              onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              I Need Help Now
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>

          {/* Stats Card */}
          <StatsSection />

          {/* Trusted By */}
          <div className="mt-12">
            <TrustedBy />
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-10">
        <div className="scroll-indicator text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-glow" />

      {/* Modules Section */}
      <section id="modules" className="py-20 md:py-32">
        <div className="container-main">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-slide-up">
              Choose Your <span className="gradient-text-static">Crisis Module</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-fade-slide-up delay-100">
              Select the situation you&apos;re facing. Our AI will guide you through every step with
              India-specific helplines, portals, and procedures.
            </p>
          </div>

          {/* Main modules grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <CrisisCard
              title="Mobile Theft / Loss"
              description="Phone stolen or lost? Block SIM, IMEI, secure bank accounts, and file e-FIR in the right order."
              icon={Smartphone}
              href="/mobile-theft"
              delay="delay-200"
              features={[
                "Remote lock & wipe guide",
                "CEIR IMEI blocking process",
                "State-wise e-FIR portals",
                "UPI & banking security checklist",
                "Social media lockdown steps"
              ]}
            />

            <CrisisCard
              title="UPI / Bank Fraud"
              description="Victim of a scam? Report to your bank within the RBI deadline and maximize your refund chances."
              icon={CreditCard}
              href="/bank-fraud"
              delay="delay-300"
              features={[
                "3-day zero liability rule guide",
                "1930 Cyber Crime helpline",
                "Bank-specific complaint process",
                "Banking Ombudsman escalation",
                "Refund tracking assistance"
              ]}
            />

            <CrisisCard
              title="E-Commerce Fraud"
              description="Empty box? Fake product? Non-delivery? Navigate platform complaints and consumer courts."
              icon={ShoppingBag}
              href="/ecommerce-fraud"
              delay="delay-400"
              features={[
                "Platform-specific complaint guides",
                "National Consumer Helpline (14404)",
                "E-Daakhil consumer forum filing",
                "Chargeback process for cards",
                "Evidence collection checklist"
              ]}
            />

            <CrisisCard
              title="Other Issues"
              description="Don't see your problem listed? Our AI assistant can help you navigate any crisis situation."
              icon={HelpCircle}
              href="/other-issues"
              delay="delay-500"
              features={[
                "AI-powered crisis guidance",
                "Medical emergencies",
                "Property & legal disputes",
                "Employment issues",
                "Custom step-by-step plans"
              ]}
            />
          </div>

          {/* Coming Soon modules */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-secondary mb-2">More Modules Coming Soon</h3>
            <p className="text-muted text-sm">We&apos;re expanding to cover more crisis situations for India</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: Stethoscope, title: "Insurance Claims", desc: "Health, vehicle, life claims" },
              { Icon: Car, title: "Accidents / RTO", desc: "FIR, claim, license issues" },
              { Icon: Plane, title: "Flight Issues", desc: "Delays, cancellations, refunds" },
              { Icon: Wifi, title: "Telecom Issues", desc: "Network, billing disputes" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-5 opacity-50 hover:opacity-70 transition-opacity">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                    <item.Icon className="w-5 h-5 text-muted" />
                  </div>
                  <span className="text-xs font-medium text-muted border border-border rounded-full px-2 py-0.5">Soon</span>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow" />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              How <span className="text-secondary">Resolve.Ai</span> Works
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Three simple steps to navigate any crisis with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Your Crisis",
                description: "Choose the module that matches your situation. Our AI understands the urgency.",
                Icon: Target
              },
              {
                step: "02",
                title: "Enter Time Details",
                description: "Tell us when it happened. We'll prioritize actions based on critical deadlines.",
                Icon: Clock
              },
              {
                step: "03",
                title: "Follow Your Plan",
                description: "Get a prioritized checklist with direct links, helplines, and templates ready to use.",
                Icon: CheckCircle2
              }
            ].map((item, index) => (
              <div key={index} className="glass-card p-8 text-center relative group hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-6">
                  <item.Icon className="w-8 h-8 text-foreground" />
                </div>
                <div className="text-6xl font-bold text-foreground/5 absolute top-4 right-6 group-hover:text-foreground/10 transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow" />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Simple <span className="text-secondary">Pricing</span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Core features are free forever. Upgrade only when you need automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card p-8 hover-lift">
              <div className="text-lg font-medium text-secondary mb-2">Free</div>
              <div className="text-5xl font-bold text-foreground mb-1">₹0</div>
              <div className="text-muted mb-8">Forever free</div>

              <ul className="space-y-4 mb-8">
                {[
                  "Complete step-by-step guides",
                  "Time-based priority checklists",
                  "All government portal links",
                  "Helpline numbers & SMS codes",
                  "Template letters & emails",
                  "Progress tracking"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary">
                    <Check className="w-5 h-5 text-foreground flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-secondary w-full">Get Started Free</button>
            </div>

            {/* Premium Tier */}
            <div className="glass-card p-8 hover-lift relative border-foreground/20">
              <div className="absolute top-6 right-6">
                <span className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-full">
                  RECOMMENDED
                </span>
              </div>

              <div className="text-lg font-medium text-foreground mb-2">Pro</div>
              <div className="text-5xl font-bold text-foreground mb-1">₹199<span className="text-lg font-normal text-secondary">/crisis</span></div>
              <div className="text-muted mb-8">Pay only when you need it</div>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Free",
                  "AI auto-fills complaint forms",
                  "Personalized email drafts",
                  "Pre-filled PDF documents",
                  "Smart follow-up reminders",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary">
                    <Check className="w-5 h-5 text-foreground flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-primary w-full">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-foreground">Resolve<span className="text-secondary">.Ai</span></span>
            </div>

            <div className="text-muted text-sm">
              Made for India | © 2026 Resolve.Ai
            </div>

            <div className="flex items-center gap-6 text-secondary text-sm">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
