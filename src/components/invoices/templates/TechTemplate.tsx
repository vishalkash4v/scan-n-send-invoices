import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface TechTemplateProps {
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

export const TechTemplate = React.forwardRef<HTMLDivElement, TechTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-gray-900 text-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}>
        {/* Tech Header */}
        <div className="border border-green-400 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              {company.logo && (
                <img src={company.logo} alt="Logo" className="h-12 mb-4 filter invert" />
              )}
              <h1 className="text-2xl font-bold text-green-400">{company.name || 'YOUR_COMPANY'}</h1>
              {company.tagline && (
                <p className="text-green-300 text-sm">// {company.tagline}</p>
              )}
            </div>
            <div className="text-right">
              <div className="bg-green-400 text-gray-900 px-4 py-2 font-bold">
                INVOICE
              </div>
              <div className="mt-2 text-green-300">
                <p className="text-sm">ID: {invoiceNumber}</p>
                <p className="text-sm">DATE: {date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-blue-400 p-4">
            <div className="bg-blue-400 text-gray-900 px-2 py-1 text-sm font-bold mb-3">
              FROM
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-blue-300">{company.name || 'YOUR_COMPANY'}</p>
              {company.address && <p className="text-gray-300 whitespace-pre-line">{company.address}</p>}
              {company.taxInfo && <p className="text-gray-300">TAX_ID: {company.taxInfo}</p>}
            </div>
          </div>
          <div className="border border-cyan-400 p-4">
            <div className="bg-cyan-400 text-gray-900 px-2 py-1 text-sm font-bold mb-3">
              TO
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-cyan-300">{buyer.name || 'CUSTOMER_NAME'}</p>
              {buyer.address && <p className="text-gray-300 whitespace-pre-line">{buyer.address}</p>}
              {buyer.email && <p className="text-gray-300">{buyer.email}</p>}
              {buyer.phone && <p className="text-gray-300">{buyer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Tech Items Table */}
        <div className="mb-8">
          <div className="bg-gray-800 border border-purple-400">
            <div className="bg-purple-400 text-gray-900 px-4 py-2 font-bold text-sm">
              ITEMS_LIST
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-purple-300 border-b border-gray-700">
                    <th className="text-left py-2">DESCRIPTION</th>
                    <th className="text-center py-2">QTY</th>
                    <th className="text-center py-2">RATE</th>
                    <th className="text-right py-2">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3">
                        <p className="text-white font-medium">{item.productName}</p>
                        {item.description && <p className="text-gray-400 text-xs">// {item.description}</p>}
                      </td>
                      <td className="py-3 text-center text-cyan-300">{item.quantity}</td>
                      <td className="py-3 text-center text-cyan-300">{formatCurrency(item.unitPrice, currency)}</td>
                      <td className="py-3 text-right text-green-300 font-medium">{formatCurrency(item.total, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tech Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 border border-yellow-400">
            <div className="bg-yellow-400 text-gray-900 px-4 py-2 font-bold text-sm">
              CALCULATIONS
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">SUBTOTAL:</span>
                <span className="text-white font-mono">{formatCurrency(subtotal, currency)}</span>
              </div>
              {discount && discount.amount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>DISCOUNT ({discount.name}):</span>
                  <span className="font-mono">-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-300">TAX:</span>
                  <span className="text-white font-mono">{formatCurrency(tax, currency)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-300">SHIPPING:</span>
                  <span className="text-white font-mono">{formatCurrency(shipping, currency)}</span>
                </div>
              )}
              <div className="border-t border-gray-700 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-yellow-400">TOTAL:</span>
                  <span className="text-green-400 font-mono">{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Footer */}
        <div className="mt-8 text-center">
          <div className="border-t border-green-400 pt-4">
            <p className="text-green-300 text-sm">// THANK_YOU_FOR_YOUR_BUSINESS</p>
          </div>
        </div>
      </div>
    );
  }
);

TechTemplate.displayName = 'TechTemplate';