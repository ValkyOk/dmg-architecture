"use client";

import { useState } from 'react';
import { projects, type ProjectType } from '@/lib/data';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';

const filterOptions: { label: string; value: ProjectType | 'all' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Completos', value: 'completed' },
  { label: 'Renders', value: 'render' },
  { label: 'Planos', value: 'plan' },
];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

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
