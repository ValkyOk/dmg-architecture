import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Folder } from 'lucide-react';

export default function ProfessionalDashboardPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">Área de Profesionales</h1>
        <p className="text-lg text-muted-foreground">Bienvenido a tu espacio de trabajo. Gestiona tus proyectos y recursos.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subir Proyecto</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Sube nuevos archivos, planos o renders a un proyecto existente o nuevo.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descargar Material</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Accede a la librería de recursos exclusivos y materiales de proyectos.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Proyectos</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Visualiza y gestiona los proyectos en los que estás colaborando.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 bg-card p-8 rounded-lg">
        <h3 className="font-headline text-2xl mb-4">Próximamente</h3>
        <p className="text-muted-foreground">Estamos trabajando en más herramientas para facilitar la colaboración y gestión de proyectos. ¡Mantente atento a las actualizaciones!</p>
      </div>
    </div>
  );
}
