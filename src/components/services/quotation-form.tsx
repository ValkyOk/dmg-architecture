"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor ingresa un correo electrónico válido."),
  projectType: z.string({
    required_error: "Por favor selecciona un tipo de proyecto.",
  }),
  size: z.coerce.number().min(1, "El tamaño debe ser mayor a 0."),
  deliverables: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un entregable.",
  }),
  details: z.string().optional(),
});

const deliverablesItems = [
    { id: "plans", label: "Planos Arquitectónicos" },
    { id: "renders", label: "Renders / Visualización 3D" },
    { id: "interior", label: "Diseño de Interiores" },
    { id: "consulting", label: "Asesoría" },
]

export function QuotationForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            size: 0,
            deliverables: [],
            details: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Solicitud Enviada",
            description: "Gracias por tu interés. Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre Completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: Juan Pérez" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: juan.perez@email.com" {...field} />
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
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="residencial">Residencial</SelectItem>
                                        <SelectItem value="comercial">Comercial</SelectItem>
                                        <SelectItem value="remodelacion">Remodelación</SelectItem>
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tamaño aproximado (m²)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ej: 120" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="deliverables"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Servicios Requeridos</FormLabel>
                            <FormDescription>
                            Selecciona los entregables que necesitas para tu proyecto.
                            </FormDescription>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                        {deliverablesItems.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="deliverables"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Detalles Adicionales</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Cuéntanos más sobre tu proyecto, tus ideas y requerimientos."
                                className="resize-y"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Solicitar Cotización</Button>
            </form>
        </Form>
    );
}
