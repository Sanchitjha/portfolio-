import ExpressJs from '@/components/technologies/ExpressJs';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import ThreeJs from '@/components/technologies/ThreeJs';
import TypeScript from '@/components/technologies/TypeScript';
import Shadcn from '@/components/technologies/Shadcn';
import Vercel from '@/components/technologies/Vercel';
import Motion from '@/components/technologies/Motion';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Developer Portfolio',
    description:
      'Minimalist developer portfolio with a 3D avatar, live GitHub repos, scheduling wizard, and editorial typography design.',
    image: '/project/notesbuddy.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'Next.js',      icon: <NextJs key="nextjs" /> },
      { name: 'Three.js',     icon: <ThreeJs key="threejs" /> },
      { name: 'React',        icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tw" /> },
      { name: 'shadcn/ui',    icon: <Shadcn key="shadcn" /> },
      { name: 'Motion',       icon: <Motion key="motion" /> },
      { name: 'Vercel',       icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
  {
    title: 'REST API Backend',
    description:
      'Production-grade REST API with Node.js, Express, and MongoDB. JWT auth, bcrypt, rate limiting, input validation, and Docker deployment.',
    image: '/project/syncify.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'Node.js',    icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB',    icon: <MongoDB key="mongodb" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
  {
    title: 'Dev Q&A Platform',
    description:
      'Stack Overflow-inspired Q&A platform with real-time chat via Socket.io, reputation system, voting, and markdown support.',
    image: '/project/festx.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'React',      icon: <ReactIcon key="react" /> },
      { name: 'Node.js',    icon: <NodeJs key="nodejs" /> },
      { name: 'MongoDB',    icon: <MongoDB key="mongodb" /> },
      { name: 'Socket.io',  icon: <SocketIo key="socketio" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
  {
    title: 'Real-time Chat App',
    description:
      'Full-stack real-time messaging application with rooms, private DMs, typing indicators, and read receipts built on Socket.io.',
    image: '/project/chillguy.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'Node.js',    icon: <NodeJs key="nodejs" /> },
      { name: 'Socket.io',  icon: <SocketIo key="socketio" /> },
      { name: 'React',      icon: <ReactIcon key="react" /> },
      { name: 'MongoDB',    icon: <MongoDB key="mongodb" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tw" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
  {
    title: 'Task Manager API',
    description:
      'RESTful task management API with team workspaces, role-based permissions, deadlines, and email notifications via Nodemailer.',
    image: '/project/appwrite.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'Node.js',    icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'MongoDB',    icon: <MongoDB key="mongodb" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
  {
    title: 'Next.js Dashboard',
    description:
      'Full-stack analytics dashboard with server components, Prisma ORM, chart visualizations, and dark/light theme support.',
    image: '/project/intent.png',
    link: 'https://github.com/Sanchitjha',
    technologies: [
      { name: 'Next.js',      icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript',   icon: <TypeScript key="ts" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tw" /> },
      { name: 'shadcn/ui',    icon: <Shadcn key="shadcn" /> },
      { name: 'MongoDB',      icon: <MongoDB key="mongodb" /> },
    ],
    github: 'https://github.com/Sanchitjha',
    live:   'https://github.com/Sanchitjha',
    details: false,
    isWorking: true,
  },
];
