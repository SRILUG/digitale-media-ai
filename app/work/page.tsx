import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import SiteHeader from "@/components/site/site-header";
import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata(
  "Work",
  "Studio directions and interactive prototypes across Brand & Creative, Digital & Technology, and Experiences & Production.",
  "/work",
);

const projects = [
  {
    slug: "brand-worlds",
    practice: "BRAND & CREATIVE",
    title: "Make them remember.",
    intro: "An exploration of how a clear brand idea can carry through identity, campaigns and content.",
    tone: "light",
    visual: "BRAND",
    anchor: "brand-creative",
  },
  {
    slug: "digital-systems",
    practice: "DIGITAL & TECHNOLOGY",
    title: "Make it useful.",
    intro: "A studio direction for digital products, websites and connected systems shaped around a real need.",
    tone: "dark",
    visual: "DIGITAL",
    anchor: "digital-technology",
  },
  {
    slug: "live-experiences",
    practice: "EXPERIENCES & PRODUCTION",
    title: "Make the moment matter.",
    intro: "An exploration of the thinking and production behind a live moment, from first idea to the room.",
    tone: "warm",
    visual: "EXPERIENCE",
    anchor: "experiences-production",
  },
  {
    slug: "growth-engine",
    practice: "DIGITAL & TECHNOLOGY",
    descriptor: "GROWTH SYSTEMS · STUDIO DIRECTION",
    title: "Make demand move.",
    intro: "A conceptual direction for connecting discovery, conversion and measurement into a digital system.",
    tone: "cream",
    visual: "GROWTH",
  },
  {
    slug: "property-intelligence",
    practice: "DIGITAL & TECHNOLOGY",
    descriptor: "INTERACTIVE PROTOTYPE · STUDIO DIRECTION",
    title: "Property Intelligence",
    intro: "A local, conversational prototype exploring how a property brief can become a clearer set of options.",
    tone: "property",
    visual: "PROPERTY",
  },
];

export default function Work() {
  return (
    <main className={`${styles.page} dgPage`}>
      <SiteHeader current="work" />
      <section className={styles.hero}>
        <span className={styles.eyebrow}>SELECTED STUDIO DIRECTIONS</span>
        <h1>IDEAS<br /><em>IN MOTION.</em></h1>
        <div className={styles.heroAside}>
          <p>
            A considered collection of concepts and prototypes across Brand &amp; Creative,
            Digital &amp; Technology, and Experiences &amp; Production.
          </p>
          <span>CONCEPTS, NOT VERIFIED CLIENT CASE STUDIES</span>
        </div>
      </section>

      <nav className={styles.filters} aria-label="Jump to a practice">
        <span>EXPLORE BY PRACTICE</span>
        <a href="#brand-creative">BRAND &amp; CREATIVE <b>↘</b></a>
        <a href="#digital-technology">DIGITAL &amp; TECHNOLOGY <b>↘</b></a>
        <a href="#experiences-production">EXPERIENCES &amp; PRODUCTION <b>↘</b></a>
      </nav>

      <section className={styles.list} aria-label="Studio directions">
        {projects.map((project) => (
          <Link
            id={project.anchor}
            href={`/work/${project.slug}`}
            key={project.slug}
            className={styles.project}
            data-tone={project.tone}
          >
            <div className={styles.projectVisual} aria-hidden="true">
              <small>STUDIO DIRECTION</small>
              <strong>{project.practice}</strong>
              <b>{project.visual}</b>
              <i />
              <span> DIGITALE MEDIA® / WORKING IDEAS</span>
            </div>
            <div className={styles.projectCopy}>
              <small>{project.practice}</small>
              {project.descriptor && <span className={styles.projectDescriptor}>{project.descriptor}</span>}
              <h2>{project.title}</h2>
              <p>{project.intro}</p>
              <span className={styles.projectLink}>
                {project.slug === "property-intelligence" ? "EXPLORE INTERACTIVE PROTOTYPE" : "EXPLORE STUDIO DIRECTION"}
                <b>↗</b>
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.end}>
        <span>HAVE A GOOD QUESTION?</span>
        <h2>LET’S MAKE<br /><em>IT MATTER.</em></h2>
        <p>Bring us the challenge. We’ll work out what shape the answer should take.</p>
        <Link href="/start">START A CONVERSATION <b>↗</b></Link>
      </section>
      <footer>
        <span>DIGITALE MEDIA®</span>
        <span>BRAND &amp; CREATIVE × DIGITAL &amp; TECHNOLOGY × EXPERIENCES &amp; PRODUCTION</span>
      </footer>
    </main>
  );
}
