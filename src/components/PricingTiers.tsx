import React from 'react';
import {
  Check,
  Shield,
  CreditCard,
  Crown,
  FileCheck2,
  AlertCircle,
  Plane,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ExpeditionTier } from '../types';

export const PricingTiers: React.FC = () => {
  const { t } = useLanguage();
  const {
    packages,
    setSelectedTierForVetting,
    setIsVettingOpen,
    triggerCheckout,
  } = useSiteConfig();

  const handleSelectTier = (tierId: ExpeditionTier) => {
    setSelectedTierForVetting(tierId);
    setIsVettingOpen(true);
  };

  const handleInstantDeposit = (tierId: ExpeditionTier, tierName: string) => {
    triggerCheckout({
      tier: tierId,
      amount: 1000,
      paymentType: 'kyc_fee',
      title: `${tierName} — Mandatory $1,000 KYC & Intelligence Audit Fee`,
    });
  };

  return (
    <section id="tiers" className="py-20 md:py-28 bg-[#0F172A] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.pricing.tag}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            {t.pricing.title}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Mandatory $1,000 KYC Notice Banner */}
        <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-r from-[#1E293B] via-[#131B2E] to-[#1E293B] border border-[#D4AF37]/50 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#FEF3C7] tracking-wide uppercase">
                {t.pricing.kycNoticeTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {t.pricing.kycNoticeBody}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-[#D4AF37]">
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Criminal Clearance</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interpol / Sanctions Screening</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Passport Biometric Forensics</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pricing Packages Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#131B2E] via-[#0F172A] to-[#131B2E] border-2 border-[#D4AF37] shadow-2xl gold-glow lg:-translate-y-2'
                    : 'bg-[#131B2E]/80 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                }`}
              >
                {/* Popular Flagship Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md">
                    {t.pricing.popularBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                      {pkg.badge || 'DELEGATION TIER'}
                    </span>
                    {pkg.id === 'tier-3' && <Crown className="w-5 h-5 text-amber-400" />}
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7] mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-[#94A3B8] mb-6 min-h-[36px]">
                    {pkg.targetAudience}
                  </p>

                  {/* Price Header */}
                  <div className="border-y border-[#D4AF37]/20 py-4 mb-6">
                    <div className="flex items-baseline space-x-1 rtl:space-x-reverse">
                      <span className="text-3xl sm:text-4xl font-extrabold font-cinzel text-[#FEF3C7]">
                        {pkg.priceFormatted}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {t.pricing.perHead}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#D4AF37] mt-1">
                      Milestone Invoicing: $1,000 KYC + Tranche A (50%) + Tranche B (50%)
                    </div>
                  </div>

                  {/* Accommodation & Logistics details */}
                  <div className="space-y-2 text-xs font-mono mb-6 bg-[#0B0F17]/60 p-3.5 rounded-lg border border-[#D4AF37]/15">
                    <div className="text-slate-300">
                      <span className="text-[#D4AF37] block font-bold">LODGING:</span>
                      {pkg.accommodation}
                    </div>
                    <div className="text-slate-300 pt-1 border-t border-[#1E293B]">
                      <span className="text-[#D4AF37] block font-bold">TRANSIT:</span>
                      {pkg.transport}
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-mono uppercase text-[#FEF3C7] font-semibold block">
                      Core Key Inclusions:
                    </span>
                    {pkg.keyInclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start space-x-2 rtl:space-x-reverse text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}

                    {pkg.exclusiveFeatures.length > 0 && (
                      <div className="pt-2 border-t border-[#1E293B] space-y-1.5">
                        <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block">
                          Tier Exclusives:
                        </span>
                        {pkg.exclusiveFeatures.map((ex, idx) => (
                          <div key={idx} className="flex items-start space-x-2 rtl:space-x-reverse text-xs text-amber-200">
                            <span className="text-amber-400">★</span>
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-4 border-t border-[#D4AF37]/20">
                  <button
                    onClick={() => handleSelectTier(pkg.id)}
                    className={`w-full py-3 px-4 rounded-lg font-cinzel text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] hover:brightness-110 shadow-lg shadow-[#D4AF37]/25'
                        : 'bg-[#1E293B] text-[#FEF3C7] hover:bg-[#D4AF37] hover:text-[#0B0F17] border border-[#D4AF37]/40'
                    }`}
                  >
                    <span>{t.pricing.applyForTier}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleInstantDeposit(pkg.id, pkg.name)}
                    className="w-full py-2 px-3 text-[11px] font-mono text-[#D4AF37] hover:text-[#FEF3C7] text-center transition-colors underline decoration-dotted"
                  >
                    Fast-Track: Settle $1,000 KYC Fee Directly →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Invoicing Transparency Box */}
        <div className="mt-12 bg-[#131B2E] border border-[#D4AF37]/20 rounded-xl p-5 text-center text-xs font-mono text-[#94A3B8] space-y-2 max-w-3xl mx-auto">
          <div className="text-[#FEF3C7] font-semibold uppercase font-cinzel text-sm">
            Contractual Invoicing & Escrow Protocol
          </div>
          <p>{t.pricing.milestoneA}</p>
          <p>{t.pricing.milestoneB}</p>
          <p className="text-[11px] text-[#64748B]">
            All funds invoiced under corporate agreements with Uganda-registered entities. Compliant with Financial Intelligence Authority (FIA) AML Tier 1 standards.
          </p>
        </div>
      </div>
    </section>
  );
};
