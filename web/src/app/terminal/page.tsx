import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import {
  terminalIntro,
  terminalSnippets,
  terminalTools,
} from '@/config/Terminal';
import { ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = getMetadata('/terminal');

export default function TerminalPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {terminalIntro.heading}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {terminalIntro.description}
          </p>
        </div>
        <Separator />

        {/* Tools */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tools</h2>
          <div className="mt-8 flex flex-col gap-4">
            {terminalTools.map((tool, index) => (
              <div key={tool.name} className="flex items-start gap-4">
                <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10">
                  <span className="text-secondary text-sm">{index + 1}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="flex items-center gap-1 text-sm font-semibold">
                    <Link target="_blank" href={tool.href}>
                      {tool.name}
                    </Link>
                    <ArrowUpRight className="size-4" />
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Config files */}
        <div className="space-y-4 pt-10">
          <h2 className="text-2xl font-semibold">Configuration</h2>
          <div className="mt-8 flex flex-col gap-8">
            {terminalSnippets.map((snippet) => (
              <div key={snippet.file} className="flex flex-col gap-2">
                <h3 className="font-mono text-sm font-semibold">
                  {snippet.file}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {snippet.description}
                </p>
                <pre className="bg-muted overflow-x-auto rounded-md border border-black/10 p-4 text-xs leading-relaxed dark:border-white/10">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
