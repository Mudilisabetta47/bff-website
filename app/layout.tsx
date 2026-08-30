import type { Metadata, Viewport } from 'next';
import { BRAND, SERVICES, CITIES } from '@/lib/content';
import MotionRoot from '@/components/MotionRoot';
import { Backdrop, Curtain, Cursor, Nav } from '@/components/Chrome';
import './globals.css';

const description =
  'BOUND FOR FUTURE ist eine Digitalagentur für Webdesign, Branding, Online-Marketing, SEO, Content und individuelle digitale Lösungen. Nächster Stopp: Zukunft.';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — Digitalagentur für Web, Marke und Wachstum`,
    template: `%s — ${BRAND.short}`,
  },
  description,
  applicationName: BRAND.name,
  keywords: [
    'Digitalagentur', 'Werbeagentur', 'Webdesign', 'Website erstellen lassen', 'Branding',
    'Corporate Design', 'Online-Marketing', 'SEO', 'Local SEO', 'Social Media', 'Next.js Agentur',
    ...CITIES.map((c) => `Werbeagentur ${c.name}`),
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'de_DE', url: BRAND.url, siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`, description,
  },
  twitter: { card: 'summary_large_image', title: `${BRAND.name} — ${BRAND.tagline}`, description },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#04060B',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BRAND.url}/#organization`,
      name: BRAND.name,
      url: BRAND.url,
      email: BRAND.email,
      slogan: BRAND.tagline,
      description,
      foundingDate: BRAND.founded,
      areaServed: 'DE',
      knowsAbout: SERVICES.map((s) => s.title),
    },
    {
      '@type': 'WebSite',
      '@id': `${BRAND.url}/#website`,
      url: BRAND.url, name: BRAND.name, inLanguage: 'de-DE',
      publisher: { '@id': `${BRAND.url}/#organization` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BRAND.url}/#service`,
      name: BRAND.name, url: BRAND.url, email: BRAND.email, priceRange: '€€€',
      areaServed: CITIES.map((c) => ({ '@type': 'City', name: c.name })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, url: `${BRAND.url}/leistungen/${s.slug}` },
        })),
      },
      parentOrganization: { '@id': `${BRAND.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@300..700&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Zum Inhalt springen
        </a>
        <Curtain />
        <Cursor />
        <Backdrop />
        <Nav />
        {children}
        <MotionRoot />
      </body>
    </html>
  );
}
