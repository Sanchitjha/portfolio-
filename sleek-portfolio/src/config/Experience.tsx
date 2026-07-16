import ExpressJs from '@/components/technologies/ExpressJs';
import GitHub from '@/components/technologies/Github';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'Freelance',
    position: 'Backend Developer',
    location: 'India (Remote)',
    image: '/company/upsurge.png',
    description: [
      'Designed and shipped REST APIs consumed by 5+ clients with <200 ms avg p95 latency.',
      'Built real-time features (live chat, collaborative editing) with *Socket.io*.',
      'Implemented JWT auth, bcrypt hashing, rate-limiting, and input validation middleware.',
      'Containerised services with *Docker*; managed MongoDB Atlas and PostgreSQL deployments.',
    ],
    startDate: 'Jan 2023',
    endDate: 'Present',
    technologies: [
      { name: 'Node.js',    href: 'https://nodejs.org/',       icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', href: 'https://expressjs.com/',    icon: <ExpressJs key="express" /> },
      { name: 'MongoDB',    href: 'https://mongodb.com/',      icon: <MongoDB key="mongodb" /> },
      { name: 'Socket.io',  href: 'https://socket.io/',        icon: <SocketIo key="socketio" /> },
      { name: 'PostgreSQL', href: 'https://postgresql.org/',   icon: <PostgreSQL key="pg" /> },
    ],
    website: 'https://github.com/Sanchitjha',
    github:  'https://github.com/Sanchitjha',
    linkedin: 'https://www.linkedin.com/in/sanchit-jha-844b17255',
  },
  {
    isCurrent: false,
    company: 'Self-Directed Learning',
    position: 'Full Stack Developer',
    location: 'India',
    image: '/company/loop.png',
    description: [
      'Shipped 15+ projects — CRUD apps, CLI tools, a Q&A platform, and real-time chat applications.',
      'Mastered *React* & *Next.js* while deepening Node.js and database fundamentals.',
      'Published npm packages and contributed to open-source repositories.',
      'Earned MongoDB and Node.js certifications.',
    ],
    startDate: 'Jan 2022',
    endDate: 'Dec 2022',
    technologies: [
      { name: 'React',        href: 'https://react.dev/',         icon: <ReactIcon key="react" /> },
      { name: 'Next.js',      href: 'https://nextjs.org/',        icon: <NextJs key="nextjs" /> },
      { name: 'JavaScript',   href: 'https://javascript.com/',    icon: <JavaScript key="js" /> },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com/',   icon: <TailwindCss key="tw" /> },
      { name: 'GitHub',       href: 'https://github.com/',        icon: <GitHub key="github" /> },
    ],
    website: 'https://github.com/Sanchitjha',
    github:  'https://github.com/Sanchitjha',
  },
];
