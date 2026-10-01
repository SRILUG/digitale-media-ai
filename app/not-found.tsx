import Link from "next/link";
import styles from "./not-found.module.css";
export default function NotFound(){return <main className={styles.page}><div><small>DIGITALE / 404</small><h1>WRONG<br/><em>TURN.</em></h1><p>This page doesn't exist. The next move does.</p><Link href="/start">START A PROJECT ↗</Link></div></main>}