export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const footerConfig = {
  developer: 'Sanchit Jha',
  text: 'Design & Developed by',
  copyright: 'All rights reserved.',

  navigate: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work-experience' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Projects', href: '/projects' },
    { label: 'Gears', href: '/gears' },
    { label: 'Setup', href: '/setup' },
    { label: 'Terminal', href: '/terminal' },
    { label: 'Books', href: '/books' },
    { label: 'Movies', href: '/movies' },
    { label: 'RSS FEED', href: '/rss.xml', external: true },
  ] as FooterLink[],
};
