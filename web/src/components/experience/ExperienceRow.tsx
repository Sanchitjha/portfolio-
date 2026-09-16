import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import React from 'react';

interface ExperienceRowProps {
  experience: Experience;
}

/**
 * Condensed experience entry for the landing page: company, role, and dates
 * only. The full card with technologies and achievements lives on
 * /work-experience.
 */
export function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              'font-bold',
              experience.isBlur ? 'blur-[5px]' : 'blur-none',
            )}
          >
            {experience.company}
          </h3>
          {experience.isCurrent && (
            <div className="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5 text-xs">
              <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
              Working
            </div>
          )}
        </div>
        <p className="text-secondary text-sm">{experience.position}</p>
      </div>

      <div className="text-secondary flex flex-col text-sm md:text-right">
        <p>
          {experience.startDate} –{' '}
          {experience.isCurrent ? 'Present' : experience.endDate}
        </p>
        <p>{experience.location}</p>
      </div>
    </div>
  );
}
