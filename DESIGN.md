# Shoppy — Design Brief

**Tone & Purpose:** Clean, product-focused e-commerce interface. Minimal brutalism with commercial clarity. No decoration, high contrast, efficient information hierarchy.

**Aesthetic:** Contemporary shopping experience. Products are the star; UI recedes. Bright, trustworthy, functional.

## Palette

| Token | Light | Dark |
| --- | --- | --- |
| Background | `0.98 0 0` (off-white) | `0.12 0 0` (deep navy) |
| Foreground | `0.18 0 0` (charcoal) | `0.96 0 0` (near-white) |
| Primary (CTA) | `0.55 0.12 230` (vibrant teal) | `0.70 0.14 230` (bright teal) |
| Accent (Badge) | `0.45 0.09 230` (deep teal) | `0.75 0.16 230` (accent teal) |
| Muted | `0.88 0.02 0` (warm grey) | `0.25 0.02 0` (dark grey) |
| Destructive | `0.55 0.19 25` (coral red) | `0.65 0.19 22` (lighter coral) |
| Border | `0.92 0.01 230` (light teal edge) | `0.25 0.02 230` (subtle teal edge) |

## Typography

| Tier | Font | Use |
| --- | --- | --- |
| Display | Bricolage Grotesque (700) | Headers, navigation, hero text |
| Body | DM Sans (400) | Product names, descriptions, body copy |
| Mono | Geist Mono (400) | Prices, quantities, code-like elements |

## Structural Zones

| Zone | Treatment |
| --- | --- |
| Header | Solid bg with subtle `border-b`; Shoppy name + cart icon with badge |
| Product Grid | 4-column responsive layout; 6px radius cards; shadow on hover transition |
| Product Card | White/card bg, thin border, subtle shadow; image 60%, text 40% |
| Detail Panel | Full-bleed image top; form below with prominent teal CTA button |
| Shopping Cart | Clean table: item name, qty spinner, unit price, line total; footer: subtotal/total |
| Footer | Minimal; subtle `border-t` if present |

## Shape & Depth

- **Radius:** 6px consistent throughout (modern, not playful)
- **Shadows:** Subtle product shadow (`shadow-product`); hover elevation (`shadow-product-hover`)
- **Spacing:** 16px base unit; dense grids, generous detail views

## Component Patterns

- **Buttons:** Primary (teal, full-width CTAs), secondary (outline), destructive (coral)
- **Inputs:** Clean border, subtle focus ring (teal)
- **Badge:** Teal accent with white text, rounded-full
- **Cards:** White/card bg, thin border, hover shadow lift
- **Links:** Teal underline on hover

## Motion

- **Transitions:** 0.3s ease-out cubic-bezier for all interactive state changes
- **Hover:** Card shadow lift, button color shift, smooth opacity changes
- **No animation:** No entrance animations, floating effects, or bounce sequences

## Constraints

- No gradients, no decorative elements, no full-page backgrounds
- Teal accent used sparingly: only CTAs, active states, badges, focus rings
- High contrast maintained in both light and dark modes
- Product images are hero elements; type remains minimal and readable
