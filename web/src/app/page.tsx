import Container from '@/components/common/Container';
import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import Personal from '@/components/landing/Personal';
import Setup from '@/components/landing/Setup';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Blog />
      <Setup />
      <Personal />
    </Container>
  );
}
