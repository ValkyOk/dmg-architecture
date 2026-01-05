"use client";

import { useState } from 'react';
import { projects, type ProjectType } from '@/lib/data';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function PortfolioGallery() {
  const { translations } = useLanguage();
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');
  
  const filterOptions: { label: string; value: ProjectType | 'all' }[] = [
    { label: translations.portfolio.filter_all, value: 'all' },
    { label: translations.portfolio.filter_completed, value: 'completed' },
    { label: translations.portfolio.filter_renders, value: 'render' },
    { label: translations.portfolio.filter_plans, value: 'plan' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.type === filter);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? 'default' : 'outline'}
            onClick={() => setFilter(option.value)}
            className="capitalize"
          >
            {option.label}
          </Button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
