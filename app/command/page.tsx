"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import styles from "./command.module.css";

const areas = [
  {
    label: "Command Center",
    icon: LayoutDashboard,
    description: "A shared view of the work in motion, the decisions ahead and the people responsible for each next step.",
    items: ["Project intake", "Team priorities", "Open decisions"],
  },
  {
    label: "AI Assistant",
    icon: Bot,
    description: "A place for assisted research and repetitive tasks, with people keeping context and judgement in the loop.",
    items: ["Research support", "Drafting and synthesis", "Human review"],
  },
  {
    label: "Leads & CRM",
    icon: Users,
    description: "A connected way to capture project context and keep conversations moving from first brief to handoff.",
    items: ["Project briefs", "Contact context", "Follow-up workflow"],
  },
  {
    label: "Clients",
    icon: BriefcaseBusiness,
    description: "A considered home for client context, active work and the decisions that keep collaboration clear.",
    items: ["Account context", "Work in progress", "Shared decisions"],
  },
  {
    label: "Content Studio",
    icon: Zap,
    description: "A connected process for turning a clear idea into useful, consistent content across formats.",
    items: ["Content direction", "Production planning", "Review and delivery"],
  },
  {
    label: "Campaigns",
    icon: ChartNoAxesCombined,
    description: "Campaign planning that keeps the idea, audience, channels and learning connected.",
    items: ["Campaign strategy", "Channel planning", "Measurement design"],
  },
  {
    label: "Research",
    icon: Search,
    description: "A structured way to understand the market, audience and questions that should shape the work.",
    items: ["Market context", "Audience questions", "Evidence and synthesis"],
  },
  {
    label: "Projects",
    icon: ClipboardList,
    description: "A clear line from scope to making, launch and the next useful learning.",
    items: ["Scope and milestones", "Production handoffs", "Launch and learn"],
  },
  {
    label: "Proposals",
    icon: FileText,
    description: "A way to turn a well-understood problem into a focused scope, approach and next step.",
    items: ["Problem framing", "Approach and scope", "Next steps"],
  },
  {
    label: "Reports",
    icon: ChartNoAxesCombined,
    description: "Reporting designed to make progress, outcomes and open questions easier to understand.",
    items: ["Progress summaries", "Outcome review", "Recommended next moves"],
  },
  {
    label: "Settings",
    icon: Settings,
    description: "The principles and preferences that shape how a connected workspace should operate.",
    items: ["Team preferences", "Workflow rules", "Access and ownership"],
  },
];

export default function Command() {
  const [active, setActive] = useState(areas[0]);

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand} aria-label="DIGITALE MEDIA home">
          <Image
            src="/media/brand/digitale-media-logo.webp"
            alt=""
            width={270}
            height={70}
            sizes="176px"
          />
        </Link>
        <p className={styles.sideNote}>A connected workspace concept</p>
        <nav className={styles.nav} aria-label="Command concept areas">
          {areas.map(({ label, icon: Icon, ...area }) => (
            <button
              key={label}
              type="button"
              className={active.label === label ? styles.active : ""}
              aria-pressed={active.label === label}
              onClick={() => setActive({ label, icon: Icon, ...area })}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <span className={styles.version}>DIGITALE / SYSTEMS</span>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.eyebrow}>DIGITALE MEDIA / COMMAND</span>
            <h1>{active.label}</h1>
          </div>
          <span className={styles.status}>CONCEPT / NOT CONNECTED TO LIVE DATA</span>
        </header>

        <section className={styles.intro}>
          <span className={styles.eyebrow}>ONE TEAM. ONE SYSTEM.</span>
          <h2>Keep the work<br />in view.</h2>
          <p>
            A direction for bringing creative, growth, technology and experience work
            into one considered operating rhythm. This preview is not a live agency
            dashboard.
          </p>
          <Link href="/start" className={styles.cta}>
            Bring us a project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.area} aria-live="polite">
          <div className={styles.areaHeading}>
            <span className={styles.eyebrow}>A CONNECTED WORKFLOW</span>
            <h2>{active.label}</h2>
            <p>{active.description}</p>
          </div>
          <ul>
            {active.items.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                <ArrowUpRight size={16} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <Link href="/">DIGITALE MEDIA</Link>
          <span>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</span>
          <Link href="/work">Explore the work <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </footer>
      </section>
    </main>
  );
}