"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Practice = "growth" | "creative" | "technology" | "experiences" | "not-sure" | "";
type Currency = "INR" | "AED" | "USD" | "GBP" | "EUR";

type FormState = {
  practice: Practice;
  focus: string[];
  scope: string;
  company: string;
  website: string;
  industry: string;
  geography: string;
  currency: Currency;
  budget: string;
  timeline: string;
  success: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  bot_field: string;
};

const initial: FormState = {
  practice: "", focus: [], scope: "", company: "", website: "", industry: "",
  geography: "", currency: "INR", budget: "", timeline: "", success: "",
  name: "", email: "", phone: "", role: "", bot_field: ""
};

const focusMap: Record<Exclude<Practice, "">, string[]> = {
  growth: ["Lead generation", "Paid acquisition", "SEO / AEO / GEO", "Conversion rate", "E-commerce growth", "CRM / RevOps", "Full-funnel growth"],
  creative: ["Brand identity", "Campaign", "Social & content", "Creator / influencer", "Film / production", "Rebrand", "Integrated campaign"],
  technology: ["Website", "Web application", "Mobile app", "AI product", "AI automation", "CRM / lead system", "Marketing automation", "Analytics / dashboard", "Custom platform"],
  experiences: ["Corporate event", "Product launch", "Brand activation", "Red carpet", "Entertainment", "Private celebration", "Wedding"],
  "not-sure": ["I know the problem", "I need strategic direction", "I need a full partner"]
};

const scopePlaceholder: Record<Exclude<Practice, "">, string> = {
  growth: "What is happening in your acquisition funnel today?",
  creative: "What are you trying to make people think, feel or do?",
  technology: "What does the system need to do?",
  experiences: "Tell us about the event, audience and experience you want to create.",
  "not-sure": "Tell us what is not working or what you want to change."
};

const budgetMap: Record<Currency, string[]> = {
  INR: ["₹1L–5L", "₹5L–15L", "₹15L–50L", "₹50L+", "₹1Cr+", "Let's discuss"],
  AED: ["AED 25k–50k", "AED 50k–150k", "AED 150k–500k", "AED 500k+", "Let's discuss"],
  USD: ["$5k–$15k", "$15k–$40k", "$40k–$100k", "$100k+", "Let's discuss"],
  GBP: ["£5k–£15k", "£15k–£40k", "£40k–£100k", "£100k+", "Let's discuss"],
  EUR: ["€5k–€15k", "€15k–€40k", "€40k–€100k", "€100k+", "Let's discuss"]
};

const currencySymbols: Record<Currency, string> = { INR: "₹", AED: "AED", USD: "$", GBP: "£", EUR: "€" };

function inferCurrency(): Currency {
  if (typeof navigator === "undefined") return "INR";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const lang = navigator.language || "";
  if (tz.includes("Dubai") || tz.includes("Abu_Dhabi")) return "AED";
  if (lang.startsWith("en-GB")) return "GBP";
  if (lang.startsWith("en-US")) return "USD";
  if (lang.startsWith("de-") || lang.startsWith("fr-") || lang.startsWith("es-")) return "EUR";
  return "INR";
}

export default function StartProject() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const total = 8;
  const practice = data.practice || "not-sure";
  const focuses = focusMap[practice];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("practice") as Practice | null;
    const validPractice = requested && ["growth","creative","technology","experiences","not-sure"].includes(requested) ? requested : null;
    const saved = localStorage.getItem("digitale-project-diagnostic");
    if (saved) {
      try { setData((v) => ({ ...v, ...JSON.parse(saved), ...(validPractice ? { practice: validPractice, focus: [] } : {}) })); } catch {}
      if (validPractice) setStep(2);
    } else {
      setData((v) => ({ ...v, currency: inferCurrency(), ...(validPractice ? { practice: validPractice } : {}) }));
      if (validPractice) setStep(2);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("digitale-project-diagnostic", JSON.stringify(data));
  }, [data]);

  const progress = Math.round((step / total) * 100);
  const update = (patch: Partial<FormState>) => setData((v) => ({ ...v, ...patch }));

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(data.practice);
    if (step === 2) return data.focus.length > 0;
    if (step === 3) return Boolean(data.scope.trim());
    if (step === 4) return Boolean(data.company.trim() && data.industry && data.geography);
    if (step === 5) return Boolean(data.budget);
    if (step === 6) return Boolean(data.timeline);
    if (step === 7) return Boolean(data.success.trim());
    return Boolean(data.name.trim() && data.email.trim() && data.phone.trim());
  }, [data, step]);

  function toggleFocus(value: string) {
    setData((v) => ({ ...v, focus: v.focus.includes(value) ? v.focus.filter((x) => x !== value) : [...v.focus, value] }));
  }

  async function submit() {
    if (!canContinue) return;
    setSaving(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/project-intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.id) {
        const detail = result?.details
          ? Object.entries(result.details as Record<string, string[]>)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join(" · ")
          : result?.error || `Request failed (${response.status})`;
        setSubmitError(detail);
        setSaving(false);
        return;
      }
      sessionStorage.setItem("digitale-brief-id", result.id);
    } catch (error) {
      console.error("[PROJECT_INTAKE_SUBMIT_ERROR]", error);
      setSubmitError("Could not reach the intake server. Make sure the local Next.js server is running and try again.");
      setSaving(false);
      return;
    }
    localStorage.removeItem("digitale-project-diagnostic");
    setSubmitted(true);
    setSaving(false);
  }

  const briefId = typeof window !== "undefined" ? sessionStorage.getItem("digitale-brief-id") : null;

  if (submitted) {
    return (
      <main className="intakePage">
        <div className="intakeGlow" />
        <header className="intakeNav"><Link href="/" className="intakeLogo">DIGITALE<span>®</span></Link><span>PROJECT DIAGNOSTIC</span></header>
        <section className="successScreen">
          <div className="monoLabel">BRIEF RECEIVED / {briefId || "RECEIVED"}</div>
          <h1>Now we know<br /><i>where to start.</i></h1>
          <p>Your project context is with the DIGITALE team. We’ll review the brief and come back with the right next step—not a generic sales pitch.</p>
          <div className="successActions"><Link href="/start">Review brief ↗</Link><Link href="/">Return to DIGITALE ↗</Link></div>
        </section>
      </main>
    );
  }

  return (
    <main className="intakePage">
      <div className="intakeGlow" />
      <header className="intakeNav">
        <Link href="/" className="intakeLogo">DIGITALE<span>®</span></Link>
        <span>PROJECT DIAGNOSTIC</span>
        <Link href="/" className="closeIntake">CLOSE ×</Link>
      </header>

      <section className="intakeShell">
        <aside className="intakeAside">
          <div>
            <div className="monoLabel">{String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
            <h1>{step === 1 ? "Let's build the right system." : step === 2 ? "Start with the problem." : step === 7 ? "Define the outcome." : "Give us the context."}</h1>
            <p>{step === 1 ? "Tell us what you are trying to build. We’ll route the conversation to the right DIGITALE practice." : "The better the context, the better the first conversation."}</p>
          </div>
          <div className="intakeProgress"><span style={{ width: progress + "%" }} /></div>
          <div className="directLine">Prefer a direct line? Tell us in the brief and we’ll take it from there.</div>
        </aside>

        <section className="intakeCard">
          <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={data.bot_field} onChange={e => update({bot_field:e.target.value})} name="website_confirm" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }} />
          {step === 1 && <Step title="What are you looking to build?"><div className="practiceGrid">
            {([["growth","Growth","Acquisition, demand, conversion and performance."],["creative","Creative","Brand, campaigns, content and production."],["technology","Technology","Web, products, AI and automation."],["experiences","Experiences","Launches, activations, events and live production."],["not-sure","Not sure","I know the problem, but not the answer yet."]] as const).map(([id,title,desc]) =>
              <Link
                key={id}
                href={"/start?practice=" + id}
                className={"practiceChoice " + (data.practice === id ? "selected" : "")}
                onClick={() => {
                  update({ practice: id, focus: [] });
                }}
              >
                <span>{id === "not-sure" ? "05" : "0" + (["growth","creative","technology","experiences"].indexOf(id)+1)}</span><strong>{title}</strong><small>{desc}</small><b>↗</b>
              </Link>
            )}
          </div></Step>}

          {step === 2 && <Step title={practice === "not-sure" ? "What best describes your situation?" : "What do you need help with?"}>
            <div className="optionList">{focuses.map((x, i) => <button key={x} className={"option " + (data.focus.includes(x) ? "selected" : "")} onClick={() => toggleFocus(x)}><span>0{i+1}</span><strong>{x}</strong><b>{data.focus.includes(x) ? "✓" : "↗"}</b></button>)}</div>
          </Step>}

          {step === 3 && <Step title={practice === "experiences" ? "Tell us about the experience." : "What should we know about the challenge?"}><textarea autoFocus value={data.scope} onChange={e => update({scope:e.target.value})} placeholder={scopePlaceholder[practice]} /></Step>}

          {step === 4 && <Step title="Who are we building this for?"><div className="fieldGrid">
            <Field label="Company / Brand"><input autoFocus value={data.company} onChange={e => update({company:e.target.value})} placeholder="Your company" /></Field>
            <Field label="Website"><input value={data.website} onChange={e => update({website:e.target.value})} placeholder="https://" /></Field>
            <Field label="Industry"><input value={data.industry} onChange={e => update({industry:e.target.value})} placeholder="Real estate, SaaS, luxury..." /></Field>
            <Field label="Operating market"><input value={data.geography} onChange={e => update({geography:e.target.value})} placeholder="India, UAE, Global..." /></Field>
          </div></Step>}

          {step === 5 && <Step title="What scale are we talking about?"><div className="currencyBar">{(["INR","AED","USD","GBP","EUR"] as Currency[]).map(c => <button key={c} className={data.currency === c ? "active" : ""} onClick={() => update({currency:c,budget:""})}>{currencySymbols[c]} {c}</button>)}</div><div className="optionList">{budgetMap[data.currency].map((x, i) => <button key={x} className={"option " + (data.budget === x ? "selected" : "")} onClick={() => update({budget:x})}><span>0{i+1}</span><strong>{x}</strong><b>{data.budget === x ? "✓" : "↗"}</b></button>)}</div></Step>}

          {step === 6 && <Step title="When do you want to move?"><div className="optionList">{["Immediately","Within 30 days","1–3 months","3–6 months","6+ months","Just exploring"].map((x,i)=><button key={x} className={"option " + (data.timeline===x ? "selected" : "")} onClick={() => update({timeline:x})}><span>0{i+1}</span><strong>{x}</strong><b>{data.timeline===x?"✓":"↗"}</b></button>)}</div></Step>}

          {step === 7 && <Step title="What would success look like?"><textarea autoFocus value={data.success} onChange={e => update({success:e.target.value})} placeholder="Tell us what needs to be different 6–12 months from now." /></Step>}

          {step === 8 && <Step title="Where should we reach you?"><div className="fieldGrid"><Field label="Name"><input autoFocus value={data.name} onChange={e => update({name:e.target.value})} placeholder="Your name" /></Field><Field label="Work email"><input type="email" value={data.email} onChange={e => update({email:e.target.value})} placeholder="you@company.com" /></Field><Field label="Phone / WhatsApp"><input value={data.phone} onChange={e => update({phone:e.target.value})} placeholder="+91..." /></Field><Field label="Role"><input value={data.role} onChange={e => update({role:e.target.value})} placeholder="Founder, CMO, Marketing Lead..." /></Field></div></Step>}

          {submitError && <div role="alert" className="intakeSubmitError">{submitError}</div>}

          <div className="intakeActions">
            <button className="backBtn" disabled={step===1} onClick={() => setStep(s => Math.max(1,s-1))}>← Back</button>
            {step < total ? <button className="continueBtn" disabled={!canContinue} onClick={() => setStep(s => s+1)}>Continue <span>→</span></button> : <button className="continueBtn" disabled={!canContinue || saving} onClick={submit}>{saving ? "Sending…" : "Submit project"} <span>→</span></button>}
          </div>
        </section>
      </section>
    </main>
  );
}

function Step({title, children}:{title:string;children:React.ReactNode}) {
  return <div className="stepContent"><div className="monoLabel">DIGITALE / PROJECT INTAKE</div><h2>{title}</h2>{children}</div>;
}

function Field({label, children}:{label:string;children:React.ReactNode}) {
  return <label className="field"><span>{label}</span>{children}</label>;
}
