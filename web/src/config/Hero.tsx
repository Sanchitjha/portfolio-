import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import Medium from '@/components/svgs/Medium';
import Pinterest from '@/components/svgs/Pinterest';
import X from '@/components/svgs/X';
import YouTube from '@/components/svgs/YouTube';
import ExpressJs from '@/components/technologies/ExpressJs';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';

export const skillComponents = {
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  ExpressJs: ExpressJs,
};

export const heroConfig = {
  name: 'Sanchit',
  title: 'A Backend & Full Stack Developer.',
  avatar: '/assets/logo.png',

  /** Full name shown as the heading in the compact hero. */
  fullName: 'Sanchit Jha',

  /** Rendered as "Role · Role · email" under the name. */
  roles: ['Engineer', 'Backend Developer'],
  email: 'sanchitjha8888@gmail.com',

  /** One-line intro under the roles. */
  tagline: 'Love to build scalable APIs, real-time systems & developer tooling.',

  skills: [
    {
      name: 'Node.js',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
    {
      name: 'MongoDB',
      href: 'https://mongodb.com/',
      component: 'MongoDB',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'Express.js',
      href: 'https://expressjs.com/',
      component: 'ExpressJs',
    },
  ],

  description: {
    template:
      'I build scalable REST APIs and full-stack web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. With a focus on <b>backend architecture</b> and clean code. Passionate about <b>real-time systems</b> and developer tooling.',
  },

  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

/**
 * Social links shown in the hero and the footer's CONNECT column.
 * Leave an href as an empty string to hide that icon entirely.
 */
export const socialLinks = [
  {
    name: 'X',
    href: '',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sanchit-jha-844b17255',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Sanchitjha',
    icon: <Github />,
  },
  {
    name: 'YouTube',
    href: '',
    icon: <YouTube />,
  },
  {
    name: 'Instagram',
    href: '',
    icon: <Instagram />,
  },
  {
    name: 'Pinterest',
    href: '',
    icon: <Pinterest />,
  },
  {
    name: 'Medium',
    href: '',
    icon: <Medium />,
  },
  {
    name: 'Email',
    href: 'mailto:sanchitjha8888@gmail.com',
    icon: <Mail />,
  },
].filter((link) => link.href !== '');
