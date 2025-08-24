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

  const exportInvoice = async (invoice: Invoice, format: 'pdf' | 'png' | 'jpg') => {
    // Create a temporary preview element for export
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);
    
    try {
      const { exportToPDF, exportToPNG, exportToJPG } = await import('@/utils/exportUtils');
      const filename = `${invoice.invoiceNumber}`;
      
      // Create invoice preview HTML (simplified version)
      tempDiv.innerHTML = `
        <div style="width: 800px; background: white; padding: 40px; font-family: Arial, sans-serif;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div>
              <h1 style="font-size: 24px; font-weight: bold; color: #1a1a1a;">${invoice.company.name}</h1>
              ${invoice.company.address ? `<p style="color: #666; margin-top: 8px;">${invoice.company.address}</p>` : ''}
            </div>
            <div style="text-align: right;">
              <h2 style="font-size: 20px; font-weight: bold; color: #3b82f6;">INVOICE</h2>
              <p style="color: #666;">Invoice #: ${invoice.invoiceNumber}</p>
              <p style="color: #666;">Date: ${invoice.date}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 40px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px;">Bill To:</h3>
            <p style="font-weight: 600;">${invoice.buyer.name}</p>
            ${invoice.buyer.email ? `<p style="color: #666;">${invoice.buyer.email}</p>` : ''}
            ${invoice.buyer.address ? `<p style="color: #666;">${invoice.buyer.address}</p>` : ''}
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Description</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Unit Price</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">
                    <strong>${item.productName}</strong>
                    ${item.description ? `<br><small style="color: #666;">${item.description}</small>` : ''}
                  </td>
                  <td style="padding: 12px; text-align: center; border-bottom: 1px solid #f3f4f6;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6;">$${item.unitPrice.toFixed(2)}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6;">$${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="text-align: right; width: 300px; margin-left: auto;">
            <div style="margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>Subtotal:</span>
              <span>$${invoice.subtotal.toFixed(2)}</span>
            </div>
            ${invoice.tax ? `
              <div style="margin-bottom: 8px; display: flex; justify-content: space-between;">
                <span>Tax:</span>
                <span>$${invoice.tax.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 18px; font-weight: bold;">
              <span>Total:</span>
              <span>$${invoice.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div style="margin-top: 60px; text-align: center; color: #666; font-size: 14px;">
            Thank you for your business!
          </div>
        </div>
      `;
      
      switch (format) {
        case 'pdf':
          await exportToPDF(tempDiv.firstElementChild as HTMLElement, filename);
          break;
        case 'png':
          await exportToPNG(tempDiv.firstElementChild as HTMLElement, filename);
          break;
        case 'jpg':
          await exportToJPG(tempDiv.firstElementChild as HTMLElement, filename);
          break;
      }
      
    } catch (error) {
      console.error(`Error exporting ${format}:`, error);
    } finally {
      document.body.removeChild(tempDiv);
    }
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