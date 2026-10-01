import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

const principles=[
 ["01","START WITH THE PROBLEM","We don't force a brief into a predefined service. We start by understanding what needs to change."],
 ["02","MAKE THE IDEA MOVE","Strategy only matters when it becomes something people can see, use, feel or act on."],
 ["03","KEEP THE SYSTEM CONNECTED","Creative, growth, technology and experience work better when the handoffs disappear."],
 ["04","LEARN FROM THE NEXT MOVE","Launch is not the finish line. We measure, listen, improve and keep the work moving."]
];

export default function About(){return <main className={styles.page}>
<header><Link href="/">← DIGITALE MEDIA</Link><span>ABOUT / PEOPLE</span><Link href="/start">START A PROJECT ↗</Link></header>
<section className={styles.hero}><small>THE PEOPLE / 004</small><h1>BUILT BY<br/><em>PEOPLE.</em></h1><p>Digitale Media is a founder-led creative company connecting creative, growth, technology and experiences around the work that matters.</p></section>
<section className={styles.founders}><div className={styles.sectionLabel}><span>FOUNDERS</span><span>01 / 02</span></div><div className={styles.founder}><div className={styles.portrait}><div className={styles.siva}><span>SV</span><small>PORTRAIT COMING SOON</small></div></div><div className={styles.bio}><small>01 / FOUNDER</small><h2>SIVA<br/><em>VEERAPANENI</em></h2><p>Brand, creative and experiences. Building the world around the idea — from the first thought to the moment people encounter it.</p><div className={styles.tags}><span>BRAND</span><span>CREATIVE</span><span>EXPERIENCES</span></div></div></div><div className={styles.founder}><div className={styles.portrait}><div className={styles.uma}><Image src="/media/founders/uma-saravana-kumar.webp" alt="Gudali Uma Saravana Kumar" fill sizes="(max-width: 760px) 100vw, 50vw" onError={e=>{e.currentTarget.style.display="none"}}/><span>USK</span></div></div><div className={styles.bio}><small>02 / FOUNDER</small><h2>UMA<br/><em>SARAVANA KUMAR</em></h2><p>Product, AI and growth. Turning complex problems into products, systems and measurable ways forward.</p><div className={styles.tags}><span>PRODUCT</span><span>AI</span><span>GROWTH</span></div></div></div></section>
<section className={styles.black}><small>WHY DIGITALE</small><h2>ONE IDEA.<br/>MANY WAYS<br/><em>TO MAKE IT MATTER.</em></h2><p>Sometimes the answer is a campaign. Sometimes it is a product, an experience, a growth system or a combination of all four. The work decides the shape.</p></section>
<section className={styles.principles}><div className={styles.sectionLabel}><span>HOW WE WORK</span><span>THE PRINCIPLES</span></div>{principles.map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><b>↗</b></article>)}</section>
<section className={styles.system}><div><small>THE MODEL</small><h2>CREATIVE ×<br/>GROWTH ×<br/>TECHNOLOGY ×<br/><em>EXPERIENCE</em></h2></div><div className={styles.chain}><span>DISCOVER</span><i>→</i><span>DEFINE</span><i>→</i><span>MAKE</span><i>→</i><span>LAUNCH</span><i>→</i><span>LEARN</span></div></section>
<section className={styles.cta}><small>THE NEXT CHAPTER</small><h2>LET'S MAKE<br/><em>SOMETHING MATTER.</em></h2><p>Bring the problem. We'll figure out what it needs to become.</p><Link href="/start">START A PROJECT ↗</Link></section>
<footer><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span><span>2026</span></footer>
</main>