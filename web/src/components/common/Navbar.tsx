import { navbarConfig } from '@/config/Navbar';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import { Link } from 'next-view-transitions';
import React from 'react';

import CommandPalette, { PaletteEntry } from './CommandPalette';
import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  const posts: PaletteEntry[] = getPublishedBlogPosts().map((post) => ({
    label: post.frontmatter.title,
    href: `/blog/${post.slug}`,
    keywords: post.frontmatter.tags,
  }));

  const projects: PaletteEntry[] = getPublishedProjectCaseStudies().map(
    (project) => ({
      label: project.frontmatter.title,
      href: `/projects/${project.slug}`,
      keywords: project.frontmatter.technologies,
    }),
  );

  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {navbarConfig.navItems.map((item) => (
            <Link
              className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
              key={item.label}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CommandPalette posts={posts} projects={projects} />
          <ThemeToggleButton />
        </div>
      </div>
    </Container>
  );
}
