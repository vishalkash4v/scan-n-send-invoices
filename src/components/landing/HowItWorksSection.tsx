import { Card, CardContent } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: "business",
      title: "Set Up Your Company",
      description: "Add your company details, logo, and branding information. This only needs to be done once and will be used for all your invoices.",
      features: ["Upload company logo", "Add business information", "Set tax details"]
    },
    {
      step: "02", 
      icon: "inventory_2",
      title: "Manage Your Products",
      description: "Add products manually or scan barcodes to build your inventory. Include prices, descriptions, and organize everything efficiently.",
      features: ["Manual product entry", "Barcode scanning", "Price management"]
    },
    {
      step: "03",
      icon: "receipt_long", 
      title: "Create Invoices",
      description: "Select products, add client details, and generate professional invoices in seconds. Everything is automated and beautifully formatted.",
      features: ["Quick product selection", "Client management", "Auto-calculations"]
    },
    {
      step: "04",
      icon: "download",
      title: "Export & Share",
      description: "Download your invoices as PDF, PNG, or JPG. Print directly or share digitally with your clients instantly.",
      features: ["Multiple export formats", "Direct printing", "Digital sharing"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How InvoiceGen Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes with our simple 4-step process. 
            No technical knowledge required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 relative overflow-hidden border-0 shadow-card"
            >
              {/* Step Number Background */}
              <div className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-300">
                {step.step}
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <MaterialIcon name={step.icon} size={32} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-primary font-bold text-lg">Step {step.step}</span>
                      <div className="h-px bg-primary/20 flex-1"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MaterialIcon name="check_circle" size={16} className="text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using InvoiceGen to streamline their billing process.
            </p>
            <button 
              onClick={() => window.location.href = '/admin'}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <MaterialIcon name="rocket_launch" size={20} />
              <span>Start Creating Invoices</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};