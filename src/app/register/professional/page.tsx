"use client";

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
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

type RegisterSchema = z.infer<typeof registerSchema>;


export default function RegisterProfessionalPage() {
  const { translations } = useLanguage();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const [firstName, ...lastNameParts] = data.name.split(' ');
      const lastName = lastNameParts.join(' ');

      const professionalData = {
        id: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: data.email,
        bio: "Profesional recién registrado.", // Default bio
      };
      
      const professionalDocRef = doc(firestore, "professionals", user.uid);
      setDocumentNonBlocking(professionalDocRef, professionalData, {});

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Serás redirigido a tu dashboard.",
      });

      router.push("/dashboard/professional");

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error en el registro",
            description: error.code === 'auth/email-already-in-use' 
              ? "Este correo electrónico ya está en uso." 
              : "Ocurrió un error inesperado.",
        });
    }
  };


  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translations.register_professional.title}</CardTitle>
          <CardDescription>{translations.register_professional.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">{translations.register_professional.name_label}</Label>
              <Input id="name" placeholder={translations.register_professional.name_placeholder} {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{translations.register_professional.email_label}</Label>
              <Input id="email" type="email" placeholder={translations.register_professional.email_placeholder} {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{translations.register_professional.password_label}</Label>
              <Input id="password" type="password" {...register("password")} />
               {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">{translations.register_professional.button}</Button>
            <div className="mt-4 text-center text-sm">
              {translations.register_professional.login_prompt}{" "}
              <Link href="/login" className="underline hover:text-primary">
                {translations.register_professional.login_link}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
