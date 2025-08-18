import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

export const PublicHeader = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MaterialIcon name="receipt" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">InvoiceGen</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="hero" className="hidden md:flex items-center space-x-2">
                <MaterialIcon name="dashboard" size={16} />
                <span>Admin Panel</span>
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <MaterialIcon name="menu" size={24} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};