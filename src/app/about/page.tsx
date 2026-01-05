"use client";

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Award, GraduationCap, Lightbulb, UserCheck, Languages, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language-context';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-david');

export default function AboutPage() {
  const { translations } = useLanguage();

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">{translations.about.title}</h1>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2">
          {aboutImage && (
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
               <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <Lightbulb className="w-7 h-7" />
                {translations.about.profile_title}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {translations.about.profile_text}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <GraduationCap className="w-7 h-7" />
                {translations.about.education_title}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: translations.about.education_text }} />
            </div>

            <Separator />

            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <UserCheck className="w-7 h-7" />
                {translations.about.skills_title}
              </h2>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>{translations.about.skill_1}</li>
                <li>{translations.about.skill_2}</li>
                <li>{translations.about.skill_3}</li>
                <li>{translations.about.skill_4}</li>
                <li>{translations.about.skill_5}</li>
                <li>{translations.about.skill_6}</li>
              </ul>
            </div>
            
             <Separator />
            
            <div>
              <h2 className="font-headline text-3xl text-primary mb-4 flex items-center gap-3">
                <Languages className="w-7 h-7" />
                {translations.about.languages_title}
              </h2>
               <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>{translations.about.language_1}</li>
                <li>{translations.about.language_2}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
