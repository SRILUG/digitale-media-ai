export default function ExperiencesShowcase() {
  const items = [
    { n: "01", title: "PRODUCT LAUNCHES", desc: "Launch strategy, stagecraft, content and digital amplification built as one moment." },
    { n: "02", title: "CORPORATE GALAS", desc: "Executive environments with hospitality, production and brand storytelling in sync." },
    { n: "03", title: "RED CARPETS", desc: "High-visibility arrivals engineered for the room, the camera and the feed." },
    { n: "04", title: "PRIVATE CELEBRATIONS", desc: "Distinctive celebrations designed around the people, place and story." },
    { n: "05", title: "EXPERIENTIAL STUNTS", desc: "Unexpected physical ideas that earn attention and travel beyond the venue." },
  ];

  return (
    <section className="experienceSection" id="experiences">
      <div className="experienceBackdrop" aria-hidden="true">
        <span>LIVE</span><i className="experienceRing experienceRingOne" /><i className="experienceRing experienceRingTwo" />
        <i className="experienceCross experienceCrossOne" /><i className="experienceCross experienceCrossTwo" />
      </div>
      <div className="experienceContent">
        <div className="homeSectionTop"><span>06 / EXPERIENCES</span><span>BRAND × CULTURE × LIVE</span></div>
        <div className="experienceIntro">
          <div><p className="homeEyebrow">FROM THE ROOM TO THE FEED.</p><h2>MOMENTS THAT<br /><em>MOVE CULTURE.</em></h2></div>
          <div className="experienceLead"><span className="experienceIndex">06—EX</span><p>High-tier brand moments designed as complete systems — from the room and the stage to the content that keeps travelling after the lights go down.</p></div>
        </div>
        <div className="experienceList">
          {items.map((item) => <article className="experienceItem" key={item.n}><span className="experienceNumber">{item.n}</span><div className="experienceItemMain"><strong>{item.title}</strong><p>{item.desc}</p></div><span className="experienceArrow">↗</span></article>)}
        </div>
        <div className="experienceBottom"><span>EVENTS / LAUNCHES / ACTIVATIONS / CELEBRATIONS</span><a className="experienceCta" href="/start?practice=experiences"><span>BUILD AN EXPERIENCE</span><b>↗</b></a></div>
      </div>
    </section>
  );
}