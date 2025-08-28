import React from 'react';
import { Invoice, Company, Buyer, InvoiceItem } from '@/types/invoice';
import { formatCurrency } from '@/utils/currencyUtils';

interface CorporateTemplateProps {
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

export const CorporateTemplate = React.forwardRef<HTMLDivElement, CorporateTemplateProps>(
  ({ invoice, company, buyer, items, subtotal, tax = 0, shipping = 0, discount, total, currency }, ref) => {
    const invoiceNumber = invoice?.invoiceNumber || `INV-${Date.now()}`;
    const date = invoice?.date || new Date().toLocaleDateString();

    return (
      <div ref={ref} className="bg-white text-gray-900 p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              {company.logo && (
                <img src={company.logo} alt="Logo" className="h-20" />
              )}
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{company.name || 'Your Company'}</h1>
                {company.tagline && (
                  <p className="text-gray-600 mt-1">{company.tagline}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-5xl font-light text-gray-800 mb-4">INVOICE</h2>
              <div className="text-right space-y-1">
                <p className="text-sm text-gray-600">Invoice Number</p>
                <p className="text-lg font-bold">{invoiceNumber}</p>
                <p className="text-sm text-gray-600 mt-2">Date</p>
                <p className="text-lg">{date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company and Buyer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="bg-gray-800 text-white px-4 py-2 mb-4">
              <h3 className="font-bold">BILL FROM</h3>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-lg">{company.name || 'Your Company'}</p>
              {company.address && <p className="text-gray-700 whitespace-pre-line">{company.address}</p>}
              {company.taxInfo && <p className="text-gray-700">Tax ID: {company.taxInfo}</p>}
            </div>
          </div>
          <div>
            <div className="bg-gray-800 text-white px-4 py-2 mb-4">
              <h3 className="font-bold">BILL TO</h3>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-lg">{buyer.name || 'Customer Name'}</p>
              {buyer.address && <p className="text-gray-700 whitespace-pre-line">{buyer.address}</p>}
              {buyer.email && <p className="text-gray-700">{buyer.email}</p>}
              {buyer.phone && <p className="text-gray-700">{buyer.phone}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-800 text-white px-6 py-4 text-left font-bold">DESCRIPTION</th>
                <th className="bg-gray-800 text-white px-6 py-4 text-center font-bold">QTY</th>
                <th className="bg-gray-800 text-white px-6 py-4 text-center font-bold">RATE</th>
                <th className="bg-gray-800 text-white px-6 py-4 text-right font-bold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{item.productName}</p>
                    {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                  </td>
                  <td className="px-6 py-4 text-center">{item.quantity}</td>
                  <td className="px-6 py-4 text-center">{formatCurrency(item.unitPrice, currency)}</td>
                  <td className="px-6 py-4 text-right font-semibold">{formatCurrency(item.total, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 text-right font-medium">Subtotal:</td>
                  <td className="py-2 text-right pl-8">{formatCurrency(subtotal, currency)}</td>
                </tr>
                {discount && discount.amount > 0 && (
                  <tr>
                    <td className="py-2 text-right font-medium text-green-600">Discount ({discount.name}):</td>
                    <td className="py-2 text-right pl-8 text-green-600">-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, currency)}</td>
                  </tr>
                )}
                {tax > 0 && (
                  <tr>
                    <td className="py-2 text-right font-medium">Tax:</td>
                    <td className="py-2 text-right pl-8">{formatCurrency(tax, currency)}</td>
                  </tr>
                )}
                {shipping > 0 && (
                  <tr>
                    <td className="py-2 text-right font-medium">Shipping:</td>
                    <td className="py-2 text-right pl-8">{formatCurrency(shipping, currency)}</td>
                  </tr>
                )}
                <tr className="border-t-2 border-gray-800">
                  <td className="py-4 text-right font-bold text-lg">TOTAL:</td>
                  <td className="py-4 text-right pl-8 font-bold text-xl">{formatCurrency(total, currency)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-gray-300 text-center">
          <p className="text-gray-600 font-medium">Thank you for your business</p>
        </div>
      </div>
    );
  }
);

CorporateTemplate.displayName = 'CorporateTemplate';