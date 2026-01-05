import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type ProjectType = 'render' | 'plan' | 'completed';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  image: ImagePlaceholder;
}

const getImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback or error
        return {
            id: 'fallback',
            description: 'Fallback image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
            imageHint: 'architecture'
        };
    }
    return img;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Residencia Moderna',
    description: 'Visualización 3D de una sala de estar con diseño minimalista y acabados naturales.',
    type: 'render',
    image: getImage('portfolio-1'),
  },
  {
    id: 'proj-2',
    title: 'Planos Edificio Multifamiliar',
    description: 'Juego de planos técnicos para la construcción de un edificio de 5 pisos.',
    type: 'plan',
    image: getImage('portfolio-2'),
  },
  {
    id: 'proj-3',
    title: 'Casa Campestre "El Refugio"',
    description: 'Proyecto completo de una casa de campo, desde el diseño hasta la construcción.',
    type: 'completed',
    image: getImage('portfolio-3'),
  },
  {
    id: 'proj-4',
    title: 'Cocina Integrada',
    description: 'Render fotorrealista para un proyecto de remodelación de cocina.',
    type: 'render',
    image: getImage('portfolio-4'),
  },
  {
    id: 'proj-5',
    title: 'Planos Centro Comercial',
    description: 'Diseño técnico y de distribución para un nuevo centro comercial.',
    type: 'plan',
    image: getImage('portfolio-5'),
  },
  {
    id: 'proj-6',
    title: 'Oficinas Corporativas "Nexus"',
    description: 'Diseño y ejecución de interiores para un espacio de oficinas moderno y colaborativo.',
    type: 'completed',
    image: getImage('portfolio-6'),
  },
];
