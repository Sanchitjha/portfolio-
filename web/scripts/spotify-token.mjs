/**
 * One-time helper to obtain a Spotify refresh token.
 *
 *   1. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in web/.env.local
 *   2. Add http://127.0.0.1:8888/callback as a redirect URI on your Spotify app
 *   3. npm run spotify-token
 *
 * Opens a local server, walks you through the consent screen, and writes the
 * refresh token straight into .env.local. Nothing is sent anywhere except
 * Spotify.
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';
const TOKEN_KEY = 'SPOTIFY_REFRESH_TOKEN';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const text = readFileSync(join(root, file), 'utf8');
      for (const rawLine of text.split('\n')) {
        const match = rawLine.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (!match) continue;
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[match[1]]) process.env[match[1]] = value;
      }
    } catch {
      // File is optional.
    }
  }
}

loadEnv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (
  !clientId ||
  !clientSecret ||
  clientSecret.startsWith('PASTE_') ||
  clientId.startsWith('your-')
) {
  console.error(
    '\nMissing credentials.\n\n' +
      'Fill these in web/.env.local first (from developer.spotify.com/dashboard):\n' +
      '  SPOTIFY_CLIENT_ID="..."\n' +
      '  SPOTIFY_CLIENT_SECRET="..."\n',
  );
  process.exit(1);
}

const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  });

function saveToken(refreshToken) {
  const line = `${TOKEN_KEY}="${refreshToken}"`;
  const text = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
  const lines = text.split('\n');

  // Replace an existing entry in place, otherwise append one.
  const index = lines.findIndex(
    (candidate) => candidate.trimStart().split('=')[0].trim() === TOKEN_KEY,
  );

  if (index === -1) {
    if (lines.length && lines[lines.length - 1].trim() === '') {
      lines[lines.length - 1] = line;
      lines.push('');
    } else {
      lines.push(line, '');
    }
  } else {
    lines[index] = line;
  }

  writeFileSync(envPath, lines.join('\n'));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end('Not found');
    return;
  }

  const error = url.searchParams.get('error');
  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain' }).end(`Failed: ${error}`);
    console.error(`\nAuthorization failed: ${error}\n`);
    server.close();
    process.exit(1);
  }

  const code = url.searchParams.get('code');
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.refresh_token) {
    res
      .writeHead(500, { 'Content-Type': 'text/plain' })
      .end('Token exchange failed - see the terminal.');
    console.error('\nToken exchange failed:\n', data, '\n');
    server.close();
    process.exit(1);
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<p style="font-family:sans-serif">Done. Back to your terminal.</p>');

  try {
    saveToken(data.refresh_token);
    console.log(`\nRefresh token saved to web/.env.local`);
    console.log('Restart the dev server and the widget will appear.\n');
  } catch (err) {
    console.log(`\nCould not write .env.local: ${err.message}`);
    console.log('Add this line yourself:\n');
    console.log(`${TOKEN_KEY}="${data.refresh_token}"\n`);
  }

  server.close();
  process.exit(0);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\nOpen this URL in your browser and approve access:\n');
  console.log(authUrl + '\n');
  console.log(`Waiting for the redirect to ${REDIRECT_URI} ...\n`);
});
