"use client";
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';

export function Footer() {
  const { translations } = useLanguage();
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Image src="/DMG_Architecture.png" alt="DMG Architecture Logo" width={120} height={32} className="object-contain" />
          </div>
          <p className="text-sm text-center md:text-left">© {new Date().getFullYear()} David Montoya Giraldo. {translations.footer.copy}</p>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
