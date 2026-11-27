# 127.0.0.1-4400: jury score
Estimate, not affiliated with Awwwards. Independent critic (self-score), from 2 pages on 2026-11-27.

**The idea, as the critic read it:** Save Eco is an organic-input and sustainable-agriculture brand selling everyday products, recruiting partners, sharing certificates, and building trust through team and customer stories.

**Critic overall: 6.6** (0.4 Design + 0.3 Usability + 0.2 Creativity + 0.1 Content, on the critic's strict scale)

**Jury estimate: about 7.7** (critic + 1.1, measured on two recent Sites of the Day)

**Band, from the estimate:** recent Site of the Day range (6.5 to 7.1 is HM; 7.2 and up is SOTD range)

| Criterion | Score | Evidence |
|---|---|---|
| Design (40%) | 7.0 | `d-01-hero.png` and `d-02-scroll.png` show a clear deep-green, cream, serif/sans typographic system and deliberate botanical compositions; `d-03-scroll.png` onward keep the same palette and rounded editorial card language. The system is polished, though many sections rely on familiar cards/grids rather than a fully distinctive visual signature. |
| Usability (30%) | 6.0 | `m-01-hero.png` and `m-02-scroll.png` through `m-06-scroll.png` show composed, unclipped phone layouts with no overflow, while `summary.json` reports no horizontal overflow and 60/59 mobile/desktop FPS. This is held down by mobile LCP of 8.820 s (`summary.json`, `home/report.json`), 3 primary targets with no hover change (`h-02`–`h-04`), and 2 small targets. |
| Creativity (20%) | 6.5 | `d-01-hero.png` carries subject-specific botanical and reusable-bag imagery, and the sustainability/partner system is reinforced in `d-04-scroll.png` and `d-05-scroll.png`. It becomes a coherent organic brand language, but the testaments, certificate cards, partner cards, FAQ, and conventional hero slider are largely familiar patterns. |
| Content (10%) | 7.0 | `d-05-scroll.png`, `d-06-scroll.png`, `d-07-scroll.png`, and `m-04-scroll.png`–`m-06-scroll.png` contain specific product categories, certificates, team profiles, sustainability commitments, testimonials, and contact details. The story is real and integrated rather than placeholder-like. |

| Developer | Score | Evidence |
|---|---|---|
| Semantics/SEO | 6.0 | Home report has a client-visible H1 and title; `audit.txt` reports only 1 FAIL: missing `<main>`. The 404 page has no title, no language, and no H1 (`404/report.json`, `404/d-01-hero.png`); audit therefore reports 404 metadata/heading weakness. |
| Animations/Transitions | 6.0 | 59–60 FPS is healthy and reduced motion stops movement (`summary.json`, `r-01-hero.png`, `r-02-mid.png`). `home/report.json` lists 3 of 7 primary targets in `noHoverChange` (`h-02`, `h-03`, `h-04`), and `d-90-*`/`d-91-*` do not establish a more distinctive interaction signature. |
| Accessibility | 6.5 | Home has a first skip link, 0 invisible/visible-focus failures, 0 serious axe violations, and no movement with reduced motion (`home/report.json`); however `summary.json` reports 14 hidden-text findings under reduced motion and 2 small targets. The 404 has 2 serious axe violations. |
| WPO | 6.0 | Desktop LCP is 1.804 s and CLS is 0 (`home/report.json`), but throttled mobile LCP is 8.820 s and load is 6.527 s (`summary.json`; `audit.txt` JS 264 KB gz / page 301 KB). Mobile FPS is 60 and there is no loader. |
| Responsive | 7.0 | No overflow or offender is reported on home or 404, and `m-01-hero.png`–`m-06-scroll.png` retain hierarchy and spacing at 390 px. The only mobile defects are 2 350×20 px small targets and occasional very long 14-line product/team sections. |
| Markup/Meta-data | 5.5 | Home has a title, H1 and basic document structure after rendering; the 404 has neither title nor `lang` and returns weak document metadata (`404/report.json`). Audit findings also show missing `<main>` on `/`, while the card evidence does not establish complete OG/Twitter or favicon/meta coverage. |

## Fixes, most score first
1. **[Usability/WPO] `home/report.json` / `m-01-hero.png`:** Optimize the hero and throttled mobile paint: prioritized image delivery, smaller responsive assets, font/loading discipline, and fewer initial DOM/background effects would bring mobile LCP below 2.5 s instead of 8.820 s.
2. **[Usability/Animations] `h-02`–`h-04` and `home/report.json`:** The three banner/FAQ primary targets have `noHoverChange`. Give them visible position, surface, and state motion (not a color swap), while preserving native focus and reduced-motion behavior.
3. **[Semantics/SEO/Markup] `404/report.json` and `404/d-01-hero.png`:** Add a real branded 404 H1, document title, `lang`, route metadata, and a clear way back instead of the bare plain-text “Not Found” page.
4. **[Markup/Accessibility] `/` `audit.txt` + `home/report.json`:** Add a single `<main>` landmark and review the 139 contrast items plus 14 reduced-motion hidden-text findings; remove focus-breaking visual hiding while retaining content.
5. **[Responsive] `home/report.json`:** Widen the phone-number and email targets beyond the reported 20 px height and preserve at least 24 px touch targets.
6. **[Content/Creativity] `d-04-scroll.png`–`d-07-scroll.png`:** Sharpen the partner, certificate, and sustainability sections with concise outcomes and a more distinctive hierarchy rather than repeated small cards.

## Measured
- Mobile LCP: 8.820 s; CLS: 0.047
- Desktop LCP: 1.804 s; CLS: 0
- Loader: none
- Desktop/mobile scroll FPS: 59 / 60
- Desktop/mobile settled: 4201 ms / not settled at cap
- Serious axe violations: home 0, 404 2
- Overflow: none on home or 404
- Small targets: home 2
- `noHoverChange`: 3
- `colorOnly`: 0
- Hidden text under reduced motion: home 14, 404 0
- Moving under reduced motion: false
- Audit: 1 FAIL, 2 WARN across 2 crawled pages
- Heaviest page: `/`, approximately 301 KB; JS 264 KB gz, CSS 36 KB gz

Not scored: still-only limitations include how motion feels and sound.
