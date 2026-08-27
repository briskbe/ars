import type { IconName } from "./iconList";

export type SanityNavLink = { label: string; href: string };
export type SanityCta = { label: string; href: string; style?: "primary" | "secondary" };
export type SanityStat = { value: string; label: string; description?: string };

export type SanityContactItem = {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  description?: string;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  logoUrl?: string;
  navLeft?: SanityNavLink[];
  navRight?: SanityNavLink[];
  phone?: string;
  email?: string;
  address?: string;
  addressLine2?: string;
  mapsUrl?: string;
  mapEmbedUrl?: string;
  hours?: string;
  hoursNote?: string;
  footerTagline?: string;
  footerLinks?: SanityNavLink[];
  whatsappEnabled?: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
  whatsappTagline?: string;
  vcaCertified?: boolean;
};

export type SanityService = {
  _id: string;
  title: string;
  icon: IconName;
  description: string;
};

export type SanityProjectImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type SanityProject = {
  _id: string;
  title: string;
  category: string;
  summary: string;
  description?: string;
  clientName?: string;
  location?: string;
  year?: string;
  highlights?: string[];
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  imageLqip?: string;
  gallery?: SanityProjectImage[];
};

export type RealisatiesPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: SanityCta;
};

export type SanityVacature = {
  _id: string;
  title: string;
  icon: IconName;
  type: string;
  location: string;
  description: string;
  requirements: string[];
};

export type HomePage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroCtas?: SanityCta[];
  stats?: SanityStat[];
  servicesEyebrow?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  aboutBullets?: string[];
  aboutCardTagline?: string;
  aboutCardStats?: SanityStat[];
  whyEyebrow?: string;
  whyTitle?: string;
  whySubtitle?: string;
  reasons?: { title: string; description: string }[];
  jobsBannerTitle?: string;
  jobsBannerText?: string;
  jobsBannerCta?: SanityCta;
  contactEyebrow?: string;
  contactTitle?: string;
  contactSubtitle?: string;
};

export type ContactPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroCtas?: SanityCta[];
  contactCards?: SanityContactItem[];
  formEyebrow?: string;
  formTitle?: string;
  formSubtitle?: string;
  formBullets?: string[];
  serviceOptions?: string[];
  directContactTitle?: string;
  directContactNote?: string;
  mapTitle?: string;
  mapSubtitle?: string;
};

export type VacaturesPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroCtas?: SanityCta[];
  heroStats?: SanityStat[];
  benefitsEyebrow?: string;
  benefitsTitle?: string;
  benefitsSubtitle?: string;
  benefits?: { icon: IconName; title: string; description: string }[];
  listingsEyebrow?: string;
  internalTitle?: string;
  internalSubtitle?: string;
  subcontractorTitle?: string;
  subcontractorSubtitle?: string;
  applyEyebrow?: string;
  applyTitle?: string;
  applySubtitle?: string;
  applyBullets?: string[];
  applyContactTitle?: string;
  applyContactNote?: string;
};
