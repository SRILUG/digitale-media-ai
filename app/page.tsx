import HeroCinematic from "@/components/home/hero-cinematic";
import WorkEditorial from "@/components/home/work-editorial";
import SystemComparison from "@/components/home/system-comparison";
import PracticesAccordion from "@/components/home/practices-accordion";
import CaseUrbanrise from "@/components/home/case-urbanrise";
import ExperiencesShowcase from "@/components/home/experiences-showcase";
import AIInfrastructure from "@/components/home/ai-infrastructure";
import CtaDiagnostic from "@/components/home/cta-diagnostic";

export default function Home() {
  return (
    <main className="home">
      <HeroCinematic />
      <section className="proofBar" aria-label="Selected sectors">
        <span>REAL ESTATE</span><i>×</i><span>TECHNOLOGY</span><i>×</i><span>LUXURY</span><i>×</i><span>HOSPITALITY</span><i>×</i><span>CONSUMER</span><i>×</i><span>ENTERTAINMENT</span>
      </section>
      <WorkEditorial />
      <SystemComparison />
      <PracticesAccordion />
      <CaseUrbanrise />
      <ExperiencesShowcase />
      <AIInfrastructure />
      <section className="insightSection">
        <div className="homeSectionTop"><span>08 / INSIGHT</span><span>EXECUTIVE BRIEFING</span></div>
        <div className="insightGrid">
          <div><p className="homeEyebrow">REAL ESTATE / GROWTH TEARDOWN / 2026</p><h2>THE LEAD<br /><em>QUALITY PROBLEM.</em></h2></div>
          <div><p>What happens when the real estate funnel is designed around qualified demand instead of raw lead volume? A concise operator's briefing on creative, search, conversion and sales handoff.</p><a href="/insights">Read the briefing <span>↗</span></a></div>
        </div>
      </section>
      <section className="founderSection" id="about">
        <div className="homeSectionTop"><span>09 / THE OPERATING MODEL</span><span>FOUNDERS</span></div>
        <div className="founderGrid">
          <div><p className="homeEyebrow">PRODUCT THINKING × CREATIVE EXECUTION</p><h2>BUILT BY<br /><em>OPERATORS.</em></h2></div>
          <div>
            <p>DIGITALE is built around a hypothesis-driven sprint: understand the market, define the commercial problem, build the smallest useful system, measure what changed, then compound the learning.</p>
            <div className="founderNames"><span>UMA SARAVANA KUMAR <small>PRODUCT / AI / STRATEGY</small></span><span>SIVA VEERAPANENI <small>BUSINESS / GROWTH / CREATIVE</small></span></div>
          </div>
        </div>
      </section>
      <CtaDiagnostic />
      <footer className="homeFooter"><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY</span><span>HYDERABAD / INDIA · 2026</span></footer>
    </main>
  );
}