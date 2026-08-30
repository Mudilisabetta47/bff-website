import { MARQUEE_ITEMS } from '@/lib/marquee';
import { Hero, Intro, Marquee, ServicesRail, Work, Why, Process, Stats, Finale, Footer } from '@/components/Home';

export default function HomePage() {
  return (
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
  );
}
