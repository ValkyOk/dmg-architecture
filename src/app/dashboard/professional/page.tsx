"use client";

import { useMemoFirebase, useUser, useFirestore, useCollection } from "@/firebase";
import { collection } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Folder, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { AddProjectDialog } from "@/components/dashboard/add-project-dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/lib/data";


export default function ProfessionalDashboardPage() {
  const { translations } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();

  const projectsCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `professionals/${user.uid}/projects`);
  }, [firestore, user]);
  
  const { data: projects, isLoading } = useCollection<Omit<Project, 'id' | 'image' > & { imageUrl: string }>(projectsCollectionRef);

  const typeMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'outline' }> = {
    completed: { label: translations.portfolio.project_type_completed, variant: 'default' },
    render: { label: translations.portfolio.project_type_render, variant: 'secondary' },
    plan: { label: translations.portfolio.project_type_plan, variant: 'outline' },
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-start mb-12">
        <div>
            <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">{translations.dashboard_professional.title}</h1>
            <p className="text-lg text-muted-foreground">{translations.dashboard_professional.subtitle}</p>
        </div>
        {user && <AddProjectDialog professionalId={user.uid} />}
      </div>
      
      <div>
        <h2 className="text-2xl font-headline text-foreground mb-6 flex items-center gap-2">
            <Folder className="w-6 h-6" />
            {translations.dashboard_professional.my_projects_title}
        </h2>
        {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
            </div>
        )}
        {!isLoading && projects && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden flex flex-col h-full group">
                        <CardHeader className="p-0">
                            <div className="relative aspect-[3/2] overflow-hidden">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="architectural project"
                            />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
                            <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Badge variant={typeMap[project.projectType as string]?.variant || 'default'}>
                                {typeMap[project.projectType as string]?.label || project.projectType}
                            </Badge>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
         {!isLoading && (!projects || projects.length === 0) && (
            <div className="text-center py-16 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <p className="text-muted-foreground mb-4">{translations.dashboard_professional.no_projects}</p>
                {user && <AddProjectDialog professionalId={user.uid} triggerButton />}
            </div>
        )}
      </div>
    </div>
  );
}
