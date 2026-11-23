# Design

Living record of the app's visual design. Updated after every design fix (see Changelog).

## Direction

- **Theme:** charcoal background with a "space" blue accent. Blue glow at the top of the page, a few faint stars.
- **Feel:** editorial / document-like. Quiet, left-aligned, restrained. Not a typical SaaS landing page.
- **Colour meaning:** red / yellow / green are reserved for risk levels (High / Medium / Low). Never use them decoratively.

## Tokens

Defined in `client/src/index.css` under `@theme`. Change values there, not in components.

| Token | Value | Use |
|---|---|---|
| `charcoal-900` | `#1e2023` | Page background |
| `charcoal-800` | `#2a2d31` | Hover surfaces |
| `charcoal-700` | `#3b3e43` | Hairline borders |
| `charcoal-950` | `#151618` | Deepest shade (unused so far) |
| `paper` | `#ebe8e1` | Primary text on charcoal |
| `muted` | `#a3a099` | Secondary text |
| `space-300` | `#8fb4ff` | Accent text, link hover |
| `space-400` | `#5a8cf0` | Button hover, numerals |
| `space-500` | `#3b6fe0` | Primary buttons, selected filter |
| `space-900` | `#0f1a3a` | Reserved |

Typography: headings use the `font-serif` stack (Iowan Old Style, Palatino, Georgia). Body uses the system sans. No external fonts.

## Rules

- Sections are separated by thin `charcoal-700` rules, not by cards or shadows.
- Left-aligned layouts, max width `max-w-6xl`, side padding `px-5`.
- Buttons: all use `rounded-lg` (8px radius). Primary button is `space-500` with white text. Text-only links are not buttons and stay unrounded.
- Print output is plain white: `@media print` in `index.css` swaps the colour tokens (paper, muted, borders, risk colours) to dark-on-white values. Use the tokens, not hard-coded colours, so printing keeps working.
- Risk colours on dark: `red-400` High, `yellow-400` Medium, `green-400` Low. Shown as small squares and coloured text, never as filled pills.
- Responsive: every layout must work at phone width.

## Languages (English / Burmese)

- The upload page has an English / မြန်မာ toggle; the results page has the same toggle. The first analysis comes back in the chosen language; the other is translated on first use via `/api/translate` and cached.
- Interface text lives in `client/src/utils/i18n.ts` (`LABELS`). Add every new results-page string there, in both languages.
- Quoted clause text always stays in the contract's original language.
- The English "This tool does not provide legal advice" notice always shows; the Burmese version is added under it when Burmese is selected.
- Burmese script needs extra line height (`[lang='my']` in `index.css`, 1.9) and no letter-spacing. Set `lang` on any element that shows Burmese. The big overall-risk word is smaller in Burmese so tall glyphs don't collide with neighbouring labels.

## Avoid (the user has rejected these)

- Fake "example output" result cards / mock-ups in the hero. Use a real screenshot later if needed.
- Centred everything, soft shadowed cards, white cards on a dark page, pill badges, coloured left-border cards, bold-label-then-paragraph stacks, emoji icons.
- All-slate, default-Tailwind look.

## Current state

- **Landing page** (`client/src/components/landing/`): header, hero (headline + paragraph + button), How it works (01-03), What you get (ruled list), footer with privacy note and disclaimer.
- **Analyzer upload page** (`pages/AnalyzerPage.tsx`): same header as the landing page; two columns on desktop (intro + three ruled notes on the left, large dark drop area with a blue "Choose a file" button on the right), stacked on mobile. The loading card is dark to match.
- **Results page** (`components/ResultsPage.tsx` and friends): a dark ruled report, no cards. Header with a large serif overall-risk word (coloured by level) and counts; summary as serif text beside a small label; filter chips; each clause is a row with number, serif title, risk label and Copy on the left, and the quote (coloured left rule) plus "Why it matters" / "Suggestion" in two columns on the right. Max width `max-w-5xl`, left column 200px.
- **Open question:** whether the "How it works" and "What you get" sections still feel too templated.

## Changelog

- **Landing page, first version:** light slate theme with centred hero, shadowed cards and an example card. Rejected: "looks so AI".
- **Charcoal restyle:** charcoal theme, serif headings, left-aligned layout, hairline rules instead of cards. Analyzer shell recoloured to match; inner cards fixed for contrast.
- **Space blue:** added blue glow, faint starfield and blue accent for buttons, headline emphasis, step numerals and the selected filter.
- **Hero example card removed:** the mock "Termination / High risk" card was rejected as looking AI-generated. Hero is now typographic only.
- **Button radius:** all buttons (landing CTAs, Export, Analyze another, Copy, filter chips) now use `rounded-lg`. Filter chips changed from fully round pills to `rounded-lg`.
- **Image uploads:** PNG and JPG are accepted alongside PDF and DOCX. Copy updated in the hero, upload box, How it works and the privacy note (images are sent to Gemini). No visual changes.
- **Upload page redesign:** the old page was a lone white box under a centred title ("so simple and nothing"). Replaced with a landing-style header, left-aligned intro with ruled notes (scanned PDFs, size limit, not stored), and a dark dashed drop area with an explicit button. Loading card restyled dark. Drop area uses `rounded-xl`, buttons `rounded-lg`.
- **Results page redesign:** the old page (white summary and clause cards with red left borders and pill badges) was rejected as looking AI-generated. Replaced with a dark ruled report: big serif overall risk, plain-text summary, clause rows in a two-column layout. Removed `SummaryCard`, `ClauseCard` and `RiskBadge`; added `ReportHeader`, `SummarySection`, `ClauseRow`, `RiskLabel`. Print now works by swapping colour tokens.
- **Languages:** added English / Burmese choice (upload page and results toggle), localized labels, Burmese typography fixes (line height, no tracking, smaller overall-risk word, `lang` on toggle text).
