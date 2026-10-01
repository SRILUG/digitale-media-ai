import Image from "next/image";
import Link from "next/link";
import styles from "./site-header.module.css";

type Props={current?:string};

const links=[["Work","/work"],["Services","/services"],["Experiences","/experiences"],["Insights","/insights"],["About","/about"]];

export default function SiteHeader({current}:Props){
 return <header className={styles.header}>
  <Link href="/" className={styles.logo} aria-label="DIGITALE MEDIA">
   <Image src="/media/brand/digitale-media-logo.webp" alt="DIGITALE MEDIA" width={270} height={70} priority />
  </Link>
  <nav aria-label="Primary">{links.map(([label,href])=><Link key={href} className={current===label.toLowerCase()?styles.active:""} href={href}>{label}</Link>)}</nav>
  <Link className={styles.cta} href="/start">Start a project <span>↗</span></Link>
  <details className={styles.mobileMenu}>
   <summary>MENU <span>+</span></summary>
   <div className={styles.mobilePanel}>
    {links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}
    <Link href="/start">Start a project ↗</Link>
   </div>
  </details>
 </header>
}