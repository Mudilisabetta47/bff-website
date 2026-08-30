import { renderToStaticMarkup } from 'react-dom/server';
import { Backdrop, Curtain, Cursor, Nav } from '../components/Chrome';
import { Hero, Intro, Marquee, ServicesRail, Work, Why, Process, Stats, Finale, Footer } from '../components/Home';
import { ServicePage } from '../components/ServicePage';
import { CasePage } from '../components/CasePage';
import { CityPage } from '../components/CityPage';
import { Arrow, Kicker, Lines } from '../components/ui';
import { BRAND, SERVICES, PROJECTS, CITIES } from '../lib/content';
import { MARQUEE_ITEMS } from '../lib/marquee';

export function renderShell() {
  return renderToStaticMarkup(
    <>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <Curtain />
      <Cursor />
      <Backdrop />
      <Nav />
    </>
  );
}

function Overview({ kind }: { kind: 'leistungen' | 'standorte' }) {
  const isSvc = kind === 'leistungen';
  return (
    <main id="main">
      <header className="phead">
        <div className="phead__scrim" aria-hidden="true" />
        <div className="shell phead__in">
          <nav className="crumb" aria-label="Brotkrumen">
            <a href="/">Start</a><i>/</i>
            <span style={{ color: 'var(--text)' }}>{isSvc ? 'Leistungen' : 'Standorte'}</span>
          </nav>
          <Kicker>{isSvc ? 'Leistungen' : 'Standorte'}</Kicker>
          <h1 className="display d-lg" style={{ margin: 'clamp(16px,2vw,26px) 0', maxWidth: '16ch' }}>
            <Lines items={isSvc ? ['Sechs Disziplinen.', 'Ein Team.'] : ['Nah genug für', 'echte Termine.']} />
          </h1>
          <p className="lead" data-reveal="up">
            {isSvc
              ? 'Von der Marke über die Website bis zur Kampagne — jede Leistung mit eigener Seite, eigenem Prozess und klar benannten Ergebnissen.'
              : 'Wir arbeiten remote-first, kommen aber dorthin, wo Entscheidungen fallen. Für jede Region gibt es eine eigene Seite mit lokalem Bezug.'}
          </p>
        </div>
      </header>
      <section className="section">
        <div className="shell">
          <div className="cities">
            {(isSvc ? SERVICES : CITIES).map((x) => {
              const href = isSvc ? `/leistungen/${x.slug}` : `/standorte/${x.slug}`;
              const title = isSvc ? (x as (typeof SERVICES)[number]).title : `Agentur ${(x as (typeof CITIES)[number]).name}`;
              const sub = isSvc ? (x as (typeof SERVICES)[number]).claim : (x as (typeof CITIES)[number]).region;
              return (
                <a key={x.slug} href={href} data-transition="" data-reveal="up">
                  <span>
                    <b>{title}</b>
                    <span style={{ display: 'block', color: 'var(--dim)', fontSize: '0.875rem', marginTop: '6px' }}>{sub}</span>
                  </span>
                  <Arrow className="" />
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <Finale />
      <Footer />
    </main>
  );
}

function Legal({ kind }: { kind: 'impressum' | 'datenschutz' }) {
  const imp = kind === 'impressum';
  return (
    <main id="main" className="legal">
      <div className="shell">
        <Kicker>Rechtliches</Kicker>
        <h1 className="display d-lg" style={{ margin: '18px 0 40px' }}>
          <Lines items={[imp ? 'Impressum' : 'Datenschutz']} />
        </h1>
        <div className="legal__body">
          <div className="todo">
            <b>{imp ? 'Vor dem Livegang ausfüllen' : 'Entwurf — juristisch prüfen lassen'}</b>
            <p>
              {imp
                ? 'Die Angaben im Projekt sind Platzhalter und müssen vor der Veröffentlichung ergänzt werden (§ 5 DDG / § 18 MStV).'
                : 'Der vollständige Text liegt im Projekt. Er ist ein technisch korrekter Ausgangspunkt, ersetzt aber keine Rechtsberatung.'}
            </p>
          </div>
          <p>
            Der vollständige Text steht im ausgelieferten Next.js-Projekt unter{' '}
            <strong>app/{kind}/page.tsx</strong>. Kontakt:{' '}
            <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export function renderRoutes() {
  const routes: { route: string; title: string; html: string }[] = [];
  const add = (route: string, title: string, node: React.ReactElement) =>
    routes.push({ route, title, html: renderToStaticMarkup(node) });

  add('/', `${BRAND.name} — ${BRAND.tagline}`, (
    <main id="main">
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <Intro />
      <ServicesRail />
      <Work />
      <Why />
      <Process />
      <Stats />
      <Finale />
      <Footer />
    </main>
  ));
  add('/leistungen', 'Leistungen', <Overview kind="leistungen" />);
  add('/standorte', 'Standorte', <Overview kind="standorte" />);
  for (const s of SERVICES) add(`/leistungen/${s.slug}`, s.metaTitle, <main id="main"><ServicePage s={s} /></main>);
  for (const p of PROJECTS) add(`/arbeiten/${p.slug}`, `${p.name} — Konzeptstudie`, <main id="main"><CasePage p={p} /></main>);
  for (const c of CITIES) add(`/standorte/${c.slug}`, `Digitalagentur ${c.name}`, <main id="main"><CityPage c={c} /></main>);
  add('/impressum', 'Impressum', <Legal kind="impressum" />);
  add('/datenschutz', 'Datenschutz', <Legal kind="datenschutz" />);
  return routes;
}
