---
name: "Журжень Relax"
description: "Warm private evening, cream stationery and editorial portraiture."
colors:
  ink: "#332823"
  dark-surface: "#29211e"
  cream: "#f5efe5"
  secondary-paper: "#eae0d2"
  muted: "#766559"
  line: "#d6c9b9"
  dark-line: "#514339"
  gold: "#d7b78a"
  gold-hover: "#e8cda8"
  focus: "#ac7944"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(48px, 5.1vw, 74px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-.035em"
  heading:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(42px, 4.6vw, 66px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.85
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 500
rounded:
  square: "0"
  hero-arch: "230px 230px 0 0"
spacing:
  compact: "16px"
  gutter: "24px"
  medium: "32px"
  section-mobile: "64px"
  section-desktop: "100px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.dark-surface}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "19px 25px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  mood-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    padding: "19px"
  navigation:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.cream}"
    height: "96px"
  plan:
    backgroundColor: "{colors.secondary-paper}"
    padding: "30px 23px"
    rounded: "{rounded.square}"
---
# Журжень Relax — visual system

Warm private evening, cream stationery and editorial portraiture. Product mode: Persuade. The supplied boutique SPA direction is binding; user delegated composition.

## Tokens
- Ink / dark surface: #29211e; text: #332823.
- Paper: #f5efe5; secondary paper: #eae0d2.
- Gold: #d7b78a; secondary text on paper: #766559.
- Rules: #d6c9b9; dark rules: #514339.
- Display: locally hosted Cormorant Garamond, regular and italic.
- Body: locally hosted Manrope, 400 and 500.
- Space: 8, 16, 24, 32, 48, 64, 100 pixels.

## Composition
Portrait-led split hero; four mood buttons update description and portrait. Pricing is a continuous four-column menu, becoming two columns and then one. Secret menu uses native details. Bar is a compact six-item list. Editorial biography uses third original portrait. Quiet consent rules precede telephone CTA.

## Interaction
Native anchors, keyboard-focus outlines, semantic button pressed state, live selection summary, native disclosures, Escape closes mobile navigation. Reduced motion disables scroll and entrance effects. Content remains visible before intersection observation.
