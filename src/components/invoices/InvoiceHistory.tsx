import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice } from "@/types/invoice";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currencyUtils";
import { exportToPDF, exportToPNG, exportToJPG } from "@/utils/exportUtils";
import { INVOICE_TEMPLATES } from "./templates";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { useToast } from "@/hooks/use-toast";

interface InvoiceHistoryProps {
  onNavigate: (page: string) => void;
}

export const InvoiceHistory = ({ onNavigate }: InvoiceHistoryProps) => {
  const [invoices] = useLocalStorage<Invoice[]>('invoices', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = async (invoice: Invoice, format: 'pdf' | 'png' | 'jpg') => {
    if (!previewRef.current) return;
    
    try {
      const filename = `${invoice.invoiceNumber}`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF(previewRef.current, filename);
          break;
        case 'png':
          await exportToPNG(previewRef.current, filename);
          break;
        case 'jpg':
          await exportToJPG(previewRef.current, filename);
          break;
      }
      
      toast({
        title: "Success",
        description: `Invoice exported as ${format.toUpperCase()} successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to export invoice as ${format.toUpperCase()}`,
        variant: "destructive"
      });
    }
  };

  const SelectedTemplate = selectedInvoice 
    ? INVOICE_TEMPLATES.find(t => t.id === selectedInvoice.template)?.component || ClassicTemplate
    : ClassicTemplate;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <MaterialIcon name="folder_open" className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Invoice History</h1>
            <p className="text-muted-foreground">Manage and export your invoices</p>
          </div>
        </div>
        <Button onClick={() => onNavigate('create-invoice')} className="flex items-center space-x-2">
          <MaterialIcon name="add" size={16} />
          <span>New Invoice</span>
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search invoices by number or buyer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice List */}
      {filteredInvoices.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <MaterialIcon name="receipt_long" className="mx-auto text-muted-foreground mb-4" size={64} />
            <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No invoices match your search.' : 'Create your first invoice to get started.'}
            </p>
            <Button onClick={() => onNavigate('create-invoice')}>
              <MaterialIcon name="add" size={16} className="mr-2" />
              Create Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1" onClick={() => setSelectedInvoice(invoice)} className="cursor-pointer">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
                      <Badge variant="secondary">{formatCurrency(invoice.total, invoice.currency || 'USD')}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Buyer:</span>
                        <p className="font-medium">{invoice.buyer.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p className="font-medium">{invoice.date}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <p className="font-medium">{invoice.items.length} item(s)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(invoice);
                        setTimeout(() => handleExport(invoice, 'pdf'), 100);
                      }}
                    >
                      <MaterialIcon name="picture_as_pdf" size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(invoice);
                        setTimeout(() => handleExport(invoice, 'png'), 100);
                      }}
                    >
                      <MaterialIcon name="image" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Invoice Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Invoice Preview</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(selectedInvoice, 'pdf')}
                >
                  <MaterialIcon name="picture_as_pdf" size={16} className="mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(selectedInvoice, 'png')}
                >
                  <MaterialIcon name="image" size={16} className="mr-2" />
                  PNG
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedInvoice(null)}
                >
                  <MaterialIcon name="close" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <SelectedTemplate
                ref={previewRef}
                invoice={selectedInvoice}
                company={selectedInvoice.company}
                buyer={selectedInvoice.buyer}
                items={selectedInvoice.items}
                subtotal={selectedInvoice.subtotal}
                tax={selectedInvoice.tax || 0}
                shipping={selectedInvoice.shipping || 0}
                total={selectedInvoice.total}
                currency={selectedInvoice.currency || 'USD'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};