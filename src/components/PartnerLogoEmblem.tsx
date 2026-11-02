import React from 'react';

interface PartnerLogoEmblemProps {
  type: 'seal' | 'shield' | 'crest' | 'modern' | 'cadastre';
  className?: string;
  name?: string;
}

export const PartnerLogoEmblem: React.FC<PartnerLogoEmblemProps> = ({ type, className = 'w-12 h-12', name }) => {
  switch (type) {
    case 'cadastre':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
          <circle cx="32" cy="32" r="30" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" stroke="#D4AF37" strokeWidth="1.5" />
          <polygon points="32,14 48,46 16,46" stroke="#D4AF37" strokeWidth="2" fill="rgba(212,175,55,0.1)" />
          <circle cx="32" cy="32" r="4" fill="#D4AF37" />
          <line x1="32" y1="6" x2="32" y2="58" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="6" y1="32" x2="58" y2="32" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      );
    case 'seal':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
          <circle cx="32" cy="32" r="28" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="22" stroke="#996515" strokeWidth="1.5" />
          <path d="M32 16L36 26H46L38 32L41 42L32 36L23 42L26 32L18 26H28L32 16Z" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="6" fill="#D4AF37" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
          <path
            d="M32 8L52 16V34C52 46 43 54 32 58C21 54 12 46 12 34V16L32 8Z"
            stroke="#D4AF37"
            strokeWidth="2.5"
            fill="rgba(212,175,55,0.12)"
          />
          <path d="M32 14L46 20V33C46 42 39 48 32 51C25 48 18 42 18 33V20L32 14Z" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M28 32L32 24L36 32H28Z" fill="#D4AF37" />
          <line x1="32" y1="24" x2="32" y2="44" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      );
    case 'crest':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
          <circle cx="32" cy="32" r="26" stroke="#D4AF37" strokeWidth="2" />
          <path d="M20 44V24L32 16L44 24V44L32 40L20 44Z" stroke="#D4AF37" strokeWidth="2" fill="rgba(212,175,55,0.15)" />
          <circle cx="32" cy="28" r="3" fill="#D4AF37" />
          <path d="M24 38L32 34L40 38" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      );
    case 'modern':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
          <rect x="8" y="8" width="48" height="48" rx="10" stroke="#D4AF37" strokeWidth="2" fill="rgba(212,175,55,0.08)" />
          <path d="M20 40L32 20L44 40" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="34" x2="40" y2="34" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="32" cy="18" r="2.5" fill="#D4AF37" />
        </svg>
      );
  }
};
