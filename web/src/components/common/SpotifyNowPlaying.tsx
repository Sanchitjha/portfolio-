'use client';

import type { SpotifyTrackInfo } from '@/app/api/spotify/track/route';
import Spotify from '@/components/svgs/Spotify';
import { spotifyConfig } from '@/config/Spotify';
import React from 'react';

/**
 * Shows what's playing now, else the top track of the last few weeks. When the
 * API returns nothing — which is always the case without Spotify Premium — it
 * falls back to the track pinned in the config.
 */
export default function SpotifyNowPlaying() {
  const [live, setLive] = React.useState<SpotifyTrackInfo | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/spotify/track');
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled) setLive(data.track ?? null);
      } catch {
        // Offline or route unavailable — the pinned track still shows.
      }
    };

    load();
    const interval = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pinned = spotifyConfig.track;
  const track = live ?? pinned;

  if (!track) return null;

  const label = live
    ? live.isPlaying
      ? 'Now playing'
      : 'On repeat'
    : spotifyConfig.label;

  return (
    <div className="text-secondary flex flex-wrap items-center gap-2 text-sm">
      <Spotify className="size-4 shrink-0 text-[#1DB954]" />
      <span className="text-muted-foreground">{label}</span>
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
