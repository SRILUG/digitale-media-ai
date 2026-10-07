const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const buildDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "property-conversation-test-"));
const sourceDirectory = path.resolve("lib/property-intelligence");
const compilerPath = path.join(process.cwd(), "node_modules", "typescript", "bin", "tsc");
const configPath = path.join(buildDirectory, "tsconfig.json");
fs.writeFileSync(configPath, JSON.stringify({
  compilerOptions: {
    target: "ES2022",
    module: "Node16",
    moduleResolution: "Node16",
    outDir: path.join(buildDirectory, "out"),
    rootDir: sourceDirectory,
    strict: true,
    skipLibCheck: true,
  },
  files: [path.join(sourceDirectory, "conversation.ts")],
}));
const compile = spawnSync(process.execPath, [
  compilerPath,
  "--project",
  configPath,
], { encoding: "utf8" });

if (compile.status !== 0) {
  fs.rmSync(buildDirectory, { recursive: true, force: true });
  throw new Error(compile.stderr || compile.stdout || "Could not compile conversation modules for tests.");
}

process.on("exit", () => fs.rmSync(buildDirectory, { recursive: true, force: true }));

const { advanceDiscovery, createDiscoveryState, nextDiscoveryQuestion } = require(
  path.join(buildDirectory, "out", "conversation.js"),
);

function emptyPreferences() {
  return { amenities: [] };
}

function respond(text, preferences = emptyPreferences(), state = createDiscoveryState()) {
  return advanceDiscovery(text, preferences, state);
}

test("extracts all supported first-message details before choosing matches", () => {
  const turn = respond(
    "I want a 3BHK villa in Hyderabad under ₹1.5 crore as an investment, close to metro, within 3 months.",
  );

  assert.deepEqual(turn.preferences, {
    location: "Hyderabad",
    bedrooms: 3,
    budget: 15_000_000,
    purpose: "investment",
    propertyType: "villa",
    amenities: ["metro"],
    commute: "metro",
    timeline: "within 3 months",
  });
  assert.equal(turn.state.stage, "matches");
  assert.equal(turn.reply.includes("?"), false);
  assert.equal(nextDiscoveryQuestion(turn.preferences, turn.state), undefined);
});

test("asks only for missing information after a partial first message", () => {
  const turn = respond("I need a 3BHK for my family.");

  assert.equal(turn.preferences.bedrooms, 3);
  assert.equal(turn.preferences.purpose, "living");
  assert.equal(turn.state.pendingField, "location");
  assert.match(turn.reply, /part of Hyderabad/);
});

test("extracts multiple new preferences from one answer before selecting a question", () => {
  const first = respond("I want a home for my family.");
  assert.equal(first.state.pendingField, "location");

  const second = respond(
    "Gachibowli, 3BHK, under ₹1.5 crore",
    first.preferences,
    first.state,
  );

  assert.equal(second.preferences.location, "Gachibowli");
  assert.equal(second.preferences.bedrooms, 3);
  assert.equal(second.preferences.budget, 15_000_000);
  assert.equal(second.state.stage, "matches");
});

test("clarifies an unanswered field once and does not repeat it", () => {
  const first = respond("I'm looking for a property.");
  assert.equal(first.state.pendingField, "purpose");

  const clarification = respond("Something comfortable.", first.preferences, first.state);
  assert.equal(clarification.state.pendingField, "purpose");
  assert.deepEqual(clarification.state.clarifiedFields, ["purpose"]);

  const next = respond("I like modern homes.", clarification.preferences, clarification.state);
  assert.equal(next.state.pendingField, "location");
  assert.equal(next.state.askedFields.filter((field) => field === "purpose").length, 1);
  assert.doesNotMatch(next.reply, /live in the home|investment/i);
});

test("does not re-ask budget with different wording after clarification", () => {
  const first = respond("A home for my family in Gachibowli.");
  assert.equal(first.state.pendingField, "budget");

  const clarification = respond("I haven't decided yet.", first.preferences, first.state);
  assert.match(clarification.reply, /approximate limit/);
  assert.deepEqual(clarification.state.clarifiedFields, ["budget"]);

  const next = respond("Still working it out.", clarification.preferences, clarification.state);
  assert.equal(next.state.pendingField, "bedrooms");
  assert.doesNotMatch(next.reply, /budget|spend|limit/i);
  assert.equal(next.state.askedFields.filter((field) => field === "budget").length, 1);
});

test("progresses through missing fields in deterministic order and stops at meaningful matches", () => {
  const purpose = respond("I'm looking for a property.");
  const location = respond("For an investment.", purpose.preferences, purpose.state);
  const budget = respond("Gachibowli.", location.preferences, location.state);
  const matches = respond("₹1.5 crore.", budget.preferences, budget.state);

  assert.deepEqual(
    [purpose.state.pendingField, location.state.pendingField, budget.state.pendingField],
    ["purpose", "location", "budget"],
  );
  assert.equal(matches.preferences.location, "Gachibowli");
  assert.equal(matches.preferences.budget, 15_000_000);
  assert.equal(matches.state.stage, "matches");
  assert.equal(nextDiscoveryQuestion(matches.preferences, matches.state), undefined);
});

test("uses the pending field to interpret concise bedroom answers", () => {
  const preferences = { amenities: [], location: "Gachibowli", purpose: "living" };
  const state = {
    ...createDiscoveryState(),
    askedFields: ["purpose", "location", "bedrooms"],
    pendingField: "bedrooms",
    pendingQuestion: "What configuration are you looking for?",
  };

  const turn = respond("3", preferences, state);
  assert.equal(turn.preferences.bedrooms, 3);
  assert.equal(turn.state.stage, "matches");
});
