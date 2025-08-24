import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'create-invoice', label: 'Create Invoice', icon: 'add_circle' },
    { id: 'invoices', label: 'Invoices', icon: 'receipt_long' },
    { id: 'products', label: 'Products', icon: 'inventory_2' },
    { id: 'scan', label: 'Scan Barcode', icon: 'qr_code_scanner' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <header className="border-b border-border bg-card shadow-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MaterialIcon name="receipt" className="text-primary-foreground" size={20} />
              </div>
              <h1 className="text-xl font-bold text-foreground">InvoiceGen</h1>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className="flex items-center space-x-2"
                size="sm"
              >
                <MaterialIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <MaterialIcon name="menu" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};