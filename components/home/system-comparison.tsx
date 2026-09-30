"use client";
import { useState } from "react";

export default function SystemComparison() {
  const [unified, setUnified] = useState(true);
  return (
    <section className="homeSection systemSection">
      <div className="homeSectionTop"><span>03 / THE COMMERCIAL CORE</span><span>ONE SYSTEM</span></div>
      <div className="systemHead">
        <div><p className="homeEyebrow">STOP MANAGING THE STACK.</p><h2>ONE TEAM.<br /><em>ONE SYSTEM.</em></h2></div>
        <p>Nobody owns the outcome when six vendors touch the funnel. DIGITALE connects insight, creative, engineering, distribution and data around the same commercial objective.</p>
      </div>
      <div className="systemToggle" role="tablist">
        <button className={!unified ? "active" : ""} onClick={() => setUnified(false)}>THE FRAGMENTED WAY</button>
        <button className={unified ? "active" : ""} onClick={() => setUnified(true)}>THE DIGITALE ENGINE</button>
      </div>
      <div className={"systemDiagram " + (unified ? "unified" : "fragmented")}>
        {unified ? (
          <div className="systemBus">
            {["INSIGHT","CREATIVE","MEDIA","TECH","DATA","GROWTH"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong>{i<5 && <b>→</b>}</div>)}
          </div>
        ) : (
          <div className="vendorStack">
            {["BRAND","SEO","PERFORMANCE","DEVELOPMENT","PR","CRM"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><b>→</b><small>handoff</small></div>)}
          </div>
        )}
      </div>
      <p className="systemFoot">{unified ? "One operating layer. One shared source of truth. One team accountable for the journey." : "More handoffs create more gaps: attribution fragments, context disappears, and management becomes the work."}</p>
    </section>
  );
}