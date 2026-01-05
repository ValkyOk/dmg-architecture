"use client";

import type { Project } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { translations } = useLanguage();
  const typeMap: Record<Project['type'], { label: string, variant: 'default' | 'secondary' | 'outline' }> = {
    completed: { label: translations.portfolio.project_type_completed, variant: 'default' },
    render: { label: translations.portfolio.project_type_render, variant: 'secondary' },
    plan: { label: translations.portfolio.project_type_plan, variant: 'outline' },
  };
  const { label, variant } = typeMap[project.type];
  
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={project.image.imageUrl}
            alt={project.image.description}
            width={600}
            height={400}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={variant}>{label}</Badge>
      </CardFooter>
    </Card>
  );
}
