"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useLanguage } from "@/context/language-context";

interface AddProjectDialogProps {
  professionalId: string;
  triggerButton?: boolean;
}

export function AddProjectDialog({ professionalId, triggerButton = false }: AddProjectDialogProps) {
  const { translations } = useLanguage();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const formSchema = z.object({
    title: z.string().min(3, "El título es requerido."),
    description: z.string().min(10, "La descripción es requerida."),
    projectType: z.enum(["completed", "render", "plan"], {
      required_error: "Selecciona un tipo de proyecto.",
    }),
    imageUrl: z.string().url("Debe ser una URL de imagen válida."),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (!professionalId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo identificar al profesional.",
      });
      return;
    }

    try {
      const projectsCollection = collection(firestore, `professionals/${professionalId}/projects`);
      await addDoc(projectsCollection, {
        ...data,
        professionalId,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Proyecto añadido",
        description: "El nuevo proyecto ha sido guardado exitosamente.",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding project: ", error);
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: "No se pudo añadir el proyecto. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
           <Button>
             <PlusCircle className="mr-2 h-4 w-4" />
             Añadir primer proyecto
           </Button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {translations.dashboard_professional.upload_title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.dashboard_professional.upload_title}</DialogTitle>
          <DialogDescription>
            Completa los detalles para añadir un nuevo proyecto a tu portafolio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Residencia Moderna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu proyecto..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Proyecto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completo</SelectItem>
                      <SelectItem value="render">Render</SelectItem>
                      <SelectItem value="plan">Plano</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Guardando..." : "Guardar Proyecto"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
