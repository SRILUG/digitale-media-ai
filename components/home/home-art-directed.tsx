import Image from "next/image";
import Link from "next/link";
import styles from "./home-art-directed.module.css";

const navigation = [
  ["WORK", "/work"],
  ["SERVICES", "/services"],
  ["EXPERIENCES", "/experiences"],
  ["INSIGHTS", "/insights"],
  ["ABOUT", "/about"],
] as const;

const projects = [
  {
    slug: "brand-worlds",
    category: "BRAND & CREATIVE",
    title: "BRAND-WORLD SYSTEM",
    problem: "Make one brand idea recognizable across identity, campaigns and content.",
    contribution: "Connect brand architecture, visual language and editorial formats around that idea.",
    visual: "REMEMBER",
    tone: "brand",
  },
  {
    slug: "digital-systems",
    category: "DIGITAL & TECHNOLOGY",
    title: "CONNECTED DIGITAL PLATFORM",
    problem: "Connect a digital product with the information and workflows around it.",
    contribution: "Map a system across interface, automation, data and integrations.",
    visual: "USEFUL",
    tone: "digital",
  },
  {
    slug: "live-experiences",
    category: "EXPERIENCES & PRODUCTION",
    title: "LIVE LAUNCH EXPERIENCE",
    problem: "Carry a launch idea from the live room into the audience journey beyond it.",
    contribution: "Connect creative concept, spatial production, content and digital touchpoints.",
    visual: "MOMENT",
    tone: "live",
  },
  {
    slug: "growth-engine",
    category: "DIGITAL & TECHNOLOGY",
    title: "GROWTH OPERATING MODEL",
    problem: "Make acquisition, search, conversion and measurement work as one system.",
    contribution: "Connect channel strategy, landing experiences and analytics into one operating model.",
    visual: "DEMAND",
    tone: "growth",
  },
];

const practices = [
  {
    name: "BRAND & CREATIVE",
    capabilities: "Brand architecture · Design systems · Campaign worlds · Content & editorial",
    description: "Giving ideas a distinct form, voice and cultural presence.",
  },
  {
    name: "DIGITAL & TECHNOLOGY",
    capabilities: "Digital products · Conversational AI · Internal platforms · Automation & data",
    description: "Building digital and intelligent systems that solve concrete business friction.",
  },
  {
    name: "EXPERIENCES & PRODUCTION",
    capabilities: "Flagship launches · Spatial activations · Red carpets · Cultural moments",
    description: "Designing physical spaces and high-stakes rooms people remember.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "DISCOVER",
    detail: "BUSINESS / AUDIENCE / OPPORTUNITY / CONSTRAINTS",
    expanded: "Understand the business, audience, opportunity and constraints.",
    visual: "DISCOVER",
  },
  {
    number: "02",
    title: "DEFINE",
    detail: "SET A CLEAR DIRECTION",
    expanded: "Turn ambiguity into a clear strategic and creative direction.",
    visual: "DEFINE",
  },
  {
    number: "03",
    title: "MAKE",
    detail: "BUILD WHAT THE WORK NEEDS",
    expanded: "Build the identity, product, system or experience.",
    visual: "MAKE",
  },
  {
    number: "04",
    title: "LAUNCH",
    detail: "BRING THE WORK INTO THE WORLD",
    expanded: "Bring the work into the real world.",
    visual: "LAUNCH",
  },
  {
    number: "05",
    title: "LEARN",
    detail: "OBSERVE / MEASURE / EVOLVE",
    expanded: "Measure, observe and evolve the work.",
    visual: "LEARN",
  },
];

const experienceTypes = [
  {
    name: "CORPORATE EVENTS",
    focus: "Corporate event",
    line: "Leadership gatherings and company events.",
    description: "Plan the programme and environment through live production.",
  },
  {
    name: "PRODUCT LAUNCHES",
    focus: "Product launch",
    line: "Bring a new offer into the room.",
    description: "Connect concept, staging, content and audience journey.",
  },
  {
    name: "RED CARPETS",
    focus: "Red carpet",
    line: "Premieres and public-facing productions.",
    description: "Design for the room, the camera and the audience beyond it.",
  },
  {
    name: "ACTIVATIONS",
    focus: "Brand activation",
    line: "Give people a role in the brand.",
    description: "Create participation within a clear live setting.",
  },
  {
    name: "ENTERTAINMENT",
    focus: "Entertainment",
    line: "Artist-led and culture-led productions.",
    description: "Take the work from creative concept through event delivery.",
  },
];

const technologyLayers = [
  "DIGITAL PRODUCTS & WEBSITES",
  "CONVERSATIONAL AI",
  "INTERNAL PLATFORMS",
  "AUTOMATION & WORKFLOWS",
  "DATA & DASHBOARDS",
];

const founders = [
  {
    name: "SIVA VEERAPANENI",
    discipline: "BRAND / CREATIVE / EXPERIENCES",
    image: "/media/founders/siva-veerapaneni.webp",
    alt: "Siva Veerapaneni",
    role: "FOUNDER",
    bio: "Leads brand, creative direction and experiences, staying close from the first brief through production.",
  },
  {
    name: "UMA SARAVANA KUMAR GUDALI",
    discipline: "PRODUCT / AI / GROWTH",
    image: "/media/founders/uma-saravana-kumar.webp",
    alt: "Uma Saravana Kumar Gudali",
    role: "CO-FOUNDER",
    bio: "Leads product, AI and growth, shaping digital products and connected systems around real business needs.",
  },
];

const insights = [
  {
    number: "01",
    tag: "AI / PRODUCT",
    title: "WHAT AI CHANGES INSIDE A PRODUCT TEAM",
    description: "A practical look at where intelligence belongs in research, workflows, products and decision systems.",
    href: "/insights/ai-product",
  },
  {
    number: "02",
    tag: "GROWTH / SEARCH",
    title: "SEARCH IS BECOMING AN ANSWER SYSTEM",
    description: "How search, answer engines, content and conversion increasingly meet in one discovery journey.",
    href: "/insights/search-answer-systems",
  },
  {
    number: "03",
    tag: "EXPERIENCES / CULTURE",
    title: "THE EXPERIENCE DOESN'T END AT THE VENUE",
    description: "Why the strongest physical moments now need a digital life before, during and after the room.",
    href: "/insights/experience-afterlife",
  },
  {
    number: "04",
    tag: "BRAND / STRATEGY",
    title: "A BRAND IS A SYSTEM, NOT A LOGO",
    description: "The identity is only the visible layer. The real brand lives in every interaction that follows.",
    href: "/insights/brand-as-system",
  },
];

function ProjectStudy({ tone }: { tone: (typeof projects)[number]["tone"] }) {
  return (
    <svg className={styles.projectDrawing} viewBox="0 0 1000 620" aria-hidden="true" focusable="false">
      <g className={styles.drawingGrid}>
        <path d="M80 110H920M80 250H920M80 390H920M80 530H920M170 70V550M390 70V550M610 70V550M830 70V550" />
      </g>
      {tone === "brand" && (
        <g>
          <path className={styles.drawingFrame} d="M248 92L762 130V514L248 476Z" />
          <path className={styles.drawingFine} d="M289 132L720 163V468L289 436Z" />
          <circle className={styles.drawingAccent} cx="505" cy="296" r="105" />
          <circle className={styles.drawingFine} cx="505" cy="296" r="67" />
          <path className={styles.drawingLight} d="M400 296H610M505 191V401M348 180L662 413M348 413L662 180" />
          <path className={styles.drawingBlock} d="M290 444H400V467H290ZM610 160H720V183H610Z" />
          <path className={styles.drawingFine} d="M319 108V126M334 109V127M349 110V128M661 484V502M676 485V503M691 486V504" />
        </g>
      )}
      {tone === "digital" && (
        <g>
          <path className={styles.drawingFrame} d="M210 108H790V442H210Z" />
          <path className={styles.drawingFine} d="M210 154H790M252 108V442" />
          <circle className={styles.drawingAccent} cx="231" cy="131" r="4" />
          <circle className={styles.drawingFine} cx="248" cy="131" r="4" />
          <path className={styles.drawingPanel} d="M291 188H501V387H291Z" />
          <path className={styles.drawingLight} d="M525 207H736M525 231H691M525 255H718M525 315H736M525 339H677M525 363H711" />
          <path className={styles.drawingAccent} d="M318 360L359 316L395 330L448 244L481 269" />
          <path className={styles.drawingFine} d="M291 388H736M398 442V470M602 442V470M354 470H647" />
          <path className={styles.drawingFrame} d="M183 483L817 483L770 516H230Z" />
          <circle className={styles.drawingBlock} cx="500" cy="499" r="4" />
        </g>
      )}
      {tone === "live" && (
        <g>
          <path className={styles.drawingFrame} d="M178 470V203L500 91L822 203V470" />
          <path className={styles.drawingFine} d="M238 470V224L500 134L762 224V470M300 470V247L500 178L700 247V470" />
          <path className={styles.drawingBeam} d="M500 122L340 430H660ZM500 122L244 430H756Z" />
          <path className={styles.drawingAccent} d="M289 430H711V475H289Z" />
          <path className={styles.drawingLight} d="M331 453H669M380 476V507M620 476V507M350 507H650" />
          <path className={styles.drawingFine} d="M154 526H846M188 538H812" />
          <circle className={styles.drawingBlock} cx="500" cy="122" r="9" />
        </g>
      )}
      {tone === "growth" && (
        <g>
          <path className={styles.drawingFine} d="M206 468H797M251 468V420M333 468V366M415 468V396M497 468V292M579 468V330M661 468V236M743 468V189" />
          <path className={styles.drawingAccent} d="M221 394C300 390 307 316 380 324S471 379 531 292S626 311 686 215S757 188 795 132" />
          <path className={styles.drawingLight} d="M221 394L795 132M221 394V132M221 394H795" />
          <circle className={styles.drawingBlock} cx="380" cy="324" r="8" />
          <circle className={styles.drawingBlock} cx="531" cy="292" r="8" />
          <circle className={styles.drawingBlock} cx="686" cy="215" r="8" />
          <path className={styles.drawingFrame} d="M744 130L795 132L780 181" />
          <path className={styles.drawingFine} d="M250 493H315M332 493H397M414 493H479M496 493H561M578 493H643M660 493H725" />
        </g>
      )}
    </svg>
  );
}

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
          <svg className={styles.heroBlueprint} viewBox="0 0 1000 760" focusable="false">
            <g>
              <path d="M274 624V187L604 91L858 178V624H274ZM322 585H808V214L604 145L322 226V585ZM604 91V624M274 187L604 276L858 178M322 226L604 315L808 214M210 624H912M248 653H884" />
              <path d="M358 585V350L604 423L763 370V585M397 585V390L604 449L724 410V585M353 350L604 276L763 328M604 315V449" />
              <path d="M176 624L322 585M808 585L923 624M604 91V46M858 178L916 150M274 187L226 172" />
              <circle cx="604" cy="91" r="7" />
              <circle cx="274" cy="187" r="5" />
              <circle cx="858" cy="178" r="5" />
            </g>
            <g className={styles.blueprintTicks}>
              <path d="M274 650V666M322 650V661M604 650V666M808 650V661M858 650V666M254 624H238M254 585H244M254 350H238M254 187H238" />
            </g>
          </svg>
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
            <span>CREATIVE × DIGITAL × EXPERIENCES</span>
          </div>
          <h1 id="hero-title">
            <span>IDEAS</span>
            <span className={styles.heroLife}>HAVE <em>A LIFE.</em></span>
          </h1>
          <div className={styles.heroBottom}>
            <p>Founder-led studio for companies shaping brands, digital products and high-stakes experiences.</p>
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
            <span>FOUNDER-LED STUDIO</span>
          </div>
        </div>
      </section>

      <section className={styles.transition} aria-labelledby="transition-title">
        <div className={styles.transitionVisual} aria-hidden="true">
          <span className={styles.transitionFrame} />
          <span className={styles.transitionLight} />
          <span className={styles.transitionIndex}>A THOUGHT / TAKING SHAPE</span>
        </div>
        <div className={styles.transitionCopy}>
          <div className={styles.sectionLabel}>
            <span>THREE CORE PRACTICES</span>
            <span>CREATIVE / DIGITAL / EXPERIENCES</span>
          </div>
          <h2 id="transition-title">THREE CORE<br /><em>PRACTICES.</em></h2>
          <div className={styles.practiceList}>
            {practices.map((practice) => (
              <article className={styles.practice} key={practice.name}>
                <h3>{practice.name}</h3>
                <p>{practice.description}</p>
                <span>{practice.capabilities}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
          <span>SELECTED WORK</span>
          <span>SELECTED STUDIO DIRECTIONS</span>
        </div>
        <div className={styles.workHeading}>
          <h2 id="work-title">STUDIO<br /><em>CONCEPTS.</em></h2>
          <p>
            A selection of concepts showing how DIGITALE approaches brand,
            digital and experience problems.
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
                aria-label={`View ${project.category.toLowerCase()} direction`}
              >
                <span className={styles.projectArtworkTop}>
                  <span>STUDIO CONCEPT</span>
                  <span>{project.category}</span>
                </span>
                <span className={styles.projectVisual} aria-hidden="true">
                  <ProjectStudy tone={project.tone} />
                  <b>{project.visual}</b>
                </span>
                <span className={styles.projectArtworkBottom}>
                  <span>DIGITALE / CONCEPT</span>
                  <span>EXPLORE CONCEPT ↗</span>
                </span>
              </Link>
              <div className={styles.projectCopy}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3>{project.title}</h3>
                <p><strong>Problem explored:</strong> {project.problem}</p>
                <p><strong>DIGITALE direction:</strong> {project.contribution}</p>
                <Link href={`/work/${project.slug}`}>
                  EXPLORE CONCEPT <span aria-hidden="true">↗</span>
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
          <svg className={styles.capabilityDrawing} viewBox="0 0 900 740" focusable="false">
            <path d="M450 92L735 300L625 590L275 590L165 300L450 92Z" />
            <path d="M450 92V370M735 300L450 370M625 590L450 370M275 590L450 370M165 300L450 370" />
            <path d="M450 157L650 304L570 514L330 514L250 304L450 157Z" />
            <path d="M450 92V45M735 300L780 270M625 590L650 634M275 590L250 634M165 300L120 270" />
            <circle cx="450" cy="92" r="13" />
            <circle cx="735" cy="300" r="13" />
            <circle cx="625" cy="590" r="13" />
            <circle cx="275" cy="590" r="13" />
            <circle cx="165" cy="300" r="13" />
            <circle cx="450" cy="370" r="6" />
          </svg>
          <span className={styles.capabilityWord}>ONE<br />SYSTEM.</span>
          <span className={styles.capabilityAside}>CREATIVE / DIGITAL / EXPERIENCES</span>
        </div>
        <div className={styles.capabilityContent}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
            <span>HOW WE WORK</span>
            <span id="capabilities-title">DISCOVER / DEFINE / MAKE / LAUNCH / LEARN</span>
          </div>
          <h2>ONE TEAM.<br /><em>ALL THE WAY THROUGH.</em></h2>
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
          <svg className={styles.experienceDrawing} viewBox="0 0 900 760" focusable="false">
            <path d="M93 655V212L450 73L807 212V655M145 655V246L450 127L755 246V655M213 655V278L450 186L687 278V655" />
            <path d="M93 212L450 354L807 212M145 246L450 372L755 246M213 278L450 390L687 278" />
            <path d="M450 127L280 584H620ZM450 127L190 584H710Z" />
            <path d="M205 574H695V630H205ZM155 655H745M125 676H775" />
            <path d="M274 630V655M626 630V655M322 584V630M578 584V630" />
            <circle cx="450" cy="127" r="11" />
          </svg>
          <span className={styles.sceneCaption}>A MOMENT, MADE TO LAST</span>
        </div>
        <div className={styles.experienceContent}>
          <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
            <span>EXPERIENCES & PRODUCTION</span>
            <span>LAUNCHES / ACTIVATIONS / RED CARPETS / CULTURE</span>
          </div>
          <h2 id="experiences-title">MOMENTS<br /><em>MATTER.</em></h2>
          <p>
            We design and produce launches, activations, red carpets and
            cultural moments—from the first brief through showtime.
          </p>
          <ul className={styles.experienceTypes}>
            {experienceTypes.map((type, index) => (
              <li key={type.focus}>
                <Link href={`/start?practice=experiences&focus=${encodeURIComponent(type.focus)}`}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{type.name}</strong>
                    <small>{type.line}</small>
                    <p>{type.description}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </Link>
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
            <span>DIGITAL & TECHNOLOGY</span>
            <span>PRODUCTS / PLATFORMS / AUTOMATION / DATA</span>
          </div>
          <div className={styles.technologyHeading}>
            <h2 id="technology-title">SYSTEMS FOR<br /><em>REAL WORK.</em></h2>
            <p>
              Digital products, websites, apps, automation and data systems
              built around concrete business needs.
            </p>
          </div>
        </div>
        <div className={styles.digitalComposition}>
          <div className={styles.digitalIndex}>
            <span>THE DIGITAL STUDIO</span>
            <span>TOOLS WITH A PURPOSE</span>
          </div>
          <div className={styles.digitalOrbit} aria-hidden="true">
            <svg className={styles.digitalDrawing} viewBox="0 0 500 500" focusable="false">
              <path d="M250 65L419 164V336L250 435L81 336V164L250 65Z" />
              <path d="M250 65V250M419 164L250 250M419 336L250 250M250 435V250M81 336L250 250M81 164L250 250" />
              <path d="M250 111L356 173V293L250 355L144 293V173L250 111Z" />
              <path d="M250 155L313 191V263L250 299L187 263V191L250 155Z" />
              <circle cx="250" cy="250" r="27" />
              <circle cx="250" cy="65" r="6" />
              <circle cx="419" cy="164" r="6" />
              <circle cx="419" cy="336" r="6" />
              <circle cx="250" cy="435" r="6" />
              <circle cx="81" cy="336" r="6" />
              <circle cx="81" cy="164" r="6" />
            </svg>
            <b>ONE</b>
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
        <Link href="/services" className={styles.technologyLink}>
          EXPLORE DIGITAL SERVICES <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className={styles.founders} id="about" aria-labelledby="founders-title">
        <div className={styles.sectionLabel}>
          <span>FOUNDERS</span>
          <span>PRINCIPAL-LED / DIRECT ACCESS</span>
        </div>
        <div className={styles.founderHeading}>
          <h2 id="founders-title">THE PEOPLE<br />BEHIND<br /><em>DIGITALE.</em></h2>
          <p>
            Senior people stay close to the work. Clients work directly with
            the founders from direction through delivery.
          </p>
        </div>
        <div className={styles.founderList}>
          {founders.map((founder) => (
            <article className={styles.founder} key={founder.name}>
              <div className={styles.founderPortrait}>
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span>{founder.role}</span>
                <i aria-hidden="true" />
              </div>
              <div className={styles.founderMeta}>
                <div>
                  <h3>{founder.name}</h3>
                  <span>{founder.role}</span>
                </div>
                <p>{founder.discipline}</p>
              </div>
              <p className={styles.founderBio}>{founder.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.insights} id="insights" aria-labelledby="insights-title">
        <div className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}>
          <span>INSIGHTS</span>
          <span>CREATIVE / DIGITAL / EXPERIENCES</span>
        </div>
        <div className={styles.insightsHeading}>
          <h2 id="insights-title">THINGS<br /><em>WORTH THINKING.</em></h2>
          <p>Ideas, observations and practical thinking from the intersection of creative, growth, technology and experiences.</p>
        </div>
        <div className={styles.insightList}>
          {insights.map((insight) => (
            <Link href={insight.href} className={styles.insight} key={insight.href}>
              <span>{insight.number}</span>
              <div>
                <small>{insight.tag}</small>
                <h3>{insight.title}</h3>
                <p>{insight.description}</p>
              </div>
              <b aria-hidden="true">READ ↗</b>
            </Link>
          ))}
        </div>
        <Link href="/insights" className={styles.insightsLink}>ALL INSIGHTS <span aria-hidden="true">↗</span></Link>
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
          <p>Tell us what you&apos;re trying to build. We&apos;ll route the conversation to the right DIGITALE practice.</p>
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
          </nav>
          <Link href="/start">PROJECT ENQUIRIES ↗</Link>
          <span>© 2026 DIGITALE MEDIA</span>
        </div>
      </footer>
    </main>
  );
}
