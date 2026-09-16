import { about } from './About';
import { heroConfig } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
  name: heroConfig.name,
  title: 'Sanchit Jha — Backend & Full Stack Developer',
  description: 'Backend & full-stack developer based in India. Building scalable APIs, real-time systems, and polished web applications.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/assets/logo.png',
  author: {
    name: about.name,
    twitter: '@sanchitjha',
    github: 'Sanchitjha',
    linkedin: 'sanchit-jha-844b17255',
    email: 'sanchitjha8888@gmail.com',
  },
  keywords: [
    'portfolio',
    'backend developer',
    'full-stack',
    'node.js',
    'mongodb',
    'react',
    'nextjs',
    'web development',
    'sanchit jha',
    'india',
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: `Sanchit Jha — ${heroConfig.title}`,
    description: `${about.description} Explore my projects, experience, and technical expertise.`,
    keywords: ['portfolio', 'backend developer', 'full-stack', 'node.js', 'mongodb', 'projects'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/contact': {
    title: 'Contact — Sanchit Jha',
    description: "Get in touch with Sanchit Jha for collaborations, projects, or opportunities.",
    keywords: ['contact', 'hire', 'collaboration', 'freelance', 'backend developer'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary',
  },
  '/work-experience': {
    title: 'Work Experience — Sanchit Jha',
    description: 'Explore Sanchit Jha\'s professional work experience in backend and full-stack development.',
    keywords: ['work experience', 'career', 'backend developer', 'node.js', 'mongodb'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/projects': {
    title: 'Projects — Sanchit Jha',
    description: 'Discover projects by Sanchit Jha — REST APIs, real-time apps, and full-stack web applications.',
    keywords: ['projects', 'portfolio', 'rest api', 'node.js', 'react', 'mongodb'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/blog': {
    title: 'Blog — Sanchit Jha',
    description: 'Thoughts, tutorials, and insights on backend engineering, Node.js, and web development.',
    keywords: ['blog', 'tutorials', 'node.js', 'backend', 'web development'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/resume': {
    title: 'Resume — Sanchit Jha',
    description: `View and download Sanchit Jha's professional resume. Backend & full-stack developer with 2+ years of experience.`,
    keywords: ['resume', 'cv', 'backend developer', 'skills', 'node.js', 'mongodb'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary',
  },
  '/books': {
    title: 'Books — Sanchit Jha',
    description: 'Books that have influenced Sanchit Jha\'s thinking and growth.',
    keywords: ['books', 'reading', 'reading list', 'recommendations'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/movies': {
    title: 'Movies — Sanchit Jha',
    description: 'Films and shows that have inspired and entertained Sanchit Jha.',
    keywords: ['movies', 'films', 'series', 'shows', 'watchlist'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/terminal': {
    title: 'Terminal — Sanchit Jha',
    description: 'Zsh, Starship, Fastfetch, and shell configuration used by Sanchit Jha.',
    keywords: ['terminal', 'zsh', 'starship', 'fastfetch', 'shell', 'dotfiles'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/gears': {
    title: 'Gears — Sanchit Jha',
    description: 'The tools, devices, and software Sanchit Jha uses to build software.',
    keywords: ['setup', 'tools', 'devices', 'software', 'developer environment'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
  '/setup': {
    title: 'Setup Guide — Sanchit Jha',
    description: 'VS Code configuration, extensions, and fonts for optimal development.',
    keywords: ['vscode', 'setup', 'configuration', 'extensions', 'development'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary_large_image',
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
