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
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MaterialIcon name="receipt" className="text-primary-foreground" size={20} />
            </div>
            <span className="text-xl font-bold text-primary">InvoiceGen</span>
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