"use client";
import { useState } from "react";

const practices = [
  { key:"growth", name:"DIGITALE / GROWTH", desc:"Acquisition, AEO / GEO, CRO, RevOps, performance media and attribution.", items:["Performance Media","SEO / AEO / GEO","CRO & Landing Systems","CRM / RevOps","Analytics & Attribution"] },
  { key:"creative", name:"DIGITALE / CREATIVE", desc:"Brand platforms, campaign films, design systems and content engines.", items:["Brand Strategy","Campaigns & Films","Social & Content","Creator Systems","Design Systems"] },
  { key:"technology", name:"DIGITALE / TECHNOLOGY", desc:"Headless platforms, custom funnels, CRM sync and workflow automation.", items:["Web & Digital Products","Custom Funnels","AI & Automation","CRM Integrations","Data Experiences"] },
];

export default function PracticesAccordion() {
  const [open, setOpen] = useState("growth");
  return (
    <section className="homeSection practicesSection" id="capabilities">
      <div className="homeSectionTop"><span>04 / THREE PRACTICES</span><span>CREATIVE × GROWTH × TECHNOLOGY</span></div>
      <div className="homeSectionIntro"><h2>THREE DISCIPLINES.<br /><em>ONE COMMERCIAL MIND.</em></h2><p>Specialists stay deep in their craft. The system stays connected across the entire customer journey.</p></div>
      <div className="practiceRows">
        {practices.map((p,i)=>(
          <div className={"practiceRow " + (open===p.key ? "open" : "")} key={p.key}>
            <button onClick={()=>setOpen(open===p.key ? "" : p.key)}>
              <span>0{i+1}</span><strong>{p.name}</strong><em>{open===p.key ? "−" : "+"}</em>
            </button>
            {open===p.key && <div className="practiceBody"><p>{p.desc}</p><div>{p.items.map(x=><span key={x}>{x}</span>)}</div><a href={"/capabilities/"+p.key}>Explore practice ↗</a></div>}
          </div>
        ))}
      </div>
    </section>
  );
}