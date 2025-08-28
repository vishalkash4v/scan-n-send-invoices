import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice, InvoiceItem, Product, Buyer, Company, TaxSettings, Discount } from "@/types/invoice";
import { useToast } from "@/hooks/use-toast";
import { RelatedLinks } from "@/components/ui/related-links";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { exportToPDF, exportToPNG, exportToJPG } from "@/utils/exportUtils";
import { SUPPORTED_CURRENCIES, formatCurrency, getDefaultTaxSettings } from "@/utils/currencyUtils";
import { INVOICE_TEMPLATES } from "./templates";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { SEOHead } from "@/components/seo/SEOHead";

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
  const [discount, setDiscount] = useState<Discount>({ type: 'flat', amount: 0, name: '' });
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

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

  const updateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    const updatedItems = items.map((item, i) => 
      i === index 
        ? { ...item, quantity: newQuantity, total: item.unitPrice * newQuantity }
        : item
    );
    setItems(updatedItems);
  };

  const editItem = (index: number) => {
    setEditingItemIndex(index);
  };

  const saveItemEdit = (index: number) => {
    setEditingItemIndex(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  
  // Calculate discount amount
  let discountAmount = 0;
  if (discount.amount > 0) {
    discountAmount = discount.type === 'percentage' 
      ? subtotal * (discount.amount / 100)
      : discount.amount;
  }
  
  const discountedSubtotal = subtotal - discountAmount;
  
  let tax = 0;
  if (taxSettings.taxType === 'excluded' && taxSettings.taxRate > 0) {
    tax = discountedSubtotal * (taxSettings.taxRate / 100);
  }
  
  const shipping = taxSettings.enableShipping ? shippingAmount : 0;
  const total = discountedSubtotal + tax + shipping;

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
      discount: discount.amount > 0 ? discount : undefined,
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
    setDiscount({ type: 'flat', amount: 0, name: '' });
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
    <>
      <SEOHead 
        title="Create Invoice - Professional Invoice Generator"
        description="Create professional invoices with real-time preview, multiple templates, and instant PDF export. Add products, customize templates, and manage your billing efficiently."
        keywords="create invoice, invoice generator, invoice template, PDF invoice, professional invoicing"
      />
      <div className="space-y-4 lg:space-y-6 px-4 lg:px-0">
        <Breadcrumbs 
          items={[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Create Invoice' }
          ]} 
        />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <MaterialIcon name="add_circle" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Create New Invoice</h1>
              <p className="text-muted-foreground text-sm lg:text-base">Generate professional invoices with real-time preview</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
              disabled={items.length === 0}
              className="text-xs lg:text-sm"
            >
              <MaterialIcon name="picture_as_pdf" size={16} className="mr-1 lg:mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('png')}
              disabled={items.length === 0}
              className="text-xs lg:text-sm"
            >
              <MaterialIcon name="image" size={16} className="mr-1 lg:mr-2" />
              Export PNG
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <div className="space-y-4 lg:space-y-6 lg:col-span-1">
            {/* Template Selection */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="palette" className="text-primary" size={20} />
                  <span>Invoice Template</span>
                </CardTitle>
                <CardDescription className="text-sm">Choose your preferred invoice design</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {INVOICE_TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={`p-2 lg:p-3 border rounded-lg cursor-pointer transition-colors text-sm ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Currency & Tax Settings */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="currency_exchange" className="text-primary" size={20} />
                  <span>Currency & Tax</span>
                </CardTitle>
                <CardDescription className="text-sm">Configure invoice currency and tax settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                {/* Currency Selection */}
                <div>
                  <Label htmlFor="currency" className="text-sm">Currency</Label>
                  <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={(e) => {
                      setSelectedCurrency(e.target.value);
                      setTaxSettings(getDefaultTaxSettings(e.target.value));
                    }}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                  <Label htmlFor="taxType" className="text-sm">Tax Type</Label>
                  <select
                    id="taxType"
                    value={taxSettings.taxType}
                    onChange={(e) => setTaxSettings({
                      ...taxSettings,
                      taxType: e.target.value as 'included' | 'excluded' | 'none'
                    })}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="none">No Tax</option>
                    <option value="excluded">Tax Excluded</option>
                    <option value="included">Tax Included</option>
                  </select>
                </div>

                {taxSettings.taxType !== 'none' && (
                  <>
                    <div>
                      <Label htmlFor="taxRate" className="text-sm">Tax Rate (%)</Label>
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
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxName" className="text-sm">Tax Name</Label>
                      <Input
                        id="taxName"
                        value={taxSettings.taxName}
                        onChange={(e) => setTaxSettings({
                          ...taxSettings,
                          taxName: e.target.value
                        })}
                        placeholder="e.g., GST, VAT, Sales Tax"
                        className="text-sm"
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
                    <Label htmlFor="enableShipping" className="text-sm">Enable Shipping</Label>
                  </div>
                  {taxSettings.enableShipping && (
                    <div>
                      <Label htmlFor="shippingAmount" className="text-sm">Shipping Amount</Label>
                      <Input
                        id="shippingAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={shippingAmount}
                        onChange={(e) => setShippingAmount(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="text-sm"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Discount Settings */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="discount" className="text-primary" size={20} />
                  <span>Discount</span>
                </CardTitle>
                <CardDescription className="text-sm">Add discount to invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="discountName" className="text-sm">Discount Name</Label>
                  <Input
                    id="discountName"
                    value={discount.name}
                    onChange={(e) => setDiscount({ ...discount, name: e.target.value })}
                    placeholder="e.g., Early Bird, Bulk Order"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="discountType" className="text-sm">Discount Type</Label>
                  <select
                    id="discountType"
                    value={discount.type}
                    onChange={(e) => setDiscount({ ...discount, type: e.target.value as 'flat' | 'percentage' })}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="flat">Flat Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="discountAmount" className="text-sm">
                    {discount.type === 'percentage' ? 'Percentage (%)' : 'Amount'}
                  </Label>
                  <Input
                    id="discountAmount"
                    type="number"
                    min="0"
                    step={discount.type === 'percentage' ? '0.1' : '0.01'}
                    max={discount.type === 'percentage' ? '100' : undefined}
                    value={discount.amount}
                    onChange={(e) => setDiscount({ ...discount, amount: parseFloat(e.target.value) || 0 })}
                    placeholder={discount.type === 'percentage' ? '10' : '0.00'}
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Buyer Information */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="person" className="text-primary" size={20} />
                  <span>Buyer Information</span>
                </CardTitle>
                <CardDescription className="text-sm">Enter your client's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="buyerName" className="text-sm">Name *</Label>
                  <Input
                    id="buyerName"
                    value={buyer.name}
                    onChange={(e) => setBuyer({...buyer, name: e.target.value})}
                    placeholder="Client name"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="buyerEmail" className="text-sm">Email</Label>
                  <Input
                    id="buyerEmail"
                    type="email"
                    value={buyer.email}
                    onChange={(e) => setBuyer({...buyer, email: e.target.value})}
                    placeholder="client@example.com"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="buyerPhone" className="text-sm">Phone</Label>
                  <Input
                    id="buyerPhone"
                    type="tel"
                    value={buyer.phone}
                    onChange={(e) => setBuyer({...buyer, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="buyerAddress" className="text-sm">Address</Label>
                  <Textarea
                    id="buyerAddress"
                    value={buyer.address}
                    onChange={(e) => setBuyer({...buyer, address: e.target.value})}
                    placeholder="Client address"
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Items */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="add_shopping_cart" className="text-primary" size={20} />
                  <span>Add Items</span>
                </CardTitle>
                <CardDescription className="text-sm">Select products and quantities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="product" className="text-sm">Product</Label>
                  <select
                    id="product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                  <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="text-sm"
                  />
                </div>
                <Button onClick={addItem} className="w-full text-sm" disabled={!selectedProduct}>
                  <MaterialIcon name="add" size={16} className="mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Invoice Preview */}
          <div className="lg:col-span-2 xl:col-span-3">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <MaterialIcon name="preview" className="text-primary" size={20} />
                  <span>Live Preview - {INVOICE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
                </CardTitle>
                <CardDescription className="text-sm">Real-time invoice preview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[400px] lg:max-h-[600px] overflow-y-auto border rounded-lg">
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
                    discount={discount.amount > 0 ? discount : undefined}
                    total={total}
                    currency={selectedCurrency}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Invoice Items */}
        {items.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base lg:text-lg">Invoice Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 lg:p-4 bg-muted/30 rounded-lg gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm lg:text-base truncate">{item.productName}</h4>
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 text-xs lg:text-sm text-muted-foreground">
                        <span>{formatCurrency(item.unitPrice, selectedCurrency)} × {item.quantity}</span>
                        <span className="hidden lg:inline">=</span>
                        <span className="font-medium">{formatCurrency(item.total, selectedCurrency)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 w-full lg:w-auto">
                      {editingItemIndex === index ? (
                        <>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 text-xs"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveItemEdit(index)}
                            className="h-8 px-2 text-xs"
                          >
                            <MaterialIcon name="check" size={16} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editItem(index)}
                            className="h-8 px-2 text-xs"
                          >
                            <MaterialIcon name="edit" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="text-destructive hover:text-destructive h-8 px-2"
                          >
                            <MaterialIcon name="delete" size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="space-y-2 text-right text-sm lg:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal, selectedCurrency)}</span>
                  </div>
                  {discount.amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount.name}):</span>
                      <span>-{discount.type === 'percentage' ? `${discount.amount}%` : formatCurrency(discount.amount, selectedCurrency)}</span>
                    </div>
                  )}
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

        {/* Related Links Sidebar - Mobile version at bottom */}
        <div className="lg:hidden">
          <RelatedLinks links={relatedLinks} />
        </div>

        {/* Create Invoice Button */}
        <div className="flex justify-center pb-6">
          <Button
            onClick={createInvoice}
            size="lg"
            className="px-8 lg:px-12 py-3 text-base lg:text-lg shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300 w-full lg:w-auto"
            disabled={!buyer.name || items.length === 0}
          >
            <MaterialIcon name="receipt_long" size={24} className="mr-3" />
            Create & Save Invoice
            <MaterialIcon name="arrow_forward" size={20} className="ml-3" />
          </Button>
        </div>
      </div>
    </>
  );
};