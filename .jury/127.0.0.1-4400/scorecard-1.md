# 127.0.0.1: jury score
Estimate, not affiliated with Awwwards. Independent critic, from 2 pages on 2026-11-27.

**The idea, as the critic read it:** Save Eco Organic presents a green-living and organic-products company spanning personal care, agriculture, and farmer/partner services, with a sustainability story and testimonials.

**Critic overall: 6.4** (0.4 Design + 0.3 Usability + 0.2 Creativity + 0.1 Content)

**Jury estimate: about 7.5** (critic + 1.1, measured on two recent Sites of the Day)

**Band, from the estimate:** Site of the Day range (7.2 and up)

| Criterion | Score | Evidence |
|---|---:|---|
| Design (40%) | 7 | `home/d-90-transition-c.png` and `home/m-01-hero.png`: a consistent deep-green/lime palette, expressive serif headings, botanical motifs, and composed product photography. `home/m-02-scroll.png` shows polished category cards, though some image areas appear empty. |
| Usability (30%) | 6 | `home/m-01-hero.png` and `home/m-02-scroll.png` show a legible, vertically composed phone layout; report: no overflow, 60 mobile scroll FPS, but LCP is 9,604 ms and eight mobile targets are undersized. `home/report.json` records two primary no-hover-change targets. |
| Creativity (20%) | 6 | `home/d-90-transition-c.png` carries the botanical/organic visual language through an image-led hero, but `home/report.json` shows mostly familiar carousel, cards, and testimonial patterns; three primary controls are color-only and two have no hover response. |
| Content (10%) | 6 | `home/m-03-scroll.png` and `home/m-05-scroll.png` show company/certification information, team members, and specific farmer testimonials. The audit reports zero server-visible words, and most headline/CTA copy remains generic. |

| Developer | Score | Evidence |
|---|---:|---|
| Semantics/SEO | 4 | `audit.txt`: missing description, no server-rendered `<h1>` or `<main>`, no canonical; the 404 has no `<h1>`. `404/report.json`: empty title and no `<h1>`. |
| Animations/Transitions | 6 | `home/report.json`: 60 FPS and reduced-motion `moving:false`, but primary hover has two `noHoverChange` and three `colorOnly` targets. `home/d-90-transition-a.png`–`d-92-back.png` show the captured navigation/back sequence. |
| Accessibility | 4 | `home/report.json`: three serious axe violation groups (invalid ARIA, contrast, accessible-name mismatch), 14 hidden-text items under reduced motion, skip link not first; focus stops are visible. `home/m-01-hero.png`: small phone carousel targets. |
| WPO | 4 | `home/report.json`: mobile LCP 9,604 ms (description paragraph), settled 4,151 ms, CLS 0.041; 278 KB gzipped JS and ~315 KB total page. Desktop LCP is 1,748 ms. |
| Responsive | 6 | `home/report.json`: no horizontal overflow on desktop/mobile and phone sections are vertically composed, but eight mobile targets are under 24 px; see `home/m-01-hero.png` and `home/m-05-scroll.png`. |
| Markup/Meta-data | 4 | `audit.txt`: 3 FAILs and 7 WARNs, including absent meta description, OG/Twitter metadata, canonical, and thin server-visible content. `404/report.json`: empty title and no language attribute. |

## Fixes, most score first
1. [WPO/Usability] `home/report.json` mobile LCP: 9,604 ms on `p.saveeco-hero-slider__description`. Render the hero copy immediately; remove any entrance/slider delay from the LCP text and prioritize the hero image/resource.
2. [Semantics/SEO/Markup] `audit.txt`: no SSR `<h1>`/`<main>`, description, canonical, or social metadata. Emit semantic page content and unique title/description/OG metadata in the initial HTML.
3. [Accessibility/Responsive] `home/report.json` axe/targets and `home/m-01-hero.png`: correct prohibited ARIA, raise contrast to WCAG AA, align button accessible names with visible labels, enlarge 8 undersized mobile controls, and add a first-position skip link. Also expose the 14 reduced-motion-hidden text items.
4. [Design/Animations] `home/report.json` `hover.noHoverChange`/`colorOnly`: add a visible non-color response (e.g. lift, underline, or icon movement) to the hero selectors and FAQ control (`h-02`–`h-04`); give testimonial controls more than a color swap (`h-05`–`h-07`).
5. [Semantics/Accessibility/Design] `404/report.json` and `audit.txt`: the 404 has no title, language, or heading. Provide a branded 404 with a clear `<h1>`, home link, correct document metadata, and a real 404 response.

## Measured
- Mobile LCP: 9,604 ms
- Desktop LCP: 1,748 ms
- Mobile CLS: 0.041
- Desktop load: 314 ms
- Mobile load: 6,653 ms
- Desktop/mobile scroll FPS: 60
- Home hero settled: 4,151 ms
- Serious axe violations: 3 groups on home; 2 on 404
- Overflow: false on desktop/mobile
- `noHoverChange`: 2
- `colorOnly`: 3
- Hidden text under reduced motion: 14
- Moving under reduced motion: false
- Audit: 3 FAIL, 7 WARN
- Largest page: approximately 315 KB; JS 278 KB gzipped
- Loader: none

Not scored: anything stills cannot show (how motion feels, sound).
