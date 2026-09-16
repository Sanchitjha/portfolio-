import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import { BlogRow } from '../blog/BlogRow';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-20">
      <SectionHeading heading="Blog" />
      <div className="mt-6 flex flex-col gap-8">
        {posts.slice(0, 3).map((post) => (
          <BlogRow key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/blog">Show all blogs</Link>
        </Button>
      </div>
    </Container>
  );
}
