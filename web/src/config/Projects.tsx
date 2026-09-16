import ExpressJs from '@/components/technologies/ExpressJs';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

// Real projects sourced from github.com/Sanchitjha.
// Tech tags are inferred from each repo's primary languages — refine as needed.
export const projects: Project[] = [
  {
    title: 'Task Manager',
    description:
      'A task management web app to create, organize, and track tasks, deployed on Vercel.',
    image: '/assets/placeholder.svg',
    link: 'https://task-manager-rouge-eta.vercel.app',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="js" /> },
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Sanchitjha/Task-Manager',
    live: 'https://task-manager-rouge-eta.vercel.app',
    details: false,
    isWorking: false,
  },
  {
    title: 'Dev Blog',
    description:
      'A developer blog for writing and publishing technical posts, built with Next.js and TypeScript.',
    image: '/assets/placeholder.svg',
    link: 'https://dev-blog-neon-eight.vercel.app',
    technologies: [
      { name: 'TypeScript', icon: <TypeScript key="ts" /> },
      { name: 'Next.js', icon: <NextJs key="next" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tw" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Sanchitjha/dev-blog',
    live: 'https://dev-blog-neon-eight.vercel.app',
    details: false,
    isWorking: false,
  },
  {
    title: 'Trip Book',
    description:
      'A trip planning and travel journal web app built with JavaScript.',
    image: '/assets/placeholder.svg',
    link: 'https://github.com/Sanchitjha/Trip-Book',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="js" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
    ],
    github: 'https://github.com/Sanchitjha/Trip-Book',
    live: 'https://github.com/Sanchitjha/Trip-Book',
    details: false,
    isWorking: false,
  },
  {
    title: 'CRUD with Express',
    description:
      'A REST API demonstrating CRUD operations, built with Node.js and Express.',
    image: '/assets/placeholder.svg',
    link: 'https://github.com/Sanchitjha/CRUD-with-express',
    technologies: [
      { name: 'Node.js', icon: <NodeJs key="node" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
    ],
    github: 'https://github.com/Sanchitjha/CRUD-with-express',
    live: 'https://github.com/Sanchitjha/CRUD-with-express',
    details: false,
    isWorking: false,
  },
];
