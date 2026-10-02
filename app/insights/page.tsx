import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import SiteHeader from "@/components/site/site-header";
import styles from "./insights.module.css";

export const metadata = createPageMetadata(
 "Insights",
 "Ideas and practical thinking across creative, growth, technology and experiences.",
 "/insights",
);

const stories=[
{n:"01",tag:"AI / PRODUCT",title:"WHAT AI CHANGES INSIDE A PRODUCT TEAM",desc:"A practical look at where intelligence belongs in research, workflows, products and decision systems.",slug:"ai-product"},
{n:"02",tag:"GROWTH / SEARCH",title:"SEARCH IS BECOMING AN ANSWER SYSTEM",desc:"How search, answer engines, content and conversion increasingly meet in one discovery journey.",slug:"search-answer-systems"},
{n:"03",tag:"EXPERIENCES / CULTURE",title:"THE EXPERIENCE DOESN'T END AT THE VENUE",desc:"Why the strongest physical moments now need a digital life before, during and after the room.",slug:"experience-afterlife"},
{n:"04",tag:"BRAND / STRATEGY",title:"A BRAND IS A SYSTEM, NOT A LOGO",desc:"The identity is only the visible layer. The real brand lives in every interaction that follows.",slug:"brand-as-system"}
];

export default function Insights(){return <main className={`${styles.page} dgPage`}>
<SiteHeader current="insights" />
<section className={styles.hero}><small>THINKING / 005</small><h1>THINGS<br/><em>WORTH THINKING.</em></h1><p>Ideas, observations and practical thinking from the intersection of creative, growth, technology and experiences.</p></section>
<section className={styles.feature}><div><small>FEATURED / 01</small><h2>THE BEST<br/>SYSTEMS ARE<br/><em>CONNECTED.</em></h2></div><p>When creative, growth, technology and experience operate as separate departments, the customer feels the seams. The opportunity is to make the seams disappear.</p></section>
<section className={styles.list}>{stories.map(s=><Link href={"/insights/"+s.slug} key={s.slug} className={styles.story}><span>{s.n}</span><div><small>{s.tag}</small><h2>{s.title}</h2><p>{s.desc}</p></div><b>READ ↗</b></Link>)}</section>
<section className={styles.newsletter}><small>KEEP THINKING</small><h2>NO NOISE.<br/><em>JUST IDEAS.</em></h2><p>For now, the best way to start a conversation is to bring the problem.</p><Link href="/start">START A PROJECT ↗</Link></section>
<footer><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span><span>2026</span></footer>
</main>
}
