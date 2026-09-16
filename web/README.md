# Sanchit Jha — Portfolio

Personal portfolio of Sanchit Jha, a backend & full-stack developer.
Built with Next.js 15 (App Router), React, Tailwind CSS, and TypeScript.

## Tech stack

- **Framework:** Next.js 15 (App Router, Turbopack in dev)
- **Styling:** Tailwind CSS, Hanken Grotesk
- **Content:** MDX for blog posts & project case studies
- **Extras:** contact form (Telegram), AI chat assistant (Gemini), GitHub activity graph

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All content is config-driven — edit these, no component changes needed:

| What | Where |
| --- | --- |
| Name, title, hero, socials | `src/config/Hero.tsx` |
| About blurb | `src/config/About.tsx` |
| Work experience | `src/config/Experience.tsx` |
| Featured projects | `src/config/Projects.tsx` |
| SEO / metadata | `src/config/Meta.tsx` |
| Gear / setup / journey / certificates | `src/config/{Gears,Setup,Journey,Achievements}.tsx` |
| Blog posts | `src/data/blog/*.mdx` |
| Project case studies | `src/data/projects/*.mdx` |

Put images in `public/` (e.g. project thumbnails in `public/project/`).
`public/assets/placeholder.svg` is used anywhere an image hasn't been added yet.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you use. All are optional —
the site runs without them (contact form and chat just stay inert):

```
TELEGRAM_BOT_TOKEN=   # contact form -> your Telegram
TELEGRAM_CHAT_ID=
GEMINI_API_KEY=       # AI chat assistant
NEXT_PUBLIC_URL=      # your production URL, e.g. https://your-domain.com

SPOTIFY_CLIENT_ID=      # "Last played" widget in the hero
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

### Spotify "Last played"

The hero shows the track you're playing now, falling back to the last one you
played. Without these three variables the widget renders nothing, so the hero
just closes up — no error, no placeholder.

To get them: create an app at
[developer.spotify.com/dashboard](https://developer.spotify.com/dashboard), add
`http://localhost:3001/callback` as a redirect URI, then run the authorization
code flow once with the `user-read-currently-playing` and
`user-read-recently-played` scopes to obtain a refresh token.

## Deploy to Vercel

This app lives in the **`web/`** subfolder of the repo, so tell Vercel where it is:

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import this repo.
3. **Set _Root Directory_ to `web`** (Vercel → project → Settings → General → Root Directory). This is the important step, since the app isn't at the repo root.
4. Framework preset auto-detects as **Next.js**. Leave build/output defaults.
5. Add the environment variables above under **Settings → Environment Variables** (set `NEXT_PUBLIC_URL` to your Vercel domain).
6. Deploy.

Every push to the default branch will then redeploy automatically.
