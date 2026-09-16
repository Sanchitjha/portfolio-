import { ArrowRight, BookOpen, Clapperboard } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Card } from '../ui/card';

const personal = [
  {
    name: 'Books',
    description: 'Books that have influenced my thinking and growth.',
    icon: <BookOpen className="size-4" />,
    href: '/books',
  },
  {
    name: 'Movies',
    description: 'Films and shows that have inspired and entertained me.',
    icon: <Clapperboard className="size-4" />,
    href: '/movies',
  },
];

export default function Personal() {
  return (
    <Container className="mt-10">
      <SectionHeading subHeading="Personal" heading="Taste" />
      <div className="mt-8 flex flex-col gap-4">
        {personal.map((item) => (
          <Link className="group" href={item.href} key={item.name}>
            <Card className="flex flex-row items-center justify-between gap-4 px-4 py-2">
              <div className="bg-muted flex items-center justify-center rounded-md p-2">
                {item.icon}
              </div>
              <div className="flex w-full flex-col">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="hidden size-4 transition-all duration-300 group-hover:block" />
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
