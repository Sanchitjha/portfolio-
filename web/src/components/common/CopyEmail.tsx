'use client';

import { Check, Copy } from 'lucide-react';
import React from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission) — the
      // address stays visible next to the button either way.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email copied' : `Copy ${email}`}
      className="text-muted-foreground hover:text-primary inline-flex items-center transition-colors"
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
