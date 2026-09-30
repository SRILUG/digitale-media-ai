import Image from "next/image";
import { MediaFrame } from "@/components/ui/media-frame";

export default function CaseUrbanrise() {
  return (
    <section className="caseSection">
      <MediaFrame aspectRatio="aspect-[16/9]" className="caseVisual">
        <Image
          src="/media/cases/urbanrise-hero.avif"
          alt="Urbanrise case study"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
        <span className="relative z-10">PRIVATE CLIENT / REAL ESTATE</span>
        <strong className="relative z-10">URBANRISE</strong>
        <i className="relative z-10">CASE / 01</i>
      </MediaFrame>
      <div className="caseContent">
        <p className="homeEyebrow">HERO CASE STUDY / FULL-FUNNEL GROWTH</p>
        <h2>FROM LEAD<br /><em>VOLUME</em><br />TO DEMAND.</h2>
        <div className="caseGrid">
          <div><small>THE BRIEF</small><p>Scale qualified demand across markets without treating media, creative and sales as separate problems.</p></div>
          <div><small>THE MOVE</small><p>Connect market intelligence, cinematic creative, dynamic conversion paths and CRM routing into one operating loop.</p></div>
          <div><small>THE PIPELINE</small><p>Ad → contextual lander → validation → lead scoring → sales handoff → feedback.</p></div>
          <div><small>THE PROOF</small><p>Selected performance figures remain confidential. Verified outcomes only.</p></div>
        </div>
        <a className="caseLink" href="/work/urbanrise">Read the full teardown <span>↗</span></a>
      </div>
    </section>
  );
}
