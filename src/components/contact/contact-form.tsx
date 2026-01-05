"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

export function ContactForm() {
    const { translations } = useLanguage();
    const { toast } = useToast();

    const formSchema = z.object({
        name: z.string().min(2, translations.validation.name_min),
        email: z.string().email(translations.validation.email_invalid),
        subject: z.string().min(3, translations.validation.subject_min),
        message: z.string().min(10, translations.validation.message_min),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: translations.contact.toast_success_title,
            description: translations.contact.toast_success_desc,
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{translations.contact.form_name_label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={translations.contact.form_name_placeholder} {...field} />
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
                                <FormLabel>{translations.contact.form_email_label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={translations.contact.form_email_placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.contact.form_subject_label}</FormLabel>
                            <FormControl>
                                <Input placeholder={translations.contact.form_subject_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{translations.contact.form_message_label}</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder={translations.contact.form_message_placeholder}
                                className="resize-y min-h-[120px]"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{translations.contact.form_button}</Button>
            </form>
        </Form>
    );
}
