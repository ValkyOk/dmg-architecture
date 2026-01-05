import { QuotationForm } from '@/components/services/quotation-form';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const servicesList = [
    "Planos arquitectónicos (distribución, cortes, fachadas)",
    "Renders fotorrealistas y visualización 3D",
    "Recorridos virtuales interactivos",
    "Asesoría en selección de materiales y acabados",
    "Diseño de interiores y mobiliario",
    "Supervisión arquitectónica de obra",
    "Estudios de factibilidad y normativa",
    "Diseño paisajístico y de exteriores",
];

export default function ServicesPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Nuestros Servicios</h1>
          <p className="max-w-2xl text-lg text-muted-foreground mb-8">
            Ofrecemos una gama completa de servicios para llevar tu proyecto desde la concepción hasta la realidad, con un enfoque en la calidad, la innovación y la satisfacción del cliente.
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
                    <CardTitle className="font-headline text-3xl">Solicita una Cotización</CardTitle>
                    <CardDescription>Completa el formulario y nos pondremos en contacto para darte un presupuesto personalizado.</CardDescription>
                </CardHeader>
                <QuotationForm />
            </Card>
        </div>
      </div>
    </div>
  );
}
