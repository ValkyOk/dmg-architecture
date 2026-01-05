import { ContactForm } from '@/components/contact/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Contacto</h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                ¿Tienes un proyecto en mente? Hablemos. Estoy aquí para ayudarte a materializar tus ideas.
            </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
                <ContactForm />
            </div>
            <div className="lg:col-span-2">
                <div className="bg-card p-8 rounded-lg shadow-md h-full space-y-6">
                    <h3 className="font-headline text-2xl text-primary">Información de Contacto</h3>
                    <div className="space-y-4 text-foreground/80">
                         <div className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-semibold">Ubicación</h4>
                                <p>Medellín, Antioquia, Colombia</p>
                                <p className="text-sm">(Atención con cita previa)</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-semibold">Correo Electrónico</h4>
                                <a href="mailto:david.montoya@dmg-arq.com" className="hover:text-primary transition-colors">david.montoya@dmg-arq.com</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="w-5 h-5 text-accent mt-1" />
                             <div>
                                <h4 className="font-semibold">Teléfono</h4>
                                <p>+57 300 123 4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
