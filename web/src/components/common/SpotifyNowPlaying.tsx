'use client';

import type { LastPlayedTrack } from '@/app/api/spotify/last-played/route';
import Spotify from '@/components/svgs/Spotify';
import React from 'react';

/**
 * Shows the track currently playing, falling back to the most recent one.
 * Renders nothing until a track is available, so the hero stays clean when
 * the Spotify env vars are absent.
 */
export default function SpotifyNowPlaying() {
  const [track, setTrack] = React.useState<LastPlayedTrack | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/spotify/last-played');
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled) setTrack(data.track ?? null);
      } catch {
        // Offline or route unavailable — leave the widget hidden.
      }
    };

    load();
    const interval = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!track) return null;

  return (
    <div className="text-secondary flex flex-wrap items-center gap-2 text-sm">
      <Spotify className="size-4 shrink-0 text-[#1DB954]" />
      <span className="text-muted-foreground">
        {track.isPlaying ? 'Now playing' : 'Last played'}
      </span>
      <span className="text-muted-foreground">—</span>
      <a
        href={track.url}
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-4"
      >
        {track.title}
      </a>
      <span className="text-muted-foreground">·</span>
      <span className="text-muted-foreground">{track.artist}</span>
    </div>
  );
}
