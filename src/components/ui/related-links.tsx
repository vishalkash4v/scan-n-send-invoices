import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialIcon } from "@/components/ui/material-icon";

interface RelatedLink {
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export const RelatedLinks = ({ title = "Related Actions", links }: RelatedLinksProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MaterialIcon name="link" className="text-primary" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.map((link, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start h-auto p-3 hover:bg-muted/50"
            onClick={link.action}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MaterialIcon name={link.icon} className="text-primary" size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{link.title}</p>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};