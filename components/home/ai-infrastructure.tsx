export default function AIInfrastructure() {
  const rows=[
    ["MARKET INTELLIGENCE","Competitor creative velocity, audience signals and category movement become live inputs."],
    ["ASSET ITERATION","Variant testing, copy ablation and creative learning shorten the distance between idea and evidence."],
    ["OPERATIONAL TELEMETRY","Lead qualification, scoring and routing turn campaign activity into usable sales signals."],
  ];
  return (
    <section className="aiSection">
      <div className="homeSectionTop"><span>07 / ENGINE ROOM</span><span>AI IS INFRASTRUCTURE</span></div>
      <div className="aiHead"><div><p className="homeEyebrow">INVISIBLE BY DESIGN.</p><h2>AI RUNS<br /><em>BENEATH IT.</em></h2></div><p>The audience should experience better work — not another AI pitch. Intelligence sits backstage, accelerating research, production, experimentation and operations.</p></div>
      <div className="aiConsole"><div className="consoleBar"><span>digitale / operating-layer</span><span>● LIVE</span></div>{rows.map((r,i)=><div className="consoleRow" key={r[0]}><span>0{i+1}</span><div><strong>{r[0]}</strong><p>{r[1]}</p></div><b>↗</b></div>)}</div>
    </section>
  );
}