"use client";

export default function HeroCinematic() {
  return (
    <section className="homeHero">
      <div className="homeHeroAtmosphere" aria-hidden="true" />
      <div className="homeHeroGrid" aria-hidden="true" />
      <div className="homeHeroOrb" aria-hidden="true">
        <span>DG</span>
      </div>

      <header className="homeHeader">
        <a href="/" className="homeLogo">DIGITALE<span>®</span></a>
        <nav>
          <a href="/work">Work</a>
          <a href="/capabilities">Capabilities</a>
          <a href="/experiences">Experiences</a>
          <a href="/insights">Insights</a>
        </nav>
        <a className="homeHeaderCta" href="/start">Start a project <span>↗</span></a>
        <button className="homeMenu" aria-label="Open navigation">MENU</button>
      </header>

      <div className="homeHeroMeta">
        <span>01 / DIGITALE</span>
        <span>HYDERABAD / INDIA · 2026</span>
      </div>

      <div className="homeHeroContent">
        <div className="homeHeroHeadline">
          <p className="homeEyebrow">CREATIVE × GROWTH × TECHNOLOGY</p>
          <h1>ONE TEAM.<br /><em>REAL GROWTH.</em></h1>
        </div>

        <div className="homeHeroAside">
          <div className="homeHeroRule" />
          <p>We build brands, digital products, acquisition systems and experiences for ambitious businesses.</p>
          <div className="homeHeroActions">
            <a className="homePrimaryCta" href="/start">Start a project <span>↗</span></a>
            <a className="homeTextCta" href="/work">View selected work <span>↗</span></a>
          </div>
        </div>
      </div>

      <div className="homeHeroReel" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="/media/hero/showreel-poster.webp" preload="metadata">
          <source src="/media/hero/showreel.webm" type="video/webm" />
          <source src="/media/hero/showreel.mp4" type="video/mp4" />
        </video>
        <div className="homeHeroReelOverlay" />
        <div className="homeHeroReelLabel"><span>SHOWREEL</span><b>00:12</b></div>
      </div>

      <div className="homeHeroFoot">
        <span>SCROLL TO ENTER</span>
        <span className="homeHeroScrollLine" />
        <span>↓</span>
      </div>
    </section>
  );
}
