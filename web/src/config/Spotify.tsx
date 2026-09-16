/**
 * Fallback shown when the Spotify API returns nothing.
 *
 * The Web API refuses every request unless the app owner has Spotify Premium,
 * so on a free account the live lookup always comes back empty. Pinning a
 * track here keeps the line visible. Edit it whenever you want.
 *
 * Set `track` to null to hide the line instead.
 */
export const spotifyConfig = {
  /**
   * Wording for the pinned track. Keep this honest — it is a track you chose,
   * not one the API reported, so "Last played" would not be true.
   */
  label: 'On repeat',

  track: {
    title: 'Pahile Pahil Chhathi Maiya',
    artist: 'Sharda Sinha',
    url: 'https://open.spotify.com/track/6g9UjgBwiCaoOsXRE1lkNR',
  } as { title: string; artist: string; url: string } | null,
};
