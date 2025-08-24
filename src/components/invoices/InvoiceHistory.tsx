import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice } from "@/types/invoice";
import { Badge } from "@/components/ui/badge";

interface InvoiceHistoryProps {
  onNavigate: (page: string) => void;
}

export const InvoiceHistory = ({ onNavigate }: InvoiceHistoryProps) => {
  const [invoices] = useLocalStorage<Invoice[]>('invoices', []);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportInvoice = (invoice: Invoice, format: 'pdf' | 'png' | 'jpg') => {
    // This would typically integrate with a PDF/image generation library
    console.log(`Exporting invoice ${invoice.invoiceNumber} as ${format}`);
  };

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
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
                      <Badge variant="secondary">${invoice.total.toFixed(2)}</Badge>
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
                      onClick={() => exportInvoice(invoice, 'pdf')}
                      className="flex items-center space-x-1"
                    >
                      <MaterialIcon name="picture_as_pdf" size={16} />
                      <span>PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportInvoice(invoice, 'png')}
                      className="flex items-center space-x-1"
                    >
                      <MaterialIcon name="image" size={16} />
                      <span>PNG</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:bg-primary/10"
                    >
                      <MaterialIcon name="more_vert" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};