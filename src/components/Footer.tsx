import React from 'react';
import {
  Shield,
  Lock,
  PhoneCall,
  Mail,
  MapPin,
  Scale,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setIsVettingOpen, setIsAdminOpen, setIsClientPortalOpen } = useSiteConfig();

  return (
    <footer className="bg-[#080B11] border-t border-[#D4AF37]/25 text-[#94A3B8] font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Institutional Disclaimers Box */}
        <div className="bg-[#0F172A] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono text-[#D4AF37] uppercase font-bold">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
            <span>STATUTORY LEGAL CHARTER & NON-TRANSACTIONAL MANDATE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <strong>Gold Safaris & Expedition</strong> operates exclusively as an educational, forensic due-diligence, and counter-fraud investigative delegation. Under no circumstances does the expedition broker, trade, buy, or sell precious metals, nor hold client capital in escrow for physical gold purchases. All delegation participants are strictly prohibited from engaging in unauthorized street or hotel transactions. Activities are conducted in formal coordination with the Directorate of Geological Survey and Mines (DGSM), the Minerals Police Protection Unit (MPPU), and the Uganda Revenue Authority (URA) under the <em>Mining and Minerals Act 2022</em> of the Republic of Uganda.
          </p>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-lg bg-[#131B2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-base font-bold text-[#FEF3C7] block">
                  UGANDA GOLD EXPEDITION
                </span>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">
                  Gold Safaris & Expedition
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              The world's only hands-on anti-fraud & due-diligence expedition across East Africa's gold trade architecture.
            </p>

            <div className="text-[11px] font-mono text-[#D4AF37] space-y-1">
              <div>Cadastre Registry: AMBER-MEMD-041</div>
              <div>Escort: MPPU Armed Tactical Command</div>
            </div>
          </div>

          {/* Col 2: Navigation & Sections */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-cinzel text-sm font-bold text-[#FEF3C7] uppercase">
              Field Protocols
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><a href="#reality" className="hover:text-[#D4AF37] transition-colors">Market Reality Matrix</a></li>
              <li><a href="#itinerary" className="hover:text-[#D4AF37] transition-colors">7-Day Tactical Timeline</a></li>
              <li><a href="#tiers" className="hover:text-[#D4AF37] transition-colors">Delegation Pricing Tiers</a></li>
              <li><a href="#partners" className="hover:text-[#D4AF37] transition-colors">Statutory Partners Directory</a></li>
              <li><a href="#directorate" className="hover:text-[#D4AF37] transition-colors">Executive Directorate Bios</a></li>
              <li><a href="#legal" className="hover:text-[#D4AF37] transition-colors">Mining Act 2022 Legal Charter</a></li>
              <li><a href="#intel" className="hover:text-[#D4AF37] transition-colors">Counter-Fraud Knowledge Base</a></li>
            </ul>
          </div>

          {/* Col 3: Institutional Authority & Registry */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-cinzel text-sm font-bold text-[#FEF3C7] uppercase">
              Statutory Authorities
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>Directorate of Geological Survey & Mines (DGSM)</li>
              <li>Ministry of Energy & Mineral Development (MEMD)</li>
              <li>Uganda Revenue Authority (URA) Customs</li>
              <li>Minerals Police Protection Unit (MPPU)</li>
              <li>Uganda Free Zones Authority (UFZA)</li>
              <li>Great Lakes Region Certification (ICGLR)</li>
              <li>Uganda National Bureau of Standards (UNBS)</li>
            </ul>
          </div>

          {/* Col 4: Secretariat & Emergency Contacts */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-cinzel text-sm font-bold text-[#FEF3C7] uppercase">
              Secretariat Command
            </h4>
            <div className="space-y-2 text-[#94A3B8]">
              <div className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Lake Victoria Serena Golf Resort & Amber House, Kampala, Republic of Uganda</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Escort Dispatch: +256 414 340 000</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>vetting@ugandagoldexpedition.org</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsClientPortalOpen(true)}
                className="px-3 py-1 rounded bg-[#131B2E] text-[#FEF3C7] hover:text-[#D4AF37] text-[11px] border border-[#D4AF37]/30"
              >
                Client Portal
              </button>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3 py-1 rounded bg-[#131B2E] text-[#94A3B8] hover:text-[#D4AF37] text-[11px] border border-[#D4AF37]/30"
              >
                Admin Vault
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security Signature */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#64748B] gap-4">
          <div>
            © {new Date().getFullYear()} Uganda Gold Expedition • Gold Safaris & Expedition Directorate Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-[11px]">
            <span>STRICT NON-TRANSACTIONAL CHARTER</span>
            <span>•</span>
            <span>256-BIT ENCRYPTED</span>
            <span>•</span>
            <span>MINING ACT 2022 COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
