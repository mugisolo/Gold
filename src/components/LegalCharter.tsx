import React from 'react';
import {
  Scale,
  BookOpen,
  FileCheck2,
  ShieldCheck,
  AlertOctagon,
  Building,
  Landmark,
} from 'lucide-react';

export const LegalCharter: React.FC = () => {
  return (
    <section id="legal" className="py-20 md:py-28 bg-[#0F172A] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>STATUTORY JURISPRUDENCE & LEGISLATION</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            Uganda Mining & Minerals Statutory Legal Charter
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            All physical gold trade, smelting, refining, and exportation in Uganda is governed strictly under national statutory legislation and regional international treaties.
          </p>
        </div>

        {/* 4 Core Statutory Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* 1. Mining and Minerals Act 2022 */}
          <div className="bg-[#131B2E] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-[#1E293B] pb-4">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">ACT SUPPLEMENT NO. 7</span>
                <h3 className="font-cinzel text-lg font-bold text-[#FEF3C7]">
                  Mining and Minerals Act 2022
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Enacted to consolidate and reform the law relating to mineral development, replacing the 2003 Act. Mandates domestic value addition (Section 142), establishes the National Mining Company (NMC), and classifies all mineral titles into Large-Scale (LML), Medium-Scale, Artisanal, and Commercial Dealer permits.
            </p>

            <div className="bg-[#0B0F17] p-3.5 rounded-lg border border-[#D4AF37]/15 text-xs font-mono text-[#94A3B8] space-y-1">
              <div className="text-slate-200 font-semibold">Key Statutory Enforcement:</div>
              <div>• Section 142: Strict prohibition on exporting unrefined doré gold without ministerial permit.</div>
              <div>• Section 249: Criminal offense for trading minerals without an authorized DGSM license.</div>
            </div>
          </div>

          {/* 2. 15% State Free-Carried Interest (FCI) */}
          <div className="bg-[#131B2E] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-[#1E293B] pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase block">SOVEREIGN EQUITY CLAUSE</span>
                <h3 className="font-cinzel text-lg font-bold text-[#FEF3C7]">
                  15% State Free-Carried Interest (FCI)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Under Section 18 of the Mining and Minerals Act 2022, the Government of Uganda acquires a mandatory 15% non-dilutable equity stake in all commercial large-scale and medium-scale mining leases upon granting.
            </p>

            <div className="bg-[#0B0F17] p-3.5 rounded-lg border border-[#D4AF37]/15 text-xs font-mono text-[#94A3B8] space-y-1">
              <div className="text-slate-200 font-semibold">Investor Protection Implication:</div>
              <div>• Guarantees sovereign co-alignment and state protection against localized extortion.</div>
              <div>• Validates that all bona-fide industrial operations have formal state representation on their boards.</div>
            </div>
          </div>

          {/* 3. URA Export Levy & ASYCUDA Platform */}
          <div className="bg-[#131B2E] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-[#1E293B] pb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase block">TAXATION & REVENUE CODE</span>
                <h3 className="font-cinzel text-lg font-bold text-[#FEF3C7]">
                  $100/kg URA Export Levy & ASYCUDA
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Export of refined gold carries a statutory levy of $100 per kilogram (or 5% ad valorem on semi-processed lots). Tax assessment is conducted via ASYCUDA World, generating a tamper-evident Payment Registration Number (PRN).
            </p>

            <div className="bg-[#0B0F17] p-3.5 rounded-lg border border-[#D4AF37]/15 text-xs font-mono text-[#94A3B8] space-y-1">
              <div className="text-slate-200 font-semibold">Anti-Corruption Firewall:</div>
              <div>• Zero cash acceptance: All tax must clear into the Bank of Uganda national treasury.</div>
              <div>• Unpaid tax warrants immediate border arrest and seizure by URA Customs Enforcement.</div>
            </div>
          </div>

          {/* 4. ICGLR Regional Certification Mechanism */}
          <div className="bg-[#131B2E] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center space-x-3 rtl:space-x-reverse border-b border-[#1E293B] pb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase block">REGIONAL TREATY OBLIGATION</span>
                <h3 className="font-cinzel text-lg font-bold text-[#FEF3C7]">
                  ICGLR Regional Certification Mechanism
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Pursuant to the Lusaka Declaration, Uganda enforces the Regional Initiative against the Illegal Exploitation of Natural Resources (RINR). All gold for export requires an ICGLR Regional Certificate tracking conflict-free provenance from audited Green-status mine sites.
            </p>

            <div className="bg-[#0B0F17] p-3.5 rounded-lg border border-[#D4AF37]/15 text-xs font-mono text-[#94A3B8] space-y-1">
              <div className="text-slate-200 font-semibold">International Reassurance:</div>
              <div>• Compliant with OECD Due Diligence Guidance and European Union Conflict Minerals Regulation.</div>
              <div>• Guarantees acceptance at LBMA Good Delivery refineries in London, Zurich, and Dubai.</div>
            </div>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="mt-10 bg-red-950/30 border border-red-500/30 rounded-xl p-5 flex items-start space-x-3 rtl:space-x-reverse">
          <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs text-red-200/90 leading-relaxed">
            <strong className="text-red-300 block mb-0.5">Statutory Penal Warning:</strong>
            Foreign nationals arrested attempting to purchase unrefined gold from unlicensed street dealers face immediate detention under Section 249 of the Mining Act, forfeiture of all cash assets, and trial before the Anti-Corruption Division of the High Court of Uganda.
          </div>
        </div>
      </div>
    </section>
  );
};
