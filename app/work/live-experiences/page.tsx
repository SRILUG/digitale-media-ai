import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../project.module.css";

export const metadata = createPageMetadata(
  "Live experiences",
  "A conceptual DIGITALE studio direction for launches, activations and live production.",
  "/work/live-experiences",
);

const steps = [
  ["Imagine the moment", "Start with what people should feel, notice or remember when they are there."],
  ["Shape the experience", "Bring story, space, people and production into one considered direction."],
  ["Make it happen", "Plan the details that allow an idea to work in the room and beyond it."],
  ["Carry it forward", "Consider how the moment can continue through content and conversation."],
];

export default function Project() {
  return (
    <main className={styles.page}>
      <header>
        <Link href="/work">← ALL DIRECTIONS</Link>
        <span>EXPERIENCES &amp; PRODUCTION</span>
        <Link href="/start">START A PROJECT ↗</Link>
      </header>
      <section className={styles.hero}>
        <small>STUDIO DIRECTION · EXPERIENCES &amp; PRODUCTION</small>
        <h1>Make the<br />moment matter.</h1>
        <p>
          A conceptual direction for a live moment, from the first idea and
          experience design through considered production.
        </p>
        <div className={styles.visual} aria-label="Abstract Experiences & Production studio direction">
          <b>EXPERIENCE</b>
          <span>EXPERIENCES &amp; PRODUCTION / STUDIO DIRECTION</span>
        </div>
      </section>
      <section className={styles.story}>
        <span>A POSSIBLE LIVE ARC</span>
        <h2>Design for the room, and for what comes after.</h2>
        <div>
          {steps.map(([title, description]) => (
            <article key={title}>
              <small>EXPERIENCES &amp; PRODUCTION</small>
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
