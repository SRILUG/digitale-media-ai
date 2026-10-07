import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../project.module.css";

export const metadata = createPageMetadata(
  "Growth systems direction",
  "A conceptual DIGITALE Digital & Technology direction for connected discovery, conversion and measurement.",
  "/work/growth-engine",
);

const steps = [
  ["Find the signal", "Clarify the audience, intent and questions that should guide discovery."],
  ["Connect the journey", "Consider how search, content and experience can work together."],
  ["Remove friction", "Explore the points where a clearer path could help people move forward."],
  ["Measure what matters", "Use meaningful signals to understand what to improve, not to claim an outcome."],
];

export default function Project() {
  return (
    <main className={styles.page}>
      <header>
        <Link href="/work">← ALL DIRECTIONS</Link>
        <span>DIGITAL &amp; TECHNOLOGY</span>
        <Link href="/start">START A PROJECT ↗</Link>
      </header>
      <section className={styles.hero}>
        <small>STUDIO DIRECTION · DIGITAL &amp; TECHNOLOGY</small>
        <h1>Make demand<br />move.</h1>
        <p>
          A conceptual growth-systems direction exploring how discovery,
          conversion and measurement might connect.
        </p>
        <div className={styles.visual} aria-label="Abstract digital growth systems direction">
          <b>GROWTH</b>
          <span>DIGITAL &amp; TECHNOLOGY / STUDIO DIRECTION</span>
        </div>
      </section>
      <section className={styles.story}>
        <span>A POSSIBLE SYSTEMS ARC</span>
        <h2>Connect the signals. Keep the outcome honest.</h2>
        <div>
          {steps.map(([title, description]) => (
            <article key={title}>
              <small>DIGITAL &amp; TECHNOLOGY</small>
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
