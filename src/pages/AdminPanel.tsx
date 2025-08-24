import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProductManagement } from "@/components/products/ProductManagement";
import { CreateInvoice } from "@/components/invoices/CreateInvoice";
import { InvoiceHistory } from "@/components/invoices/InvoiceHistory";
import { BarcodeScanner } from "@/components/scanner/BarcodeScanner";

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
        return <InvoiceHistory onNavigate={setCurrentPage} />;
      case 'settings':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>;
      case 'create-invoice':
        return <CreateInvoice />;
      case 'scan':
        return <BarcodeScanner />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default AdminPanel;
