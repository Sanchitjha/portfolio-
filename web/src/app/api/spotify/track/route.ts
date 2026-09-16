import { NextResponse } from 'next/server';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1';

export interface SpotifyTrackInfo {
  title: string;
  artist: string;
  url: string;
  isPlaying: boolean;
}

/**
 * Exchanges the long-lived refresh token for a short-lived access token.
 * Returns null when the integration has not been configured.
 */
async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.access_token ?? null;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  external_urls: { spotify: string };
}

function toTrack(track: SpotifyTrack, isPlaying: boolean): SpotifyTrackInfo {
  return {
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(', '),
    url: track.external_urls.spotify,
    isPlaying,
  };
}

export async function GET() {
  const accessToken = await getAccessToken();

  // Not configured — the widget hides itself rather than showing an error.
  if (!accessToken) {
    return NextResponse.json({ configured: false, track: null });
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    // Player endpoints are Premium-only. On a free account this returns 403
    // and we fall through to top tracks, which every account can read.
    const playing = await fetch(NOW_PLAYING_ENDPOINT, {
      headers,
      cache: 'no-store',
    });

    if (playing.status === 200) {
      const data = await playing.json();
      if (data?.item) {
        return NextResponse.json({
          configured: true,
          track: toTrack(data.item, Boolean(data.is_playing)),
        });
      }
    }

    const top = await fetch(TOP_TRACKS_ENDPOINT, { headers, cache: 'no-store' });

    if (!top.ok) {
      return NextResponse.json({ configured: true, track: null });
    }

    const data = await top.json();
    const item = data?.items?.[0];

    return NextResponse.json({
      configured: true,
      track: item ? toTrack(item, false) : null,
    });
  } catch {
    return NextResponse.json({ configured: true, track: null });
  }
}
