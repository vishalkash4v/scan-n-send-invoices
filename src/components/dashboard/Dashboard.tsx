import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { CompanySetup } from "./CompanySetup";
import { QuickStats } from "./QuickStats";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const quickActions = [
    {
      title: "Create New Invoice",
      description: "Generate a new invoice for your client",
      icon: "add_circle",
      action: () => onNavigate('create-invoice'),
      variant: "hero" as const
    },
    {
      title: "Add Product",
      description: "Add a new product to your inventory",
      icon: "add_shopping_cart",
      action: () => onNavigate('products'),
      variant: "outline" as const
    },
    {
      title: "Scan Barcode",
      description: "Quickly add products by scanning barcodes",
      icon: "qr_code_scanner",
      action: () => onNavigate('scan'),
      variant: "outline" as const
    },
    {
      title: "View All Invoices",
      description: "Browse and manage your invoice history",
      icon: "folder_open",
      action: () => onNavigate('invoices'),
      variant: "outline" as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-subtle p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to InvoiceGen
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Professional invoice generation with smart product management and barcode scanning
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => onNavigate('create-invoice')}
            className="flex items-center space-x-2"
          >
            <MaterialIcon name="add_circle" size={20} />
            <span>Create Your First Invoice</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MaterialIcon name="flash_on" className="text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common tasks to get you started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer" onClick={action.action}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MaterialIcon name={action.icon} className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                    <Button variant={action.variant} size="sm" className="w-full">
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Setup */}
      <CompanySetup />
    </div>
  );
};