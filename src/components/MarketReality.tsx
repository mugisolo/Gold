import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Scale,
  Flame,
  ShieldCheck,
  Building,
  FileX,
  FileCheck2,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { MARKET_REALITY_MATRIX } from '../data/expeditionData';
import { useSiteConfig } from '../context/SiteConfigContext';

export const MarketReality: React.FC = () => {
  const { t } = useLanguage();
  const { setIsAdvisorChatOpen } = useSiteConfig();
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>(MARKET_REALITY_MATRIX[0].id);

  const activeItem = MARKET_REALITY_MATRIX.find((item) => item.id === selectedDimensionId) || MARKET_REALITY_MATRIX[0];

  return (
    <section id="reality" className="py-20 md:py-28 bg-[#0F172A] border-y border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-400 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>{t.reality.tag}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            {t.reality.title}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.reality.description}
          </p>
        </div>

        {/* Tactical Dimension Selector Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {MARKET_REALITY_MATRIX.map((item) => {
            const isSelected = item.id === selectedDimensionId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDimensionId(item.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center space-x-2 rtl:space-x-reverse ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'bg-[#131B2E] text-[#94A3B8] hover:text-[#FEF3C7] hover:bg-[#1E293B] border border-[#D4AF37]/20'
                }`}
              >
                <span>{item.dimension}</span>
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Contrast Stage */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* THE SCAM ARCHITECTURE (RED PANEL) */}
          <div className="bg-gradient-to-br from-[#1A1215] to-[#0F172A] border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                    <FileX className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase block">
                      STREET & HOTEL DECEPTION
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-red-200">
                      {activeItem.scamArchitecture.headline}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-red-950 text-[10px] font-mono text-red-400 border border-red-800">
                  CRITICAL FRAUD
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-red-300 font-semibold mb-1 flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    <span>The Physical Scam Execution</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#0B0F17]/60 p-3.5 rounded-lg border border-red-900/30">
                    {activeItem.scamArchitecture.tactic}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold mb-1">
                    Psychological Manipulation Trap
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed bg-amber-950/20 p-3.5 rounded-lg border border-amber-900/30">
                    {activeItem.scamArchitecture.psychologicalTrap}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30">
                  <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">
                    Institutional Financial Risk:
                  </span>
                  <span className="text-sm text-red-200 font-medium">
                    {activeItem.scamArchitecture.financialLossRisk}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-900/40 flex items-center justify-between text-xs font-mono text-red-400">
              <span>UNREGULATED STREET VECTOR</span>
              <span>RISK SCORE: 100% FORFEITURE</span>
            </div>
          </div>

          {/* THE STATUTORY INSTITUTIONAL CHAIN (GOLD PANEL) */}
          <div className="bg-gradient-to-br from-[#131B2E] to-[#0B0F17] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden gold-glow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                      STATUTORY GOVERNANCE
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FEF3C7]">
                      {activeItem.statutoryChain.statutoryProtocol}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[10px] font-mono text-[#FEF3C7] border border-[#D4AF37]/50">
                  100% STATUTORY AUDITED
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-semibold mb-1 flex items-center space-x-1">
                    <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Inspection Protocol & Facility Access</span>
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-[#0B0F17]/80 p-3.5 rounded-lg border border-[#D4AF37]/30">
                    {activeItem.statutoryChain.inspectionAccess}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-1 flex items-center space-x-1">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Statutory Law & Authority</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-900/30">
                    {activeItem.statutoryChain.governingAct}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40">
                  <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold block mb-1">
                    Independent Verification Mechanism:
                  </span>
                  <span className="text-sm text-[#FEF3C7] font-medium">
                    {activeItem.statutoryChain.verificationMechanism}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
              <span>REPUBLIC OF UGANDA CADASTRE</span>
              <span>LEGAL TITLE GUARANTEED</span>
            </div>
          </div>
        </div>

        {/* AI Forensic Advisor Assist Banner */}
        <div className="mt-10 bg-[#131B2E] border border-[#D4AF37]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse text-left">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FEF3C7]">
                Have you received an unsolicited gold offer on WhatsApp or LinkedIn?
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Upload the documents or WhatsApp messages into our Gemini Cadastre AI Officer for instant forensic triage.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdvisorChatOpen(true)}
            className="shrink-0 px-4 py-2.5 rounded-md bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            Launch Instant Forensic Check →
          </button>
        </div>
      </div>
    </section>
  );
};
