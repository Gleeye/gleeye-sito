import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

/**
 * Elenco delle rotte del sito, derivato dal filesystem di src/app.
 * Consumato dall'ERP (vista Marketing → Sito → Sitemap): niente lista
 * hardcoded, così resta vero da solo quando le pagine cambiano.
 */

export const dynamic = 'force-dynamic';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const PAGE_FILES = ['page.tsx', 'page.jsx', 'page.ts', 'page.js'];

type Route = {
  path: string;
  file: string;
  dynamic: boolean;
  title?: string;
};

/** Un segmento è dinamico se è [slug], [...slug] o [[...slug]]. */
function isDynamicSegment(seg: string) {
  return seg.startsWith('[') && seg.endsWith(']');
}

/**
 * I segmenti che non compaiono nell'URL:
 * - (gruppi) di organizzazione
 * - @slot delle parallel routes
 */
function isIgnoredSegment(seg: string) {
  return (seg.startsWith('(') && seg.endsWith(')')) || seg.startsWith('@');
}

/** Cartelle che non producono rotte: private (_foo) e interne di Next. */
function isSkippedDir(name: string) {
  return name.startsWith('_') || name === 'node_modules';
}

/** Estrazione best-effort del title dal metadata export. Se non è chiaro, si omette. */
function extractTitle(source: string): string | undefined {
  const meta = source.match(/export\s+const\s+metadata[^=]*=\s*\{/);
  if (!meta) return undefined;

  const from = source.slice(meta.index! + meta[0].length);
  // title: 'stringa'  oppure  title: { default: 'stringa', ... }
  const direct = from.match(/^\s*(?:[\s\S]{0,400}?)\btitle\s*:\s*(['"`])([^'"`]+)\1/);
  if (direct) return direct[2].trim();

  const nested = from.match(/\btitle\s*:\s*\{[^}]*?\bdefault\s*:\s*(['"`])([^'"`]+)\1/);
  if (nested) return nested[2].trim();

  return undefined;
}

function walk(dir: string, segments: string[], appDir: string, out: Route[]) {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const pageFile = entries.find((e) => e.isFile() && PAGE_FILES.includes(e.name));
  if (pageFile) {
    const urlSegments = segments.filter((s) => !isIgnoredSegment(s));
    const absolute = path.join(dir, pageFile.name);
    const relative = path.relative(process.cwd(), absolute).split(path.sep).join('/');

    let title: string | undefined;
    try {
      title = extractTitle(fs.readFileSync(absolute, 'utf8'));
    } catch {
      title = undefined;
    }

    out.push({
      path: '/' + urlSegments.join('/'),
      file: relative,
      dynamic: urlSegments.some(isDynamicSegment),
      ...(title ? { title } : {}),
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || isSkippedDir(entry.name)) continue;
    // le route handler (api) non sono pagine navigabili
    if (segments.length === 0 && entry.name === 'api') continue;
    walk(path.join(dir, entry.name), [...segments, entry.name], appDir, out);
  }
}

export async function GET() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes: Route[] = [];

  walk(appDir, [], appDir, routes);
  routes.sort((a, b) => a.path.localeCompare(b.path));

  return NextResponse.json(
    { generatedAt: new Date().toISOString(), routes },
    { headers: CORS },
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
