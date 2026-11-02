import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketReality } from './components/MarketReality';
import { ItineraryPipeline } from './components/ItineraryPipeline';
import { PricingTiers } from './components/PricingTiers';
import { PartnersSection } from './components/PartnersSection';
import { ExecutiveLeadership } from './components/ExecutiveLeadership';
import { B2BAdvisorySection } from './components/B2BAdvisorySection';
import { LegalCharter } from './components/LegalCharter';
import { BlogSection } from './components/BlogSection';
import { NewsletterSubscription } from './components/NewsletterSubscription';
import { Footer } from './components/Footer';

// Modals
import { VettingForm } from './components/VettingForm';
import { RelworxCheckoutModal } from './components/RelworxCheckoutModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ForensicAdvisorChatModal } from './components/ForensicAdvisorChatModal';

const AppContent: React.FC = () => {
  const {
    isVettingOpen,
    setIsVettingOpen,
    isClientPortalOpen,
    setIsClientPortalOpen,
    isAdminOpen,
    setIsAdminOpen,
    isAdvisorChatOpen,
    setIsAdvisorChatOpen,
  } = useSiteConfig();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#94A3B8] selection:bg-[#D4AF37]/30 selection:text-[#FEF3C7]">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main>
        {/* Presidential Protocol Hero Banner */}
        <Hero />

        {/* Scam vs Statutory Reality Matrix */}
        <MarketReality />

        {/* Tactical 7-Day Deployment Itinerary */}
        <ItineraryPipeline />

        {/* Expedition Delegation Packages & Milestone Billing */}
        <PricingTiers />

        {/* Verified Statutory Operators & Cadastre Directory */}
        <PartnersSection />

        {/* Directorate Deans & Senior Cadastre Counsel */}
        <ExecutiveLeadership />

        {/* Bespoke 60-Min B2B Strategic Briefing Section */}
        <B2BAdvisorySection />

        {/* Mining & Minerals Act 2022 Legal Charter */}
        <LegalCharter />

        {/* Counter-Fraud Intelligence Knowledge Base */}
        <BlogSection />

        {/* Monthly Institutional Newsletter Subscription */}
        <NewsletterSubscription />
      </main>

      {/* Disclaimers & Secretariat Footer */}
      <Footer />

      {/* Interactive Operational Modals */}
      <VettingForm
        isOpen={isVettingOpen}
        onClose={() => setIsVettingOpen(false)}
      />

      <RelworxCheckoutModal />

      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
      />

      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <ForensicAdvisorChatModal
        isOpen={isAdvisorChatOpen}
        onClose={() => setIsAdvisorChatOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <SiteConfigProvider>
        <AppContent />
      </SiteConfigProvider>
    </LanguageProvider>
  );
}
