import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, DraftingCompass, Home as HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

const services = [
  {
    icon: <DraftingCompass className="w-8 h-8 text-primary" />,
    title: "Planos Arquitectónicos",
    description: "Diseño detallado y técnico para la construcción de tus proyectos."
  },
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "Renders y Visualización 3D",
    description: "Visualiza tus ideas con renders fotorrealistas de alta calidad."
  },
  {
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    title: "Diseño de Interiores",
    description: "Creamos espacios funcionales y estéticos que reflejan tu estilo."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-headline mb-4 drop-shadow-md">
            Diseñando Espacios, Construyendo Sueños
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
            En DMG Arquitectura, transformamos tus ideas en realidades tangibles con diseños innovadores, funcionales y estéticos.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/portfolio">Ver Portafolio</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-4">Nuestros Valores</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Combinamos creatividad, precisión técnica y una profunda comprensión de tus necesidades para entregar proyectos excepcionales.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 rounded-full p-4 w-fit mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild>
              <Link href="/services">Conoce Todos los Servicios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
