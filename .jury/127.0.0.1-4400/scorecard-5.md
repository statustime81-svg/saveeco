# Save Eco Organic: jury score
Estimate, not affiliated with Awwwards. Independent critic, from 2 page types on 2026-11-27.

**The idea, as the critic read it:** A polished organic and agricultural-products company presents its products, mission and customer care while inviting visitors to explore its catalog and contact the team.

**Critic overall: 6.5** (0.4 Design + 0.3 Usability + 0.2 Creativity + 0.1 Content)

**Jury estimate: about 7.6** (critic + 1.1)

| Criterion | Score | Evidence |
|---|---:|---|
| Design (40%) | 7 | `d-01-hero.png` and `d-02-scroll.png` show a clear green/cream typographic system and purposeful product-card framing; `d-03-scroll.png` through `d-07-scroll.png` maintain consistent hierarchy, but the compositions are polished rather than singular. |
| Usability (30%) | 6 | `summary.json` shows no overflow and 59–60 desktop/mobile FPS, but `mobile.vitals.lcpMs` is 10,136 ms, 8 targets are only 20 px tall, and `hover.noHoverChange` names 4 of 7 primary targets. |
| Creativity (20%) | 6 | The hero slider, circular crop, product cards and testimonials use familiar corporate/organic tropes; no screenshot demonstrates a subject-specific interaction or signature concept beyond normal layout and links. |
| Content (10%) | 7 | `d-03-scroll.png` onward provide specific organic-agriculture mission and product copy, and the testimonial/form sections add substance rather than placeholder text; `m-*` screenshots preserve the story at phone width. |

| Developer | Score | Evidence |
|---|---:|---|
| Semantics/SEO | 4 | Audit has `FAIL /: 0 <h1> elements`, `FAIL /: no <main> landmark`, and broken OG image; 404 report has no `<h1>`, title or lang, and audit warns that it has no `<h1>`. |
| Animations/Transitions | 6 | Desktop/mobile FPS are 59/60 and `d-90-*`/`d-91-after-nav.png` show completed navigation frames, but `hover.noHoverChange` contains h-02, h-03, h-04 and h-06, and h-02/h-03/h-04/h-06 have no rest-to-hover change. |
| Accessibility | 5 | `k-01-focus.png` through `k-04-focus.png` show visible focus and the report records `skipLinkFirst: true` and zero invisible focus stops, but `a11y.serious` is 3 with aria-prohibited-attr, contrast and label/name issues; `reduced.hiddenText` is 14. |
| WPO | 5 | `mobile.vitals.lcpMs` is 10,136 ms and throttled load is 6,802 ms, against the 2.5 s target; CLS is 0.041 and FPS is 60, while the page is about 316 KB with 278 KB gzipped JS. |
| Responsive | 7 | `summary.json` reports `overflow: false` on both pages and no offenders, and `m-01-hero.png` through `m-06-scroll.png` remain composed; however 8 `smallTargets` are only 20 px tall. |
| Markup/Meta-data | 5 | Audit reports the OG image fails to load and the 404 lacks title/lang metadata; the home title is present and the mobile viewport remains intact, but social metadata is incomplete and 404 markup is broken. |

## Fixes, most score first

1. **[Usability/WPO] `mobile.vitals.lcpMs`:** 10,136 ms is a severe first-read delay. Cut 278 KB gzipped JS, defer non-critical scripts and imagery, pre-size media, and serve the hero text early so mobile LCP is under 2.5 s.
2. **[Usability/Design/Animations] `hover.noHoverChange`:** h-02, h-03, h-04 and h-06 give primary controls no hover response. Add one restrained, consistent motion treatment to each—border/fill or transform—rather than text-only or no change.
3. **[Accessibility] `a11y.serious`:** 3 serious axe categories cover prohibited ARIA, 7 contrast failures and 9 label/name mismatches. Remove ARIA where it conflicts with native semantics, raise contrast, and make visible button names match accessible names.
4. **[Semantics/SEO] audit FAILs:** Add exactly one real `<h1>` and one `<main>`, and give the 404 a title, `lang`, a brand-specific `<h1>` and a way back.
5. **[Markup/Meta-data] audit OG fail:** Replace `saveeco-logo.png` with a valid 1200×630 social image and verify it loads; this will remove the metadata FAIL.
6. **[Responsive] `smallTargets`:** 8 home targets are 20 px tall. Increase touch targets to at least 24 px, or 44 px for primary phone controls, without breaking the phone composition.
7. **[Reduced-motion content] `reduced.hiddenText`:** 14 elements are hidden only for reduced-motion checks. Verify and expose all essential copy without animation dependency.

## Measured

- Mobile LCP: 10,136 ms; CLS: 0.041
- Throttled mobile load: 6,802 ms; no loader
- Desktop/mobile FPS: 59/60; desktop settled: 4,053 ms
- Serious axe violations: 3 categories; home contrast needs review: 139
- Overflow: none; small targets: 8; 0 invisible/visible focus failures
- `hiddenTextReduced`: 14; `movingReduced`: false
- `noHoverChange`: 4; `colorOnly`: 0; idle motion: true
- Audit: 3 FAIL, 2 WARN
- Page weight/heaviness: 316 KB; JS 278 KB gz; CSS 37 KB gz

## Change from scorecard-1
- Critic overall: 6.4 → 6.5
- Accessibility: 4 → 5
- WPO: 4 → 5
- Responsive: 6 → 7
- Markup/Meta-data: 4 → 5

