import HeroCinematic from "@/components/home/hero-cinematic";
import WorkEditorial from "@/components/home/work-editorial";
import SystemComparison from "@/components/home/system-comparison";
import PracticesAccordion from "@/components/home/practices-accordion";
import ExperiencesShowcase from "@/components/home/experiences-showcase";
import AIInfrastructure from "@/components/home/ai-infrastructure";
import FounderShowcase from "@/components/home/founder-showcase";
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
      <ExperiencesShowcase />
      <AIInfrastructure />
      <section className="insightSection">
        <div className="homeSectionTop"><span>08 / INSIGHT</span><span>EXECUTIVE BRIEFING</span></div>
        <div className="insightGrid">
          <div><p className="homeEyebrow">REAL ESTATE / GROWTH TEARDOWN / 2026</p><h2>THE LEAD<br /><em>QUALITY PROBLEM.</em></h2></div>
          <div><p>What happens when the real estate funnel is designed around qualified demand instead of raw lead volume? A concise operator's briefing on creative, search, conversion and sales handoff.</p><a href="/insights">Read the briefing <span>↗</span></a></div>
        </div>
      </section>
      <FounderShowcase />
      <CtaDiagnostic />
      <footer className="homeFooter"><span>DIGITALE MEDIA®</span><span>CREATIVE × GROWTH × TECHNOLOGY</span><span>HYDERABAD / INDIA · 2026</span></footer>
    </main>
  );
}
