export default function ExperiencesShowcase() {
  const items=["PRODUCT LAUNCHES","CORPORATE GALAS","RED CARPETS","PRIVATE CELEBRATIONS","EXPERIENTIAL STUNTS"];
  return (
    <section className="experienceSection" id="experiences">
      <div className="experienceBackdrop" aria-hidden="true"><span>LIVE</span></div>
      <div className="experienceContent">
        <div className="homeSectionTop"><span>06 / EXPERIENCES</span><span>BRAND × CULTURE × LIVE</span></div>
        <h2>MOMENTS THAT<br /><em>MOVE CULTURE.</em></h2>
        <p>High-tier brand moments designed as complete systems — from the room and the stage to the content that keeps travelling after the lights go down.</p>
        <div className="experienceList">{items.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><b>↗</b></div>)}</div>
        <a className="experienceCta" href="/start?practice=experiences">Build an experience <span>↗</span></a>
      </div>
    </section>
  );
}