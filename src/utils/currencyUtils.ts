import { Currency, TaxSettings } from '@/types/invoice';

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
];

export const GST_RATES = [
  { rate: 0, name: 'Exempt (0%)' },
  { rate: 0.25, name: 'Special Rate (0.25%)' },
  { rate: 3, name: 'Essential Goods (3%)' },
  { rate: 5, name: 'Basic Necessities (5%)' },
  { rate: 12, name: 'Standard Rate (12%)' },
  { rate: 18, name: 'Standard Rate (18%)' },
  { rate: 28, name: 'Luxury Goods (28%)' },
];

export const COMMON_TAX_RATES = [
  { rate: 0, name: 'No Tax (0%)' },
  { rate: 5, name: 'Low Rate (5%)' },
  { rate: 8, name: 'Reduced Rate (8%)' },
  { rate: 10, name: 'Standard Rate (10%)' },
  { rate: 15, name: 'Standard Rate (15%)' },
  { rate: 20, name: 'Standard Rate (20%)' },
  { rate: 25, name: 'High Rate (25%)' },
];

export const getDefaultTaxSettings = (currencyCode: string): TaxSettings => {
  if (currencyCode === 'INR') {
    return {
      currency: currencyCode,
      taxType: 'excluded',
      taxRate: 18,
      taxName: 'GST',
      enableShipping: true,
    };
  }
  
  return {
    currency: currencyCode,
    taxType: 'excluded',
    taxRate: 10,
    taxName: 'Tax',
    enableShipping: true,
  };
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
  if (!currency) return `${amount.toFixed(2)}`;
  
  return `${currency.symbol}${amount.toFixed(2)}`;
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
  return currency?.symbol || '$';
};