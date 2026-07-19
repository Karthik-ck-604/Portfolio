# Engineering Specification & Implementation Plan - Premium Developer Portfolio for Karthikeyan C

This document is the absolute, uncompromising engineering specification and master blueprint for building Karthikeyan C's developer portfolio website. Every layout, design token, responsive breakpoint, animation timeline, component API, and performance metric is defined here in exact terms to guide a production-ready, pixel-perfect, accessible, and high-performance implementation.

---

## 1. Design Token System

All design elements must strictly derive from the following token system. No arbitrary style definitions or hardcoded hex colors are allowed.

### 1.1 Color Palette
| Token Name | Hex Value | Usage / Semantic Role |
| :--- | :--- | :--- |
| `Background` | `#050505` | Primary layout backdrop (100% of the screen). |
| `Surface` | `#161616` | Card background, input field background. |
| `Surface Alt` | `#0F0F0F` | Alternating full-width section backdrops. |
| `Border` | `#2A2A2A` | Layout dividing borders, card outline borders. |
| `Accent` | `#DC2626` | Crimson red for primary interactive buttons, hover accents, links. |
| `Accent Hover` | `#EF4444` | High-brightness crimson red for hover states. |
| `Text Primary` | `#F8F8F8` | Primary body text, section headers, main headings. |
| `Text Muted` | `#A8A8A8` | Secondary body text, quick descriptors, captions, labels. |
| `Success` | `#22C55E` | Positive status, successful form submissions. |
| `Warning` | `#F59E0B` | Critical alerts, input validation warnings. |

### 1.2 Glassmorphism & Elevation (Modals & Cards Only - Never on the Navbar)
* **Glass Card Backdrop**: `rgba(22, 22, 22, 0.7)`
* **Backdrop Blur**: `12px` (Tailwind `backdrop-blur-md`)
* **Card Border Outline**: `1px solid #2A2A2A`
* **Card Hover Accent Border**: `1px solid #DC2626`
* **Card Glow Shadow**: `0 0 30px 0px rgba(220, 38, 38, 0.08)` (accent color glow on active states)
* **Z-Index Hierarchy**:
  * Canvas / Parallax Backgrounds: `z-0`
  * Standard Section Contents: `z-10`
  * Floating UI Controls: `z-20`
  * Navbar / Mobile Drawer Overlay: `z-50`
  * Modal Overlays & Backdrops: `z-100`
  * Page Loaders / Top Scroll Progress / Cursor Glow: `z-100`

---

## 2. Layout & Responsive System

The website relies on a strict layout structure built using a mobile-first approach. 

### 2.1 Grid Layout Specs
* **Spacing Base Unit**: `8px`. All spacing values (padding, margins, grid gaps) must be multiples of `8px` (`8px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`, `120px`, `160px`).
* **Section-to-Section Spacing**:
  * Desktop (>= 1024px): `120px` to `160px` vertical margin.
  * Mobile/Tablet (< 1024px): `80px` to `100px` vertical margin.

| Device Category | Breakpoint Range | Columns | Side Margins | Gutters | Content Max Width |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Desktop / Laptop** | `>= 1280px` | 12 | `80px` | `32px` | `1440px` |
| **Tablet** | `768px` to `1023px` | 8 | `48px` | `24px` | Full Width |
| **Mobile** | `< 768px` | 4 | `24px` | `16px` | Full Width |

### 2.2 Section Padding and Width Specifications
* **Navbar**: Height is fixed at `80px` (desktop) and `64px` (mobile). Side padding matches the responsive layout side margins (`80px` on desktop, `48px` on tablet, `24px` on mobile).
* **Hero**: Height is `100vh` (minimum `720px`). Top padding is `120px` to account for the transparent floating navbar.
* **About**: Vertical padding `120px` (desktop), `80px` (mobile). Story text max width is `680px`.
* **Experience**: Vertical padding `140px` (desktop), `96px` (mobile). Cards are `540px` wide on desktop alternating layouts.
* **Skills**: Vertical padding `120px` (desktop), `80px` (mobile). Group grid gap is `32px`.
* **Projects**: Vertical padding `160px` (desktop), `100px` (mobile). Showcase cards are full grid width (`1280px` content area) with alternating 7-column media and 5-column content layouts.
* **Publications**: Vertical padding `120px` (desktop), `80px` (mobile). Grid columns: 2 (desktop), 1 (tablet/mobile). Card padding `32px`.
* **Certifications**: Vertical padding `120px` (desktop), `80px` (mobile). Grid columns: 4 (desktop), 2 (tablet), 1 (mobile). Gaps are `24px`.
* **GitHub**: Vertical padding `120px` (desktop), `80px` (mobile). Left summary column: 5 columns, Right repository grid: 7 columns.
* **Contact**: Vertical padding `140px` (desktop), `96px` (mobile). Left contact details: 5 columns, Right form: 7 columns. Form fields are `48px` height.
* **Footer**: Height is `160px` with vertical padding `48px`.

---

## 3. Typography Tokens

We use Space Grotesk for Editorial Headings, Inter for legible body copy, and JetBrains Mono for technical statistics and code segments.

| Token | CSS Class | Font Family | Size (clamp) | Weight | Line Height | Letter Spacing | Paragraph Width |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `Display` | `.text-display` | Space Grotesk | `clamp(3.5rem, 8vw, 6.5rem)` | 700 | 1.05 | `-0.02em` | N/A |
| `H1` | `.text-h1` | Space Grotesk | `clamp(2.5rem, 6vw, 4.5rem)` | 700 | 1.1 | `-0.01em` | N/A |
| `H2` | `.text-h2` | Space Grotesk | `clamp(2rem, 4vw, 3rem)` | 600 | 1.2 | `normal` | N/A |
| `H3` | `.text-h3` | Space Grotesk | `1.75rem` | 600 | 1.3 | `normal` | N/A |
| `Body` | `.text-body` | Inter | `1rem` | 400 | 1.6 | `normal` | Max `680px` |
| `Small` | `.text-small` | Inter | `0.875rem` | 400 | 1.5 | `normal` | N/A |
| `Eyebrow` | `.text-eyebrow` | Space Grotesk | `0.875rem` | 600 | 1.2 | `0.3em` | N/A |
| `Code` | `.text-code` | JetBrains Mono| `0.9rem` | 400 | 1.4 | `normal` | N/A |

---

## 4. Reusable Component Specifications & Interactive States

Every component must support all states with smooth transitions (`transition-all duration-300 ease-out`).

### 4.1 Navigation Bar (`src/components/layout/Navbar.tsx`)
* **Core Rule**: **Must remain 100% transparent at all times, including while scrolling.** No background color, no glassmorphism, no backdrop blur, no border, no shadow, no filled container, and no opacity layer.
* **Layout**: Fixed `h-20` (desktop) or `h-16` (mobile) floating naturally. Flex layout with logo monogram on left, navigation links centered (`gap-8`), and a compact download resume CTA button on the right (`px-6 py-2 border border-border rounded-full hover:bg-accent hover:border-accent hover:text-white`).
* **Active-Link Indicator**: A active link text color turns to `text-accent` (#DC2626) with a subtle floating crimson dot (`w-1 h-1 rounded-full bg-accent mt-1 mx-auto block`) beneath it. Unactive links transition between `text-muted` (#A8A8A8) and `text-white` on hover.
* **Mobile Hamburger Navigation**:
  * Displays a hamburger button (`w-10 h-10 flex items-center justify-center text-white`) below `768px`.
  * Clicking opens a slide-out drawer from the right side, **width fixed at `280px`**.
  * Drawer container itself uses a solid color (`#0F0F0F` surface) with a border-left `1px solid #2A2A2A` to maintain readability of text over background content. It has a full focus trap for keyboard users.
* **Keyboard Navigation**: Nav links use sequential tab indices. Escape key closes the mobile drawer immediately.

### 4.2 Button Component (`src/components/common/Button.tsx`)
* **API Props**:
  ```typescript
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    magnetic?: boolean;
    ariaLabel: string;
  }
  ```
* **States & Visual Styles**:
  * **Primary (Accent)**: Default background `#DC2626` (crimson), text `#F8F8F8`. Hover background `#EF4444`, translates up `2px` with a subtle glow shadow `0 0 20px rgba(220, 38, 38, 0.3)`. Pressed: scales down `0.98`. Focus-visible: outline ring `2px` in accent. Disabled: background `#2A2A2A`, text `#A8A8A8`, cursor not-allowed. Loading: displays a spinning loader svg and disables interactions.
  * **Secondary (Outline)**: Default border `1px solid #2A2A2A`, background transparent, text `#F8F8F8`. Hover: border `#DC2626`, background `rgba(220, 38, 38, 0.05)`.
  * **Ghost**: Default background transparent, text `#A8A8A8`. Hover: text `#F8F8F8`, background `rgba(255, 255, 255, 0.05)`.

### 4.3 Glass Card Component (`src/components/common/Card.tsx`)
* **API Props**:
  ```typescript
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverGlow?: boolean;
    borderAccentOnHover?: boolean;
    translateOnHover?: boolean;
  }
  ```
* **Visual States**:
  * Default: Background `rgba(22, 22, 22, 0.7)` (glassmorphism), backdrop-blur `12px`, border `1px solid #2A2A2A`, border-radius `20px`.
  * Hover: Border transitions to `#DC2626` if `borderAccentOnHover` is true; lifts up `4px` (`-translate-y-1`) if `translateOnHover` is true; displays a subtle glow overlay if `hoverGlow` is true.

### 4.4 Form Fields (`src/components/common/Input.tsx` / `TextArea.tsx`)
* **API Props**:
  ```typescript
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }
  ```
* **States**:
  * Default: Height `48px`, background `#0F0F0F`, border `1px solid #2A2A2A`, text `#F8F8F8`, rounded `8px`.
  * Focus: Border turns `#DC2626`, outline transparent.
  * Error: Border turns `#EF4444`, displays error message below input text (binds to ARIA description, wraps in `role="alert"`).

---

## 5. Animation & Motion System (Framer Motion)

Animations must use GPU-friendly properties (`opacity`, `transform: translate3d/scale/rotate`) and respect the user's `prefers-reduced-motion` settings.

### 5.1 Global Physics & Transitions
* **Standard Easing (easeOut)**: `[0.16, 1, 0.3, 1]` (custom cubic-bezier)
* **Stagger Timings**: `0.1s` between items in grids.
* **Interactive Spring**: `type: "spring", stiffness: 300, damping: 20`
* **Reduced Motion Fallback**: Disable all translations, scales, and blurs. Retain simple, quick opacity fades (`duration: 0.2s`).

### 5.2 Motion Integrations
* **Character-by-Character Text Reveal**: Heading characters are wrapped in elements. The parent component splits strings and staggers the animation:
  * Characters transition from `y: 20, opacity: 0` to `y: 0, opacity: 1` with a stagger step of `0.02s` and easing `[0.16, 1, 0.3, 1]`.
* **Scroll-Linked SVG Drawing (Timeline)**:
  * An SVG line spans the duration height of the timeline. Using Framer Motion's `useScroll` and `useTransform`, we map the line's `strokeDashoffset` from `1` (hidden) to `0` (fully drawn) as the user scrolls through the Experience wrapper.
* **Card Pinning & Stacking**:
  * Desktop layout cards in the Projects section use sticky scroll offsets (`sticky top-[120px]`). On scroll, the transition staggers card elements in place, sliding the next card on top with scale offsets (`scale-100` down to `scale-98` for the card below).
* **Parallax Background**:
  * An SVG dots canvas background moves at a scale of `0.1` relative to page scrolling using `useTransform(scrollYProgress, [0, 1], ["0%", "10%"])`.
* **Magnetic Button Interaction**:
  * Reusable hook tracking mouse coordinates inside interactive elements. On hover, the button translates toward the pointer position with constraint bounds (`max 12px` movement).

### 5.3 Section Timelines
* **Hero**: Eyebrow fades up (0.2s) -> Character heading reveal (0.3s) -> Subtitle/Description blur reveal (0.5s) -> CTA button slide fade (0.7s) -> Metric cards count-up trigger (0.9s) -> Right visual reveal (1.1s).
* **Scroll Reveals**: All subsequent sections use `framer-motion`'s `whileInView` with a threshold of `0.15` and `once: true`, triggering stagger reveals for children.

---

## 6. Media & Asset Pipeline

* **Image Optimization**: PNG/JPEG certification and mockup images must be optimized and served in WebP format, providing fallback source definitions.
* **Responsive Image Sets**:
  * Mockup and project screenshots define standard `srcset`: `400w` for mobile viewports, `800w` for tablets, and `1200w` for desktop grids.
* **Eager vs. Lazy Loading**:
  * Hero right-side visual loads eagerly with `fetchpriority="high"`.
  * All below-the-fold image mockups and certification screenshots use native browser `loading="lazy"`.
* **Certification Certificates Asset Mapping**:
  * The `src/` directory contains active certificates: `cert_altitudes.png`, `cert_aws_udacity.pdf`, `cert_basic_coding.png`, `cert_cognifyz.jpg`, `cert_deloitte.png`, `cert_generative_ai.pdf`, `cert_ibm.png`, `cert_iit_fluxus.jpg`, `cert_intermediate_coding.png`, `cert_meity.png`, `cert_nasscom.pdf`, `cert_nitroware.png`, `cert_nlp.png`, `cert_nptel.pdf`, `cert_oracle.png`, `cert_penetration_testing.png`, `cert_power_bi.png`, `cert_react.png`, `cert_snowflake.pdf`, `cert_webgen.png`.
  * Clicking a certification card opens the local asset directly (opens image or PDF in a new tab using `rel="noopener noreferrer"`, or displays it in a custom full-screen accessible Modal).

---

## 7. Accessibility Requirements (WCAG AA Compliance)

* **Contrast Standards**: Text elements against their background must maintain a contrast ratio of at least `4.5:1` (Text Primary `#F8F8F8` on Background `#050505` satisfies `19.7:1`). Focus rings and text buttons must maintain visible contrast.
* **Keyboard Focus Navigation**:
  * The focus order must follow the visual layout of sections: Hero → About → Experience → Skills → Projects → Publications → Certifications → GitHub → Contact → Footer.
  * All interactive elements (navigation items, CTAs, details buttons, links, inputs) must display a visible focus indicator using `focus-visible:ring-2 focus-visible:ring-accent`.
* **Skip-to-Content Link**:
  * A focusable skip link is placed at the top-most level of the document:
    ```html
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-accent ...">
      Skip to content
    </a>
    ```
* **ARIA Relationships**:
  * Interactive components must define their states using ARIA markers: `aria-expanded` on the hamburger navbar control, `aria-describedby` linking input fields to their validation errors, and `aria-hidden="true"` on decorative icons and shapes.
* **Form Accessibility**:
  * Form inputs must bind directly to semantic `<label>` elements. Error messages must display dynamically using `role="alert"` so they are announced by screen readers.
* **Touch Targets**:
  * Interactive control bounds (buttons, links, form inputs, navigation items) must occupy a minimum size of `44px` x `44px` (or `48px` height for forms) to accommodate tap gestures on small mobile device screens.

---

## 8. SEO & Metadata Specifications

### 8.1 Metadata Attributes
We use `react-helmet-async` to manage head attributes for performance and SEO correctness.
* **Meta Title**: `Karthikeyan C | Full Stack Developer | MERN & Spring Boot`
* **Meta Description**: `Professional portfolio of Karthikeyan C, a Full Stack Developer specializing in MERN stack, Java Spring Boot, AI integration, and cloud technologies. Explore internship achievements, projects, and certifications.`
* **Open Graph**:
  * `og:type`: `website`
  * `og:title`: `Karthikeyan C | Full Stack Developer Portfolio`
  * `og:description`: `MERN & Spring Boot developer specializing in high-performance web products, AI integrations, and cloud architectures.`
  * `og:image`: `/assets/og-preview.jpg`
* **Twitter Cards**:
  * `twitter:card`: `summary_large_image`
  * `twitter:title`: `Karthikeyan C | Full Stack Developer`
  * `twitter:description`: `MERN & Spring Boot portfolio featuring cloud, AI, and full-stack software products.`
  * `twitter:image`: `/assets/og-preview.jpg`

### 8.2 Structured JSON-LD Person Schema
We will inject a structured Person schema inside `index.html` or programmatically inside `App.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Karthikeyan C",
  "jobTitle": "Full Stack Developer",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "SNS College of Engineering"
  },
  "knowsAbout": [
    "Software Engineering",
    "Full Stack Development",
    "MERN Stack",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "Java Spring Boot",
    "Cloud Computing",
    "Artificial Intelligence"
  ],
  "sameAs": [
    "https://github.com/your-username",
    "https://linkedin.com/in/your-profile"
  ]
}
```

---

## 9. QA, Performance & Code Standards

### 9.1 Coding Standards
* **TypeScript Strict Mode**: No `any` type allowances. Define complete prop types and interface properties.
* **Import Ordering**:
  1. React core, hooks, and frameworks.
  2. Third-party packages (Framer Motion, Lucide React, React Hook Form).
  3. Reusable UI components / layout components.
  4. Local helpers, data files, hooks, types, and styles.
* **File Naming Conventions**: PascalCase for Component files (`Button.tsx`), camelCase for standard modules and utility hooks (`useActiveSection.ts`), lowercase-kebab-case for asset assets (`cert-nitroware.png`).
* **Clean Architecture**: Decouple logic from view:
  * `src/data/` contains TS data modules (skills, timeline data, project data).
  * `src/hooks/` and `src/utils/` encapsulate dynamic state, math helpers, and form parsing.

### 9.2 Performance Targets
* **Lighthouse Target Score**: `>= 95` for Performance, Accessibility, Best Practices, and SEO.
* **Largest Contentful Paint (LCP)**: `< 2.5s` on mobile devices.
* **Cumulative Layout Shift (CLS)**: `< 0.1` throughout runtime.
* **Interaction to Next Paint (INP)**: `< 200ms`.
* **Testing Browser Scope**: Chrome, Firefox, Edge, Safari, Mobile Safari, Android Chrome.

---

## 10. Section-by-Section Acceptance Criteria

Every visual layout and interaction must be verified against these criteria before final release.

### 10.1 Navigation Bar
* **Visual**: Fixed transparent header. Absolutely NO background colors, no glassmorphism, no shadows, no borders, no blurs, and no filled containers. Links float naturally over section backdrops. Logo monogram text visible left; menu center; CTA button right.
* **Active-Link State**: Dynamic underline dot (#DC2626) transitions in location beneath the active section's menu item as the viewport scrolls. 
* **Mobile Reflow**: Shrinks height to `64px`. Replaces link center menu with inline hamburger icon. Triggering menu slides open a solid `#0F0F0F` panel from the right spanning a fixed width of `280px`. Drawer closes immediately on clicking any link or pressing Escape.

### 10.2 Hero Section
* **Visual**: Display-clamped heading splits cleanly without clipping margins. Stat numbers display in JetBrains Mono. Mesh animated grid handles backing lighting effects cleanly.
* **Interaction**: Numbers dynamically count up when scrolled into view. View Projects button smooth-scrolls user to Projects section.
* **Accessibility**: Grid elements use semantic lists. Contrast maintains WCAG AA level.

### 10.3 About Section
* **Visual**: Story block splits opposite portrait placeholder. Highlight cards match layout spacing.
* **Interaction**: Highlight cards translate up `4px` and glow on hover.

### 10.4 Experience Section
* **Visual**: Vertical connecting SVG timeline line drawn in center. Technology badges wrap without line clipping.
* **Interaction**: Line draws down linked to scroll progression.
* **Accessibility**: Chronological layout operates cleanly without animations enabled.

### 10.5 Skills Section
* **Visual**: Group cards format in responsive blocks (2-column desktop, 1-column mobile).
* **Interaction**: Cards transition border color to crimson accent on hover.
* **Accessibility**: Heading structures align semantically.

### 10.6 Projects Section
* **Visual**: Large showcase layout alternating columns. Mockup pictures display clearly.
* **Interaction**: Cards stack on top of each other stickily on desktop scroll. Images zoom `5%` on hover.
* **Accessibility**: Direct actions define explicit ARIA labels. Minimum tap bounds are at least `44px`.

### 10.7 Publications Section
* **Visual**: Large publication layout grid. Year tag displays prominently.
* **Accessibility**: Contrasts conform to AA standard.

### 11.8 Certifications Section
* **Visual**: Masonry grid layout containing provider logos. Clicking cards triggers an overlay or opens a local PDF/image file.
* **Interaction**: Scale and border highlight on hover.
* **Accessibility**: Provider logos specify descriptive labels. Interactive cards are focusable via keyboard.

### 11.9 GitHub Section
* **Visual**: Contribution paragraph matches repository card grids. Pinned listings show repository language and details.

### 11.10 Contact Section
* **Visual**: Form inputs structure cleanly. Float indicators active during text typing.
* **Interaction**: Submit button disables during submission, displaying validation warnings in real-time. Successful message animates a green success prompt.
* **Accessibility**: Error messages are bound using ARIA descriptions and marked as `role="alert"`.

### 11.11 Footer
* **Visual**: Nav link footer aligns clean details. Scroll-to-top button renders in bottom corner.
* **Interaction**: Scroll-to-top button transitions to visible after scrolling past the Hero section. Clicking smooth-scrolls back to page start.
