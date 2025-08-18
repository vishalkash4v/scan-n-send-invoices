import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";

const About = () => {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      avatar: "👨‍💼",
      description: "10+ years in fintech and business automation"
    },
    {
      name: "Sarah Chen", 
      role: "Lead Developer",
      avatar: "👩‍💻",
      description: "Expert in web technologies and user experience"
    },
    {
      name: "Marcus Rivera",
      role: "Product Manager", 
      avatar: "👨‍🎯",
      description: "Specialist in small business solutions"
    }
  ];

  const values = [
    {
      icon: "security",
      title: "Privacy First",
      description: "Your data stays on your device. We believe in complete user privacy and data ownership."
    },
    {
      icon: "speed",
      title: "Simplicity",
      description: "Complex features made simple. We focus on intuitive design and effortless user experience."
    },
    {
      icon: "handshake",
      title: "Accessibility",
      description: "Free for everyone. Professional tools shouldn't be limited by expensive subscriptions."
    },
    {
      icon: "eco", 
      title: "Sustainability",
      description: "Digital-first approach reduces paper waste while maintaining professional standards."
    }
  ];

  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">About InvoiceGen</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We're on a mission to democratize professional invoicing for businesses of all sizes. 
              Built by entrepreneurs, for entrepreneurs.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    InvoiceGen was born from frustration. As small business owners ourselves, 
                    we were tired of expensive invoicing software with monthly fees, complex setups, 
                    and privacy concerns.
                  </p>
                  <p>
                    We believed there had to be a better way - a solution that was free, 
                    private, and powerful enough for modern businesses. So we built it.
                  </p>
                  <p>
                    Today, InvoiceGen serves thousands of businesses worldwide, from freelancers 
                    to retail stores, all creating professional invoices without the overhead 
                    of traditional solutions.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary/10 rounded-lg p-6">
                  <MaterialIcon name="lightbulb" size={32} className="text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">The Idea</h3>
                  <p className="text-muted-foreground text-sm">
                    Professional invoicing should be accessible to everyone, regardless of business size or budget.
                  </p>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-6">
                  <MaterialIcon name="build" size={32} className="text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">The Solution</h3>
                  <p className="text-muted-foreground text-sm">
                    A web-based tool that works offline, respects privacy, and delivers enterprise-grade features for free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <MaterialIcon name={value.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet the Team</h2>
              <p className="text-xl text-muted-foreground">
                The people behind InvoiceGen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join the thousands of businesses already using InvoiceGen to streamline their invoicing process.
            </p>
            <button 
              onClick={() => window.location.href = '/admin'}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 inline-flex items-center space-x-2 text-lg"
            >
              <MaterialIcon name="rocket_launch" size={24} />
              <span>Start Creating Invoices</span>
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;