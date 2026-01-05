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
import { useLanguage } from "@/context/language-context";

export function QuotationForm() {
    const { translations } = useLanguage();
    const { toast } = useToast();

    const formSchema = z.object({
        name: z.string().min(2, translations.validation.name_min),
        email: z.string().email(translations.validation.email_invalid),
        projectType: z.string({
            required_error: translations.validation.project_type_required,
        }),
        size: z.coerce.number().min(1, translations.validation.size_min),
        deliverables: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: translations.validation.deliverables_required,
        }),
        details: z.string().optional(),
    });

    const deliverablesItems = [
        { id: "plans", label: translations.quotation_form.deliverable_plans },
        { id: "renders", label: translations.quotation_form.deliverable_renders },
        { id: "interior", label: translations.quotation_form.deliverable_interior },
        { id: "consulting", label: translations.quotation_form.deliverable_consulting },
    ]

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
            title: translations.quotation_form.toast_success_title,
            description: translations.quotation_form.toast_success_desc,
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
                                <FormLabel>{translations.quotation_form.name_label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={translations.quotation_form.name_placeholder} {...field} />
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
                                <FormLabel>{translations.quotation_form.email_label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={translations.quotation_form.email_placeholder} {...field} />
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
                                <FormLabel>{translations.quotation_form.project_type_label}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={translations.quotation_form.project_type_placeholder} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="residencial">{translations.quotation_form.project_type_residential}</SelectItem>
                                        <SelectItem value="comercial">{translations.quotation_form.project_type_commercial}</SelectItem>
                                        <SelectItem value="remodelacion">{translations.quotation_form.project_type_remodeling}</SelectItem>
                                        <SelectItem value="otro">{translations.quotation_form.project_type_other}</SelectItem>
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
                                <FormLabel>{translations.quotation_form.size_label}</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder={translations.quotation_form.size_placeholder} {...field} />
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
                            <FormLabel className="text-base">{translations.quotation_form.deliverables_label}</FormLabel>
                            <FormDescription>
                                {translations.quotation_form.deliverables_desc}
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
                            <FormLabel>{translations.quotation_form.details_label}</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder={translations.quotation_form.details_placeholder}
                                className="resize-y"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{translations.quotation_form.button}</Button>
            </form>
        </Form>
    );
}
