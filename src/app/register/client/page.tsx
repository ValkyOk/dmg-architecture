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

export default function RegisterClientPage() {
  const { translations } = useLanguage();
  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translations.register_client.title}</CardTitle>
          <CardDescription>{translations.register_client.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{translations.register_client.name_label}</Label>
              <Input id="name" placeholder={translations.register_client.name_placeholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{translations.register_client.email_label}</Label>
              <Input id="email" type="email" placeholder={translations.register_client.email_placeholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{translations.register_client.password_label}</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">{translations.register_client.button}</Button>
            <div className="mt-4 text-center text-sm">
              {translations.register_client.login_prompt}{" "}
              <Link href="/login" className="underline hover:text-primary">
                {translations.register_client.login_link}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
