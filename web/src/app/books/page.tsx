import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { books, booksIntro } from '@/config/Books';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = getMetadata('/books');

const statusLabels: Record<string, string> = {
  reading: 'Reading',
  read: 'Read',
  'want-to-read': 'Want to read',
};

export default function BooksPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {booksIntro.heading}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {booksIntro.description}
          </p>
        </div>
        <Separator />

        <div className="flex flex-col gap-6 pt-4">
          {books.map((book) => (
            <div key={book.title} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold">
                  {book.href ? (
                    <Link
                      target="_blank"
                      href={book.href}
                      className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4"
                    >
                      {book.title}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  ) : (
                    book.title
                  )}
                </h2>
                <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                  {statusLabels[book.status]}
                </span>
              </div>
              <p className="text-secondary text-sm">{book.author}</p>
              {book.note && (
                <p className="text-muted-foreground text-sm">{book.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
