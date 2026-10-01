import Link from "next/link";
import SiteHeader from "@/components/site/site-header";
import styles from "./services.module.css";

const services=[
{n:"01",name:"CREATIVE",line:"Make the idea visible.",items:["Brand strategy","Identity & campaigns","Social & content","Film & production","Creator partnerships"]},
{n:"02",name:"GROWTH",line:"Make demand move.",items:["Performance marketing","SEO / AEO / GEO","Lead generation","CRO & analytics","CRM & RevOps"]},
{n:"03",name:"TECHNOLOGY",line:"Make the system work.",items:["Websites & digital products","Apps & platforms","AI & automation","Data & dashboards","Integrations & workflows"]},
{n:"04",name:"EXPERIENCES",line:"Make the moment matter.",items:["Corporate events","Product launches","Red carpets","Activations","Weddings & celebrations"]},
];

export default function Services(){return <main className={styles.page}>
<header><Link href="/">← DIGITALE MEDIA</Link><span>SERVICES</span><Link href="/start">START A PROJECT ↗</Link></header>
<section className={styles.hero}><small>WHAT WE DO / 002</small><h1>NO<br/><em>BOXES.</em></h1><p>We don't sell isolated services. We connect creative, growth, technology and experiences around the problem that needs solving.</p></section>
<section className={styles.system}><span>ONE TEAM. ONE SYSTEM.</span><h2>CREATIVE × GROWTH ×<br/>TECHNOLOGY × <em>EXPERIENCE</em></h2><div className={styles.flow}><span>PROBLEM</span><b>→</b><span>STRATEGY</span><b>→</b><span>MAKE</span><b>→</b><span>LAUNCH</span><b>→</b><span>LEARN</span></div></section>
<section className={styles.services}>{services.map(s=><article key={s.n}><div className={styles.serviceTop}><span>{s.n}</span><small>{s.name}</small></div><h2>{s.name}</h2><p className={styles.line}>{s.line}</p><ul>{s.items.map(x=><li key={x}>{x}<b>↗</b></li>)}</ul><Link href={"/start?practice="+s.name.toLowerCase()}>BUILD WITH US ↗</Link></article>)}</section>
<section className={styles.closing}><small>THE RIGHT MIX DEPENDS ON THE PROBLEM.</small><h2>BRING THE<br/><em>PROBLEM.</em></h2><p>We'll figure out what it needs to become — and build the system around it.</p><Link href="/start">START A PROJECT ↗</Link></section>
<footer><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span><span>2026</span></footer>
</main>