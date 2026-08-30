import { Arrow, Kicker, Lines } from '@/components/ui';
import { Footer } from '@/components/Home';

export default function NotFound() {
  return (
    <main id="main" className="legal">
      <div className="shell">
        <Kicker>Fehler 404</Kicker>
        <h1 className="display d-lg" style={{ margin: '18px 0 28px' }}>
          <Lines items={['Diese Seite', 'gibt es nicht.']} />
        </h1>
        <p className="lead" style={{ marginBottom: '32px' }}>
          Vielleicht wurde sie verschoben, vielleicht war der Link falsch. Beides lässt sich lösen.
        </p>
        <a className="btn btn--accent" href="/" data-magnet="0.22">
          Zur Startseite <Arrow />
        </a>
      </div>
      <Footer />
    </main>
  );
}
