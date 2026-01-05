"use client";

import { QuotationForm } from '@/components/services/quotation-form';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ServicesPage() {
  const { translations } = useLanguage();
  
  const servicesList = [
      translations.services.service_1,
      translations.services.service_2,
      translations.services.service_3,
      translations.services.service_4,
      translations.services.service_5,
      translations.services.service_6,
      translations.services.service_7,
      translations.services.service_8,
  ];

  return (
    <div className="container py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">{translations.services.title}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground mb-8">
            {translations.services.subtitle}
          </p>
          <div className="space-y-4">
            {servicesList.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-foreground/90">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
            <Card className="p-6 md:p-8 shadow-lg bg-card">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="font-headline text-3xl">{translations.services.quotation_title}</CardTitle>
                    <CardDescription>{translations.services.quotation_subtitle}</CardDescription>
                </CardHeader>
                <QuotationForm />
            </Card>
        </div>
      </div>
    </div>
  );
}
