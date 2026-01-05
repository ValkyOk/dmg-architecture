"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const professionalLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type ProfessionalLoginSchema = z.infer<typeof professionalLoginSchema>;

export default function LoginPage() {
  const { translations } = useLanguage();
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register: registerProfessional,
    handleSubmit: handleSubmitProfessional,
    formState: { errors: errorsProfessional },
  } = useForm<ProfessionalLoginSchema>({
    resolver: zodResolver(professionalLoginSchema),
  });

  const onProfessionalSubmit: SubmitHandler<ProfessionalLoginSchema> = async (
    data
  ) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo.",
      });
      router.push("/dashboard/professional");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description:
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
            ? "Correo o contraseña incorrectos."
            : "Ocurrió un error inesperado.",
      });
    }
  };
  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Tabs defaultValue="professional" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client" disabled>
            {translations.login.client_tab}
          </TabsTrigger>
          <TabsTrigger value="professional">
            {translations.login.professional_tab}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {translations.login.client_title}
              </CardTitle>
              <CardDescription>
                {translations.login.client_desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-email">
                  {translations.login.email_label}
                </Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder={translations.login.email_placeholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-password">
                  {translations.login.password_label}
                </Label>
                <Input id="client-password" type="password" />
              </div>
              <Button type="submit" className="w-full" disabled>
                {translations.login.button}
              </Button>
              <div className="mt-4 text-center text-sm">
                {translations.login.client_register_prompt}{" "}
                <Link
                  href="/register/client"
                  className="underline hover:text-primary"
                >
                  {translations.login.client_register_link}
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {translations.login.prof_title}
              </CardTitle>
              <CardDescription>{translations.login.prof_desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitProfessional(onProfessionalSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="prof-email">
                    {translations.login.email_label}
                  </Label>
                  <Input
                    id="prof-email"
                    type="email"
                    placeholder={translations.login.email_placeholder}
                    {...registerProfessional("email")}
                  />
                  {errorsProfessional.email && (
                    <p className="text-sm text-destructive">
                      {errorsProfessional.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prof-password">
                    {translations.login.password_label}
                  </Label>
                  <Input
                    id="prof-password"
                    type="password"
                    {...registerProfessional("password")}
                  />
                   {errorsProfessional.password && (
                    <p className="text-sm text-destructive">
                      {errorsProfessional.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {translations.login.button}
                </Button>
                <div className="mt-4 text-center text-sm">
                  {translations.login.prof_register_prompt}{" "}
                  <Link
                    href="/register/professional"
                    className="underline hover:text-primary"
                  >
                    {translations.login.prof_register_link}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
