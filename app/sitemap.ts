import type { MetadataRoute } from 'next';
import { BRAND, SERVICES, PROJECTS, CITIES } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BRAND.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BRAND.url}/leistungen`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICES.map((s) => ({ url: `${BRAND.url}/leistungen/${s.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${BRAND.url}/standorte`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...CITIES.map((c) => ({ url: `${BRAND.url}/standorte/${c.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...PROJECTS.map((p) => ({ url: `${BRAND.url}/arbeiten/${p.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.6 })),
    { url: `${BRAND.url}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BRAND.url}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BRAND.url}/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
