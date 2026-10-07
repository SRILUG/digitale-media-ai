"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import SiteHeader from "@/components/site/site-header";
import {
  advanceDiscovery,
  createDiscoveryState,
  nextDiscoveryQuestion,
} from "@/lib/property-intelligence/conversation";
import { properties } from "@/lib/property-intelligence/data";
import { matchProperties } from "@/lib/property-intelligence/matcher";
import type {
  ConversationMessage,
  ProductView,
  PropertyMatch,
  PropertyPreferences,
  PrototypeProperty,
} from "@/lib/property-intelligence/types";
import styles from "./property-intelligence.module.css";

const emptyPreferences = (): PropertyPreferences => ({
  amenities: [],
});

const startingPrompts = [
  "I need a 3BHK for my family.",
  "I'm looking for an investment.",
  "I want something close to my workplace.",
  "I'm looking for a premium home.",
];

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatPrice(amount: number): string {
  if (amount >= 10_000_000) return `₹${Number((amount / 10_000_000).toFixed(2))} Cr`;
  if (amount >= 100_000) return `₹${Number((amount / 100_000).toFixed(2))} L`;
  return rupees.format(amount);
}

function createMessage(role: ConversationMessage["role"], text: string): ConversationMessage {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, role, text };
}

function answerPropertyQuestion(question: string, property: PrototypeProperty): string {
  const lowerQuestion = question.toLowerCase();
  if (/price|cost|budget/.test(lowerQuestion)) return `${property.name} is listed at ${formatPrice(property.price)} in this fictional prototype dataset.`;
  if (/area|size|square|sqft/.test(lowerQuestion)) return `The illustrative area for ${property.name} is ${property.area.toLocaleString("en-IN")} sq ft.`;
  if (/bed|bhk|room|configuration/.test(lowerQuestion)) return `${property.name} is shown as a ${property.bedrooms}BHK ${property.propertyType}.`;
  if (/where|location|neighbourhood|neighborhood|area/.test(lowerQuestion)) return `${property.name} is placed in ${property.location} for this prototype.`;
  if (/amenit|pool|gym|garden|parking|school|metro/.test(lowerQuestion)) return `The concept includes ${property.amenities.join(", ")}. These are illustrative prototype details, not a verified listing.`;
  if (/why|match|fit/.test(lowerQuestion)) return property.matchFactors.join(" ");
  if (/consider|downside|risk/.test(lowerQuestion)) return property.thingsToConsider.join(" ");
  return `I can help with ${property.name}'s price, layout, location, amenities or match notes. This prototype does not have verified listing information.`;
}

function getLocalDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export default function PropertyIntelligence() {
  const [preferences, setPreferences] = useState<PropertyPreferences>(emptyPreferences);
  const [discoveryState, setDiscoveryState] = useState(createDiscoveryState);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [view, setView] = useState<ProductView>("discovery");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [answeringPropertyId, setAnsweringPropertyId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [requestPropertyId, setRequestPropertyId] = useState<string | null>(null);
  const [requestKind, setRequestKind] = useState<"viewing" | "question">("viewing");
  const [requestReceived, setRequestReceived] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("digitale-property-shortlist");
      const decoded: unknown = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(decoded) || decoded.some((id) => typeof id !== "string")) {
        throw new Error("Saved shortlist data is not in the expected format.");
      }
      setSavedIds(decoded.filter((id) => properties.some((property) => property.id === id)));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Saved shortlist could not be loaded.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("digitale-property-shortlist", JSON.stringify(savedIds));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Shortlist changes could not be saved on this device.");
    }
  }, [savedIds, storageReady]);

  const matches = useMemo(() => matchProperties(preferences), [preferences]);
  const selectedProperty = properties.find((property) => property.id === selectedPropertyId);
  const requestProperty = properties.find((property) => property.id === requestPropertyId);
  const comparedProperties = compareIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is PrototypeProperty => Boolean(property));
  const shortlisted = savedIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is PrototypeProperty => Boolean(property));

  const currentQuestion = nextDiscoveryQuestion(preferences, discoveryState);
  const hasSearchResults = messages.length > 0 && discoveryState.stage === "matches" && !answeringPropertyId;
  const preferenceSummary = [
    preferences.location,
    preferences.bedrooms ? `${preferences.bedrooms}BHK` : undefined,
    preferences.budget ? `Up to ${formatPrice(preferences.budget)}` : undefined,
    preferences.purpose === "living" ? "For living" : preferences.purpose === "investment" ? "Investment" : undefined,
    preferences.propertyType,
    ...preferences.amenities,
    preferences.commute ? `Near ${preferences.commute}` : undefined,
    preferences.timeline,
  ].filter((item): item is string => Boolean(item));

  async function submitMessage(text: string, propertyContextId = answeringPropertyId) {
    const trimmed = text.trim();
    if (!trimmed || isProcessing) return;

    setIsProcessing(true);
    setNotice("");
    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);

    let reply: string;
    let nextPreferences = preferences;
    let nextDiscoveryState = discoveryState;
    if (propertyContextId) {
      const property = properties.find((item) => item.id === propertyContextId);
      reply = property
        ? answerPropertyQuestion(trimmed, property)
        : "That property is no longer available in this prototype. Start a new search to continue.";
    } else {
      const turn = advanceDiscovery(trimmed, preferences, discoveryState);
      nextPreferences = turn.preferences;
      nextDiscoveryState = turn.state;
      setPreferences(nextPreferences);
      setDiscoveryState(nextDiscoveryState);
      reply = turn.reply;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 240));
    setMessages([...nextMessages, createMessage("assistant", reply)]);
    setView(propertyContextId ? "discovery" : nextDiscoveryState.stage === "discovery" ? "discovery" : "matches");
    setIsProcessing(false);
  }

  function startPrompt(prompt: string) {
    setAnsweringPropertyId(null);
    void submitMessage(prompt, null);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) {
        setNotice("Compare up to three properties at a time.");
        return current;
      }
      setNotice("");
      return [...current, id];
    });
  }

  function openDetail(id: string) {
    setSelectedPropertyId(id);
    setView("detail");
  }

  function askAboutProperty(property: PrototypeProperty) {
    setSelectedPropertyId(property.id);
    setAnsweringPropertyId(property.id);
    setMessages((current) => [
      ...current,
      createMessage("assistant", `Ask me about ${property.name}'s price, layout, location, amenities or why it matched. The details are fictional prototype data.`),
    ]);
    setView("discovery");
  }

  function openRequest(kind: "viewing" | "question", propertyId: string) {
    setRequestPropertyId(propertyId);
    setRequestKind(kind);
    setRequestReceived(false);
    setView("request");
  }

  function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestReceived(true);
    setView("success");
  }

  function restartDiscovery() {
    setPreferences(emptyPreferences());
    setDiscoveryState(createDiscoveryState());
    setMessages([]);
    setCompareIds([]);
    setSelectedPropertyId(null);
    setAnsweringPropertyId(null);
    setView("discovery");
  }

  function renderPropertyCard(match: PropertyMatch) {
    const { property, score, reasons } = match;
    const isSaved = savedIds.includes(property.id);
    const isCompared = compareIds.includes(property.id);
    return (
      <article className={styles.resultCard} key={property.id}>
        <div className={styles.resultArt} data-kind={property.propertyType} aria-hidden="true">
          <span>STUDIO DATA / {property.location.toUpperCase()}</span>
          <strong>{property.bedrooms}<small> BEDROOMS</small></strong>
          <i />
        </div>
        <div className={styles.resultContent}>
          <div className={styles.resultTitle}>
            <div>
              <span className={styles.resultEyebrow}>{property.location} · {property.propertyType}</span>
              <h3>{property.name}</h3>
            </div>
            <div className={styles.matchScore}><strong>{score}</strong><span>MATCH*</span></div>
          </div>
          <div className={styles.resultStats}>
            <span>{formatPrice(property.price)}</span>
            <span>{property.bedrooms}BHK</span>
            <span>{property.area.toLocaleString("en-IN")} sq ft</span>
          </div>
          <ul className={styles.reasonList}>
            {reasons.slice(0, 2).map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
          <div className={styles.cardActions}>
            <button type="button" onClick={() => openDetail(property.id)}>OPEN DETAILS <span>↗</span></button>
            <button type="button" aria-pressed={isSaved} onClick={() => toggleSaved(property.id)}>{isSaved ? "SAVED" : "SAVE"}</button>
            <button type="button" aria-pressed={isCompared} onClick={() => toggleCompare(property.id)}>{isCompared ? "ADDED" : "COMPARE"}</button>
          </div>
        </div>
      </article>
    );
  }

  const selectedMatch = selectedProperty ? matches.find((match) => match.property.id === selectedProperty.id) : undefined;

  return (
    <div className={styles.page}>
      <SiteHeader current="work" />
      <main>
        <section className={styles.caseIntro}>
          <div className={styles.caseLead}>
            <div>
              <span className={styles.kicker}>DIGITALE STUDIO DIRECTION · INTERACTIVE PROTOTYPE</span>
              <h1>PROPERTY<br /><em>INTELLIGENCE</em></h1>
              <p className={styles.caseDescription}>A conversational property-discovery system that turns an open-ended search into a focused set of relevant options.</p>
            </div>
            <div className={styles.caseGlyph} aria-hidden="true">
              <svg viewBox="0 0 420 420" role="presentation">
                <path d="M210 32 372 126v168l-162 94L48 294V126L210 32Z" />
                <path d="M210 32v178m162-84-162 84m162 84-162-84m0 178V210M48 294l162-84M48 126l162 84" />
                <circle cx="210" cy="210" r="63" />
                <circle cx="210" cy="32" r="5" /><circle cx="372" cy="126" r="5" />
                <circle cx="372" cy="294" r="5" /><circle cx="210" cy="388" r="5" />
                <circle cx="48" cy="294" r="5" /><circle cx="48" cy="126" r="5" />
              </svg>
              <span>INTENT / INTO A CLEARER BRIEF</span>
            </div>
          </div>
          <div className={styles.caseNotes}>
            <article><span>THE PROBLEM</span><p>Property discovery often begins with vague intent rather than a structured brief.</p></article>
            <article><span>THE IDEA</span><p>Use conversation as the interface for discovery.</p></article>
            <article className={styles.systemNote}>
              <span>THE SYSTEM</span>
              <p>INTENT <i>→</i> PREFERENCES <i>→</i> INTELLIGENCE <i>→</i> MATCHES <i>→</i> COMPARE <i>→</i> SHORTLIST <i>→</i> ACTION</p>
            </article>
          </div>
        </section>

        <section className={styles.prototype} aria-label="Property Intelligence interactive prototype">
          <div className={styles.productTop}>
            <div>
              <span className={styles.kicker}>THE PROTOTYPE</span>
              <h2>Start with what<br /><em>matters to you.</em></h2>
            </div>
            <p>Prototype data / fictional properties<br />Local matching / no external AI</p>
          </div>
          <div className={styles.productBar}>
            <div className={styles.productIdentity}><span className={styles.identityMark}>P·I</span><span>PROPERTY <b>INTELLIGENCE</b></span></div>
            <nav className={styles.productNav} aria-label="Prototype views">
              <button type="button" aria-current={view === "discovery" ? "page" : undefined} onClick={() => setView("discovery")}>DISCOVER</button>
              <button type="button" aria-current={view === "matches" ? "page" : undefined} onClick={() => setView("matches")} disabled={!hasSearchResults}>MATCHES <span>{hasSearchResults ? matches.length : 0}</span></button>
              <button type="button" aria-current={view === "shortlist" ? "page" : undefined} onClick={() => setView("shortlist")}>SHORTLIST <span>{savedIds.length}</span></button>
              <button type="button" aria-current={view === "compare" ? "page" : undefined} onClick={() => setView("compare")} disabled={compareIds.length < 2}>COMPARE <span>{compareIds.length}</span></button>
            </nav>
          </div>

          {view === "discovery" && (
            <div className={styles.workspace}>
              <section className={styles.conversation} aria-label="Property discovery conversation">
                <div className={styles.conversationHead}>
                  <div><span>01 / INTENT</span><h3>{answeringPropertyId ? "Ask about a property." : "Tell us what you're looking for."}</h3></div>
                  {messages.length > 0 && <button type="button" onClick={restartDiscovery}>NEW SEARCH ↺</button>}
                </div>
                {messages.length === 0 ? (
                  <div className={styles.opening}>
                    <p>Start anywhere. A neighbourhood, a feeling, a practical need — write it the way you would say it.</p>
                    <div className={styles.promptList}>
                      {startingPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => startPrompt(prompt)}>{prompt}<span>↗</span></button>)}
                    </div>
                  </div>
                ) : (
                  <div className={styles.transcript} aria-live="polite">
                    {messages.map((message) => (
                      <article className={message.role === "user" ? styles.userMessage : styles.assistantMessage} key={message.id}>
                        <span>{message.role === "user" ? "YOU" : "PROPERTY INTELLIGENCE"}</span>
                        <p>{message.text}</p>
                      </article>
                    ))}
                    {isProcessing && <p className={styles.processing}>READING THE BRIEF <i /><i /><i /></p>}
                  </div>
                )}
                {messages.length === 0 && <span className={styles.inputPrompt}>OR DESCRIBE IT IN YOUR OWN WORDS</span>}
                <form
                  className={styles.messageForm}
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.currentTarget;
                    const input = new FormData(form).get("intent");
                    if (typeof input === "string") void submitMessage(input);
                    form.reset();
                  }}
                >
                  <label className={styles.visuallyHidden} htmlFor="property-intent">Describe the property you are looking for</label>
                  <input id="property-intent" name="intent" placeholder="e.g. A 3BHK near Gachibowli, around ₹1.5 crore" autoComplete="off" />
                  <button type="submit" disabled={isProcessing} aria-label="Send your property brief">SEND <span>↗</span></button>
                </form>
                <p className={styles.prototypeFootnote}>A prototype conversation. No listing or recommendation is verified.</p>
              </section>

              <aside className={styles.intelligencePanel} aria-label="Search intelligence">
                <div className={styles.panelHead}><span>02 / INTELLIGENCE</span><span>LOCAL ENGINE</span></div>
                <section className={styles.knowledgeBlock}>
                  <div><span>WHAT THE SYSTEM KNOWS</span><small>{preferenceSummary.length ? `${preferenceSummary.length} SIGNALS` : "AWAITING INTENT"}</small></div>
                  {preferenceSummary.length ? (
                    <ul className={styles.preferencePills}>{preferenceSummary.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : <p className={styles.emptyKnowledge}>Your brief takes shape here, one useful detail at a time.</p>}
                </section>
                <section className={styles.knowledgeBlock}>
                  <div><span>WHAT IT NEEDS</span><small>{currentQuestion && !answeringPropertyId ? "NEXT SIGNAL" : "READY TO EXPLORE"}</small></div>
                  <p className={styles.nextNeed}>{answeringPropertyId ? "Your question about this property." : currentQuestion ?? "The brief is ready for an initial set of matches."}</p>
                </section>
                <section className={styles.knowledgeBlock}>
                  <div><span>WHAT IT FOUND</span><small>{hasSearchResults ? `${matches.length} DIRECTIONS` : "12 CONCEPTS"}</small></div>
                  <p className={styles.nextNeed}>{hasSearchResults ? "Ranked against the preferences collected so far." : "Fictional property concepts, waiting for a brief."}</p>
                  {hasSearchResults && <button type="button" className={styles.textAction} onClick={() => setView("matches")}>SEE MATCHES <span>↗</span></button>}
                </section>
                <div className={styles.engineNote}><span>* ILLUSTRATIVE MATCH</span><p>Scores explain how the brief and prototype data line up. They are not a measure of accuracy or investment performance.</p></div>
              </aside>
            </div>
          )}

          {view === "matches" && (
            <section className={styles.resultsView}>
              <div className={styles.viewHeading}>
                <div>
                  <span className={styles.kicker}>03 / MATCHES · {matches.length} OPTIONS</span>
                  <h3>Your matches<span>*</span></h3>
                  <p>Ranked from the brief you shared. Each score is illustrative, not an accuracy claim.</p>
                  <ul className={styles.resultBrief} aria-label="Preferences used for these matches">
                    {preferenceSummary.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <button type="button" className={styles.subtleButton} onClick={() => setView("discovery")}>REFINE THE BRIEF ↗</button>
              </div>
              {matches.length ? <div className={styles.resultGrid}>{matches.map(renderPropertyCard)}</div> : <div className={styles.emptyState}><h4>No options in this direction yet.</h4><p>Adjust your budget or preferences to explore the full prototype set.</p><button type="button" onClick={restartDiscovery}>START A NEW SEARCH ↗</button></div>}
              <p className={styles.prototypeFootnote}>* Scores are illustrative rankings generated from fictional prototype data, not verified listings.</p>
            </section>
          )}

          {view === "detail" && selectedProperty && (
            <section className={styles.detailView}>
              <button type="button" className={styles.backAction} onClick={() => setView("matches")}>← BACK TO MATCHES</button>
              <div className={styles.detailHero}>
                <div className={styles.detailArt} data-kind={selectedProperty.propertyType} aria-hidden="true">
                  <span>PROTOTYPE PROPERTY / {selectedProperty.location.toUpperCase()}</span>
                  <strong>{selectedProperty.name}</strong>
                </div>
                <div className={styles.detailHeading}>
                  <span className={styles.kicker}>{selectedProperty.location} · {selectedProperty.propertyType} · {selectedProperty.bedrooms}BHK</span>
                  <h3>{selectedProperty.name}</h3>
                  <p>{selectedProperty.description}</p>
                  <div className={styles.detailPrice}>{formatPrice(selectedProperty.price)}<small>ILLUSTRATIVE PRICE</small></div>
                  <div className={styles.detailActions}>
                    <button type="button" onClick={() => toggleSaved(selectedProperty.id)}>{savedIds.includes(selectedProperty.id) ? "UNSAVE" : "SAVE"}</button>
                    <button type="button" aria-pressed={compareIds.includes(selectedProperty.id)} onClick={() => toggleCompare(selectedProperty.id)}>{compareIds.includes(selectedProperty.id) ? "REMOVE FROM COMPARE" : "COMPARE"}</button>
                  </div>
                  <div className={styles.detailActionsSecondary}>
                    <button type="button" onClick={() => askAboutProperty(selectedProperty)}>ASK ABOUT THIS PROPERTY ↗</button>
                    <button type="button" onClick={() => openRequest("viewing", selectedProperty.id)}>REQUEST A VIEWING ↗</button>
                  </div>
                </div>
              </div>
              <div className={styles.detailFacts}>
                <article><span>CONFIGURATION</span><strong>{selectedProperty.bedrooms}BHK · {selectedProperty.propertyType}</strong></article>
                <article><span>AREA</span><strong>{selectedProperty.area.toLocaleString("en-IN")} sq ft</strong></article>
                <article><span>LOCATION</span><strong>{selectedProperty.location}, Hyderabad</strong></article>
              </div>
              <div className={styles.detailColumns}>
                <article><span>AMENITIES</span><ul className={styles.amenityList}>{selectedProperty.amenities.map((item) => <li key={item}>{item}</li>)}</ul></article>
                <article><span>WHY IT MATCHES <b>{selectedMatch ? `${selectedMatch.score} / 100*` : "STUDIO DATA"}</b></span><ul>{(selectedMatch?.reasons ?? selectedProperty.matchFactors).map((reason) => <li key={reason}>{reason}</li>)}</ul></article>
                <article><span>THINGS TO CONSIDER</span><ul>{selectedProperty.thingsToConsider.map((item) => <li key={item}>{item}</li>)}</ul></article>
              </div>
            </section>
          )}

          {view === "shortlist" && (
            <section className={styles.resultsView}>
              <div className={styles.viewHeading}><div><span className={styles.kicker}>04 / SHORTLIST</span><h3>Kept in view.</h3><p>Your saved directions stay on this device. No account needed.</p></div></div>
              {shortlisted.length ? <div className={styles.resultGrid}>{shortlisted.map((property) => renderPropertyCard(matches.find((match) => match.property.id === property.id) ?? { property, score: 48, reasons: property.matchFactors.slice(0, 2) }))}</div> : (
                <div className={styles.emptyState}><span>YOUR SHORTLIST / 00</span><h4>Nothing saved yet.</h4><p>Save a property direction to return to it here.</p><button type="button" onClick={() => setView(matches.length ? "matches" : "discovery")}>EXPLORE DIRECTIONS ↗</button></div>
              )}
            </section>
          )}

          {view === "compare" && (
            <section className={styles.resultsView}>
              <div className={styles.viewHeading}><div><span className={styles.kicker}>05 / SIDE BY SIDE</span><h3>Make the differences clear.</h3><p>Compare two or three directions. Scroll horizontally on smaller screens.</p></div><button type="button" className={styles.subtleButton} onClick={() => setView("matches")}>ADD ANOTHER ↗</button></div>
              {comparedProperties.length >= 2 ? (
                <div className={styles.compareScroller} tabIndex={0} aria-label="Horizontally scrollable property comparison">
                  <div className={styles.compareGrid} style={{ gridTemplateColumns: `minmax(120px, .7fr) repeat(${comparedProperties.length}, minmax(230px, 1fr))` }}>
                    <div className={styles.compareLabels}><span>PROPERTY</span><span>PRICE</span><span>CONFIGURATION</span><span>AREA</span><span>LOCATION</span><span>AMENITIES</span><span>WHY IT MATCHES</span><span>ACTION</span></div>
                    {comparedProperties.map((property) => (
                      <article className={styles.compareColumn} key={property.id}>
                        <div className={styles.compareName}><span>{property.location}</span><h4>{property.name}</h4></div>
                        <strong>{formatPrice(property.price)}</strong>
                        <strong>{property.bedrooms}BHK · {property.propertyType}</strong>
                        <strong>{property.area.toLocaleString("en-IN")} sq ft</strong>
                        <strong>{property.location}, Hyderabad</strong>
                        <ul>{property.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
                        <ul>{(matches.find((match) => match.property.id === property.id)?.reasons ?? property.matchFactors).slice(0, 2).map((reason) => <li key={reason}>{reason}</li>)}</ul>
                        <div className={styles.compareActions}><button type="button" onClick={() => openDetail(property.id)}>DETAILS ↗</button><button type="button" onClick={() => toggleCompare(property.id)}>REMOVE</button></div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}><span>COMPARE / {comparedProperties.length} SELECTED</span><h4>Choose at least two directions.</h4><p>Add up to three properties from your matches or shortlist.</p><button type="button" onClick={() => setView("matches")}>EXPLORE MATCHES ↗</button></div>
              )}
              <p className={styles.prototypeFootnote}>All details shown here are illustrative prototype data, not verified listings.</p>
            </section>
          )}

          {view === "request" && (
            <section className={styles.requestView}>
              {!requestReceived ? (
                <>
                  <div className={styles.viewHeading}><div><span className={styles.kicker}>06 / {requestKind === "viewing" ? "VIEWING REQUEST" : "PROPERTY QUESTION"}</span><h3>{requestKind === "viewing" ? "A request, not a booking." : "Leave a note."}</h3><p>{requestProperty ? `${requestProperty.name} · ${requestProperty.location}` : "This interaction stays in this prototype."}</p></div></div>
                  <form className={styles.requestForm} onSubmit={handleRequestSubmit}>
                    <label><span>NAME</span><input name="name" autoComplete="name" required /></label>
                    <label><span>EMAIL</span><input name="email" type="email" autoComplete="email" required /></label>
                    <label><span>PHONE</span><input name="phone" type="tel" autoComplete="tel" pattern="[0-9+() -]{8,20}" title="Enter a phone number using 8 to 20 digits, spaces, or + ( ) -" required /></label>
                    <label><span>PREFERRED DATE</span><input name="date" type="date" min={getLocalDate()} required /></label>
                    <label><span>PREFERRED TIME</span><select name="time" defaultValue="" required><option value="" disabled>Select a time</option><option>Morning · 9am–12pm</option><option>Afternoon · 12pm–4pm</option><option>Evening · 4pm–7pm</option></select></label>
                    <p className={styles.formNotice}>Prototype interaction only. Your details are not sent or stored, and no external booking is made.</p>
                    <div className={styles.formActions}><button type="button" className={styles.backAction} onClick={() => setView(requestProperty ? "detail" : "matches")}>← BACK</button><button type="submit">SEND REQUEST ↗</button></div>
                  </form>
                </>
              ) : null}
            </section>
          )}

          {view === "success" && (
            <section className={styles.successView}>
              <span className={styles.kicker}>PROTOTYPE INTERACTION / COMPLETE</span>
              <h3>REQUEST<br /><em>RECEIVED.</em></h3>
              <p>Your request was confirmed in this prototype only. No external booking was made and no details were sent.</p>
              {requestProperty && <span className={styles.successProperty}>{requestProperty.name} · {requestProperty.location}</span>}
              <button type="button" onClick={() => requestProperty ? openDetail(requestProperty.id) : setView("matches")}>BACK TO {requestProperty ? "PROPERTY" : "MATCHES"} ↗</button>
            </section>
          )}

          {view !== "discovery" && view !== "request" && view !== "success" && (
            <div className={styles.quickCompare}>
              <span>{compareIds.length ? `${compareIds.length} SELECTED TO COMPARE` : "COMPARE DIRECTIONS"}</span>
              <button type="button" disabled={compareIds.length < 2} onClick={() => setView("compare")}>COMPARE {compareIds.length > 0 ? compareIds.length : ""} <b>↗</b></button>
            </div>
          )}
          {notice && <p className={styles.notice} role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></p>}
          {storageReady && <span className={styles.storageNote}>SHORTLIST SAVED ON THIS DEVICE</span>}
        </section>

        <section className={styles.prototypeScope}>
          <div><span className={styles.kicker}>WHAT IS FUNCTIONAL</span><h2>A working local<br /><em>product direction.</em></h2></div>
          <p>The conversation extracts common preferences, asks for missing details, ranks twelve fictional property concepts, and keeps saved choices in this browser. Property questions, comparisons and viewing-request confirmation work locally; no external AI, listing feed, booking service or backend is connected.</p>
        </section>
        <footer className={styles.footer}><Link href="/work">← BACK TO WORK</Link><span>DIGITALE MEDIA® / STUDIO DIRECTION</span><Link href="/start">START A PROJECT ↗</Link></footer>
      </main>
    </div>
  );
}
