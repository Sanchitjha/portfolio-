'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { searchConfig } from '@/config/Search';
import {
  BookOpen,
  Clapperboard,
  FileText,
  FolderGit2,
  Search,
  SquareTerminal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface PaletteEntry {
  label: string;
  href: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  posts: PaletteEntry[];
  projects: PaletteEntry[];
}

const sectionIcons = {
  development: SquareTerminal,
  personal: BookOpen,
};

export default function CommandPalette({
  posts,
  projects,
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="text-muted-foreground hover:bg-muted flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-sm transition-colors dark:border-white/10"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="bg-muted hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          Ctrl
        </kbd>
        <kbd className="bg-muted hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Jump to a page, post, or project"
      >
        <CommandInput placeholder="Search pages, blogs, projects…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {searchConfig.pages.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                onSelect={() => go(item.href)}
              >
                <FileText className="size-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Development">
            {searchConfig.development.map((item) => {
              const Icon = sectionIcons.development;
              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Personal">
            {searchConfig.personal.map((item) => {
              const Icon =
                item.href === '/movies' ? Clapperboard : sectionIcons.personal;
              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          {posts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blog">
                {posts.map((post) => (
                  <CommandItem
                    key={post.href}
                    value={`${post.label} ${post.keywords?.join(' ') ?? ''}`}
                    onSelect={() => go(post.href)}
                  >
                    <FileText className="size-4" />
                    <span>{post.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {projects.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem
                    key={project.href}
                    value={`${project.label} ${project.keywords?.join(' ') ?? ''}`}
                    onSelect={() => go(project.href)}
                  >
                    <FolderGit2 className="size-4" />
                    <span>{project.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
