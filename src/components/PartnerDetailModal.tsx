import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  MapPin,
  Calendar,
  FileText,
  BadgeCheck,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';
import { PartnerProfile } from '../types';
import { PartnerLogoEmblem } from './PartnerLogoEmblem';
import { useLanguage } from '../i18n/LanguageContext';

interface PartnerDetailModalProps {
  partner: PartnerProfile | null;
  onClose: () => void;
}

export const PartnerDetailModal: React.FC<PartnerDetailModalProps> = ({ partner, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!partner) return null;

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(partner.licenseNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 sm:p-6 flex items-start justify-between z-10">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-14 h-14 rounded-xl bg-[#1E293B] border border-[#D4AF37]/50 flex items-center justify-center p-2.5 shrink-0">
              <PartnerLogoEmblem type={partner.logoType} className="w-10 h-10" name={partner.name} />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase">
                  {partner.categoryLabel}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Official</span>
                </span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
                {partner.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7] hover:bg-red-950/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* License Bar with Instant Copy */}
          <div className="bg-[#0B0F17] border border-[#D4AF37]/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] block font-bold">
                STATUTORY MINING CADASTRE / OPERATING LICENSE NUMBER:
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#FEF3C7] tracking-wider">
                {partner.licenseNumber}
              </span>
            </div>

            <button
              onClick={handleCopyLicense}
              className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-[#1E293B] hover:bg-[#D4AF37] hover:text-[#0B0F17] text-[#D4AF37] border border-[#D4AF37]/40'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.common.copied : t.common.copyLicense}</span>
            </button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#0F172A] p-3 rounded-lg border border-[#D4AF37]/15">
              <span className="text-[#94A3B8] block text-[10px]">GEOGRAPHIC LOCATION:</span>
              <span className="text-slate-200 font-semibold">{partner.location}</span>
            </div>
            <div className="bg-[#0F172A] p-3 rounded-lg border border-[#D4AF37]/15">
              <span className="text-[#94A3B8] block text-[10px]">ESTABLISHED / GAZETTED:</span>
              <span className="text-slate-200 font-semibold">Anno {partner.establishedYear}</span>
            </div>
            <div className="bg-[#0F172A] p-3 rounded-lg border border-[#D4AF37]/15">
              <span className="text-[#94A3B8] block text-[10px]">GPS CADASTRE COORDINATES:</span>
              <span className="text-[#D4AF37] font-semibold">{partner.coordinates || 'Classified Sovereign Grid'}</span>
            </div>
          </div>

          {/* Detailed Narrative Profile */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-bold tracking-wider">
              Statutory Role & Institutional Scope
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-sans bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/20">
              {partner.detailedProfile}
            </p>
          </div>

          {/* Expedition Tactical Role */}
          <div className="bg-[#0B0F17] p-4 rounded-xl border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/20">
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-bold tracking-wider mb-1">
              Field Delegation Operational Mandate
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {partner.expeditionRole}
            </p>
          </div>

          {/* Key Facilities & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/20">
              <h4 className="text-xs font-mono uppercase text-[#FEF3C7] font-bold mb-2 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Key Audited Facilities</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {partner.keyFacilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0F172A] p-4 rounded-xl border border-emerald-500/20">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center space-x-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Statutory Certifications</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {partner.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Desk */}
          <div className="bg-[#0F172A] p-3.5 rounded-lg border border-[#D4AF37]/20 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Official Liaison: {partner.primaryContactDesk}</span>
            </span>
            <span className="text-[#D4AF37]">Republic of Uganda Gazette Indexed</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0F172A] border-t border-[#D4AF37]/20 p-4 sm:p-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#1E293B] hover:bg-[#D4AF37] hover:text-[#0B0F17] text-[#FEF3C7] text-xs font-mono transition-colors"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
