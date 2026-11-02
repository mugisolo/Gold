export type ExpeditionTier = 'tier-1' | 'tier-2' | 'tier-3';
export type PaymentMethod = 'card' | 'momo_mtn' | 'momo_airtel' | 'swift_wire';
export type SupportedLanguage = 'en' | 'ar' | 'zh' | 'fr' | 'es';

export interface VettingFormData {
  fullName: string;
  title: string;
  company: string;
  website: string;
  country: string;
  countryOther?: string;
  email: string;
  phone: string;
  tier: ExpeditionTier;
  objectives: string[];
  unsolicitedExperience: string;
  targetMonth: string;
  delegateCount: number;
  departureAirport?: string;
  closeProtectionRequired?: string;
  
  // Anti-fraud & Document verification
  idDocumentName?: string;
  idDocumentSize?: string;
  idDocumentVerified?: boolean;
  ocrExtractedData?: {
    documentNumber: string;
    issuingCountry: string;
    expiryDate: string;
    sanctionsCheckStatus: 'CLEARED' | 'FLAGGED' | 'VERIFIED';
  };
  criminalRecordClearance: boolean;
  sanctionsDeclarationClearance: boolean;
  
  // Legal agreements
  agreedNonTransaction: boolean;
  agreedPassportVetting: boolean;
  agreedKycNonRefundable?: boolean;
  digitalSignature: string;
  signatureDate: string;

  // Direct Package Settlement
  paymentOption?: 'tranche_a' | 'full' | 'wire_invoice';
  packagePaid?: boolean;
  paidAmount?: number;
  depositPaid?: boolean;
  relworxTransactionRef?: string;
}

export interface PricingPackage {
  id: ExpeditionTier;
  name: string;
  badge?: string;
  targetAudience: string;
  pricePerHead: number;
  priceFormatted: string;
  accommodation: string;
  transport: string;
  keyInclusions: string[];
  exclusiveFeatures: string[];
  isPopular?: boolean;
}

export interface PartnerProfile {
  id: string;
  name: string;
  shortName: string;
  category: 'mines' | 'refineries' | 'regulators' | 'logistics' | 'laboratories';
  categoryLabel: string;
  licenseNumber: string;
  statutoryRole: string;
  location: string;
  region: string;
  establishedYear: number;
  operationalScope: string;
  summary: string;
  detailedProfile: string;
  keyFacilities: string[];
  certifications: string[];
  expeditionRole: string;
  logoType: 'seal' | 'shield' | 'crest' | 'modern' | 'cadastre';
  primaryContactDesk: string;
  coordinates?: string;
}

export interface BlogPost {
  id: string;
  month: 1 | 2 | 3;
  monthTheme: string;
  week: string;
  postingDay: 'Tuesday' | 'Thursday';
  pillar: 'Counter-Fraud' | 'Regulatory' | 'Supply Chain' | 'Lead Gen';
  title: string;
  hook: string;
  readTime: string;
  targetAudience: string;
  coreSummary: string;
  fullArticle: string[];
  statutoryReferences: string[];
  redFlags: string[];
  targetCta: {
    label: string;
    type: 'apply' | 'consultation' | 'checklist' | 'report';
  };
  socialCopy: {
    headline: string;
    body: string;
    hashtags: string[];
  };
  coverImage?: string;
  imageCaption?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  phaseCode: string;
  securityClassification: string;
  title: string;
  location: string;
  coordinates: string;
  summary: string;
  detailedProtocol: string[];
  statutoryAccessPoints: string[];
  forensicHighlights: string[];
}

export interface ExecutiveProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  credentials: string[];
  bio: string;
  securityClearance: string;
  imageFallbackLetter: string;
}

export interface RealityContrastItem {
  id: string;
  dimension: string;
  scamArchitecture: {
    headline: string;
    tactic: string;
    psychologicalTrap: string;
    financialLossRisk: string;
  };
  statutoryChain: {
    statutoryProtocol: string;
    governingAct: string;
    inspectionAccess: string;
    verificationMechanism: string;
  };
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  tier: ExpeditionTier;
  milestoneTitle: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  paymentMethod?: string;
  downloadUrl?: string;
}

export interface VaultDocument {
  id: string;
  title: string;
  category: 'Licensing' | 'Chain of Custody' | 'Taxation & Customs' | 'Assay Protocols' | 'Statutory Laws';
  classification: 'CONFIDENTIAL' | 'RESTRICTED' | 'DIRECTORATE USE' | 'DELEGATE CLEARED';
  fileSize: string;
  effectiveDate: string;
  statutoryRef: string;
  description: string;
}

export interface B2BBriefingBooking {
  id: string;
  clientName: string;
  corporateEntity: string;
  email: string;
  phone: string;
  preferredDate: string;
  timeSlot: string;
  scopeNotes: string;
  status: 'CONFIRMED' | 'PENDING_PAYMENT' | 'COMPLETED';
  calendarEventId?: string;
  tasksId?: string;
}
