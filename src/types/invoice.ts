export interface Company {
  name: string;
  tagline?: string;
  address?: string;
  taxInfo?: string;
  logo?: string;
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
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  buyer: Buyer;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  total: number;
  company: Company;
}