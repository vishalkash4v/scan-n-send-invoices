import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice, Company, Buyer, InvoiceItem } from "@/types/invoice";
import { Separator } from "@/components/ui/separator";

interface InvoicePreviewProps {
  invoice?: Partial<Invoice>;
  company: Company;
  buyer: Buyer;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice, company, buyer, items, subtotal, tax, total }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;

    return (
      <Card ref={ref} className="w-full max-w-4xl bg-background shadow-elegant border-border">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              {company.logo && (
                <img src={company.logo} alt="Company Logo" className="h-16 mb-4" />
              )}
              <h1 className="text-3xl font-bold text-foreground">
                {company.name || "Your Company"}
              </h1>
              {company.tagline && (
                <p className="text-muted-foreground mt-1">{company.tagline}</p>
              )}
              {company.address && (
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                  {company.address}
                </p>
              )}
              {company.taxInfo && (
                <p className="text-sm text-muted-foreground mt-1">
                  Tax ID: {company.taxInfo}
                </p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-primary mb-2">INVOICE</h2>
              <p className="text-sm text-muted-foreground">
                <strong>Invoice #:</strong> {invoiceNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Date:</strong> {currentDate}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Bill To:</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-medium text-foreground">
                {buyer.name || "Client Name"}
              </p>
              {buyer.email && (
                <p className="text-sm text-muted-foreground mt-1">{buyer.email}</p>
              )}
              {buyer.address && (
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                  {buyer.address}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 border-b border-border">
                <div className="grid grid-cols-12 gap-4 font-semibold text-foreground">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={index} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <p className="font-medium text-foreground">{item.productName}</p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="col-span-2 text-center text-muted-foreground">
                          {item.quantity}
                        </div>
                        <div className="col-span-2 text-right text-muted-foreground">
                          ${item.unitPrice.toFixed(2)}
                        </div>
                        <div className="col-span-3 text-right font-medium text-foreground">
                          ${item.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No items added yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Thank you for your business!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);

InvoicePreview.displayName = "InvoicePreview";