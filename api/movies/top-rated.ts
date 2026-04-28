import type { VercelRequest, VercelResponse } from '@vercel/node';

const allowedOrigins = [
  'http://localhost:5173',
  'https://your-project.vercel.app',
];

function isAllowedOrigin(origin: string | undefined) {
  if (!origin) return false;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/your-project-.*\.vercel\.app$/.test(origin)) return true;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin!);
    res.setHeader('Vary', 'Origin');
  } else {
    res.status(403).json({ error: 'Forbidden: Origin not allowed' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'TMDB API key not set' });
    return;
  }

  // Top rated movies endpoint
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  try {
    const tmdbRes = await fetch(url);
    const data = await tmdbRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
