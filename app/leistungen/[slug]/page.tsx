import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRAND, SERVICES } from '@/lib/content';
import { ServicePage } from '@/components/ServicePage';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return { title: 'Nicht gefunden' };
  return {
    title: s.metaTitle,
    description: s.metaDesc,
    alternates: { canonical: `/leistungen/${s.slug}` },
    openGraph: { title: `${s.metaTitle} — ${BRAND.short}`, description: s.metaDesc, url: `${BRAND.url}/leistungen/${s.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ServicePage s={s} />
    </main>
  );
}
