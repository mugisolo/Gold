import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Download,
  Building2,
  FileCheck,
  CreditCard,
  Lock,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setIsVettingOpen, setIsAdvisorChatOpen } = useSiteConfig();

  const handleDownloadDossier = () => {
    // Generate simulated instant download of the Official Protocol Dossier
    const blob = new Blob(
      [
        `UGANDA GOLD EXPEDITION — OFFICIAL PROTOCOL DOSSIER (EXECUTIVE COPY)
================================================================================
CLASSIFICATION: RESTRICTED INSTITUTIONAL DUE DILIGENCE BRIEFING
GOVERNING STATUTES: Mining and Minerals Act 2022 (Republic of Uganda)
COGNIZANT AUTHORITIES: DGSM Entebbe, URA Customs, Minerals Police Protection Unit (MPPU)

1. NON-TRANSACTIONAL MANDATE:
   Gold Safaris & Expedition operates exclusively as an educational, investigative delegation.
   We do NOT broker, trade, buy, or sell precious metals.
   Any street offers or hotel-suite smelting propositions presented to delegates are prohibited.

2. VERIFIED STATUTORY SITES:
   - Wagagai Mining (U) Limited: Large Scale Mining Lease LML-0023 (Busia District)
   - African Gold Refinery (AGR): Entebbe Free Zones Authority Mineral Refinery ML-4819
   - Victoria Gold Star Refinery: License REF-UG-2019-0112 (Kampala Industrial Area)
   - Directorate of Geological Survey & Mines (DGSM): National Mining Cadastre, Amber House
   - Directorate Geochemical Laboratories: ISO/IEC 17025 Reference Testing
   - Uganda Revenue Authority (URA) Customs: Entebbe International Airport Bonded Cargo Bay
   - Brink's Global Services & DAS Cargo: Secured Armored Tarmac Hand-off

3. STATUTORY TAX & EXPORT FORMALITIES:
   - Standard Export Levy: $100 per kilogram (or 5% ad valorem assessment)
   - Settlement: Strictly via URA ASYCUDA Payment Registration Number (PRN) to Bank of Uganda
   - ICGLR Regional Certificate: Mandatory green-status mine tracking for conflict-free verification.

4. EXPEDITION ENROLLMENT:
   Requires mandatory $1,000 KYC background screening, credited toward Tranche A milestone invoice upon clearance.
   
Issued by Directorate Executive Secretariat, Kampala, Republic of Uganda.`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Uganda_Gold_Expedition_Statutory_Dossier_2025.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-[#0B0F17]">
      {/* Background Decorative Grid and Gold Glow Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.18),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#D4AF37]/10 via-[#0B0F17]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Security Classification Badge */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full gold-badge text-xs font-mono text-[#D4AF37] tracking-wider uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FEF3C7] leading-tight md:leading-[1.15]">
            {t.hero.headline}{' '}
            <span className="gold-gradient-text block mt-1 sm:mt-2">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto font-normal leading-relaxed">
            {t.hero.subheadline}
          </p>

          {/* Strict Non-Transactional Charter Callout Box */}
          <div className="my-8 text-left bg-gradient-to-r from-[#131B2E] via-[#0F172A] to-[#131B2E] border border-[#D4AF37]/35 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] shrink-0 mt-0.5">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#FEF3C7] tracking-wide uppercase">
                    {t.hero.nonTransactionalNotice}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                    {t.hero.nonTransactionalDetail}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdvisorChatOpen(true)}
                className="shrink-0 text-xs font-mono text-[#D4AF37] hover:text-[#FEF3C7] flex items-center space-x-1 underline decoration-dotted"
              >
                <span>Ask Cadastre AI Officer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Direct Settlement Callout Notice */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#D4AF37]/90 pt-1">
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-[#131B2E]/90 px-3 py-1.5 rounded-md border border-[#D4AF37]/20">
              <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Direct Settlement: Visa & Mastercard</span>
            </div>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-[#131B2E]/90 px-3 py-1.5 rounded-md border border-[#D4AF37]/20">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>MTN & Airtel MoMo (East Africa)</span>
            </div>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-[#131B2E]/90 px-3 py-1.5 rounded-md border border-[#D4AF37]/20">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>SWIFT IBAN Escrow Invoicing</span>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsVettingOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel font-bold text-sm tracking-wider uppercase hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>{t.hero.applyBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={handleDownloadDossier}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-lg bg-[#131B2E] hover:bg-[#1E293B] text-[#FEF3C7] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-sm font-medium transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.dossierBtn}</span>
            </button>
          </div>

          {/* Statutory Assurance Footer line */}
          <p className="text-xs font-mono text-[#64748B] pt-2">
            {t.hero.statutoryAssurance}
          </p>
        </div>

        {/* 4 Quantitative Credibility Pillars */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="bg-[#131B2E]/70 border border-[#D4AF37]/25 rounded-xl p-5 hover:border-[#D4AF37] transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#FEF3C7]">100%</div>
            <div className="text-xs font-mono text-[#D4AF37] mt-1 uppercase">Non-Transactional Charter</div>
            <p className="text-xs text-[#94A3B8] mt-1.5">Zero brokerage, zero street trading, zero illicit escrow exposure.</p>
          </div>

          <div className="bg-[#131B2E]/70 border border-[#D4AF37]/25 rounded-xl p-5 hover:border-[#D4AF37] transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#FEF3C7]">8 Licensed</div>
            <div className="text-xs font-mono text-[#D4AF37] mt-1 uppercase">Statutory Entities</div>
            <p className="text-xs text-[#94A3B8] mt-1.5">LML-0023, ML-4819, DGSM Amber House, URA Customs & MPPU Command.</p>
          </div>

          <div className="bg-[#131B2E]/70 border border-[#D4AF37]/25 rounded-xl p-5 hover:border-[#D4AF37] transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#FEF3C7]">7 Tactical Days</div>
            <div className="text-xs font-mono text-[#D4AF37] mt-1 uppercase">Mine Shaft to Airside</div>
            <p className="text-xs text-[#94A3B8] mt-1.5">300m underground descent, induction chlorination, and tarmac loading.</p>
          </div>

          <div className="bg-[#131B2E]/70 border border-[#D4AF37]/25 rounded-xl p-5 hover:border-[#D4AF37] transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#FEF3C7]">$1,000 KYC</div>
            <div className="text-xs font-mono text-[#D4AF37] mt-1 uppercase">Credited Audit Fee</div>
            <p className="text-xs text-[#94A3B8] mt-1.5">Sanctions screening, criminal clearance, credited directly toward Tranche A.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
