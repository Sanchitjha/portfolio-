import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { movies, moviesIntro } from '@/config/Movies';
import { ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = getMetadata('/movies');

export default function MoviesPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {moviesIntro.heading}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {moviesIntro.description}
          </p>
        </div>
        <Separator />

        <div className="flex flex-col gap-6 pt-4">
          {movies.map((movie) => (
            <div key={movie.title} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold">
                  {movie.href ? (
                    <Link
                      target="_blank"
                      href={movie.href}
                      className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4"
                    >
                      {movie.title}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  ) : (
                    movie.title
                  )}
                </h2>
                <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                  {movie.kind === 'series' ? 'Series' : 'Film'}
                </span>
                <span className="text-muted-foreground text-xs">
                  {movie.year}
                </span>
              </div>
              {movie.note && (
                <p className="text-muted-foreground text-sm">{movie.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
