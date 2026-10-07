import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../project.module.css";

export const metadata = createPageMetadata(
  "Digital systems",
  "A conceptual DIGITALE studio direction for useful digital products, websites and connected systems.",
  "/work/digital-systems",
);

const steps = [
  ["Understand the need", "Find the task, friction or opportunity that should shape the digital experience."],
  ["Design the system", "Connect content, journeys and technology around what people need to do."],
  ["Build with purpose", "Make a considered product direction that is clear, useful and ready to evolve."],
  ["Learn in use", "Use real-world feedback to guide what should improve next."],
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
        <h1>Make it<br />useful.</h1>
        <p>
          A conceptual digital direction for products, websites and connected
          systems shaped around a real human need.
        </p>
        <div className={styles.visual} aria-label="Abstract Digital & Technology studio direction">
          <b>DIGITAL</b>
          <span>DIGITAL &amp; TECHNOLOGY / STUDIO DIRECTION</span>
        </div>
      </section>
      <section className={styles.story}>
        <span>A POSSIBLE DIGITAL ARC</span>
        <h2>Make complexity feel clear and useful.</h2>
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
