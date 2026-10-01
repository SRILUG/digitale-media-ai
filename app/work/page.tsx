import Link from "next/link";
import SiteHeader from "@/components/site/site-header";
import styles from "./work.module.css";

const projects = [
 {slug:"brand-worlds",number:"01",type:"BRAND / CAMPAIGN",title:"MAKE THEM REMEMBER.",intro:"Brand worlds, campaigns and content built around the idea that needs to travel.",tone:"light"},
 {slug:"digital-systems",number:"02",type:"DIGITAL / SYSTEMS",title:"MAKE IT USEFUL.",intro:"Websites, products, automation and digital systems built around real problems.",tone:"dark"},
 {slug:"live-experiences",number:"03",type:"EXPERIENCES / LIVE",title:"MAKE THE MOMENT MATTER.",intro:"Launches, productions, activations and celebrations designed for the room and beyond it.",tone:"warm"},
 {slug:"growth-engine",number:"04",type:"GROWTH / PERFORMANCE",title:"MAKE DEMAND MOVE.",intro:"Search, performance, conversion and measurement connected into one operating system.",tone:"cream"}
];

export default function Work() {
 return <main className={`${styles.page} dgPage`}>
  <SiteHeader current="work" />
  <section className={styles.hero}><span>THE WORK / 001</span><h1>IDEAS<br/><em>IN MOTION.</em></h1><p>Selected directions across creative, digital, growth and experiences. Built to show the thinking without inventing the story.</p></section>
  <div className={styles.filters}><span>FILTER</span><a href="#all">ALL</a><a href="#creative">CREATIVE</a><a href="#digital">DIGITAL</a><a href="#growth">GROWTH</a><a href="#experiences">EXPERIENCES</a></div>
  <section id="all" className={styles.list}>{projects.map((p,i)=><Link href={"/work/"+p.slug} key={p.slug} className={styles.project} data-tone={p.tone}>
   <div className={styles.projectVisual}><small>{p.number}</small><strong>{p.type}</strong><i/></div>
   <div className={styles.projectCopy}><small>{p.type}</small><h2>{p.title}</h2><p>{p.intro}</p><span>VIEW PROJECT ↗</span></div>
  </Link>)}</section>
  <section className={styles.end}><span>THE NEXT STORY</span><h2>WHAT ARE YOU<br/><em>MAKING MATTER?</em></h2><Link href="/start">START A PROJECT ↗</Link></section>
  <footer><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span></footer>
 </main>;
}