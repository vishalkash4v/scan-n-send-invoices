import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface CreativeTemplateProps {
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

export const CreativeTemplate = React.forwardRef<HTMLDivElement, CreativeTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-white text-gray-800 p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Creative Header */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-t-3xl">
            <div className="flex justify-between items-start">
              <div>
                {company.logo && (
                  <img src={company.logo} alt="Logo" className="h-12 mb-4 bg-white p-2 rounded" />
                )}
                <h1 className="text-3xl font-bold">{company.name || 'Your Company'}</h1>
                {company.tagline && (
                  <p className="opacity-90">{company.tagline}</p>
                )}
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <p>#{invoiceNumber}</p>
                  <p>{date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-b-3xl"></div>
        </div>

        {/* Company and Buyer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-purple-700 mb-3">From</h3>
            <p className="font-semibold text-gray-800">{company.name || 'Your Company'}</p>
            {company.address && <p className="text-sm text-gray-600 whitespace-pre-line mt-1">{company.address}</p>}
            {company.taxInfo && <p className="text-sm text-gray-600 mt-1">Tax ID: {company.taxInfo}</p>}
          </div>
          <div className="bg-pink-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-pink-700 mb-3">To</h3>
            <p className="font-semibold text-gray-800">{buyer.name || 'Customer Name'}</p>
            {buyer.address && <p className="text-sm text-gray-600 whitespace-pre-line mt-1">{buyer.address}</p>}
            {buyer.email && <p className="text-sm text-gray-600 mt-1">{buyer.email}</p>}
            {buyer.phone && <p className="text-sm text-gray-600 mt-1">{buyer.phone}</p>}
          </div>
        </div>

        {/* Items */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-xl">
            <div className="grid grid-cols-4 gap-4 font-semibold">
              <div>Item</div>
              <div className="text-center">Qty</div>
              <div className="text-center">Rate</div>
              <div className="text-right">Total</div>
            </div>
          </div>
          <div className="border-2 border-purple-200 border-t-0 rounded-b-xl">
            {items.map((item, index) => (
              <div key={index} className={`grid grid-cols-4 gap-4 p-4 ${index !== items.length - 1 ? 'border-b border-purple-100' : ''}`}>
                <div>
                  <p className="font-medium">{item.productName}</p>
                  {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                </div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-center">{formatCurrency(item.unitPrice, currency)}</div>
                <div className="text-right font-medium">{formatCurrency(item.total, currency)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <div className="space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal, currency)}</span>
              </div>
              {discount && discount.amount > 0 && (
                <div className="flex justify-between py-2 text-green-600">
                  <span>Discount ({discount.name})</span>
                  <span>-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatCurrency(tax, currency)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatCurrency(shipping, currency)}</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-purple-600">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <span className="font-medium">Thank you for choosing us!</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }
);

CreativeTemplate.displayName = 'CreativeTemplate';