"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./home-art-directed.module.css";

const work = [
  {
    visual: "BRAND",
    slug: "brand-worlds",
    number: "01",
    label: "BRAND / CAMPAIGN",
    title: <>MAKE THEM<br /><em>REMEMBER.</em></>,
    note: "Brand worlds, campaigns and content shaped around the idea that needs to travel.",
    tone: "paper",
  },
  {
    visual: "DIGITAL",
    slug: "digital-systems",
    number: "02",
    label: "DIGITAL / SYSTEMS",
    title: <>MAKE IT<br /><em>USEFUL.</em></>,
    note: "Websites, products, automation and digital systems built around the problem, not the service.",
    tone: "black",
  },
  {
    visual: "EXPERIENCES",
    slug: "live-experiences",
    number: "03",
    label: "EXPERIENCES / LIVE",
    title: <>MAKE THE<br /><em>MOMENT MATTER.</em></>,
    note: "Launches, productions, celebrations and physical experiences designed for the room and beyond it.",
    tone: "warm",
  },
];

const capabilities = [
  ["01", "CREATIVE", "Brand, campaigns, content, film, creators."],
  ["02", "GROWTH", "Performance, search, CRO, CRM, analytics."],
  ["03", "TECHNOLOGY", "Web, products, AI, automation, data."],
  ["04", "EXPERIENCES", "Launches, activations, productions, celebrations."],
];

const experienceTypes = [
  "PRODUCT LAUNCHES",
  "CORPORATE EVENTS",
  "RED CARPETS",
  "ACTIVATIONS",
  "WEDDINGS & CELEBRATIONS",
];

export default function HomeArtDirected() {
  return (
    <main className={`${styles.page} dgPage`}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo} aria-label="Digitale Media">
          <img src="/media/brand/digitale-media-logo.webp" alt="Digitale Media" />
        </Link>
        <nav aria-label="Primary">
          <Link href="/work">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/experiences">Experiences</Link>
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/start">Start a project ↗</Link>
        </nav>
        <Link href="/start" className={styles.mobileStart}>Start ↗</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>CREATIVE MEDIA × TECHNOLOGY × EXPERIENCES</span>
          <h1>IDEAS<br />HAVE<br /><em>A LIFE.</em></h1>
          <p>We turn ideas into brands, stories, products, growth and experiences people remember.</p>
          <div className={styles.heroActions}>
            <Link href="/start" className={styles.primaryButton}>START A PROJECT <span>↗</span></Link>
            <a href="#work" className={styles.textButton}>SEE THE WORK ↓</a>
          </div>
        </div>

        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.heroVisual}>
            <div className={styles.heroOrb} />
            <div className={styles.heroFrame}>
              <div className={styles.heroFrameTop}><span>DGT / 01</span><span>IDEA IN MOTION</span></div>
              <div className={styles.heroFrameBottom}><span>CREATIVE × DIGITAL</span><span>2026</span></div>
            </div>
            <div className={styles.heroSlash} />
          </div>
        </div>
        <div className={styles.heroCaption}>MAKING THEM MATTER IS WHAT WE DO.</div>
      </section>

      <section className={styles.blackStatement}>
        <div className={styles.sceneWord}>IDEA</div>
        <div className={styles.blackStatementCopy}>
          <span className={styles.kickerLight}>THE BEGINNING</span>
          <h2>AN IDEA<br /><em>WANTS TO MOVE.</em></h2>
          <p>Into a story. Into culture. Into a screen, a room, a product, a conversation.</p>
        </div>
      </section>

      <section className={styles.transformation}>
        <div className={styles.transformationIntro}>
          <span className={styles.kicker}>FROM THE FIRST THOUGHT</span>
          <h2>IDEA → STORY →<br /><em>ATTENTION → IMPACT</em></h2>
        </div>
        <div className={styles.transformationSteps}>
          <div><span>01</span><strong>IDEA</strong><p>The thing worth saying.</p></div>
          <div><span>02</span><strong>STORY</strong><p>The shape people can feel.</p></div>
          <div><span>03</span><strong>ATTENTION</strong><p>The reason they stop.</p></div>
          <div><span>04</span><strong>IMPACT</strong><p>What happens next.</p></div>
        </div>
      </section>

      <section id="work" className={styles.work}>
        <div className={styles.sectionHead}><span>SELECTED WORK</span><span>ONE STORY AT A TIME</span></div>
        <div className={styles.workIntro}>
          <h2>THE WORK<br /><em>HAS A JOB.</em></h2>
          <p>Not decoration. Not activity for activity’s sake. We make the idea move toward something.</p>
        </div>

        <div className={styles.workList}>
          {work.map((item) => (
            <article key={item.number} className={styles.workStory} data-tone={item.tone}>
              <div className={styles.workVisual}>
                <span>{item.number}</span>
                <strong>{item.label}</strong>
                <div className={styles.workVisualWord}>{item.visual}</div>
                <i />
              </div>
              <div className={styles.workCopy}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
                <Link href={`/work/${item.slug}`}>Explore ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className={styles.conviction}>
        <div className={styles.sectionHead}><span>THE CONVICTION</span><span>NO BOXES</span></div>
        <div className={styles.convictionGrid}>
          <div>
            <h2>WE DON’T<br />START WITH<br /><em>SERVICES.</em></h2>
          </div>
          <div>
            <p className={styles.bigSerif}>Bring us the problem. We’ll figure out what it needs to become.</p>
            <p className={styles.smallCopy}>A film. A brand. A digital product. A growth engine. A live experience. Sometimes one of them. Often more than one.</p>
          </div>
        </div>
        <div className={styles.capList}>
          {capabilities.map(([n, name, detail]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section id="experiences" className={styles.experiences}>
        <div className={styles.expImage}>
          <span className={styles.expMark}>EXPERIENCE / 01</span>
          <div className={styles.expOrb} />
        </div>
        <div className={styles.expContent}>
          <div className={styles.sectionHeadDark}><span>THE PHYSICAL WORLD</span><span>EXPERIENCES</span></div>
          <p className={styles.expLead}>Some things shouldn’t live on a screen.</p>
          <h2>MAKE THE<br /><em>MOMENT MOVE.</em></h2>
          <div className={styles.expTypes}>
            {experienceTypes.map((item, i) => (
              <div key={item}><span>0{i + 1}</span><strong>{item}</strong><b>↗</b></div>
            ))}
          </div>
          <Link href="/start?practice=experiences" className={styles.lightButton}>BUILD AN EXPERIENCE ↗</Link>
        </div>
      </section>

      <section className={styles.engine}>
        <div className={styles.sectionHead}><span>THE INVISIBLE BACKBONE</span><span>TECHNOLOGY</span></div>
        <div className={styles.engineGrid}>
          <div><span className={styles.kicker}>THE IDEA DOESN’T END</span><h2>WHEN IT<br /><em>LAUNCHES.</em></h2></div>
          <p className={styles.bigSerif}>Technology stays backstage — making research faster, products smarter and every next decision better informed.</p>
        </div>
        <div className={styles.engineFlow}><span>RESEARCH</span><b>→</b><span>BUILD</span><b>→</b><span>LAUNCH</span><b>→</b><span>MEASURE</span><b>→</b><span>LEARN</span></div>
      </section>

      <section id="people" className={styles.people}>
        <div className={styles.sectionHead}><span>THE PEOPLE BEHIND THE WORK</span><span>FOUNDERS</span></div>
        <div className={styles.peopleIntro}>
          <h2>BUILT BY<br /><em>PEOPLE.</em></h2>
          <p>Two perspectives. One company. Creative instinct, product thinking and the willingness to make the idea real.</p>
        </div>
        <div className={styles.founderGrid}>
          <article>
            <div className={styles.sivaPlaceholder}>
              <Image
                src="/media/founders/siva-veerapaneni.webp"
                alt="Siva Veerapaneni"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                loading="eager"
              />
            </div>
            <div className={styles.founderMeta}><h3>Siva Veerapaneni</h3><span>FOUNDER</span><p>BRAND / CREATIVE / EXPERIENCES</p></div>
          </article>
          <article>
            <div className={styles.umaPortrait}>
              <Image
                src="/media/founders/uma-saravana-kumar.webp"
                alt="Gudali Uma Saravana Kumar"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                loading="eager"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              <span>USK</span>
            </div>
            <div className={styles.founderMeta}><h3>Gudali Uma Saravana Kumar</h3><span>FOUNDER</span><p>PRODUCT / AI / GROWTH</p></div>
          </article>
        </div>
      </section>

      <section className={styles.cadence}>
        <span className={styles.kicker}>OUR RHYTHM</span>
        <div className={styles.cadenceWords}>
          <span>THINK.</span>
          <span>MAKE.</span>
          <span>LAUNCH.</span>
          <span>LEARN.</span>
          <span><em>REPEAT.</em></span>
        </div>
      </section>

      <section className={styles.finalCta}>
        <span className={styles.kickerLight}>THE NEXT CHAPTER</span>
        <h2>WHAT ARE YOU<br />TRYING TO MAKE<br /><em>MATTER?</em></h2>
        <p>A brand to launch. A product to build. A market to enter. An experience to create.</p>
        <Link href="/start">START A PROJECT <span>↗</span></Link>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 DIGITALE MEDIA. ALL RIGHTS RESERVED.</span>
        <span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span>
        <span>digitalemedia.group</span>
      </footer>
    </main>
  );
}
