import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProductManagement } from "@/components/products/ProductManagement";

const AdminPanel = () => {
  console.log("AdminPanel component is rendering");
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'products':
        return <ProductManagement />;
      case 'invoices':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Invoice Management</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>;
      case 'settings':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>;
      case 'create-invoice':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default AdminPanel;
