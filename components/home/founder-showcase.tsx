"use client";

import Image from "next/image";
import styles from "./founder-showcase.module.css";

const founders = [
  {
    name: "Siva Veerapaneni",
    role: "FOUNDER",
    discipline: "BRAND / CREATIVE / EXPERIENCES",
    bio: "Leads brand, creative and experience strategy at DIGITALE — turning ambitious ideas into campaigns, moments and brands people remember.",
    image: "/media/founders/siva-veerapaneni.webp",
    alt: "Siva Veerapaneni",
  },
  {
    name: "Gudali Uma Saravana Kumar",
    role: "FOUNDER",
    discipline: "PRODUCT / AI / GROWTH",
    bio: "Leads product, technology and growth at DIGITALE — building AI-enabled systems, digital products and acquisition engines that compound.",
    image: "/media/founders/uma-saravana-kumar.webp",
    alt: "Gudali Uma Saravana Kumar",
  },
];

export default function FounderShowcase() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.header}>
        <div>
          <span className={styles.kicker}>FOUNDERS</span>
          <h2>The people<br />building <em>DIGITALE.</em></h2>
        </div>
        <div className={styles.intro}>
          <p>
            Builders, creators and operators working at the intersection of
            creative, growth and technology.
          </p>
          <a href="/about" className={styles.story}>OUR STORY <span>→</span></a>
        </div>
      </div>

      <div className={styles.cards}>
        {founders.map((founder) => (
          <article className={styles.card} key={founder.name}>
            <div className={styles.portrait}>
              <Image
                src={founder.image}
                alt={founder.alt}
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
                className={styles.image}
              />
            </div>
            <div className={styles.cardBody}>
              <h3>{founder.name}</h3>
              <span className={styles.role}>{founder.role}</span>
              <span className={styles.discipline}>{founder.discipline}</span>
              <p>{founder.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
