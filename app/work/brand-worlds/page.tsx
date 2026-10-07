import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../project.module.css";

export const metadata = createPageMetadata(
  "Brand worlds",
  "A conceptual DIGITALE studio direction for brand systems, campaigns and content built around a memorable idea.",
  "/work/brand-worlds",
);

const steps = [
  ["Find the signal", "Begin with the tension, audience or ambition that gives the idea a reason to exist."],
  ["Define the world", "Shape a distinctive voice and visual language that can hold together across contexts."],
  ["Make it travel", "Explore how the idea might extend into campaigns, content and everyday interactions."],
  ["Learn and adapt", "Leave room for the work to respond as people encounter it in the world."],
];

export default function Project() {
  return (
    <main className={styles.page}>
      <header>
        <Link href="/work">← ALL DIRECTIONS</Link>
        <span>BRAND &amp; CREATIVE</span>
        <Link href="/start">START A PROJECT ↗</Link>
      </header>
      <section className={styles.hero}>
        <small>STUDIO DIRECTION · BRAND &amp; CREATIVE</small>
        <h1>Make them<br />remember.</h1>
        <p>
          A conceptual exploration of how one clear brand idea might travel
          through identity, campaigns and content.
        </p>
        <div className={styles.visual} aria-label="Abstract Brand & Creative studio direction">
          <b>BRAND</b>
          <span>BRAND &amp; CREATIVE / STUDIO DIRECTION</span>
        </div>
      </section>
      <section className={styles.story}>
        <span>A POSSIBLE CREATIVE ARC</span>
        <h2>One clear idea, carried with intention.</h2>
        <div>
          {steps.map(([title, description]) => (
            <article key={title}>
              <small>BRAND &amp; CREATIVE</small>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.close}>
        <span>HAVE A GOOD QUESTION?</span>
        <h2>LET’S MAKE<br /><em>IT MATTER.</em></h2>
        <Link href="/start">START A CONVERSATION ↗</Link>
      </section>
    </main>
  );
}
