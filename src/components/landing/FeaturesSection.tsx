import { Card, CardContent } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";

export const FeaturesSection = () => {
  const features = [
    {
      icon: "receipt_long",
      title: "Professional Invoices",
      description: "Create beautiful, professional invoices with customizable templates and your company branding.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: "qr_code_scanner", 
      title: "Barcode Scanning",
      description: "Scan product barcodes with your camera or upload barcode images for instant product addition.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: "inventory_2",
      title: "Smart Product Management",
      description: "Organize your products with descriptions, pricing, and barcode linking for quick invoice creation.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: "download",
      title: "Multiple Export Options",
      description: "Export your invoices as PDF, JPG, or PNG. Print directly or save for digital sharing.",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: "cloud_sync",
      title: "Local Storage",
      description: "All your data is stored locally in your browser. No account required, complete privacy.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: "search",
      title: "Quick Search",
      description: "Find products instantly by name, description, or barcode. Smart filtering for efficiency.",
      color: "bg-pink-50 text-pink-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Professional Invoicing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamline your billing process with our comprehensive set of features designed for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 shadow-card"
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <MaterialIcon name={feature.icon} size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};