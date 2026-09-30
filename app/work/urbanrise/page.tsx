export default function UrbanriseCase() {
  const stages = [
    ["01","CONTEXT","Real-estate growth across markets requires more than lead volume: creative, media, conversion and sales need to operate from the same signal."],
    ["02","CHALLENGE","Fragmented handoffs can create inconsistent intent capture, slower follow-up and weak feedback between campaigns and sales."],
    ["03","INSIGHT","The funnel should be treated as one operating system, with market intelligence informing the message and downstream sales data informing the next iteration."],
    ["04","STRATEGY","Connect intelligence, creative, contextual conversion paths, qualification and CRM routing around the commercial objective."],
    ["05","CREATIVE","Build cinematic, market-specific assets and landing experiences designed around audience intent rather than generic project messaging."],
    ["06","TECH","Route the journey from ad click to contextual lander, validation, scoring and sales handoff."],
    ["07","DISTRIBUTION","Use paid, search, content and conversion learning as one feedback loop instead of isolated channel reports."],
    ["08","RESULTS","Selected performance figures remain confidential. Only verified outcomes will be published here."],
  ];
  return <main className="editorialPage">
    <header className="editorialNav"><a href="/">DIGITALE®</a><span>CASE / 01</span><a href="/start">Start a project ↗</a></header>
    <section className="editorialHero urbanriseHero"><p>PRIVATE CLIENT / REAL ESTATE / FULL-FUNNEL GROWTH</p><h1>URBANRISE</h1><span>FROM LEAD VOLUME TO DEMAND.</span></section>
    <section className="editorialIntro"><p className="homeEyebrow">THE TEARDOWN</p><h2>A growth system built around the whole journey.</h2><p>Urbanrise is presented as a system case: market intelligence, creative, conversion architecture, technology and sales feedback connected around one commercial objective.</p></section>
    <section className="caseStages">{stages.map(([n,t,d])=><article key={n}><span>{n}</span><div><small>{t}</small><h3>{t}</h3><p>{d}</p></div></article>)}</section>
    <section className="editorialClose"><p className="homeEyebrow">VERIFIED PROOF ONLY</p><h2>THE NEXT LAYER<br /><em>IS MEASUREMENT.</em></h2><a href="/start">Discuss a similar growth problem ↗</a></section>
  </main>;
}