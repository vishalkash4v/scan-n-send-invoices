import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface ElegantTemplateProps {
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

export const ElegantTemplate = React.forwardRef<HTMLDivElement, ElegantTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-white text-gray-800 p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        {/* Elegant Header */}
        <div className="text-center mb-12">
          {company.logo && (
            <img src={company.logo} alt="Logo" className="h-16 mx-auto mb-6" />
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{company.name || 'Your Company'}</h1>
          {company.tagline && (
            <p className="text-gray-600 italic text-lg">{company.tagline}</p>
          )}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Invoice Details */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-700 mb-4">Invoice</h2>
          <div className="inline-block bg-gray-50 px-8 py-4 rounded-lg">
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-sm text-gray-600">Invoice Number</p>
                <p className="font-semibold">{invoiceNumber}</p>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company and Buyer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-300">From</h3>
            <div className="space-y-1">
              <p className="font-semibold">{company.name || 'Your Company'}</p>
              {company.address && <p className="text-sm text-gray-600 whitespace-pre-line">{company.address}</p>}
              {company.taxInfo && <p className="text-sm text-gray-600">Tax ID: {company.taxInfo}</p>}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-300">To</h3>
            <div className="space-y-1">
              <p className="font-semibold">{buyer.name || 'Customer Name'}</p>
              {buyer.address && <p className="text-sm text-gray-600 whitespace-pre-line">{buyer.address}</p>}
              {buyer.email && <p className="text-sm text-gray-600">{buyer.email}</p>}
              {buyer.phone && <p className="text-sm text-gray-600">{buyer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Services & Products</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.productName}</h4>
                    {item.description && <p className="text-gray-600 text-sm mt-1">{item.description}</p>}
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>{item.quantity} × {formatCurrency(item.unitPrice, currency)}</span>
                    </div>
                    <p className="font-semibold text-lg mt-1">{formatCurrency(item.total, currency)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              {discount && discount.amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount.name})</span>
                  <span>-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatCurrency(tax, currency)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatCurrency(shipping, currency)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 italic">With appreciation for your business</p>
        </div>
      </div>
    );
  }
);

ElegantTemplate.displayName = 'ElegantTemplate';