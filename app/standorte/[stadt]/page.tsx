import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRAND, CITIES } from '@/lib/content';
import { CityPage } from '@/components/CityPage';

export function generateStaticParams() {
  return CITIES.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ stadt: string }> }): Promise<Metadata> {
  const { stadt } = await params;
  const c = CITIES.find((x) => x.slug === stadt);
  if (!c) return { title: 'Nicht gefunden' };
  return {
    title: `Digitalagentur ${c.name} — Webdesign, Branding & SEO`,
    description: `Digitalagentur ${c.article}: Webdesign, Branding, Online-Marketing und SEO für Unternehmen ${c.article} und Umgebung. ${BRAND.tagline}`,
    alternates: { canonical: `/standorte/${c.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ stadt: string }> }) {
  const { stadt } = await params;
  const c = CITIES.find((x) => x.slug === stadt);
  if (!c) notFound();
  return (
    <main id="main">
      <CityPage c={c} />
    </main>
  );
}
