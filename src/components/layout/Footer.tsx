import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/ui/material-icon";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "How it Works", href: "/#how-it-works" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" }
      ]
    },
    {
      title: "Company", 
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Support", href: "/contact" },
        { label: "Admin Panel", href: "/admin" },
        { label: "Blog", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: "link", href: "#", label: "Website" },
    { icon: "mail", href: "mailto:hello@invoicegen.com", label: "Email" },
    { icon: "phone", href: "tel:+1234567890", label: "Phone" }
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <MaterialIcon name="receipt" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">InvoiceGen</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Professional invoice generation with smart product management and barcode scanning capabilities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <MaterialIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} InvoiceGen. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <MaterialIcon name="favorite" className="text-red-500" size={16} />
            <span className="text-sm text-muted-foreground">for businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
};