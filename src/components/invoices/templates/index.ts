import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { CompactTemplate } from './CompactTemplate';
import { TechTemplate } from './TechTemplate';

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  preview: string;
}

export const INVOICE_TEMPLATES: InvoiceTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional invoice layout',
    component: ClassicTemplate,
    preview: '/templates/classic-preview.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean gradient header with modern typography',
    component: ModernTemplate,
    preview: '/templates/modern-preview.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with minimal styling',
    component: MinimalTemplate,
    preview: '/templates/minimal-preview.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-focused design with elegant typography',
    component: ProfessionalTemplate,
    preview: '/templates/professional-preview.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant design with gradient accents',
    component: CreativeTemplate,
    preview: '/templates/creative-preview.png'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Clean corporate style with bold headers',
    component: CorporateTemplate,
    preview: '/templates/corporate-preview.png'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with refined elements',
    component: ElegantTemplate,
    preview: '/templates/elegant-preview.png'
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient layout perfect for small invoices',
    component: CompactTemplate,
    preview: '/templates/compact-preview.png'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Dark theme with code-inspired design',
    component: TechTemplate,
    preview: '/templates/tech-preview.png'
  }
];

export {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  ProfessionalTemplate,
  CreativeTemplate,
  CorporateTemplate,
  ElegantTemplate,
  CompactTemplate,
  TechTemplate
};