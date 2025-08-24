import { useState } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import { toast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact InvoiceGen",
    "description": "Get in touch with InvoiceGen support team for help with invoice generation, technical support, and business inquiries.",
    "url": "https://invoicegen.com/contact"
  };

  const contactInfo = [
    {
      icon: "mail",
      title: "Email Us",
      description: "Get in touch with our team",
      contact: "hello@invoicegen.com",
      link: "mailto:hello@invoicegen.com"
    },
    {
      icon: "support_agent",
      title: "Support",
      description: "Need help? We're here for you",
      contact: "24/7 Support Available",
      link: "#"
    },
    {
      icon: "schedule",
      title: "Response Time",
      description: "We typically respond within",
      contact: "2-4 hours",
      link: "#"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact Us - Get Support & Help"
        description="Contact InvoiceGen support team for help with invoice generation, technical support, and business inquiries. We're here to help you succeed."
        keywords="contact support, invoice help, technical support, customer service, business inquiries"
        structuredData={contactSchema}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" }
        ]}
      />
      
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' }
            ]} 
          />
        </div>
        
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">
              Have questions about InvoiceGen? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <MaterialIcon name={info.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{info.description}</p>
                    <a 
                      href={info.link}
                      className="text-primary font-medium hover:underline"
                    >
                      {info.contact}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you have questions about features, need technical support, 
                  or want to share feedback, we're here to help. Fill out the form 
                  and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MaterialIcon name="schedule" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Quick Response</h4>
                      <p className="text-muted-foreground text-sm">We respond to all inquiries within 2-4 hours during business days.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MaterialIcon name="support_agent" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Expert Support</h4>
                      <p className="text-muted-foreground text-sm">Our team has deep knowledge of business invoicing and can help with any question.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MaterialIcon name="security" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Privacy Focused</h4>
                      <p className="text-muted-foreground text-sm">Your information is secure and will only be used to respond to your inquiry.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MaterialIcon name="send" className="text-primary" />
                    <span>Contact Form</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Tell us how we can help..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" variant="hero" className="w-full">
                      <MaterialIcon name="send" size={20} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Looking for Quick Answers?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Check out our FAQ section for instant answers to common questions.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/#faq'}
              className="inline-flex items-center space-x-2"
            >
              <MaterialIcon name="help" size={20} />
              <span>View FAQ</span>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;