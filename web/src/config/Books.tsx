export interface Book {
  title: string;
  author: string;
  href?: string;
  status: 'reading' | 'read' | 'want-to-read';
  note?: string;
}

export const booksIntro = {
  heading: 'Books',
  description: 'Books that have influenced my thinking and growth.',
};

/** Edit this list with your own reading. */
export const books: Book[] = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    href: 'https://dataintensive.net/',
    status: 'reading',
    note: 'The clearest explanation of replication, partitioning, and consistency I have read.',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    href: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
    status: 'read',
    note: 'Changed how I think about writing code I will have to maintain later.',
  },
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    status: 'read',
    note: 'Useful for reasoning about boundaries, even where I disagree with it.',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    status: 'read',
    note: 'Made me restructure how I spend my mornings.',
  },
  {
    title: 'Database Internals',
    author: 'Alex Petrov',
    status: 'want-to-read',
  },
];
