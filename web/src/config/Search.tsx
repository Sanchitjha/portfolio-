export interface SearchLink {
  label: string;
  href: string;
  keywords?: string[];
}

/**
 * Static destinations offered by the command palette. Blog posts and project
 * case studies are read from the filesystem at request time and appended to
 * these by the Navbar.
 */
export const searchConfig = {
  pages: [
    { label: 'Home', href: '/', keywords: ['landing', 'start'] },
    { label: 'Work Experience', href: '/work-experience', keywords: ['job', 'career'] },
    { label: 'Projects', href: '/projects', keywords: ['case study', 'builds'] },
    { label: 'Blog', href: '/blog', keywords: ['writing', 'posts', 'articles'] },
    { label: 'Resume', href: '/resume', keywords: ['cv'] },
    { label: 'Journey', href: '/journey', keywords: ['timeline', 'story'] },
    { label: 'Contact', href: '/contact', keywords: ['email', 'hire', 'reach out'] },
  ] as SearchLink[],

  development: [
    { label: 'Gears', href: '/gears', keywords: ['devices', 'hardware', 'tools'] },
    { label: 'Setup', href: '/setup', keywords: ['vscode', 'cursor', 'extensions'] },
    { label: 'Terminal', href: '/terminal', keywords: ['zsh', 'shell', 'starship'] },
  ] as SearchLink[],

  personal: [
    { label: 'Books', href: '/books', keywords: ['reading', 'library'] },
    { label: 'Movies', href: '/movies', keywords: ['films', 'shows', 'watching'] },
  ] as SearchLink[],
};
