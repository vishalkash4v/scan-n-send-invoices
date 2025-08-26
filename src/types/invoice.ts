export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface TaxSettings {
  currency: string;
  taxType: 'included' | 'excluded' | 'none';
  taxRate: number;
  taxName: string;
  enableShipping: boolean;
}

export interface Company {
  name: string;
  tagline?: string;
  address?: string;
  taxInfo?: string;
  logo?: string;
  currency?: string;
  taxSettings?: TaxSettings;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  barcode?: string;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Buyer {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  buyer: Buyer;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  company: Company;
  template?: string;
  currency?: string;
}