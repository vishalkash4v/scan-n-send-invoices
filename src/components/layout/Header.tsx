import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'products', label: 'Products', icon: 'inventory_2' },
    { id: 'invoices', label: 'Invoices', icon: 'receipt_long' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <header className="border-b bg-card shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MaterialIcon name="receipt" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">InvoiceGen</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className="flex items-center space-x-2"
              >
                <MaterialIcon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <MaterialIcon name="menu" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};