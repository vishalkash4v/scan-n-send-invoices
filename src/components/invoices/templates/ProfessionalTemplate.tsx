import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface ProfessionalTemplateProps {
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

export const ProfessionalTemplate = React.forwardRef<HTMLDivElement, ProfessionalTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-white text-gray-800 p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Header */}
        <div className="border-b-4 border-blue-800 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              {company.logo && (
                <img src={company.logo} alt="Logo" className="h-16 mb-4" />
              )}
              <h1 className="text-3xl font-bold text-blue-800">{company.name || 'Your Company'}</h1>
              {company.tagline && (
                <p className="text-gray-600 italic">{company.tagline}</p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold text-blue-800 mb-2">INVOICE</h2>
              <div className="bg-blue-100 p-3 rounded">
                <p className="font-semibold">Invoice #: {invoiceNumber}</p>
                <p>Date: {date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company and Buyer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">From:</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold">{company.name || 'Your Company'}</p>
              {company.address && <p className="text-sm whitespace-pre-line">{company.address}</p>}
              {company.taxInfo && <p className="text-sm">Tax ID: {company.taxInfo}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">To:</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-semibold">{buyer.name || 'Customer Name'}</p>
              {buyer.address && <p className="text-sm whitespace-pre-line">{buyer.address}</p>}
              {buyer.email && <p className="text-sm">Email: {buyer.email}</p>}
              {buyer.phone && <p className="text-sm">Phone: {buyer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-right">Qty</th>
                <th className="px-4 py-3 text-right">Rate</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <p className="font-medium">{item.productName}</p>
                    {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                  </td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(item.unitPrice, currency)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.total, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 rounded">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
              </div>
              {discount && discount.amount > 0 && (
                <div className="px-4 py-2 border-b border-gray-300">
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount.name}):</span>
                    <span>-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</span>
                  </div>
                </div>
              )}
              {tax > 0 && (
                <div className="px-4 py-2 border-b border-gray-300">
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatCurrency(tax, currency)}</span>
                  </div>
                </div>
              )}
              {shipping > 0 && (
                <div className="px-4 py-2 border-b border-gray-300">
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatCurrency(shipping, currency)}</span>
                  </div>
                </div>
              )}
              <div className="bg-blue-800 text-white px-4 py-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>Thank you for your business!</p>
        </div>
      </div>
    );
  }
);

ProfessionalTemplate.displayName = 'ProfessionalTemplate';