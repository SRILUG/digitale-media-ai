import Image from "next/image";
import Link from "next/link";
import styles from "./home-art-directed.module.css";

const navigation = [
  ["WORK", "/work"],
  ["SERVICES", "/services"],
  ["EXPERIENCES", "/experiences"],
  ["ABOUT", "/about"],
] as const;

const projects = [
  {
    slug: "brand-worlds",
    number: "01",
    category: "BRAND / CAMPAIGN",
    title: "MAKE THEM REMEMBER.",
    description:
      "Brand worlds, campaigns and content built around the idea that needs to travel.",
    visual: "REMEMBER",
    tone: "brand",
  },
  {
    slug: "digital-systems",
    number: "02",
    category: "DIGITAL / SYSTEMS",
    title: "MAKE IT USEFUL.",
    description:
      "Websites, products, automation and digital systems built around real problems.",
    visual: "USEFUL",
    tone: "digital",
  },
  {
    slug: "live-experiences",
    number: "03",
    category: "EXPERIENCES / LIVE",
    title: "MAKE THE MOMENT MATTER.",
    description:
      "Launches, productions, activations and celebrations designed for the room and beyond it.",
    visual: "MOMENT",
    tone: "live",
  },
  {
    slug: "growth-engine",
    number: "04",
    category: "GROWTH / PERFORMANCE",
    title: "MAKE DEMAND MOVE.",
    description:
      "Search, performance, conversion and measurement connected into one operating system.",
    visual: "DEMAND",
    tone: "growth",
  },
];

const capabilities = [
  {
    number: "01",
    title: "STRATEGY",
    detail: "Positioning / Research / Direction / Growth",
    expanded: "Find the sharpest problem, define the opportunity and give every discipline a shared direction.",
    visual: "DEFINE",
  },
  {
    number: "02",
    title: "CREATIVE",
    detail: "Brand / Campaigns / Content / Film",
    expanded: "Build the identity, story and creative work people can recognise, feel and remember.",
    visual: "MAKE",
  },
  {
    number: "03",
    title: "DIGITAL",
    detail: "Web / Products / AI / Automation / Data",
    expanded: "Create useful digital experiences and the technology that helps ideas travel further.",
    visual: "BUILD",
  },
  {
    number: "04",
    title: "EXPERIENCE",
    detail: "Culture / Space / People / Live production",
    expanded: "Shape the live environment, production and details that turn an idea into a shared moment.",
    visual: "LIVE",
  },
  {
    number: "05",
    title: "EXECUTION",
    detail: "Production / Launch / Measurement / Learning",
    expanded: "Bring every part into the world, then learn from what happens and carry it forward.",
    visual: "DELIVER",
  },
];

const experienceTypes = [
  "WEDDINGS & CELEBRATIONS",
  "RED CARPET EVENTS",
  "CORPORATE EVENTS",
  "PRODUCT LAUNCHES",
  "BRAND ACTIVATIONS",
  "LIVE EXPERIENCES",
];

const technologyLayers = ["WEB", "AI", "AUTOMATION", "DATA", "DIGITAL PRODUCTS"];

const founders = [
  {
    name: "SIVA VEERAPANENI",
    discipline: "BRAND / CREATIVE / EXPERIENCES",
    image: "/media/founders/siva-veerapaneni.webp",
    alt: "Siva Veerapaneni",
    number: "01",
  },
  {
    name: "UMA SARAVANA KUMAR GUDALI",
    discipline: "PRODUCT / AI / GROWTH",
    image: "/media/founders/uma-saravana-kumar.webp",
    alt: "Uma Saravana Kumar Gudali",
    number: "02",
  },
];

export default function HomeArtDirected() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo} aria-label="DIGITALE MEDIA home">
          <Image
            src="/media/brand/digitale-media-logo.webp"
            alt=""
            width={270}
            height={70}
            sizes="(max-width: 600px) 142px, 184px"
            priority
          />
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <Link href="/start" className={styles.navCta}>
          START A PROJECT <span aria-hidden="true">↗</span>
        </Link>
        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">MENU <span aria-hidden="true">+</span></summary>
          <nav className={styles.mobilePanel} aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
            <Link href="/start">START A PROJECT ↗</Link>
          </nav>
        </details>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBackdrop} aria-hidden="true">
          <div className={styles.heroArchitecture}>
            <span className={styles.heroArchitectureFrame} />
            <span className={styles.heroArchitecturePlane} />
            <span className={styles.heroArchitectureLine} />
          </div>
          <span className={styles.heroVisualNote}>SPACE / LIGHT / IN MOTION</span>
          <span className={styles.heroGrain} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            <span>DIGITALE MEDIA</span>
            <span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span>
          </div>
          <h1 id="hero-title">
            <span>IDEAS</span>
            <span className={styles.heroLife}>HAVE <em>A LIFE.</em></span>
          </h1>
          <div className={styles.heroBottom}>
            <p>Ideas move when every discipline moves together.</p>
            <div className={styles.heroActions}>
              <Link href="/start" className={styles.buttonLight}>
                START A PROJECT <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/work" className={styles.heroExplore}>
                EXPLORE WORK <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <span>HYDERABAD, INDIA · 2026</span>
            <span>01 — OPENING</span>
          </div>
        </div>
        <span className={styles.heroSeal} aria-hidden="true">01 <span>/ 09</span></span>
      </section>

      <section className={styles.transition} aria-labelledby="transition-title">
        <div className={styles.transitionVisual} aria-hidden="true">
          <span className={styles.transitionFrame} />
          <span className={styles.transitionLight} />
          <span className={styles.transitionIndex}>A THOUGHT / TAKING SHAPE</span>
          <strong>01</strong>
        </div>
        <div className={styles.transitionCopy}>
          <div className={styles.sectionLabel}>
            <span>02 / MANIFESTO</span>
            <span>ONE CONNECTED PRACTICE</span>
          </div>
          <h2 id="transition-title">AN IDEA<br /><em>WANTS TO MOVE.</em></h2>
          <p>
            Four disciplines, moving together from the first thought to the
            finished work.
          </p>
          <div className={styles.ideaFlow} aria-label="Idea becomes story, attention, and impact">
            <span>IDEA</span><i aria-hidden="true">→</i>
            <span>STORY</span><i aria-hidden="true">→</i>
            <span>ATTENTION</span><i aria-hidden="true">→</i>
            <span>IMPACT</span>
          </div>
        </div>
      </section>

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
          <span>03 / SELECTED WORK</span>
          <span>EXISTING EDITORIAL DIRECTIONS</span>
        </div>
        <div className={styles.workHeading}>
          <h2 id="work-title">BUILT TO<br /><em>BE SEEN.</em></h2>
          <p>
            Each direction begins with a purpose. Explore the work without
            the noise.
          </p>
        </div>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <article
              className={styles.project}
              data-tone={project.tone}
              id={`project-${project.slug}`}
              key={project.slug}
            >
              <Link
                href={`/work/${project.slug}`}
                className={styles.projectArtwork}
                aria-label={`View ${project.category.toLowerCase()} case`}
              >
                <span className={styles.projectArtworkTop}>
                  <span>{project.number} / {String(projects.length).padStart(2, "0")}</span>
                  <span>{project.category}</span>
                </span>
                <span className={styles.projectVisual} aria-hidden="true">
                  <i />
                  <b>{project.visual}</b>
                  <em />
                </span>
                <span className={styles.projectArtworkBottom}>
                  <span>DIGITALE / EDITION {project.number}</span>
                  <span>VIEW CASE ↗</span>
                </span>
              </Link>
              <div className={styles.projectCopy}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link href={`/work/${project.slug}`}>
                  VIEW CASE <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Link href="/work" className={styles.allWork}>
          ALL WORK <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.capabilities} id="services" aria-labelledby="capabilities-title">
        <div className={styles.capabilityVisual} aria-hidden="true">
          <div className={styles.capabilityRing} />
          <span className={styles.capabilityWord}>ONE<br />SYSTEM.</span>
          <span className={styles.capabilityAside}>CREATIVE / GROWTH / TECHNOLOGY / EXPERIENCES</span>
        </div>
        <div className={styles.capabilityContent}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
            <span>04 / ONE SHARED PROCESS</span>
            <span id="capabilities-title">FIVE STAGES / ONE TEAM</span>
          </div>
          <h2>NO HANDOFFS.<br /><em>NO FRAGMENTED<br />TEAMS.</em></h2>
          <div className={styles.capabilityList}>
            {capabilities.map((capability, index) => (
              <details className={styles.capability} key={capability.number} open={index === 0}>
                <summary>
                  <span className={styles.capabilityNumber}>{capability.number}</span>
                  <span className={styles.capabilityName}>{capability.title}</span>
                  <span className={styles.capabilityItems}>{capability.detail}</span>
                  <span className={styles.capabilityToggle} aria-hidden="true">+</span>
                </summary>
                <div className={styles.capabilityExpanded}>
                  <span>{capability.visual}</span>
                  <p>{capability.expanded}</p>
                </div>
              </details>
            ))}
          </div>
          <Link href="/services" className={styles.serviceLink}>
            EXPLORE SERVICES <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={styles.experiences} id="experiences" aria-labelledby="experiences-title">
        <div className={styles.experienceScene} aria-hidden="true">
          <span className={styles.sceneLight} />
          <span className={styles.sceneCurtain} />
          <span className={styles.sceneStage} />
          <span className={styles.sceneBeam} />
          <span className={styles.sceneCaption}>A MOMENT, MADE TO LAST</span>
        </div>
        <div className={styles.experienceContent}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
            <span>05 / EXPERIENCES</span>
            <span>CULTURE / PRODUCTION / STORY / SPACE / PEOPLE / MOMENT</span>
          </div>
          <h2 id="experiences-title">MOMENTS<br /><em>MATTER.</em></h2>
          <p>
            Weddings and celebrations, red carpets, corporate events, product
            launches and brand activations — made for the room and everything
            that follows.
          </p>
          <ul className={styles.experienceTypes}>
            {experienceTypes.map((type, index) => (
              <li key={type}>
                <span>0{index + 1}</span>
                <strong>{type}</strong>
                <span aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
          <Link href="/start?practice=experiences" className={styles.experienceLink}>
            START AN EXPERIENCE <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={styles.technology} id="technology" aria-labelledby="technology-title">
        <div className={styles.technologyTop}>
          <div className={styles.sectionLabel}>
            <span>06 / DIGITAL & TECHNOLOGY</span>
            <span>THE LAYER BENEATH THE STORY</span>
          </div>
          <div className={styles.technologyHeading}>
            <h2 id="technology-title">BUILT FOR<br /><em>WHAT&apos;S NEXT.</em></h2>
            <p>
              Digital is not the destination. It is the system that helps
              ideas travel further and work harder.
            </p>
          </div>
        </div>
        <div className={styles.digitalComposition}>
          <div className={styles.digitalIndex}>
            <span>THE DIGITAL STUDIO</span>
            <span>TOOLS WITH A PURPOSE</span>
          </div>
          <div className={styles.digitalOrbit} aria-hidden="true">
            <span />
            <span />
            <span />
            <b>DIGITALE</b>
          </div>
          <div className={styles.technologyLayers}>
            {technologyLayers.map((layer, index) => (
              <div key={layer}>
                <span>0{index + 1}</span>
                <strong>{layer}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>
        </div>
        <Link href="/work/digital-systems" className={styles.technologyLink}>
          EXPLORE DIGITAL SYSTEMS <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.founders} id="about" aria-labelledby="founders-title">
        <div className={styles.sectionLabel}>
          <span>07 / FOUNDERS</span>
          <span>THE PEOPLE BEHIND DIGITALE</span>
        </div>
        <div className={styles.founderHeading}>
          <h2 id="founders-title">THE PEOPLE<br />BEHIND<br /><em>DIGITALE.</em></h2>
          <p>
            Two perspectives, working inside one connected practice.
          </p>
        </div>
        <div className={styles.founderList}>
          {founders.map((founder) => (
            <article className={styles.founder} key={founder.number}>
              <div className={styles.founderPortrait}>
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span>{founder.number} / FOUNDER</span>
                <i aria-hidden="true" />
              </div>
              <div className={styles.founderMeta}>
                <div>
                  <h3>{founder.name}</h3>
                  <span>FOUNDER</span>
                </div>
                <p>{founder.discipline}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.system} aria-labelledby="system-title">
        <div className={styles.systemArtwork} aria-hidden="true">
          <span className={styles.systemFrame} />
          <span className={styles.systemAxis} />
          <span className={styles.systemCore}>ONE</span>
          <span className={styles.systemCaption}>ONE PRACTICE / MANY DISCIPLINES</span>
        </div>
        <div className={styles.systemCopy}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
            <span>08 / THE DIGITALE PRINCIPLE</span>
            <span>FROM FIRST THOUGHT TO FINAL FRAME</span>
          </div>
          <h2 id="system-title">ONE TEAM.<br /><em>ONE SYSTEM.</em></h2>
          <p>
            From the first thought to the final frame, everyone works inside
            the same system.
          </p>
          <div className={styles.systemFlow}>
            {["STRATEGY", "CREATIVE", "DIGITAL", "EXPERIENCE", "EXECUTION"].map((step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                {index < 4 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="cta-title">
        <div className={styles.finalArtwork} aria-hidden="true">
          <span />
          <span />
          <span />
          <b>D.</b>
        </div>
        <span className={styles.finalLabel}>THE NEXT FRAME / YOURS</span>
        <h2 id="cta-title">HAVE SOMETHING<br /><em>WORTH BUILDING?</em></h2>
        <div className={styles.finalBottom}>
          <p>Let&apos;s turn the idea into something people can see, feel and remember.</p>
          <Link href="/start" className={styles.buttonLight}>
            START A PROJECT <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.footerLogo} aria-label="DIGITALE MEDIA home">
            <Image
              src="/media/brand/digitale-media-logo.webp"
              alt=""
              width={270}
              height={70}
              sizes="184px"
            />
          </Link>
          <span>HYDERABAD, INDIA · 2026</span>
        </div>
        <div className={styles.footerBottom}>
          <nav aria-label="Footer navigation">
            {navigation.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
            <Link href="/insights">INSIGHTS</Link>
          </nav>
          <Link href="/start">PROJECT ENQUIRIES ↗</Link>
          <span>© 2026 DIGITALE MEDIA</span>
        </div>
      </footer>
    </main>
  );
}
