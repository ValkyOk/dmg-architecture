"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Menu, Building2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';

export function Header() {
  const { translations } = useLanguage();
  
  const navLinks = [
    { href: '/', label: translations.header.home },
    { href: '/about', label: translations.header.about },
    { href: '/portfolio', label: translations.header.portfolio },
    { href: '/services', label: translations.header.services },
    { href: '/contact', label: translations.header.contact },
  ];

  return (
    <header className="absolute top-0 z-50 w-full border-b border-white/20 bg-black/30 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg hidden sm:inline-block text-white">DMG ARCHITECTURE</span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors text-white hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <LanguageSwitcher />
          <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/login">{translations.header.access}</Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 pt-8">
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">DMG ARCHITECTURE</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-lg transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/login">{translations.header.access}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
