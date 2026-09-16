import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <Container className="border-t border-black/10 py-12 dark:border-white/10">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Navigate */}
        <div className="flex flex-col gap-4">
          <h2 className="text-muted-foreground text-xs tracking-widest uppercase">
            Navigate
          </h2>
          <ul className="grid max-w-md grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {footerConfig.navigate.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    className="text-secondary text-sm hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-secondary text-sm hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <h2 className="text-muted-foreground text-xs tracking-widest uppercase">
            Connect
          </h2>
          <div className="flex max-w-[12rem] flex-wrap gap-2">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="text-secondary hover:bg-muted flex size-9 items-center justify-center rounded-md border border-black/10 transition-colors dark:border-white/10"
              >
                <span className="size-4">{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-black/10 pt-6 dark:border-white/10">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {footerConfig.developer}.{' '}
          {footerConfig.copyright}
        </p>
      </div>
    </Container>
  );
}
