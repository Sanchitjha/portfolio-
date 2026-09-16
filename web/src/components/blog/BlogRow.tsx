import { BlogPostPreview } from '@/types/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Calender from '../svgs/Calender';

interface BlogRowProps {
  post: BlogPostPreview;
}

/**
 * Condensed blog entry for the landing page: title, description, and date,
 * with the read link pushed to the right.
 */
export function BlogRow({ post }: BlogRowProps) {
  const { slug, frontmatter } = post;
  const { title, description, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="group flex items-start justify-between gap-6">
      <div className="flex flex-col gap-1">
        <Link href={`/blog/${slug}`}>
          <h3 className="font-semibold hover:underline hover:underline-offset-4">
            {title}
          </h3>
        </Link>
        <p className="text-secondary text-sm">{description}</p>
        <time
          className="text-muted-foreground mt-1 flex items-center gap-2 text-xs"
          dateTime={date}
        >
          <Calender className="size-3.5" /> {formattedDate}
        </time>
      </div>

      <Link
        href={`/blog/${slug}`}
        className="text-secondary flex shrink-0 items-center gap-2 text-sm underline-offset-4 hover:underline"
      >
        Read more <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
