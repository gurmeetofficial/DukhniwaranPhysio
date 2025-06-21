import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: object;
}

export function SEOHead({
  title = "Best Physiotherapy Clinic in Panipat | Dukhniwaran Physiotherapy Center",
  description = "Expert physiotherapy services in Panipat. Specializing in cupping therapy, dry needling, IASTM, sciatica treatment, frozen shoulder, and postural correction. Book appointment today!",
  keywords = "physiotherapy Panipat, physiotherapist near me, cupping therapy Panipat, dry needling Panipat, IASTM therapy, sciatica treatment, frozen shoulder treatment, tennis elbow therapy, postural correction, hijama therapy Panipat, best physiotherapy clinic Panipat, sports injury treatment, back pain relief Panipat",
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  schema
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateOrCreateMeta = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('robots', 'index, follow');
    updateOrCreateMeta('author', 'Dukhniwaran Physiotherapy');
    updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateOrCreateMeta('', ogTitle || title, 'og:title');
    updateOrCreateMeta('', ogDescription || description, 'og:description');
    updateOrCreateMeta('', ogImage, 'og:image');
    updateOrCreateMeta('', 'website', 'og:type');
    updateOrCreateMeta('', window.location.href, 'og:url');
    updateOrCreateMeta('', 'Dukhniwaran Physiotherapy', 'og:site_name');

    // Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', ogTitle || title);
    updateOrCreateMeta('twitter:description', ogDescription || description);
    updateOrCreateMeta('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Structured data
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // Keep meta tags for better SEO, only clean up structured data
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataScript && schema) {
        document.head.removeChild(structuredDataScript);
      }
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, schema]);

  return null;
}

// Predefined structured data schemas
export const getBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Dukhniwaran Physiotherapy",
  "description": "Professional physiotherapy clinic specializing in traditional and modern treatment methods",
  "url": window.location.origin,
  "telephone": "+91-9876543210",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Health Street",
    "addressLocality": "Panipat",
    "addressRegion": "Haryana",
    "postalCode": "132103",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "29.3909",
    "longitude": "76.9635"
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-14:00"
  ],
  "priceRange": "₹800-₹1800",
  "medicalSpecialty": ["Physiotherapy", "Sports Medicine", "Pain Management"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Physiotherapy Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": "Cupping Therapy"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": "Dry Needling"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy", 
          "name": "IASTM Therapy"
        }
      }
    ]
  }
});

export const getArticleSchema = (title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Dukhniwaran Physiotherapy"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dukhniwaran Physiotherapy"
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString()
});