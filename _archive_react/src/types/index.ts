/**
 * @intent Enterprise TypeScript interfaces and type definitions for Goobit Homepage SSOT
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

export type NavigationMenuId = 'company' | 'products' | 'services' | 'news' | 'contact';

export interface CardNewsSlide {
  slideNumber: number;
  badge?: string;
  headline: string;
  subheadline?: string;
  description: string;
  keyPoints?: string[];
  statCallout?: {
    value: string;
    label: string;
  };
  bgGradient: string;
  accentColor: 'amber' | 'cyan' | 'blue' | 'emerald';
}

export interface CardNewsItem {
  id: string;
  category: 'press' | 'tech' | 'culture';
  categoryLabel: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  cardCount: number;
  coverGradient: string;
  tags: string[];
  views: number;
  author: string;
  slides: CardNewsSlide[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  description: string;
  badge?: string;
  anchor?: string;
}

export interface MainMenuItem {
  id: NavigationMenuId;
  label: string;
  englishLabel: string;
  subItems: SubMenuItem[];
}

export interface LegalInfo {
  companyName: string;
  ceoName: string;
  businessRegistrationNumber: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  privacyManager: string;
  copyrightYear: number;
}

export interface CompanyOverview {
  slogan: string;
  subSlogan: string;
  establishedDate: string;
  employeeCount: string;
  businessScope: string[];
}

export interface HistoryMilestone {
  year: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  registrationNumber: string;
  category: 'copyright' | 'patent' | 'venture' | 'quality';
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  badge?: string;
  features: {
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  targetUsers: string[];
  keyReference: string;
}

export interface ServiceDomain {
  id: string;
  title: string;
  englishTitle: string;
  shortDesc: string;
  fullDesc: string;
  coreCompetencies: string[];
  majorClients: string[];
  techStack: string[];
}

export interface CaseStudyItem {
  id: string;
  client: string;
  category: 'public' | 'telecom' | 'education' | 'culture';
  categoryLabel: string;
  projectTitle: string;
  period: string;
  description: string;
  keyOutcomes: string[];
  techHighlights: string[];
}

export interface InquiryFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceCategory: string;
  budgetRange: string;
  projectPeriod: string;
  message: string;
  privacyAgreed: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
