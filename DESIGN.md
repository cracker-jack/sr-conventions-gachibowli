# Design System

<!-- impeccable:design-schema 1 -->

## Direction

**Celebration in Rehearsal** treats the venue website like an event-production cue book. The visitor moves from opening scene to occasion selection, room details, event sequence, location, and enquiry. The system avoids a generic luxury-venue card grid in favor of cinematic scenes, ruled timelines, and deliberate stage cues.

## Color

- `#15120f` — primary ink-black stage ground
- `#25201a` — secondary dark scene ground
- `#f0eadc` — warm paper
- `#fffaf0` — bright paper and primary light text
- `#f2a900` — marigold action and cue color
- `#cf4b32` — coral event-sequence field

Marigold owns primary actions and spatial cues. Coral is reserved for the event journey. Warm paper sections create pacing between dark cinematic scenes.

## Typography

- **Barlow Condensed**: display headlines, event labels, navigation, and production-style annotations.
- **Manrope**: body copy, practical information, and form controls.

Display copy is uppercase, tightly set, and composed in short stage-like lines. Body copy stays compact and readable with a restrained measure.

## Layout

- Full-bleed imagery carries the emotional argument.
- Large asymmetric two-column compositions pair an expressive statement with practical copy.
- Thin rules, cue rails, scene labels, and timelines establish the event-production grammar.
- Mobile layouts stack without shrinking the visual hierarchy; event selectors become a vertical running order.
- Conversion remains reachable through the hero action, navigation, enquiry section, and a post-hero mobile action.

## Components

- **Brand mark:** circular `SR` monogram paired with a condensed wordmark.
- **Primary action:** solid marigold or ink rectangular control with an arrow cue.
- **Occasion selector:** ruled tab sequence with the active scene filled in marigold.
- **Scene:** full-bleed image with scene number, statement, supporting copy, and transparent placeholder disclosure.
- **Map panel:** abstract street-grid illustration with a tactile location pin.
- **Enquiry form:** underlined fields leading to a WhatsApp continuation action.

## Motion

- The opening uses one authored marigold curtain reveal and a subtle image settle.
- Occasion changes blur and refocus the scene rather than using repeated entrance animations.
- Hover motion is limited to meaningful depth, image inspection, and directional actions.
- All motion is disabled through `prefers-reduced-motion`.

## Accessibility

Maintain WCAG AA contrast, visible keyboard focus, semantic landmarks, one page-level heading, explicit form labels, descriptive image alternatives, at least 44px primary touch targets, and no horizontal overflow at mobile widths.

## Content Integrity

The demo ribbon, image captions, form note, README, and source comments identify all placeholder content. Do not remove these disclosures until the venue supplies and approves real photography, contact details, and business claims.
