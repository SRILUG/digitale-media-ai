import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import SiteHeader from "@/components/site/site-header";
import styles from "./experiences.module.css";

export const metadata = createPageMetadata(
 "Experiences",
 "Concept, creative direction and production for corporate events, launches, red carpets, activations and celebrations.",
 "/experiences",
);

const experiences=[
 {n:"01",name:"CORPORATE EVENTS",focus:"Corporate event",line:"Make the room remember.",desc:"From leadership gatherings to high-stakes corporate moments — concept, production and execution under one system."},
 {n:"02",name:"PRODUCT LAUNCHES",focus:"Product launch",line:"Give the arrival a pulse.",desc:"Launch strategy, creative direction, stage, content, guest journey and the digital layer around the moment."},
 {n:"03",name:"RED CARPETS",focus:"Red carpet",line:"Own the frame.",desc:"Premieres, entertainment moments and high-visibility productions designed for the room, the camera and the audience beyond it."},
 {n:"04",name:"ACTIVATIONS",focus:"Brand activation",line:"Turn attention into participation.",desc:"Brand activations that give people something to see, do, share and remember."},
 {n:"05",name:"WEDDINGS & CELEBRATIONS",focus:"Wedding",line:"Make it unmistakably yours.",desc:"Creative direction, production and digital storytelling for weddings, private celebrations and milestone moments."},
 {n:"06",name:"ENTERTAINMENT",focus:"Entertainment",line:"Make the moment move.",desc:"Artist-led, culture-led and entertainment experiences built with production discipline and creative energy."}
];

export default function Experiences(){return <main className={`${styles.page} dgPage`}>
<SiteHeader current="experiences" />
<section className={styles.hero}><div><small>THE PHYSICAL WORLD / 003</small><h1>MAKE THE<br/><em>MOMENT.</em></h1></div><p>Some ideas should not live on a screen. We create the spaces, stages, stories and experiences people remember — from the first concept to the final cue.</p><div className={styles.heroVisual}><span>EXPERIENCE / DGT</span><b>EXPERIENCE</b><i/></div></section>
<section className={styles.statement}><small>THE SYSTEM</small><h2>CONCEPT → CREATIVE →<br/>PRODUCTION → <em>MOMENT</em></h2><p>One team across strategy, creative direction, production, content and the digital layer that keeps the experience moving after the room is gone.</p></section>
<section className={styles.list}>{experiences.map(x=><article key={x.n}><div className={styles.num}>{x.n}</div><div><small>{x.name}</small><h2>{x.line}</h2><p>{x.desc}</p></div><Link href={"/start?practice=experiences&focus="+encodeURIComponent(x.focus)}>PLAN THIS ↗</Link></article>)}</section>
<section className={styles.production}><div><small>FROM IDEA TO EXIT</small><h2>WE HANDLE<br/><em>THE WHOLE ROOM.</em></h2></div><div className={styles.steps}>{["STRATEGY","CONCEPT","DESIGN","PRODUCTION","CONTENT","EXECUTION"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></section>
<section className={styles.cta}><small>THE NEXT MOMENT</small><h2>WHAT SHOULD<br/><em>PEOPLE FEEL?</em></h2><Link href="/start?practice=experiences">PLAN THE EXPERIENCE ↗</Link></section>
<footer><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span><span>2026</span></footer>
</main>
}
