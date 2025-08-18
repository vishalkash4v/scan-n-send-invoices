import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Company } from "@/types/invoice";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const CompanySetup = () => {
  const [company, setCompany] = useLocalStorage<Company>('company', {
    name: '',
    tagline: '',
    address: '',
    taxInfo: '',
    logo: ''
  });

  const [isEditing, setIsEditing] = useState(!company.name);

  const handleInputChange = (field: keyof Company, value: string) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center space-x-2">
            <MaterialIcon name="business" className="text-primary" />
            <span>Company Information</span>
          </CardTitle>
          <CardDescription>
            Set up your company details for invoices
          </CardDescription>
        </div>
        <Button
          variant={isEditing ? "hero" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2"
        >
          <MaterialIcon name={isEditing ? "check" : "edit"} size={16} />
          <span>{isEditing ? "Save" : "Edit"}</span>
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Logo Upload */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
            {company.logo ? (
              <img src={company.logo} alt="Company Logo" className="w-full h-full object-contain rounded-lg" />
            ) : (
              <MaterialIcon name="add_photo_alternate" className="text-muted-foreground" size={32} />
            )}
          </div>
          {isEditing && (
            <div>
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span className="flex items-center space-x-2">
                    <MaterialIcon name="upload" size={16} />
                    <span>Upload Logo</span>
                  </span>
                </Button>
              </Label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Company Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name *</Label>
            <Input
              id="company-name"
              value={company.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-tagline">Tagline</Label>
            <Input
              id="company-tagline"
              value={company.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              disabled={!isEditing}
              placeholder="Your company tagline"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-address">Address</Label>
          <Textarea
            id="company-address"
            value={company.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            placeholder="Company address"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-info">Tax Information</Label>
          <Input
            id="tax-info"
            value={company.taxInfo}
            onChange={(e) => handleInputChange('taxInfo', e.target.value)}
            disabled={!isEditing}
            placeholder="VAT/GST number, etc."
          />
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button variant="hero" onClick={handleSave} className="flex items-center space-x-2">
              <MaterialIcon name="save" size={16} />
              <span>Save Company Details</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};