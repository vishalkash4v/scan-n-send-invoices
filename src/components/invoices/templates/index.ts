import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';

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
  }
];

export {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate
};