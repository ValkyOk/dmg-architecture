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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Tabs defaultValue="client" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client">Cliente</TabsTrigger>
          <TabsTrigger value="professional">Profesional</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Acceso Cliente</CardTitle>
              <CardDescription>
                Ingresa a tu cuenta para ver el estado de tus proyectos y descargar archivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-email">Correo Electrónico</Label>
                <Input id="client-email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-password">Contraseña</Label>
                <Input id="client-password" type="password" />
              </div>
              <Button type="submit" className="w-full">Ingresar</Button>
               <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href="/register/client" className="underline hover:text-primary">
                  Regístrate aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Acceso Profesional</CardTitle>
              <CardDescription>
                Accede a tu área privada para gestionar tus proyectos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="prof-email">Correo Electrónico</Label>
                <Input id="prof-email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prof-password">Contraseña</Label>
                <Input id="prof-password" type="password" />
              </div>
              <Button type="submit" className="w-full">Ingresar</Button>
               <div className="mt-4 text-center text-sm">
                ¿No eres colaborador?{" "}
                <Link href="/register/professional" className="underline hover:text-primary">
                  Regístrate aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
