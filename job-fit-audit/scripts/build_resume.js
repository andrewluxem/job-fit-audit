#!/usr/bin/env node
// job-fit-audit resume builder: turns a resume.json into a clean, ATS-friendly .docx.
//
// Usage:  node build_resume.js <resume.json> [output.docx]
// Needs:  the `docx` npm package (preinstalled in Claude sandboxes; locally: npm install docx)
//
// The JSON is the resume. Tailoring means editing a copy of the JSON (headline, summary,
// order of results/skills/bullets), never inventing facts. See resume.example.json for the shape.
// After building, convert to PDF and check the page count before sending.

const fs = require("fs");
const path = require("path");

let docx;
try {
  docx = require("docx");
} catch (e) {
  console.error("Missing dependency: run `npm install docx` (in this folder or globally) and retry.");
  process.exit(1);
}
const {
  Document, Packer, Paragraph, TextRun, Tab, TabStopType, AlignmentType,
  LevelFormat, BorderStyle, Footer, PageNumber,
} = docx;

const [, , inPath, outArg] = process.argv;
if (!inPath) {
  console.error("Usage: node build_resume.js <resume.json> [output.docx]");
  process.exit(1);
}
const R = JSON.parse(fs.readFileSync(inPath, "utf8"));

// ---------- style tokens (overridable via R.style) ----------
const S = R.style || {};
const INK = S.ink || "1A1A1A";
const ACCENT = S.accent || "1E4E79";
const MUTED = S.muted || "555555";
const RULE = S.rule || "AAB4BE";
const FONT = S.font || "Calibri";
const BASE = S.baseSize || 20; // half-points: 20 = 10pt
const MARGIN = S.marginDxa || 1008; // 0.7"
const CONTENT_W = 12240 - 2 * MARGIN;
// Characters per line for packed strips (results, skills). Empirical for Calibri 10pt
// at 0.7" margins; lower these if a strip line wraps.
const RESULTS_CHARS = S.resultsLineChars || 124;
const SKILLS_CHARS = S.skillsLineChars || 114;

const t = (text, o = {}) => new TextRun({ text, font: FONT, color: INK, size: BASE, ...o });

// Inline **bold** support in any text field.
function runs(text, o = {}) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((p) =>
    p.startsWith("**") && p.endsWith("**") ? t(p.slice(2, -2), { ...o, bold: true }) : t(p, o)
  );
}

// ---------- blocks ----------
function nameHeader() {
  const name = R.credentials ? `${R.name}, ${R.credentials}` : R.name;
  const out = [
    new Paragraph({
      spacing: { after: 40 },
      children: [t(name.toUpperCase(), { bold: true, size: BASE * 2, characterSpacing: 20 })],
    }),
  ];
  const lines = R.contactLines || [];
  lines.forEach((ln, i) => {
    out.push(
      new Paragraph({
        spacing: { after: i === lines.length - 1 ? 60 : 20 },
        children: [t((Array.isArray(ln) ? ln : [ln]).join("  ·  "), { size: BASE - 1, color: MUTED })],
      })
    );
  });
  return out;
}

function headline(text) {
  return new Paragraph({
    spacing: { after: 100 },
    border: { bottom: { color: ACCENT, style: BorderStyle.SINGLE, size: 8, space: 4 } },
    children: [t(text.toUpperCase(), { bold: true, size: BASE + 4, color: ACCENT, characterSpacing: 22 })],
  });
}

function sectionHeader(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 180, after: 80 },
    border: { bottom: { color: RULE, style: BorderStyle.SINGLE, size: 4, space: 3 } },
    children: [t(text.toUpperCase(), { bold: true, size: BASE + 1, color: ACCENT, characterSpacing: 18 })],
  });
}

function para(text, after = 60, o = {}) {
  return new Paragraph({ spacing: { after }, children: runs(text, o) });
}

function bullet(text, after = 40) {
  return new Paragraph({ numbering: { reference: "dash", level: 0 }, spacing: { after }, children: runs(text) });
}

// Pack short items into lines so no line breaks mid-item.
const SEP = "   ·   ";
function packLines(items, maxChars) {
  const lines = [];
  let cur = [];
  for (const it of items) {
    if (cur.length && [...cur, it].join(SEP).length > maxChars) {
      lines.push(cur.join(SEP));
      cur = [it];
    } else cur.push(it);
  }
  if (cur.length) lines.push(cur.join(SEP));
  return lines;
}

function strip(title, items, maxChars, size) {
  if (!items || !items.length) return [];
  const lines = packLines(items, maxChars);
  return [
    sectionHeader(title),
    ...lines.map((ln, i) => para(ln, i === lines.length - 1 ? 40 : 20, { size })),
  ];
}

function companyLine(company, loc, dates) {
  const children = [t(company.toUpperCase(), { bold: true, size: BASE + 1 })];
  if (loc) children.push(t("  —  " + loc, { color: MUTED }));
  if (dates) {
    children.push(new TextRun({ font: FONT, size: BASE, children: [new Tab()] }));
    children.push(t(dates, { bold: true }));
  }
  return new Paragraph({
    keepNext: true,
    spacing: { before: 120, after: 10 },
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
    children,
  });
}

function roleLine(title, desc, dates) {
  const children = [t(title, { bold: true, italics: true, color: ACCENT })];
  if (desc) children.push(t("   |   " + desc, { italics: true, size: BASE - 1, color: MUTED }));
  if (dates) {
    children.push(new TextRun({ font: FONT, size: BASE, children: [new Tab()] }));
    children.push(t(dates, { italics: true, size: BASE - 1, color: MUTED }));
  }
  return new Paragraph({
    keepNext: true,
    spacing: { after: 50 },
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
    children,
  });
}

function experience(items) {
  if (!items || !items.length) return [];
  const out = [sectionHeader(R.experienceTitle || "Professional Experience")];
  for (const job of items) {
    out.push(companyLine(job.company, job.location, job.dates));
    const roles = job.roles || [{ title: job.title, descriptor: job.descriptor, bullets: job.bullets }];
    for (const role of roles) {
      if (role.title) out.push(roleLine(role.title, role.descriptor, role.dates));
      (role.bullets || []).forEach((b) => out.push(bullet(b)));
    }
  }
  return out;
}

// Generic section: items are strings, or {label, value} pairs rendered "Label:  value".
function section(sec) {
  if (!sec || !sec.items || !sec.items.length) return [];
  const asBullets = sec.style !== "plain";
  return [
    sectionHeader(sec.title),
    ...sec.items.map((it) => {
      const text = typeof it === "string" ? it : `**${it.label}:**  ${it.value}`;
      return asBullets ? bullet(text) : para(text, 30);
    }),
  ];
}

// ---------- assemble ----------
function footer() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ font: FONT, size: BASE - 2, color: MUTED, children: [PageNumber.CURRENT] }),
          new TextRun({ font: FONT, size: BASE - 2, color: MUTED, text: "  |  " + R.name }),
        ],
      }),
    ],
  });
}

const blocks = {
  header: () => nameHeader(),
  headline: () => (R.headline ? [headline(R.headline)] : []),
  summary: () => (R.summary ? [para(R.summary, 60)] : []),
  results: () => strip(R.resultsTitle || "Selected Results", R.selectedResults, RESULTS_CHARS, BASE - 1),
  skills: () => strip(R.skillsTitle || "Core Expertise", R.skills, SKILLS_CHARS, BASE),
  experience: () => experience(R.experience),
};
// Additional sections (Education, Tools, Awards, Projects...) are referenced by their key.
for (const [key, sec] of Object.entries(R.sections || {})) blocks[key] = () => section(sec);

const order = R.order || ["header", "headline", "summary", "results", "skills", "experience", ...Object.keys(R.sections || {})];
const children = order.flatMap((k) => {
  if (!blocks[k]) {
    console.warn(`warning: unknown block "${k}" in order; skipped`);
    return [];
  }
  return blocks[k]();
});

const doc = new Document({
  creator: R.name,
  lastModifiedBy: R.name,
  title: `${R.name} - Resume`,
  description: "",
  numbering: {
    config: [{
      reference: "dash",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "–",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 310, hanging: 160 } } },
      }],
    }],
  },
  styles: { default: { document: { run: { font: FONT, size: BASE, color: INK } } } },
  sections: [{
    footers: { default: footer() },
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 864, bottom: 864, left: MARGIN, right: MARGIN } },
    },
    children,
  }],
});

const out = outArg || path.join(path.dirname(inPath), `${R.name} - Resume.docx`);
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
});
