import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import CopyEmail from '../common/CopyEmail';
import SpotifyNowPlaying from '../common/SpotifyNowPlaying';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Hero() {
  const { fullName, avatar, roles, email, tagline } = heroConfig;

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Identity: avatar beside name, roles and email */}
      <div className="flex items-center gap-5">
        <Image
          src={avatar}
          alt={fullName}
          width={100}
          height={100}
          className="size-20 shrink-0 rounded-full bg-blue-300 dark:bg-yellow-300"
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {fullName}
          </h1>

          <div className="text-secondary flex flex-wrap items-center gap-x-2 text-sm md:text-base">
            {roles.map((role) => (
              <React.Fragment key={role}>
                <span>{role}</span>
                <span className="text-muted-foreground">·</span>
              </React.Fragment>
            ))}
            <a
              href={`mailto:${email}`}
              className="hover:underline hover:underline-offset-4"
            >
              {email}
            </a>
            <CopyEmail email={email} />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-secondary mt-6 text-base md:text-lg">{tagline}</p>

      {/* Spotify */}
      <div className="mt-4">
        <SpotifyNowPlaying />
      </div>

      {/* Social Links */}
      <div className="mt-6 flex gap-3">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                key={link.name}
                className="text-secondary flex items-center gap-2"
              >
                <span className="size-5">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
