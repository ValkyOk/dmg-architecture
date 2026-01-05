"use client";

import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery';
import { useLanguage } from '@/context/language-context';

export default function PortfolioPage() {
  const { translations } = useLanguage();
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">{translations.portfolio.title}</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          {translations.portfolio.subtitle}
        </p>
      </div>
      <PortfolioGallery />
    </div>
  );
}
