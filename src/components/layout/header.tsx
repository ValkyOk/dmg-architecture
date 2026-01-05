"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function Header() {
  const { translations } = useLanguage();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const navLinks = [
    { href: '/', label: translations.header.home },
    { href: '/about', label: translations.header.about },
    { href: '/portfolio', label: translations.header.portfolio },
    { href: '/services', label: translations.header.services },
    { href: '/contact', label: translations.header.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-background/30 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/DMG_Architecture.png" alt="DMG Architecture Logo" width={120} height={32} className="object-contain" />
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors text-foreground hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <LanguageSwitcher />
          {!isUserLoading && (
            user ? (
              <div className="hidden md:flex items-center gap-4">
                 <span className="text-sm text-foreground/80">{user.email}</span>
                 <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Cerrar sesión">
                   <LogOut className="h-5 w-5" />
                 </Button>
              </div>
            ) : (
              <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/login">{translations.header.access}</Link>
              </Button>
            )
          )}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 pt-8">
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                     <Image src="/DMG_Architecture.png" alt="DMG Architecture Logo" width={120} height={32} className="object-contain" />
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-lg transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  </div>
                  {!isUserLoading && (
                     user ? (
                        <div className="flex flex-col items-start gap-4">
                           <span className="text-sm text-foreground/80 px-4">{user.email}</span>
                           <Button onClick={handleLogout} className="w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar sesión
                           </Button>
                        </div>
                     ) : (
                        <Button asChild className="w-full">
                           <Link href="/login">{translations.header.access}</Link>
                        </Button>
                     )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
