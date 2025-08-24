import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice, InvoiceItem, Product, Buyer, Company } from "@/types/invoice";
import { useToast } from "@/hooks/use-toast";

export const CreateInvoice = () => {
  const { toast } = useToast();
  const [products] = useLocalStorage<Product[]>('products', []);
  const [company] = useLocalStorage<Company>('company', {} as Company);
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', []);

  const [buyer, setBuyer] = useState<Buyer>({
    name: '',
    address: '',
    email: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

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
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

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
      total,
      company
    };

    setInvoices([...invoices, newInvoice]);
    
    toast({
      title: "Success",
      description: "Invoice created successfully!",
    });

    // Reset form
    setBuyer({ name: '', address: '', email: '' });
    setItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <MaterialIcon name="add_circle" className="text-primary" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create New Invoice</h1>
          <p className="text-muted-foreground">Generate professional invoices for your clients</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
                    {product.name} - ${product.unitPrice}
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
                      ${item.unitPrice} × {item.quantity} = ${item.total.toFixed(2)}
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Invoice Button */}
      <div className="flex justify-end">
        <Button
          onClick={createInvoice}
          size="lg"
          className="px-8"
          disabled={!buyer.name || items.length === 0}
        >
          <MaterialIcon name="receipt_long" size={20} className="mr-2" />
          Create Invoice
        </Button>
      </div>
    </div>
  );
};