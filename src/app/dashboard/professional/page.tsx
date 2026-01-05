"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Folder } from 'lucide-react';
import { useLanguage } from "@/context/language-context";

export default function ProfessionalDashboardPage() {
  const { translations } = useLanguage();
  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">{translations.dashboard_professional.title}</h1>
        <p className="text-lg text-muted-foreground">{translations.dashboard_professional.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.dashboard_professional.upload_title}</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{translations.dashboard_professional.upload_desc}</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.dashboard_professional.download_title}</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{translations.dashboard_professional.download_desc}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.dashboard_professional.my_projects_title}</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{translations.dashboard_professional.my_projects_desc}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-card p-8 rounded-lg">
        <h3 className="font-headline text-2xl mb-4">{translations.dashboard_professional.coming_soon_title}</h3>
        <p className="text-muted-foreground">{translations.dashboard_professional.coming_soon_desc}</p>
      </div>
    </div>
  );
}
