"use client";
import { useState } from "react";
export default function RealEstateGrowthInsight() {
  const [email,setEmail]=useState(""); const [sent,setSent]=useState(false);
  return <main className="insightPage">
    <header className="editorialNav"><a href="/">DIGITALE®</a><span>INSIGHT / 2026</span><a href="/start">Start a project ↗</a></header>
    <section className="insightHero"><p>REAL ESTATE / GROWTH TEARDOWN / EXECUTIVE BRIEFING</p><h1>THE REAL ESTATE<br /><em>GROWTH TEARDOWN.</em></h1><p>How to move from raw lead volume toward qualified demand through better intelligence, creative, conversion and sales feedback.</p></section>
    <section className="insightGate">{sent ? <><p className="homeEyebrow">ACCESS ENABLED</p><h2>The briefing is ready.</h2><p>The report asset is intentionally held behind this first-party capture point so the inbound loop can be connected to the project diagnostic.</p><a href="/start">Continue to the diagnostic ↗</a></> : <><p className="homeEyebrow">EXECUTIVE BRIEFING</p><h2>Get the teardown.</h2><p>Enter a work email to request the 2026 briefing. No fabricated benchmark claims — the report will distinguish sourced evidence from DIGITALE analysis.</p><form onSubmit={e=>{e.preventDefault(); if(email) setSent(true)}}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/><button>Request briefing ↗</button></form></>}</section>
  </main>;
}