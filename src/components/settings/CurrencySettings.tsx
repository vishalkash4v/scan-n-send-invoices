import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Company, TaxSettings } from "@/types/invoice";
import { SUPPORTED_CURRENCIES, GST_RATES, COMMON_TAX_RATES, getDefaultTaxSettings } from "@/utils/currencyUtils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export const CurrencySettings = () => {
  const { toast } = useToast();
  const [company, setCompany] = useLocalStorage<Company>('company', {} as Company);
  
  const [selectedCurrency, setSelectedCurrency] = useState(company.currency || 'USD');
  const [taxSettings, setTaxSettings] = useState<TaxSettings>(
    company.taxSettings || getDefaultTaxSettings(selectedCurrency)
  );
  const [shippingRate, setShippingRate] = useState(0);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    const defaultTax = getDefaultTaxSettings(currencyCode);
    setTaxSettings(defaultTax);
  };

  const saveCurrencySettings = () => {
    const updatedCompany = {
      ...company,
      currency: selectedCurrency,
      taxSettings: taxSettings
    };
    
    setCompany(updatedCompany);
    
    toast({
      title: "Settings Saved",
      description: "Currency and tax settings have been updated successfully.",
    });
  };

  const taxRates = selectedCurrency === 'INR' ? GST_RATES : COMMON_TAX_RATES;

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MaterialIcon name="currency_exchange" className="text-primary" />
            <span>Currency Settings</span>
          </CardTitle>
          <CardDescription>Configure your default currency and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Currency Selection */}
          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
            >
              {SUPPORTED_CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
            <p className="text-sm text-muted-foreground mt-1">
              This will be the default currency for all new invoices
            </p>
          </div>

          {/* Tax Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tax Configuration</h3>
            
            {/* Tax Type */}
            <div>
              <Label htmlFor="taxType">Tax Type</Label>
              <select
                id="taxType"
                value={taxSettings.taxType}
                onChange={(e) => setTaxSettings({
                  ...taxSettings,
                  taxType: e.target.value as 'included' | 'excluded' | 'none'
                })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
              >
                <option value="none">No Tax</option>
                <option value="excluded">Tax Excluded (added to subtotal)</option>
                <option value="included">Tax Included (within product prices)</option>
              </select>
            </div>

            {taxSettings.taxType !== 'none' && (
              <>
                {/* Tax Name */}
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

                {/* Tax Rate */}
                <div>
                  <Label htmlFor="taxRate">Tax Rate</Label>
                  <select
                    id="taxRate"
                    value={taxSettings.taxRate}
                    onChange={(e) => setTaxSettings({
                      ...taxSettings,
                      taxRate: parseFloat(e.target.value)
                    })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                  >
                    {taxRates.map((rate) => (
                      <option key={rate.rate} value={rate.rate}>
                        {rate.name}
                      </option>
                    ))}
                  </select>
                  {selectedCurrency === 'INR' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      GST rates as per Indian tax structure
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Shipping */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableShipping"
                checked={taxSettings.enableShipping}
                onChange={(e) => setTaxSettings({
                  ...taxSettings,
                  enableShipping: e.target.checked
                })}
                className="rounded border-border"
              />
              <Label htmlFor="enableShipping">Enable shipping charges</Label>
            </div>
          </div>

          <Button onClick={saveCurrencySettings} className="w-full">
            <MaterialIcon name="save" size={16} className="mr-2" />
            Save Currency Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};