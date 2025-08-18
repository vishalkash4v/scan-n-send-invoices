import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Invoice, Product } from "@/types/invoice";

export const QuickStats = () => {
  const [invoices] = useLocalStorage<Invoice[]>('invoices', []);
  const [products] = useLocalStorage<Product[]>('products', []);

  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const totalProducts = products.length;
  const pendingInvoices = totalInvoices; // For now, all invoices are pending

  const stats = [
    {
      title: "Total Invoices",
      value: totalInvoices.toString(),
      icon: "receipt_long",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: "attach_money",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      icon: "inventory_2",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Pending",
      value: pendingInvoices.toString(),
      icon: "pending",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <MaterialIcon name={stat.icon} className={stat.color} size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};