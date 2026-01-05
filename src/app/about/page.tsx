import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Award, GraduationCap, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-david');

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Sobre David Montoya Giraldo</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Arquitecto apasionado por la creación de espacios que inspiran y perduran.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2">
          {aboutImage && (
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
               <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <Lightbulb className="w-7 h-7" />
                Filosofía de Diseño
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Mi enfoque se basa en el minimalismo elegante y la funcionalidad. Creo que cada línea y cada material deben tener un propósito, contribuyendo a una experiencia espacial cohesiva y significativa. Busco un equilibrio entre la estética moderna y el respeto por el entorno, creando arquitecturas que dialogan con su contexto y resisten el paso del tiempo.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <GraduationCap className="w-7 h-7" />
                Formación y Experiencia
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Graduado con honores de la Universidad Nacional de Colombia, he colaborado en diversos proyectos residenciales y comerciales, tanto a nivel nacional como internacional. Mi experiencia abarca desde el diseño conceptual y la creación de planos detallados hasta la supervisión de obra y la visualización 3D.
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Arquitecto, Universidad Nacional de Colombia</li>
                <li>Master en Diseño Sostenible, Universidad Politécnica de Valencia (Ficticio)</li>
                <li>5+ años de experiencia en firmas de arquitectura reconocidas.</li>
              </ul>
            </div>

             <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <Award className="w-7 h-7" />
                Reconocimientos
              </h2>
               <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Mi trabajo ha sido reconocido por su innovación y calidad en diseño.
              </p>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Premio Lápiz de Acero, Categoría Proyecto Académico (2020)</li>
                <li>Finalista, Concurso Internacional de Vivienda Social (2022)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
