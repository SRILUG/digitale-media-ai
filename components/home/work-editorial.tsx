import Image from "next/image";
import { MediaFrame } from "@/components/ui/media-frame";

const projects = [
  { n:"01", type:"REAL ESTATE / GROWTH", title:"URBANRISE", line:"A connected acquisition system across intelligence, creative, media and sales.", tone:"estate", image:"/media/work/urbanrise.webp", alt:"Urbanrise project work" },
  { n:"02", type:"CONSUMER / BRAND + GROWTH", title:"GLOBAL CONSUMER BRAND", line:"Brand identity, content and paid distribution built as one commercial system.", tone:"consumer" },
  { n:"03", type:"EXPERIENCE / CULTURE", title:"ENTERTAINMENT GALA & LAUNCH", line:"A live cultural moment extended into content, broadcast and digital reach.", tone:"culture" },
];

export default function WorkEditorial() {
  return (
    <section className="homeSection homeWork" id="work">
      <div className="homeSectionTop"><span>02 / SELECTED WORK</span><span>THE WORK IS THE PROOF</span></div>
      <div className="homeSectionIntro">
        <h2>WORK WITH<br /><em>A JOB TO DO.</em></h2>
        <p>Strategy becomes valuable when it changes what the audience does next. Selected work is presented as systems, not gallery pieces.</p>
      </div>
      <div className="editorialProjects">
        {projects.map((p) => (
          <article className={"editorialProject " + p.tone} key={p.n}>
            <MediaFrame aspectRatio="aspect-[16/9]" className="editorialVisual">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#111622]">
                  <div className="editorialMark">{p.n === "02" ? "×" : "LIVE"}</div>
                </div>
              )}
              <span className="relative z-10">{p.type}</span>
              <strong className="relative z-10">{p.n}</strong>
            </MediaFrame>
            <div className="editorialCopy"><small>{p.type}</small><h3>{p.title}</h3><p>{p.line}</p><a href="/work">Read the teardown <span>↗</span></a></div>
          </article>
        ))}
      </div>
    </section>
  );
}
