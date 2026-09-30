"use client";

export default function HeroCinematic() {
  return (
    <section className="homeHero">
      <div className="homeHeroGrid" aria-hidden="true" />
      <div className="homeHeroGlow" aria-hidden="true" />
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
        <span>CREATIVE × GROWTH × TECHNOLOGY</span>
        <span>HYDERABAD / INDIA · 2026</span>
      </div>
      <div className="homeHeroContent">
        <div>
          <p className="homeEyebrow">ONE TEAM. ONE SYSTEM.</p>
          <h1>REAL<br /><em>GROWTH.</em></h1>
        </div>
        <div className="homeHeroAside">
          <p>Brands, experiences, and acquisition systems engineered for ambitious enterprises.</p>
          <div className="homeHeroActions">
            <a className="homePrimaryCta" href="/work">Explore the work <span>↗</span></a>
            <a className="homeTextCta" href="/start">Start a project <span>↗</span></a>
          </div>
        </div>
      </div>
      <div className="homeHeroReel" aria-label="DIGITALE showreel">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero/showreel-poster.webp"
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/media/hero/showreel.webm" type="video/webm" />
          <source src="/media/hero/showreel.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex h-full w-full items-end justify-between p-5 text-[10px] tracking-[0.18em] text-white/60">
          <span>SHOWREEL / 00:12</span>
          <b className="font-mono font-normal text-white/80">PLAYING</b>
        </div>
      </div>
      <div className="homeHeroFoot"><span>SCROLL TO ENTER</span><span>↓</span></div>
    </section>
  );
}
