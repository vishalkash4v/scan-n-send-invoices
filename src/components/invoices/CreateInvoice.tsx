import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice, InvoiceItem, Product, Buyer, Company, TaxSettings } from "@/types/invoice";
import { useToast } from "@/hooks/use-toast";
import { RelatedLinks } from "@/components/ui/related-links";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { exportToPDF, exportToPNG, exportToJPG } from "@/utils/exportUtils";
import { SUPPORTED_CURRENCIES, formatCurrency, getDefaultTaxSettings } from "@/utils/currencyUtils";
import { INVOICE_TEMPLATES } from "./templates";
import { ClassicTemplate } from "./templates/ClassicTemplate";

interface CreateInvoiceProps {
  onNavigate: (page: string) => void;
}

export const CreateInvoice = ({ onNavigate }: CreateInvoiceProps) => {
  const { toast } = useToast();
  const [products] = useLocalStorage<Product[]>('products', []);
  const [company, setCompany] = useLocalStorage<Company>('company', {} as Company);
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', []);
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  // Get default currency and tax settings
  const defaultCurrency = company.currency || 'USD';
  const defaultTaxSettings = company.taxSettings || getDefaultTaxSettings(defaultCurrency);

  const [buyer, setBuyer] = useState<Buyer>({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [taxSettings, setTaxSettings] = useState<TaxSettings>(defaultTaxSettings);
  const [shippingAmount, setShippingAmount] = useState<number>(0);

  const addItem = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: InvoiceItem = {
      productId: product.id,
      productName: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      quantity,
      total: product.unitPrice * quantity
    };

    setItems([...items, newItem]);
    setQuantity(1);
    setSelectedProduct('');
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  
  let tax = 0;
  if (taxSettings.taxType === 'excluded' && taxSettings.taxRate > 0) {
    tax = subtotal * (taxSettings.taxRate / 100);
  }
  
  const shipping = taxSettings.enableShipping ? shippingAmount : 0;
  const total = subtotal + tax + shipping;

  const createInvoice = () => {
    if (!buyer.name || items.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in buyer details and add at least one item.",
        variant: "destructive"
      });
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      buyer,
      items,
      subtotal,
      tax,
      shipping,
      total,
      company: {
        ...company,
        currency: selectedCurrency,
        taxSettings: taxSettings
      },
      template: selectedTemplate,
      currency: selectedCurrency
    };

    // Update company settings if they've changed
    if (company.currency !== selectedCurrency || JSON.stringify(company.taxSettings) !== JSON.stringify(taxSettings)) {
      setCompany({
        ...company,
        currency: selectedCurrency,
        taxSettings: taxSettings
      });
    }

    setInvoices([...invoices, newInvoice]);
    
    toast({
      title: "Success",
      description: "Invoice created successfully!",
    });

    // Reset form
    setBuyer({ name: '', address: '', email: '', phone: '' });
    setItems([]);
    setShippingAmount(0);
  };

  const handleExport = async (format: 'pdf' | 'png' | 'jpg') => {
    if (!invoicePreviewRef.current) return;
    
    try {
      const filename = `invoice-${Date.now()}`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF(invoicePreviewRef.current, filename);
          break;
        case 'png':
          await exportToPNG(invoicePreviewRef.current, filename);
          break;
        case 'jpg':
          await exportToJPG(invoicePreviewRef.current, filename);
          break;
      }
      
      toast({
        title: "Success",
        description: `Invoice exported as ${format.toUpperCase()} successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to export invoice as ${format.toUpperCase()}`,
        variant: "destructive"
      });
    }
  };

  const relatedLinks = [
    {
      title: "Currency Settings",
      description: "Configure currency and tax settings",
      icon: "currency_exchange",
      action: () => onNavigate('settings')
    },
    {
      title: "Add Products",
      description: "Manage your product catalog",
      icon: "add_box",
      action: () => onNavigate('products')
    },
    {
      title: "Company Settings",
      description: "Update company information",
      icon: "business",
      action: () => onNavigate('setup')
    },
    {
      title: "Invoice History",
      description: "View all created invoices",
      icon: "folder_open",
      action: () => onNavigate('invoices')
    },
    {
      title: "Scan Barcode",
      description: "Add products by barcode",
      icon: "qr_code_scanner",
      action: () => onNavigate('scanner')
    }
  ];

  // Get the selected template component
  const SelectedTemplate = INVOICE_TEMPLATES.find(t => t.id === selectedTemplate)?.component || ClassicTemplate;

  return (
    <div className="space-y-6">
      <Breadcrumbs 
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Create Invoice' }
        ]} 
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <MaterialIcon name="add_circle" className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create New Invoice</h1>
            <p className="text-muted-foreground">Generate professional invoices with real-time preview</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            disabled={items.length === 0}
          >
            <MaterialIcon name="picture_as_pdf" size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('png')}
            disabled={items.length === 0}
          >
            <MaterialIcon name="image" size={16} className="mr-2" />
            Export PNG
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <div className="space-y-6">
          {/* Template Selection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MaterialIcon name="palette" className="text-primary" />
                <span>Invoice Template</span>
              </CardTitle>
              <CardDescription>Choose your preferred invoice design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {INVOICE_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Currency & Tax Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MaterialIcon name="currency_exchange" className="text-primary" />
                <span>Currency & Tax</span>
              </CardTitle>
              <CardDescription>Configure invoice currency and tax settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Currency Selection */}
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={selectedCurrency}
                  onChange={(e) => {
                    setSelectedCurrency(e.target.value);
                    setTaxSettings(getDefaultTaxSettings(e.target.value));
                  }}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {SUPPORTED_CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tax Settings */}
              <div>
                <Label htmlFor="taxType">Tax Type</Label>
                <select
                  id="taxType"
                  value={taxSettings.taxType}
                  onChange={(e) => setTaxSettings({
                    ...taxSettings,
                    taxType: e.target.value as 'included' | 'excluded' | 'none'
                  })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="none">No Tax</option>
                  <option value="excluded">Tax Excluded</option>
                  <option value="included">Tax Included</option>
                </select>
              </div>

              {taxSettings.taxType !== 'none' && (
                <>
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={taxSettings.taxRate}
                      onChange={(e) => setTaxSettings({
                        ...taxSettings,
                        taxRate: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxName">Tax Name</Label>
                    <Input
                      id="taxName"
                      value={taxSettings.taxName}
                      onChange={(e) => setTaxSettings({
                        ...taxSettings,
                        taxName: e.target.value
                      })}
                      placeholder="e.g., GST, VAT, Sales Tax"
                    />
                  </div>
                </>
              )}

              {/* Shipping */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableShipping"
                    checked={taxSettings.enableShipping}
                    onChange={(e) => setTaxSettings({
                      ...taxSettings,
                      enableShipping: e.target.checked
                    })}
                    className="rounded"
                  />
                  <Label htmlFor="enableShipping">Enable Shipping</Label>
                </div>
                {taxSettings.enableShipping && (
                  <div>
                    <Label htmlFor="shippingAmount">Shipping Amount</Label>
                    <Input
                      id="shippingAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={shippingAmount}
                      onChange={(e) => setShippingAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Buyer Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MaterialIcon name="person" className="text-primary" />
                <span>Buyer Information</span>
              </CardTitle>
              <CardDescription>Enter your client's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="buyerName">Name *</Label>
                <Input
                  id="buyerName"
                  value={buyer.name}
                  onChange={(e) => setBuyer({...buyer, name: e.target.value})}
                  placeholder="Client name"
                />
              </div>
              <div>
                <Label htmlFor="buyerEmail">Email</Label>
                <Input
                  id="buyerEmail"
                  type="email"
                  value={buyer.email}
                  onChange={(e) => setBuyer({...buyer, email: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label htmlFor="buyerPhone">Phone</Label>
                <Input
                  id="buyerPhone"
                  type="tel"
                  value={buyer.phone}
                  onChange={(e) => setBuyer({...buyer, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="buyerAddress">Address</Label>
                <Textarea
                  id="buyerAddress"
                  value={buyer.address}
                  onChange={(e) => setBuyer({...buyer, address: e.target.value})}
                  placeholder="Client address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Items */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MaterialIcon name="add_shopping_cart" className="text-primary" />
                <span>Add Items</span>
              </CardTitle>
              <CardDescription>Select products and quantities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product">Product</Label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.unitPrice, selectedCurrency)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <Button onClick={addItem} className="w-full" disabled={!selectedProduct}>
                <MaterialIcon name="add" size={16} className="mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Invoice Preview */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MaterialIcon name="preview" className="text-primary" />
                <span>Live Preview - {INVOICE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
              </CardTitle>
              <CardDescription>Real-time invoice preview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <SelectedTemplate
                  ref={invoicePreviewRef}
                  company={{
                    ...company,
                    currency: selectedCurrency,
                    taxSettings: taxSettings
                  }}
                  buyer={buyer}
                  items={items}
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  total={total}
                  currency={selectedCurrency}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Links Sidebar */}
        <div className="space-y-6">
          <RelatedLinks links={relatedLinks} />
        </div>
      </div>

      {/* Invoice Items */}
      {items.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.unitPrice, selectedCurrency)} × {item.quantity} = {formatCurrency(item.total, selectedCurrency)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <MaterialIcon name="delete" size={20} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, selectedCurrency)}</span>
                </div>
                {taxSettings.taxType === 'excluded' && taxSettings.taxRate > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{taxSettings.taxName} ({taxSettings.taxRate}%):</span>
                    <span>{formatCurrency(tax, selectedCurrency)}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping:</span>
                    <span>{formatCurrency(shipping, selectedCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>{formatCurrency(total, selectedCurrency)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Invoice Button */}
      <div className="flex justify-center">
        <Button
          onClick={createInvoice}
          size="lg"
          className="px-12 py-3 text-lg shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
          disabled={!buyer.name || items.length === 0}
        >
          <MaterialIcon name="receipt_long" size={24} className="mr-3" />
          Create & Save Invoice
          <MaterialIcon name="arrow_forward" size={20} className="ml-3" />
        </Button>
      </div>
    </div>
  );
};