import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterProfessionalPage() {
  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Registro de Profesional</CardTitle>
          <CardDescription>Únete a nuestra red de colaboradores. Completa tu registro para empezar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Ana López" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Input id="specialty" placeholder="Ej: Ingeniero Civil, Diseñador de interiores" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Registrarse</Button>
            <div className="mt-4 text-center text-sm">
              ¿Ya eres colaborador?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Ingresa aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
