import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Invoice, Company, Buyer, InvoiceItem } from "@/types/invoice";
import { formatCurrency } from "@/utils/currencyUtils";

interface ModernTemplateProps {
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

export const ModernTemplate = forwardRef<HTMLDivElement, ModernTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax, shipping = 0, total, currency }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;

    return (
      <div ref={ref} className="w-full max-w-4xl bg-white text-black" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              {company.logo && (
                <img src={company.logo} alt="Company Logo" className="h-12 mb-4 filter brightness-0 invert" />
              )}
              <h1 className="text-2xl font-bold text-white">
                {company.name || "Your Company"}
              </h1>
              {company.tagline && (
                <p className="text-blue-100 mt-1">{company.tagline}</p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-light text-white">Invoice</h2>
              <p className="text-blue-100 mt-2">#{invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white" style={{ backgroundColor: '#ffffff' }}>
          {/* Company and Date Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">From</h3>
              {company.address && (
                <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
                  {company.address}
                </p>
              )}
              {company.taxInfo && (
                <p className="text-sm text-gray-700">
                  Tax ID: {company.taxInfo}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Invoice Date</p>
                <p className="text-lg font-medium text-gray-900">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Bill To</h3>
            <div className="bg-gray-50 p-6 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {buyer.name || "Client Name"}
              </p>
              {buyer.email && (
                <p className="text-sm text-gray-600 mb-1">{buyer.email}</p>
              )}
              {buyer.phone && (
                <p className="text-sm text-gray-600 mb-1">{buyer.phone}</p>
              )}
              {buyer.address && (
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {buyer.address}
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50" style={{ backgroundColor: '#f8f9fa' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" style={{ backgroundColor: '#ffffff' }}>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700">
                          {formatCurrency(item.unitPrice, currency)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(item.total, currency)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No items added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="bg-gray-50 p-6 rounded-lg space-y-3" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(subtotal, currency)}</span>
                </div>
                {company.taxSettings && company.taxSettings.taxRate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{company.taxSettings.taxName} ({company.taxSettings.taxRate}%)</span>
                    <span className="text-gray-900">{formatCurrency(tax, currency)}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">{formatCurrency(shipping, currency)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">{formatCurrency(total, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Thank you for your business!
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ModernTemplate.displayName = "ModernTemplate";