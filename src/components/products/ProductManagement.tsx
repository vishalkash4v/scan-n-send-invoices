import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Product } from "@/types/invoice";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/use-toast";

export const ProductManagement = () => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    unitPrice: 0,
    barcode: ''
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.unitPrice <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid product name and price.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({ name: '', description: '', unitPrice: 0, barcode: '' });
    setShowAddForm(false);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to your inventory.`
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from your inventory."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product inventory and pricing</p>
        </div>
        <Button 
          variant="hero" 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <MaterialIcon name="add" size={20} />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search products by name, barcode, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MaterialIcon name="add_shopping_cart" className="text-primary" />
              <span>Add New Product</span>
            </CardTitle>
            <CardDescription>Enter product details for your inventory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name *</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Unit Price *</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newProduct.unitPrice}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product-barcode">Barcode</Label>
              <Input
                id="product-barcode"
                value={newProduct.barcode}
                onChange={(e) => setNewProduct(prev => ({ ...prev, barcode: e.target.value }))}
                placeholder="Enter or scan barcode"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Product description (optional)"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MaterialIcon name="inventory_2" className="text-muted-foreground mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'No products match your search criteria.' : 'Start by adding your first product.'}
                </p>
                <Button variant="hero" onClick={() => setShowAddForm(true)}>
                  Add Your First Product
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    {product.description && (
                      <p className="text-muted-foreground mt-1">{product.description}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-2xl font-bold text-primary">${product.unitPrice.toFixed(2)}</span>
                      {product.barcode && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MaterialIcon name="qr_code" size={16} />
                          <span>{product.barcode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <MaterialIcon name="edit" size={20} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <MaterialIcon name="delete" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};