import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ExpeditionTier,
  VettingFormData,
  PricingPackage,
  PartnerProfile,
  BlogPost,
  ClientInvoice,
  B2BBriefingBooking,
} from '../types';
import { PRICING_PACKAGES } from '../data/expeditionData';
import { PARTNERS_DATA } from '../data/partnersData';
import { BLOG_POSTS } from '../data/blogData';

export interface CheckoutPayload {
  tier: ExpeditionTier;
  amount: number;
  paymentType: 'tranche_a' | 'full' | 'kyc_fee' | 'wire_invoice' | 'b2b_briefing';
  title: string;
  applicantName?: string;
  applicantEmail?: string;
  applicationId?: string;
  bookingId?: string;
}

interface SiteConfigContextType {
  packages: PricingPackage[];
  partners: PartnerProfile[];
  blogPosts: BlogPost[];
  applications: VettingFormData[];
  briefingBookings: B2BBriefingBooking[];
  activeApplication: VettingFormData | null;
  clientInvoices: ClientInvoice[];
  
  // Modals
  isVettingOpen: boolean;
  setIsVettingOpen: (open: boolean) => void;
  selectedTierForVetting: ExpeditionTier;
  setSelectedTierForVetting: (tier: ExpeditionTier) => void;
  
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutPayload: CheckoutPayload | null;
  triggerCheckout: (payload: CheckoutPayload) => void;

  isClientPortalOpen: boolean;
  setIsClientPortalOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  isB2BBriefingOpen: boolean;
  setIsB2BBriefingOpen: (open: boolean) => void;

  isAdvisorChatOpen: boolean;
  setIsAdvisorChatOpen: (open: boolean) => void;

  selectedPartner: PartnerProfile | null;
  setSelectedPartner: (partner: PartnerProfile | null) => void;

  selectedArticle: BlogPost | null;
  setSelectedArticle: (article: BlogPost | null) => void;

  // Actions
  submitVettingApplication: (data: VettingFormData) => void;
  updateApplicationStatus: (email: string, updates: Partial<VettingFormData>) => void;
  bookB2BBriefing: (booking: Omit<B2BBriefingBooking, 'id' | 'status'>) => B2BBriefingBooking;
  publishBlogPost: (post: BlogPost) => void;
  recordPaymentSuccess: (ref: string, amount: number) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const INITIAL_INVOICES: ClientInvoice[] = [
  {
    id: 'INV-2025-001',
    invoiceNumber: 'UGE/INV/2025/089',
    tier: 'tier-2',
    milestoneTitle: 'Tranche A: Vetting Approval & Security Escort Scheduling (50%)',
    amount: 14000,
    currency: 'USD',
    issueDate: '2025-01-15',
    dueDate: '2025-01-30',
    status: 'PAID',
    paymentMethod: 'SWIFT Wire Transfer (Standard Chartered Bank Uganda)',
  },
  {
    id: 'INV-2025-002',
    invoiceNumber: 'UGE/INV/2025/112',
    tier: 'tier-2',
    milestoneTitle: 'Tranche B: Pre-Deployment Final Clearance & Smelter Pass (50%)',
    amount: 14000,
    currency: 'USD',
    issueDate: '2025-02-01',
    dueDate: '2025-02-14',
    status: 'PENDING',
  },
];

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages] = useState<PricingPackage[]>(PRICING_PACKAGES);
  const [partners] = useState<PartnerProfile[]>(PARTNERS_DATA);

  // Load blog posts with local additions
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('uge_custom_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...BLOG_POSTS];
      }
    } catch (e) {
      console.error(e);
    }
    return BLOG_POSTS;
  });

  // Applications
  const [applications, setApplications] = useState<VettingFormData[]>(() => {
    try {
      const saved = localStorage.getItem('uge_applications');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Seed initial demo institutional application
    return [
      {
        fullName: 'Marcus Vance',
        title: 'Managing Director, Commodities',
        company: 'Apex Bullion Capital Ltd',
        website: 'https://apexbullion.com',
        country: 'United Kingdom',
        email: 'm.vance@apexbullion.com',
        phone: '+44 20 7946 0912',
        tier: 'tier-2',
        objectives: ['Direct refinery physical assay', 'Wagagai underground shaft inspection', 'ICGLR certification compliance'],
        unsolicitedExperience: 'Offered 20% discount on gold via WhatsApp broker claiming to be from Tororo cooperative.',
        targetMonth: 'November 2025',
        delegateCount: 2,
        departureAirport: 'London Heathrow (LHR)',
        closeProtectionRequired: 'Standard MPPU armed tactical convoy',
        idDocumentName: 'passport_vance_uk.pdf',
        idDocumentSize: '2.4 MB',
        idDocumentVerified: true,
        ocrExtractedData: {
          documentNumber: 'UK-994821034',
          issuingCountry: 'United Kingdom',
          expiryDate: '2031-08-14',
          sanctionsCheckStatus: 'CLEARED',
        },
        criminalRecordClearance: true,
        sanctionsDeclarationClearance: true,
        agreedNonTransaction: true,
        agreedPassportVetting: true,
        agreedKycNonRefundable: true,
        digitalSignature: 'Marcus Vance [Biometrically Sealed]',
        signatureDate: '2025-01-10',
        paymentOption: 'tranche_a',
        packagePaid: true,
        paidAmount: 14000,
        depositPaid: true,
        relworxTransactionRef: 'REL-UG-9984128-SEC',
      },
    ];
  });

  const [activeApplication, setActiveApplication] = useState<VettingFormData | null>(() => {
    return applications.length > 0 ? applications[0] : null;
  });

  // Briefing bookings
  const [briefingBookings, setBriefingBookings] = useState<B2BBriefingBooking[]>(() => {
    try {
      const saved = localStorage.getItem('uge_briefings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'B2B-8921',
        clientName: 'Julian Sterling',
        corporateEntity: 'Geneva Commodity Partners SA',
        email: 'j.sterling@genevapartners.ch',
        phone: '+41 22 555 0198',
        preferredDate: '2025-11-15',
        timeSlot: '14:00 GMT+3 (Kampala Time)',
        scopeNotes: 'Forensic review of DRC border transit corridors and legal recourse for $450k hotel escrow loss.',
        status: 'CONFIRMED',
      },
    ];
  });

  const [clientInvoices, setClientInvoices] = useState<ClientInvoice[]>(INITIAL_INVOICES);

  // Modal States
  const [isVettingOpen, setIsVettingOpen] = useState(false);
  const [selectedTierForVetting, setSelectedTierForVetting] = useState<ExpeditionTier>('tier-2');

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPayload, setCheckoutPayload] = useState<CheckoutPayload | null>(null);

  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isB2BBriefingOpen, setIsB2BBriefingOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);

  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  // Save changes
  useEffect(() => {
    localStorage.setItem('uge_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('uge_briefings', JSON.stringify(briefingBookings));
  }, [briefingBookings]);

  const triggerCheckout = (payload: CheckoutPayload) => {
    setCheckoutPayload(payload);
    setIsCheckoutOpen(true);
  };

  const submitVettingApplication = (data: VettingFormData) => {
    const updated = [data, ...applications.filter(a => a.email !== data.email)];
    setApplications(updated);
    setActiveApplication(data);

    // Trigger direct KYC / Tranche A checkout
    triggerCheckout({
      tier: data.tier,
      amount: 1000,
      paymentType: 'kyc_fee',
      title: `${data.tier.toUpperCase()} — Mandatory $1,000 KYC & Intelligence Audit Fee`,
      applicantName: data.fullName,
      applicantEmail: data.email,
    });
  };

  const updateApplicationStatus = (email: string, updates: Partial<VettingFormData>) => {
    const updated = applications.map(app => (app.email === email ? { ...app, ...updates } : app));
    setApplications(updated);
    if (activeApplication?.email === email) {
      setActiveApplication({ ...activeApplication, ...updates });
    }
  };

  const bookB2BBriefing = (booking: Omit<B2BBriefingBooking, 'id' | 'status'>): B2BBriefingBooking => {
    const newBooking: B2BBriefingBooking = {
      ...booking,
      id: `B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'CONFIRMED',
    };
    const updated = [newBooking, ...briefingBookings];
    setBriefingBookings(updated);

    // Prompt checkout for $2,500 advisory briefing
    triggerCheckout({
      tier: 'tier-1',
      amount: 2500,
      paymentType: 'b2b_briefing',
      title: 'Bespoke B2B Strategic Video Briefing (60 Minutes)',
      applicantName: booking.clientName,
      applicantEmail: booking.email,
      bookingId: newBooking.id,
    });

    return newBooking;
  };

  const publishBlogPost = (post: BlogPost) => {
    const updated = [post, ...blogPosts];
    setBlogPosts(updated);
    try {
      const customOnly = updated.filter(p => !BLOG_POSTS.some(orig => orig.id === p.id));
      localStorage.setItem('uge_custom_posts', JSON.stringify(customOnly));
    } catch (e) {
      console.error(e);
    }
  };

  const recordPaymentSuccess = (ref: string, amount: number) => {
    if (checkoutPayload?.applicantEmail) {
      updateApplicationStatus(checkoutPayload.applicantEmail, {
        depositPaid: true,
        paidAmount: amount,
        packagePaid: true,
        relworxTransactionRef: ref,
      });
    }

    // Add invoice record
    const newInvoice: ClientInvoice = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `UGE/REC/${ref.slice(0, 10)}`,
      tier: checkoutPayload?.tier || 'tier-2',
      milestoneTitle: checkoutPayload?.title || 'Direct Package Settlement',
      amount,
      currency: 'USD',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      status: 'PAID',
      paymentMethod: `Relworx Direct Gateway (Ref: ${ref})`,
    };
    setClientInvoices([newInvoice, ...clientInvoices]);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        packages,
        partners,
        blogPosts,
        applications,
        briefingBookings,
        activeApplication,
        clientInvoices,
        isVettingOpen,
        setIsVettingOpen,
        selectedTierForVetting,
        setSelectedTierForVetting,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutPayload,
        triggerCheckout,
        isClientPortalOpen,
        setIsClientPortalOpen,
        isAdminOpen,
        setIsAdminOpen,
        isB2BBriefingOpen,
        setIsB2BBriefingOpen,
        isAdvisorChatOpen,
        setIsAdvisorChatOpen,
        selectedPartner,
        setSelectedPartner,
        selectedArticle,
        setSelectedArticle,
        submitVettingApplication,
        updateApplicationStatus,
        bookB2BBriefing,
        publishBlogPost,
        recordPaymentSuccess,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
