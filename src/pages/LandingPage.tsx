import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { SEOHead } from "@/components/seo/SEOHead";

const LandingPage = () => {
  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "InvoiceGen",
    "description": "Professional invoice generator with smart product management, barcode scanning, and export capabilities",
    "url": "https://invoicegen.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Professional Invoice Creation",
      "Barcode Scanning",
      "Product Management", 
      "Multiple Export Formats",
      "Local Data Storage",
      "Mobile Responsive"
    ],
    "screenshot": "https://invoicegen.com/screenshot.png",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "InvoiceGen"
    }
  };

  return (
    <>
      <SEOHead
        title="Professional Invoice Generator with Barcode Scanning"
        description="Create professional invoices instantly with smart barcode scanning, product management, and multiple export formats. Free invoice generator for businesses of all sizes."
        keywords="invoice generator, barcode scanner, invoice maker, business invoicing, free invoice tool, professional invoices, PDF export, PNG export, invoice templates"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", item: "/" }
        ]}
      />
      
      <div className="min-h-screen">
        <PublicHeader />
        
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;