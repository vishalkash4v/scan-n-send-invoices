import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I get started with InvoiceGen?",
      answer: "Simply click the 'Start Creating Invoices' button to access the admin panel. No registration required! Set up your company details, add your products, and start creating professional invoices immediately."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes! All your data is stored locally in your browser using localStorage. We don't collect, store, or have access to any of your business information. Your invoices and product data remain completely private on your device."
    },
    {
      question: "Can I scan barcodes with my mobile device?",
      answer: "Absolutely! Our barcode scanning feature works with both desktop and mobile devices. Use your camera to scan product barcodes or upload barcode images for instant product recognition and addition to your inventory."
    },
    {
      question: "What export formats are supported?",
      answer: "You can export your invoices in multiple formats: PDF for professional documents, JPG and PNG for images, and direct printing. All exports maintain high quality and professional formatting."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation required! InvoiceGen is a web-based application that works directly in your browser. It's compatible with all modern browsers and devices, including smartphones and tablets."
    },
    {
      question: "Can I use my own company logo?",
      answer: "Yes! You can easily upload your company logo, add your business information, tagline, and tax details. All invoices will be branded with your company information for a professional appearance."
    },
    {
      question: "Is there a limit to how many invoices I can create?",
      answer: "There are no limits! Create as many invoices, add as many products, and manage as many clients as you need. Everything is stored locally on your device with no restrictions."
    },
    {
      question: "Can I edit invoices after creating them?",
      answer: "Yes, you can view, edit, and manage all your previous invoices through the invoice history feature. Make changes to existing invoices and re-export them as needed."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about InvoiceGen
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-lg border shadow-card"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};