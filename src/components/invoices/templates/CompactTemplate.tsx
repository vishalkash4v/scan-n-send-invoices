import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface CompactTemplateProps {
  invoice?: Invoice;
  company: Company;
  buyer: Buyer;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: { type: 'flat' | 'percentage'; amount: number; name: string };
  total: number;
  currency: string;
}

export const CompactTemplate = React.forwardRef<HTMLDivElement, CompactTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-white text-gray-800 p-6 max-w-3xl mx-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        {/* Compact Header */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200">
          <div className="flex items-center space-x-4">
            {company.logo && (
              <img src={company.logo} alt="Logo" className="h-12" />
            )}
            <div>
              <h1 className="text-xl font-bold">{company.name || 'Your Company'}</h1>
              {company.tagline && <p className="text-sm text-gray-600">{company.tagline}</p>}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-700">INVOICE</h2>
            <p className="text-sm">#{invoiceNumber}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        {/* Compact Info Section */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <div className="bg-gray-100 p-3 rounded">
              <h3 className="font-semibold text-gray-700 mb-2">From:</h3>
              <p className="font-medium">{company.name || 'Your Company'}</p>
              {company.address && <p className="text-gray-600 text-xs whitespace-pre-line">{company.address}</p>}
              {company.taxInfo && <p className="text-gray-600 text-xs">Tax: {company.taxInfo}</p>}
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-3 rounded">
              <h3 className="font-semibold text-gray-700 mb-2">To:</h3>
              <p className="font-medium">{buyer.name || 'Customer Name'}</p>
              {buyer.address && <p className="text-gray-600 text-xs whitespace-pre-line">{buyer.address}</p>}
              {buyer.email && <p className="text-gray-600 text-xs">{buyer.email}</p>}
              {buyer.phone && <p className="text-gray-600 text-xs">{buyer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Compact Items Table */}
        <div className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-3 py-2 text-left font-semibold">Item</th>
                <th className="px-3 py-2 text-center font-semibold">Qty</th>
                <th className="px-3 py-2 text-center font-semibold">Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-2">
                    <p className="font-medium">{item.productName}</p>
                    {item.description && <p className="text-xs text-gray-600">{item.description}</p>}
                  </td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-center">{formatCurrency(item.unitPrice, currency)}</td>
                  <td className="px-3 py-2 text-right font-medium">{formatCurrency(item.total, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Totals */}
        <div className="flex justify-end">
          <div className="w-80">
            <div className="bg-gray-50 p-4 rounded text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                {discount && discount.amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount.name}):</span>
                    <span>-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatCurrency(tax, currency)}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatCurrency(shipping, currency)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between font-bold text-base">
                    <span>TOTAL:</span>
                    <span>{formatCurrency(total, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>Thank you for your business!</p>
        </div>
      </div>
    );
  }
);

CompactTemplate.displayName = 'CompactTemplate';