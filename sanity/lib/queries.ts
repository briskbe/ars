import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title,
    description,
    "logoUrl": logo.asset->url,
    navLeft[]{ label, href },
    navRight[]{ label, href },
    phone, email, address, addressLine2, mapsUrl, mapEmbedUrl,
    hours, hoursNote, footerTagline,
    footerLinks[]{ label, href },
    vcaCertified,
    whatsappEnabled, whatsappNumber, whatsappMessage, whatsappTagline
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc){
    _id, title, icon, description
  }
`;

export const HOME_QUERY = groq`{
  "page": *[_type == "homePage" && _id == "homePage"][0]{
    heroEyebrow, heroTitle, heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    heroCtas[]{ label, href, style },
    stats[]{ value, label, description },
    servicesEyebrow, servicesTitle, servicesSubtitle,
    aboutEyebrow, aboutTitle, aboutParagraphs, aboutBullets,
    aboutCardTagline,
    aboutCardStats[]{ value, label, description },
    whyEyebrow, whyTitle, whySubtitle,
    reasons[]{ title, description },
    jobsBannerTitle, jobsBannerText,
    jobsBannerCta{ label, href, style },
    contactEyebrow, contactTitle, contactSubtitle
  },
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title, description, "logoUrl": logo.asset->url,
    navLeft[]{ label, href },
    navRight[]{ label, href },
    phone, email, address, addressLine2, mapsUrl, hours, hoursNote,
    footerTagline, footerLinks[]{ label, href }, vcaCertified,
    whatsappEnabled, whatsappNumber, whatsappMessage, whatsappTagline
  },
  "services": *[_type == "service"] | order(order asc){
    _id, title, icon, description
  }
}`;

export const CONTACT_QUERY = groq`{
  "page": *[_type == "contactPage" && _id == "contactPage"][0]{
    heroEyebrow, heroTitle, heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    heroCtas[]{ label, href, style },
    contactCards[]{ icon, label, value, href, description },
    formEyebrow, formTitle, formSubtitle, formBullets, serviceOptions,
    directContactTitle, directContactNote,
    mapTitle, mapSubtitle
  },
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title, description, "logoUrl": logo.asset->url,
    navLeft[]{ label, href },
    navRight[]{ label, href },
    phone, email, address, addressLine2, mapsUrl, mapEmbedUrl, hours,
    footerTagline, footerLinks[]{ label, href }, vcaCertified,
    whatsappEnabled, whatsappNumber, whatsappMessage, whatsappTagline
  }
}`;

export const REALISATIES_QUERY = groq`{
  "page": *[_type == "realisatiesPage" && _id == "realisatiesPage"][0]{
    heroEyebrow, heroTitle, heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    ctaEyebrow, ctaTitle, ctaText,
    ctaButton{ label, href, style }
  },
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title, description, "logoUrl": logo.asset->url,
    navLeft[]{ label, href },
    navRight[]{ label, href },
    phone, email, address, addressLine2, mapsUrl, hours, hoursNote,
    footerTagline, footerLinks[]{ label, href }, vcaCertified,
    whatsappEnabled, whatsappNumber, whatsappMessage, whatsappTagline
  },
  "projects": *[_type == "project"] | order(featured desc, order asc){
    _id, title, category, summary, description,
    clientName, location, year, highlights, featured,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "imageLqip": mainImage.asset->metadata.lqip,
    gallery[]{ "url": asset->url, alt, caption }
  }
}`;

export const VACATURES_QUERY = groq`{
  "page": *[_type == "vacaturesPage" && _id == "vacaturesPage"][0]{
    heroEyebrow, heroTitle, heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    heroCtas[]{ label, href, style },
    heroStats[]{ value, label, description },
    benefitsEyebrow, benefitsTitle, benefitsSubtitle,
    benefits[]{ icon, title, description },
    listingsEyebrow, internalTitle, internalSubtitle,
    subcontractorTitle, subcontractorSubtitle,
    applyEyebrow, applyTitle, applySubtitle, applyBullets,
    applyContactTitle, applyContactNote
  },
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title, description, "logoUrl": logo.asset->url,
    navLeft[]{ label, href },
    navRight[]{ label, href },
    phone, email, address, addressLine2, mapsUrl, hours,
    footerTagline, footerLinks[]{ label, href }, vcaCertified,
    whatsappEnabled, whatsappNumber, whatsappMessage, whatsappTagline
  },
  "internalJobs": *[_type == "vacature" && active == true && category == "internal"] | order(order asc){
    _id, title, icon, type, location, description, requirements
  },
  "subcontractorJobs": *[_type == "vacature" && active == true && category == "subcontractor"] | order(order asc){
    _id, title, icon, type, location, description, requirements
  }
}`;
