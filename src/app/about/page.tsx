import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Award, GraduationCap, Lightbulb, UserCheck, Languages, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-david');

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Sobre David Montoya Giraldo</h1>
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
                Perfil Profesional
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Estoy cursando actualmente el sexto semestre de mi formación académica. Estoy interesado en realizar prácticas en empresas enfocadas en la remodelación y renovación diseño y administración de obras para desarrollar mis habilidades y adquirir experiencia práctica. Cuento con conocimientos en detalles arquitectónicos, dominio de software enfocado a la arquitectura, motores de renderizado. Poseo habilidades en representación digital, dominio de Revit, AutoCAD, conocimiento aplicado a motores de renderizado y al trabajo en equipo, y estoy continuamente buscando oportunidades para mejorar y aprender. Mis intereses profesionales incluyen la búsqueda constante de conocimiento mediante libros, revistas y redes sociales, de igual manera presento interés en la nuevas tecnologías, y estoy ansioso por contribuir y aprender en un escenario profesional.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <GraduationCap className="w-7 h-7" />
                Formación
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                <b>Arquitectura (6º semestre)</b> - Universidad Católica de Pereira
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <UserCheck className="w-7 h-7" />
                Aptitudes
              </h2>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Conocimientos en detalles arquitectónicos</li>
                <li>Dominio de software: Revit, AutoCAD</li>
                <li>Manejo de motores de renderizado</li>
                <li>Habilidades en representación digital</li>
                <li>Capacidad para trabajar en equipo</li>
                <li>Búsqueda contínua de conocimiento y aprendizaje</li>
              </ul>
            </div>
            
             <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <Languages className="w-7 h-7" />
                Idiomas
              </h2>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Español: Nativo</li>
                <li>Inglés: Intermedio (B1)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
