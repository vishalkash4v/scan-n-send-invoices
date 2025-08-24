import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/types/invoice";
import { useToast } from "@/hooks/use-toast";

export const BarcodeScanner = () => {
  const { toast } = useToast();
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    setIsScanning(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const searchByBarcode = (barcode: string) => {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      setScannedProduct(product);
      toast({
        title: "Product Found",
        description: `Found: ${product.name}`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: "No product found with this barcode. You can add it as a new product.",
        variant: "destructive"
      });
    }
  };

  const handleManualSearch = () => {
    if (manualBarcode.trim()) {
      searchByBarcode(manualBarcode.trim());
    }
  };

  // Simulate barcode detection (in a real app, you'd use a barcode scanning library)
  const simulateBarcodeScan = () => {
    const sampleBarcodes = products.filter(p => p.barcode).map(p => p.barcode!);
    if (sampleBarcodes.length > 0) {
      const randomBarcode = sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)];
      searchByBarcode(randomBarcode);
      stopCamera();
    } else {
      toast({
        title: "No Products with Barcodes",
        description: "Add some products with barcodes first to test scanning.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <MaterialIcon name="qr_code_scanner" className="text-primary" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Barcode Scanner</h1>
          <p className="text-muted-foreground">Quickly find products by scanning barcodes</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Camera Scanner */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MaterialIcon name="videocam" className="text-primary" />
              <span>Camera Scanner</span>
            </CardTitle>
            <CardDescription>Use your device camera to scan barcodes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isScanning ? (
              <div className="text-center">
                <div className="w-full h-48 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                  <MaterialIcon name="camera_alt" className="text-muted-foreground" size={64} />
                </div>
                <Button onClick={startCamera} className="w-full">
                  <MaterialIcon name="videocam" size={16} className="mr-2" />
                  Start Camera
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 bg-black rounded-lg object-cover mb-4"
                />
                <div className="flex space-x-2">
                  <Button onClick={simulateBarcodeScan} className="flex-1">
                    <MaterialIcon name="center_focus_strong" size={16} className="mr-2" />
                    Simulate Scan
                  </Button>
                  <Button onClick={stopCamera} variant="outline" className="flex-1">
                    <MaterialIcon name="stop" size={16} className="mr-2" />
                    Stop Camera
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Entry */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MaterialIcon name="keyboard" className="text-primary" />
              <span>Manual Entry</span>
            </CardTitle>
            <CardDescription>Enter barcode manually</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter barcode number"
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              />
            </div>
            <Button onClick={handleManualSearch} className="w-full" disabled={!manualBarcode.trim()}>
              <MaterialIcon name="search" size={16} className="mr-2" />
              Search Product
            </Button>

            {/* Quick Access to Sample Barcodes */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Sample barcodes from your products:</p>
              <div className="space-y-1">
                {products.filter(p => p.barcode).slice(0, 3).map((product) => (
                  <Button
                    key={product.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setManualBarcode(product.barcode!);
                      searchByBarcode(product.barcode!);
                    }}
                    className="w-full justify-start text-xs"
                  >
                    {product.barcode} - {product.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanned Product Result */}
      {scannedProduct && (
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <MaterialIcon name="check_circle" />
              <span>Product Found</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-2">{scannedProduct.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <span className="ml-2 font-medium">${scannedProduct.unitPrice}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Barcode:</span>
                    <span className="ml-2 font-mono">{scannedProduct.barcode}</span>
                  </div>
                  {scannedProduct.description && (
                    <div>
                      <span className="text-muted-foreground">Description:</span>
                      <p className="mt-1">{scannedProduct.description}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button className="flex items-center space-x-2">
                  <MaterialIcon name="add_shopping_cart" size={16} />
                  <span>Add to Invoice</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};