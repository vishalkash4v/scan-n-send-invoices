import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice, Company, Buyer, InvoiceItem } from "@/types/invoice";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/currencyUtils";

interface ClassicTemplateProps {
  invoice?: Partial<Invoice>;
  company: Company;
  buyer: Buyer;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  shipping?: number;
  total: number;
  currency: string;
}

export const ClassicTemplate = forwardRef<HTMLDivElement, ClassicTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax, shipping = 0, total, currency }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;

    return (
      <Card ref={ref} className="w-full max-w-4xl bg-white text-black border border-gray-300 print:shadow-none" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <CardContent className="p-8" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              {company.logo && (
                <img src={company.logo} alt="Company Logo" className="h-16 mb-4" />
              )}
              <h1 className="text-3xl font-bold" style={{ color: '#000000' }}>
                {company.name || "Your Company"}
              </h1>
              {company.tagline && (
                <p className="text-gray-600 mt-1">{company.tagline}</p>
              )}
              {company.address && (
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                  {company.address}
                </p>
              )}
              {company.taxInfo && (
                <p className="text-sm text-gray-600 mt-1">
                  Tax ID: {company.taxInfo}
                </p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">INVOICE</h2>
              <p className="text-sm text-gray-600">
                <strong>Invoice #:</strong> {invoiceNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {currentDate}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#000000' }}>Bill To:</h3>
            <div className="bg-gray-50 p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <p className="font-medium" style={{ color: '#000000' }}>
                {buyer.name || "Client Name"}
              </p>
              {buyer.email && (
                <p className="text-sm text-gray-600 mt-1">{buyer.email}</p>
              )}
              {buyer.phone && (
                <p className="text-sm text-gray-600 mt-1">{buyer.phone}</p>
              )}
              {buyer.address && (
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                  {buyer.address}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4 border-b border-gray-300" style={{ backgroundColor: '#f1f3f4' }}>
                <div className="grid grid-cols-12 gap-4 font-semibold" style={{ color: '#000000' }}>
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={index} className="p-4" style={{ backgroundColor: '#ffffff' }}>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <p className="font-medium" style={{ color: '#000000' }}>{item.productName}</p>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="col-span-2 text-center text-gray-600">
                          {item.quantity}
                        </div>
                        <div className="col-span-2 text-right text-gray-600">
                          {formatCurrency(item.unitPrice, currency)}
                        </div>
                        <div className="col-span-3 text-right font-medium" style={{ color: '#000000' }}>
                          {formatCurrency(item.total, currency)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
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
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                {company.taxSettings && company.taxSettings.taxRate > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>{company.taxSettings.taxName} ({company.taxSettings.taxRate}%):</span>
                    <span>{formatCurrency(tax, currency)}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>{formatCurrency(shipping, currency)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold" style={{ color: '#000000' }}>
                  <span>Total:</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-center text-sm text-gray-600">
              Thank you for your business!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ClassicTemplate.displayName = "ClassicTemplate";