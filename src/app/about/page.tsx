import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Award, GraduationCap, Lightbulb, UserCheck, Languages } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-david');

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Sobre David Montoya Giraldo</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Estudiante con gran interés en acceder al mercado laboral para poner en práctica mis conocimientos. Soy una persona trabajadora, comunicativa y comprometida.
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
                Resumen Profesional
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Con una base sólida en diseño adquirida en el Colegio Militar Rafael Reyes y consolidada durante los últimos siete semestres en la Facultad de Arquitectura de la Universidad Católica de Pereira, me destaco por mi capacidad para trabajar en equipo, mi compromiso y mi habilidad para resolver conflictos. Mi experiencia en el manejo de software de diseño como AutoCAD y SketchUp, sumada a mi interés por aprender nuevas herramientas, me posiciona como un profesional en constante crecimiento. Busco aplicar mis conocimientos en proyectos que me permitan desarrollar mis habilidades y contribuir al éxito de un equipo de trabajo.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <GraduationCap className="w-7 h-7" />
                Formación
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                <b>Arquitectura (7º semestre)</b> - Universidad Católica de Pereira<br/>
                <b>Bachillerato</b> - Colegio Militar Rafael Reyes, Pereira
              </p>
              <p className="text-foreground/80">
                Promedio general de calificaciones: 4.0/5.0
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <UserCheck className="w-7 h-7" />
                Aptitudes
              </h2>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Puntualidad, responsabilidad y compromiso.</li>
                <li>Excelente atención al cliente, cortesía y profesionalidad.</li>
                <li>Uso de aplicaciones de diseño (Autocad, Photoshop, Sketchup).</li>
                <li>Capacidad para trabajar en equipo y resolver conflictos.</li>
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
