import { forwardRef } from "react";
import { Invoice, Company, Buyer, InvoiceItem } from "@/types/invoice";
import { formatCurrency } from "@/utils/currencyUtils";

interface MinimalTemplateProps {
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

export const MinimalTemplate = forwardRef<HTMLDivElement, MinimalTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax, shipping = 0, total, currency }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;

    return (
      <div ref={ref} className="w-full max-w-4xl bg-white text-black p-8" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-light text-black mb-2">Invoice</h1>
              <p className="text-sm text-gray-600">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              {company.logo && (
                <img src={company.logo} alt="Company Logo" className="h-12 mb-2 ml-auto" />
              )}
              <p className="text-lg font-medium text-black">{company.name}</p>
              <p className="text-sm text-gray-600">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-medium text-black mb-3">From</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-black">{company.name}</p>
              {company.address && (
                <p className="whitespace-pre-line">{company.address}</p>
              )}
              {company.taxInfo && (
                <p>Tax ID: {company.taxInfo}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-black mb-3">To</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-black">{buyer.name || "Client Name"}</p>
              {buyer.email && <p>{buyer.email}</p>}
              {buyer.phone && <p>{buyer.phone}</p>}
              {buyer.address && (
                <p className="whitespace-pre-line">{buyer.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-black">Description</th>
                <th className="text-center py-3 text-sm font-medium text-black w-20">Qty</th>
                <th className="text-right py-3 text-sm font-medium text-black w-24">Rate</th>
                <th className="text-right py-3 text-sm font-medium text-black w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4">
                      <p className="text-sm font-medium text-black">{item.productName}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                    </td>
                    <td className="py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                    <td className="py-4 text-right text-sm text-gray-600">
                      {formatCurrency(item.unitPrice, currency)}
                    </td>
                    <td className="py-4 text-right text-sm font-medium text-black">
                      {formatCurrency(item.total, currency)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-black">{formatCurrency(subtotal, currency)}</span>
            </div>
            {company.taxSettings && company.taxSettings.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{company.taxSettings.taxName} ({company.taxSettings.taxRate}%)</span>
                <span className="text-black">{formatCurrency(tax, currency)}</span>
              </div>
            )}
            {shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black">{formatCurrency(shipping, currency)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium text-black">Total</span>
                <span className="font-medium text-black">{formatCurrency(total, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">Thank you for your business</p>
        </div>
      </div>
    );
  }
);

MinimalTemplate.displayName = "MinimalTemplate";