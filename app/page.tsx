"use client";

import { useState } from "react";

const services = [
  ["01", "Brand & Strategy", "Positioning, identity and campaign thinking that gives brands a sharper place in culture."],
  ["02", "Digital & Social", "Social systems, content, creators and communities built to keep brands relevant."],
  ["03", "Performance", "Paid media, funnels, CRO and growth intelligence focused on qualified demand."],
  ["04", "AI & Automation", "AI agents, workflows, CRM automation and intelligent systems that make teams faster."],
  ["05", "Web & Product", "High-conversion websites, digital experiences, landing systems and product interfaces."],
  ["06", "Production", "Films, photography, motion, creators and campaign assets made for attention."]
];

const industries = ["Real Estate", "Luxury", "Hospitality", "Healthcare", "Technology", "Education", "Retail", "Entertainment"];
const events = ["Weddings", "Red Carpet", "Corporate", "Launches"];

const work = [
  ["01", "URBAN / REAL ESTATE", "Demand, not noise.", "A growth system connecting market intelligence, creative and performance."],
  ["02", "CULTURE / ENTERTAINMENT", "Make the moment move.", "Campaigns and content around launches, talent, entertainment and live experiences."],
  ["03", "AI / TECHNOLOGY", "Work at machine speed.", "Automation and intelligent digital systems built around real business workflows."]
];

export default function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <main className="dg">
      <header className="dgNav">
        <a className="logo" href="#">DIGITALE<span>®</span></a>
        <div className={menu ? "navLinks open" : "navLinks"}>
          <a href="#capabilities">Capabilities</a>
          <a href="#work">Work</a>
          <a href="#industries">Industries</a>
          <a href="#experiences">Experiences</a>
          <a href="#about">About</a>
          <a href="#contact" className="navAction">Start a project <b>↗</b></a>
        </div>
        <button className="menu" onClick={() => setMenu(!menu)}>{menu ? "CLOSE" : "MENU"}</button>
      </header>

      <section className="dgHero">
        <div className="heroOrb"><div className="orbCore">D</div></div>
        <div className="heroTop"><span>01 / DIGITAL MEDIA + AI</span><span>HYDERABAD · INDIA</span></div>
        <div className="heroMain">
          <div>
            <div className="kicker">AN INDEPENDENT DIGITAL GROWTH AGENCY</div>
            <h1>MAKE<br /><i>NOISE.</i><br />NOT ADS.</h1>
          </div>
          <div className="heroSide">
            <p>We build brands, digital experiences and growth systems for businesses that want to be noticed—and remembered.</p>
            <a className="lineLink" href="#contact">Tell us what you're building <span>↗</span></a>
          </div>
        </div>
        <div className="scrollCue">SCROLL <span>↓</span></div>
      </section>

      <section className="ticker">
        <div>STRATEGY</div><b>✳</b><div>CREATIVE</div><b>✳</b><div>TECHNOLOGY</div><b>✳</b><div>PERFORMANCE</div><b>✳</b><div>AI</div><b>✳</b><div>EXPERIENCES</div>
      </section>

      <section id="capabilities" className="dgSection capabilities">
        <div className="sectionIntro">
          <div>
            <div className="kicker">02 / WHAT WE DO</div>
            <h2>ONE PARTNER.<br /><i>EVERY GROWTH LEVER.</i></h2>
          </div>
          <p>From the first strategic question to the final campaign report, we connect the work instead of handing it between disconnected vendors.</p>
        </div>
        <div className="serviceRows">
          {services.map(([num, title, desc]) => (
            <div className="serviceRow" key={num}>
              <span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><b>↗</b>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="dgSection work">
        <div className="kicker">03 / SELECTED WORK</div>
        <div className="workIntro">
          <h2>WORK THAT<br /><i>EARNS ATTENTION.</i></h2>
          <p>We don't believe in filling a portfolio with noise. We build work with a job to do.</p>
        </div>
        <div className="workList">
          {work.map(([num, label, title, desc], i) => (
            <article className={"workItem wi" + i} key={num}>
              <div className="workVisual"><span>{label}</span><strong>{num}</strong><div className="visualMark">{i === 0 ? "↗" : i === 1 ? "✦" : "AI"}</div></div>
              <div className="workCopy"><small>{label}</small><h3>{title}</h3><p>{desc}</p><a href="#contact">View project ↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section id="industries" className="dgSection industries">
        <div className="kicker">04 / INDUSTRIES</div>
        <div className="industryHead">
          <h2>WE SPEAK<br /><i>BUSINESS.</i></h2>
          <p>Different markets demand different moves. We build the strategy around the category, audience and ambition.</p>
        </div>
        <div className="industryRows">
          {industries.map((name, i) => <div key={name}><span>0{i + 1}</span><strong>{name}</strong><em>↗</em></div>)}
        </div>
      </section>

      <section id="experiences" className="experiences">
        <div className="experienceLeft">
          <div className="kicker">05 / EXPERIENCES</div>
          <h2>BIG MOMENTS.<br /><i>BIGGER STORIES.</i></h2>
          <p>For weddings, red carpets, corporate events and launches, we build the digital world around the moment—before, during and after.</p>
          <a className="limeBtn" href="#contact">Build an experience ↗</a>
        </div>
        <div className="experienceRight">
          {events.map((name, i) => <div key={name}><span>0{i + 1}</span><strong>{name}</strong><b>↗</b></div>)}
        </div>
      </section>

      <section id="about" className="aiStatement">
        <div className="kicker">06 / HOW WE WORK</div>
        <h2>AI ISN'T<br /><i>THE PRODUCT.</i><br />IT'S THE ENGINE.</h2>
        <p>Research. Strategy. Creation. Execution. Measurement. Learning. Our AI layer connects the entire loop so the team can spend more time on ideas and less time moving information between tools.</p>
        <div className="loop"><span>RESEARCH</span><b>→</b><span>CREATE</span><b>→</b><span>LAUNCH</span><b>→</b><span>LEARN</span></div>
      </section>

      <section className="founders">
        <div className="kicker">07 / FOUNDERS</div>
        <div className="founderIntro">
          <h2>BUILT FROM<br /><i>THE GROUND UP.</i></h2>
          <p>DIGITALE is being built as an independent, AI-first agency—combining product thinking, creative execution and growth discipline.</p>
        </div>
        <div className="founderCards">
          <div><div className="founderImage">USK</div><h3>Uma Saravana Kumar</h3><p>Product · AI · Strategy</p></div>
          <div><div className="founderImage alt">SV</div><h3>Siva Veerapaneni</h3><p>Business · Growth · Creative</p></div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="kicker">08 / START SOMETHING</div>
        <h2>WHAT SHOULD<br /><i>WE BUILD?</i></h2>
        <p>Tell us the problem, the ambition or simply the idea. We'll take it from there.</p>
        <a className="contactMail" href="mailto:hello@digitalemedia.in">hello@digitalemedia.in <span>↗</span></a>
      </section>

      <footer><span>DIGITALE MEDIA®</span><span>AI · CREATIVE · GROWTH</span><span>HYDERABAD / INDIA · 2026</span></footer>
    </main>
  );
}
