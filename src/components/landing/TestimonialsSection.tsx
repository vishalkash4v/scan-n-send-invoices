import { Card, CardContent } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Small Business Owner",
      company: "Chen's Craft Corner", 
      avatar: "👩‍💼",
      rating: 5,
      text: "InvoiceGen has transformed how I handle billing. The barcode scanning feature saves me hours every week, and my invoices look incredibly professional now."
    },
    {
      name: "Marcus Rodriguez",
      title: "Freelance Consultant",
      company: "Rodriguez Consulting",
      avatar: "👨‍💻", 
      rating: 5,
      text: "I love that everything is stored locally - no monthly fees, no privacy concerns. The export options are perfect for sending invoices to different types of clients."
    },
    {
      name: "Emily Johnson", 
      title: "Retail Store Manager",
      company: "Sunshine Electronics",
      avatar: "👩‍🏪",
      rating: 5,
      text: "The product management system is genius! I can scan barcodes and instantly add items to invoices. It's made our checkout process so much faster."
    },
    {
      name: "David Kim",
      title: "Service Provider", 
      company: "Kim's Repair Services",
      avatar: "👨‍🔧",
      rating: 5,
      text: "Setting up was incredibly easy. Within 10 minutes I had my company logo uploaded and was creating professional invoices. Highly recommended!"
    },
    {
      name: "Lisa Thompson",
      title: "Online Seller",
      company: "Thompson's Treasures",
      avatar: "👩‍💼",
      rating: 5,
      text: "The fact that it works perfectly on mobile is amazing. I can create and send invoices from anywhere, even when I'm at trade shows."
    },
    {
      name: "Alex Rivera",
      title: "Restaurant Owner",
      company: "Rivera's Kitchen",
      avatar: "👨‍🍳",
      rating: 5,
      text: "Perfect for our catering business. We can quickly scan ingredient barcodes, create detailed invoices, and export them immediately for clients."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Businesses" },
    { number: "50,000+", label: "Invoices Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of satisfied users who have streamlined their invoicing process
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <MaterialIcon key={i} name="star" size={16} className="text-yellow-500" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    <div className="text-sm text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-primary border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Them?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Start creating professional invoices today and see why businesses love InvoiceGen.
              </p>
              <button 
                onClick={() => window.location.href = '/admin'}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 inline-flex items-center space-x-2 shadow-lg"
              >
                <MaterialIcon name="trending_up" size={20} />
                <span>Get Started Now</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};