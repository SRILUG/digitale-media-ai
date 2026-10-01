import Image from "next/image";
import Link from "next/link";
import styles from "./site-header.module.css";

type Props={current?:string};

export default function SiteHeader({current}:Props){
 const links=[["Work","/work"],["Services","/services"],["Experiences","/experiences"],["Insights","/insights"],["About","/about"]];
 return <header className={styles.header}>
  <Link href="/" className={styles.logo} aria-label="DIGITALE MEDIA"><Image src="/media/brand/digitale-media-logo.webp" alt="DIGITALE MEDIA" width={270} height={70} priority /></Link>
  <nav aria-label="Primary">{links.map(([label,href])=><Link key={href} className={current===label.toLowerCase()?styles.active:""} href={href}>{label}</Link>)}</nav>
  <Link className={styles.cta} href="/start">Start a project <span>↗</span></Link>
  <Link className={styles.mobileCta} href="/start">Start ↗</Link>
 </header>
}