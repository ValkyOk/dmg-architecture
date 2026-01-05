import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery';

export default function PortfolioPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Portafolio de Proyectos</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Explora una selección de mis trabajos, desde conceptos visuales hasta proyectos completamente realizados.
        </p>
      </div>
      <PortfolioGallery />
    </div>
  );
}
