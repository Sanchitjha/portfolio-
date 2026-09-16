import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceRow } from '../experience/ExperienceRow';
import { Button } from '../ui/button';

export default function Experience() {
  return (
    <Container className="mt-20">
      <SectionHeading heading="Experience" />
      <div className="mt-6 flex flex-col gap-6">
        {experiences.slice(0, 3).map((experience: Experience) => (
          <ExperienceRow key={experience.company} experience={experience} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/work-experience">Show all work experiences</Link>
        </Button>
      </div>
    </Container>
  );
}
