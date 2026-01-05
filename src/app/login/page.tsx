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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export default function LoginPage() {
  const { translations } = useLanguage();
  return (
    <div className="container flex items-center justify-center py-16 md:py-24 min-h-[calc(100vh-12rem)]">
      <Tabs defaultValue="client" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client">{translations.login.client_tab}</TabsTrigger>
          <TabsTrigger value="professional">{translations.login.professional_tab}</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{translations.login.client_title}</CardTitle>
              <CardDescription>
                {translations.login.client_desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-email">{translations.login.email_label}</Label>
                <Input id="client-email" type="email" placeholder={translations.login.email_placeholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-password">{translations.login.password_label}</Label>
                <Input id="client-password" type="password" />
              </div>
              <Button type="submit" className="w-full">{translations.login.button}</Button>
               <div className="mt-4 text-center text-sm">
                {translations.login.client_register_prompt}{" "}
                <Link href="/register/client" className="underline hover:text-primary">
                  {translations.login.client_register_link}
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{translations.login.prof_title}</CardTitle>
              <CardDescription>
                {translations.login.prof_desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="prof-email">{translations.login.email_label}</Label>
                <Input id="prof-email" type="email" placeholder={translations.login.email_placeholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prof-password">{translations.login.password_label}</Label>
                <Input id="prof-password" type="password" />
              </div>
              <Button type="submit" className="w-full">{translations.login.button}</Button>
               <div className="mt-4 text-center text-sm">
                {translations.login.prof_register_prompt}{" "}
                <Link href="/register/professional" className="underline hover:text-primary">
                  {translations.login.prof_register_link}
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
