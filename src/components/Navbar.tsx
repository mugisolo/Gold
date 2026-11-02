import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Globe,
  Bot,
  UserCheck,
  Menu,
  X,
  FileCheck2,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SupportedLanguage } from '../types';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const {
    setIsVettingOpen,
    setIsClientPortalOpen,
    setIsAdminOpen,
    setIsAdvisorChatOpen,
  } = useSiteConfig();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'English (EN)',
    ar: 'العربية (AR)',
    zh: '中文 (ZH)',
    fr: 'Français (FR)',
    es: 'Español (ES)',
  };

  const navLinks = [
    { label: t.nav.reality, href: '#reality' },
    { label: t.nav.itinerary, href: '#itinerary' },
    { label: t.nav.tiers, href: '#tiers' },
    { label: t.nav.partners, href: '#partners' },
    { label: t.nav.directorate, href: '#directorate' },
    { label: t.nav.legal, href: '#legal' },
    { label: t.nav.intel, href: '#intel' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D4AF37]/20 bg-[#0B0F17]/95 backdrop-blur-md">
      {/* Top Protocol Security Banner */}
      <div className="bg-[#131B2E] border-b border-[#D4AF37]/15 py-1 px-4 text-xs font-mono text-[#D4AF37]/90 flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mx-auto md:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATUTORY NON-TRANSACTIONAL DISPATCH // CADASTRE PROTOCOL ACTIVE</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px] text-[#94A3B8]">
          <span>MINING & MINERALS ACT 2022</span>
          <span>•</span>
          <span>ICGLR REGIONAL CERTIFICATION</span>
          <span>•</span>
          <span>SECURITY ESCORT: MPPU TACTICAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#D4AF37]/50 flex items-center justify-center p-2 shadow-lg group-hover:border-[#D4AF37] transition-all">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-cinzel text-lg md:text-xl font-bold tracking-wider text-[#FEF3C7] block leading-tight">
                UGANDA GOLD EXPEDITION
              </span>
              <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                Gold Safaris & Expedition
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium text-[#94A3B8]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#FEF3C7] transition-colors py-2 border-b-2 border-transparent hover:border-[#D4AF37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
            {/* AI Cadastre Officer Launcher */}
            <button
              onClick={() => setIsAdvisorChatOpen(true)}
              className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-md text-xs font-mono bg-[#1E293B] hover:bg-[#1E293B]/80 text-[#D4AF37] border border-[#D4AF37]/30 transition-all hover:border-[#D4AF37]"
              title="Launch Gemini AI Cadastre Officer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{t.nav.advisorChat}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-mono bg-[#131B2E] text-[#FEF3C7] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-36 rounded-md bg-[#131B2E] border border-[#D4AF37]/40 shadow-xl py-1 z-50">
                  {(Object.keys(languageLabels) as SupportedLanguage[]).map((langKey) => (
                    <button
                      key={langKey}
                      onClick={() => {
                        setLanguage(langKey);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs font-mono transition-colors ${
                        language === langKey
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold'
                          : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#FEF3C7]'
                      }`}
                    >
                      {languageLabels[langKey]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Portal Button */}
            <button
              onClick={() => setIsClientPortalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#FEF3C7] hover:text-[#D4AF37] transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.nav.clientPortal}</span>
            </button>

            {/* Admin Vault Access */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 rounded-md text-[#94A3B8] hover:text-[#D4AF37] hover:bg-[#131B2E] transition-colors"
              title={t.nav.adminVault}
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Primary Vetting CTA */}
            <button
              onClick={() => setIsVettingOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] hover:brightness-110 shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer font-cinzel"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{t.nav.applyNow}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => setIsAdvisorChatOpen(true)}
              className="p-2 rounded-md bg-[#131B2E] text-[#D4AF37] border border-[#D4AF37]/30"
              title="Cadastre AI"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#FEF3C7] hover:bg-[#131B2E]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-[#D4AF37]/20 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#94A3B8]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded hover:bg-[#1E293B] hover:text-[#FEF3C7]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1E293B] flex flex-wrap gap-2">
            {(Object.keys(languageLabels) as SupportedLanguage[]).map((langKey) => (
              <button
                key={langKey}
                onClick={() => {
                  setLanguage(langKey);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  language === langKey
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                    : 'bg-[#131B2E] text-[#94A3B8]'
                }`}
              >
                {langKey.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1E293B] flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsClientPortalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded bg-[#131B2E] text-[#FEF3C7] text-sm"
            >
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.nav.clientPortal}</span>
            </button>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded bg-[#131B2E] text-[#94A3B8] text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>{t.nav.adminVault}</span>
            </button>
            <button
              onClick={() => {
                setIsVettingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel font-bold text-sm tracking-wide"
            >
              {t.nav.applyNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
