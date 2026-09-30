"use client";

import Image from "next/image";
import styles from "./home-art-directed.module.css";

const work = [
  { number: "01", label: "BRAND × GROWTH", title: "Make attention worth something.", note: "Brand systems, campaigns and distribution built around a commercial objective.", tone: "lime" },
  { number: "02", label: "EXPERIENCE × CULTURE", title: "Make the moment travel.", note: "Launches, entertainment and live experiences designed for the room and everything after it.", tone: "violet" },
  { number: "03", label: "TECHNOLOGY × PRODUCT", title: "Make the system compound.", note: "Digital products, automation and intelligence that turn activity into a learning loop.", tone: "blue" },
];

const capabilities = [
  ["01", "CREATIVE", "Make people notice.", "Brand, campaigns, content, film, creators."],
  ["02", "GROWTH", "Make attention move.", "Performance, search, CRO, CRM, analytics."],
  ["03", "TECHNOLOGY", "Make the machine work.", "Web, products, AI, automation, data."],
  ["04", "EXPERIENCES", "Make it memorable.", "Launches, galas, activations, celebrations."],
];

const experienceTypes = ["PRODUCT LAUNCHES", "CORPORATE GALAS", "RED CARPETS", "ACTIVATIONS", "PRIVATE CELEBRATIONS"];

export default function HomeArtDirected() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a href="/" className={styles.logo}>DIGITALE<span>®</span></a>
        <nav>
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#experiences">Experiences</a>
          <a href="#founders">Founders</a>
        </nav>
        <a className={styles.navCta} href="/start">Start a project <span>↗</span></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <video autoPlay muted loop playsInline poster="/media/hero/showreel-poster.webp">
            <source src="/media/hero/showreel.webm" type="video/webm" />
            <source src="/media/hero/showreel.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroTop}>
          <span>CREATIVE × GROWTH × TECHNOLOGY</span>
          <span>HYDERABAD / INDIA</span>
        </div>
        <div className={styles.heroTitle}>
          <div className={styles.heroLine}><span>ONE</span><span>TEAM.</span></div>
          <div className={styles.heroLine}><span>REAL</span><i>GROWTH.</i></div>
        </div>
        <div className={styles.heroBottom}>
          <p>We build brands, digital products, growth systems and experiences — as one connected thing.</p>
          <a href="/start">BUILD SOMETHING <span>↗</span></a>
          <span className={styles.scroll}>SCROLL ↓</span>
        </div>
      </section>

      <section className={styles.statement}>
        <span className={styles.index}>01 / THE IDEA</span>
        <div>
          <p>Most agencies sell a discipline.</p>
          <h2>We connect the disciplines<br /><em>around the outcome.</em></h2>
        </div>
        <div className={styles.statementFoot}><span>CREATIVE</span><b>×</b><span>GROWTH</span><b>×</b><span>TECHNOLOGY</span><b>×</b><span>EXPERIENCE</span></div>
      </section>

      <section className={styles.work} id="work">
        <div className={styles.sectionHead}><span>02 / SELECTED WORK</span><span>THE WORK IS THE PROOF</span></div>
        <div className={styles.workIntro}>
          <h2>WORK<br /><em>WITH A JOB.</em></h2>
          <p>Not decoration. Not activity. Every idea has somewhere to go — attention, demand, conversion, experience or learning.</p>
        </div>
        <div className={styles.workList}>
          {work.map((item) => (
            <article className={styles.workCard} data-tone={item.tone} key={item.number}>
              <div className={styles.workVisual}>
                <span>{item.number}</span>
                <strong>{item.label}</strong>
                <div className={styles.visualWord}>{item.number === "01" ? "MOVE" : item.number === "02" ? "LIVE" : "BUILD"}</div>
              </div>
              <div className={styles.workCopy}>
                <span>{item.label}</span>
                <h3>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{item.note}</p>
                <a href="/work">View work <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capabilities} id="capabilities">
        <div className={styles.sectionHead}><span>03 / WHAT WE DO</span><span>ONE SYSTEM / FOUR FORCES</span></div>
        <div className={styles.capIntro}>
          <p>ONE COMPANY.</p>
          <h2>FOUR WAYS<br /><em>TO MOVE.</em></h2>
        </div>
        <div className={styles.capList}>
          {capabilities.map(([n, name, line, detail]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{name}</h3>
              <strong>{line}</strong>
              <p>{detail}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.experiences} id="experiences">
        <div className={styles.expImage}>
          <div className={styles.expGlow} />
          <span>LIVE</span>
        </div>
        <div className={styles.expContent}>
          <div className={styles.sectionHead}><span>04 / EXPERIENCES</span><span>BRAND × CULTURE × LIVE</span></div>
          <div className={styles.expTitle}>
            <p>FROM THE ROOM<br />TO THE FEED.</p>
            <h2>MAKE THE<br /><em>MOMENT MOVE.</em></h2>
          </div>
          <div className={styles.expTypes}>
            {experienceTypes.map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong><b>↗</b></div>)}
          </div>
          <a className={styles.expCta} href="/start?practice=experiences">Build an experience <span>↗</span></a>
        </div>
      </section>

      <section className={styles.engine}>
        <div className={styles.sectionHead}><span>05 / ENGINE ROOM</span><span>INTELLIGENCE / INFRASTRUCTURE</span></div>
        <div className={styles.engineGrid}>
          <div><p>AI IS NOT<br />THE PITCH.</p><h2>IT'S THE<br /><em>ENGINE.</em></h2></div>
          <div className={styles.engineOrb}><span>AI</span><i /><i /><i /></div>
          <p className={styles.engineText}>Research faster. Test more. Route better. Learn continuously. The audience sees better work; the intelligence stays backstage.</p>
        </div>
        <div className={styles.engineFlow}><span>RESEARCH</span><b>→</b><span>CREATE</span><b>→</b><span>DISTRIBUTE</span><b>→</b><span>LEARN</span><b>↺</b></div>
      </section>

      <section className={styles.founders} id="founders">
        <div className={styles.sectionHead}><span>06 / FOUNDERS</span><span>THE PEOPLE BUILDING DIGITALE</span></div>
        <div className={styles.founderIntro}><h2>BUILT BY<br /><em>BUILDERS.</em></h2><p>Creative instinct, product thinking and commercial obsession — in the same room.</p></div>
        <div className={styles.founderGrid}>
          <article>
            <div className={styles.sivaPlaceholder}><span>SV</span><small>PORTRAIT / COMING SOON</small></div>
            <div><h3>Siva Veerapaneni</h3><span>FOUNDER</span><p>BRAND / CREATIVE / EXPERIENCES</p></div>
          </article>
          <article>
            <div className={styles.umaPortrait}><Image src="/media/founders/uma-saravana-kumar.webp" alt="Gudali Uma Saravana Kumar" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><h3>Gudali Uma Saravana Kumar</h3><span>FOUNDER</span><p>PRODUCT / AI / GROWTH</p></div>
          </article>
        </div>
      </section>

      <section className={styles.finalCta}>
        <span>07 / START HERE</span>
        <h2>WHAT ARE<br /><em>WE BUILDING?</em></h2>
        <p>A brand to launch. A market to enter. A product to build. An experience to create.</p>
        <a href="/start">START A PROJECT <span>↗</span></a>
      </section>

      <footer className={styles.footer}><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY</span><span>HYDERABAD / INDIA · 2026</span></footer>
    </main>
  );
}
