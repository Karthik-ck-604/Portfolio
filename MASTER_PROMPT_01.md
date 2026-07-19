# MASTER_PROMPT_01.md

# Global Design System & Foundation

**Portfolio Specification -- Karthikeyan C**

> Version 1.0\
> Date: 2026-07-19

------------------------------------------------------------------------

# 1. Product Vision

Build a premium developer portfolio that feels like an Awwwards-quality
product rather than a traditional resume. Every section should reinforce
technical capability, attention to detail, and professionalism.

Core principles:

-   Elegant over flashy
-   Story-driven over list-driven
-   Fast over feature-heavy
-   Accessible by default
-   Mobile-first
-   Recruiter focused

------------------------------------------------------------------------

# 2. Primary Goals

1.  Explain who Karthikeyan C is within 10 seconds.
2.  Showcase the strongest projects before the resume.
3.  Demonstrate frontend engineering quality through design and code.
4.  Encourage contact for internships and full-time roles.
5.  Maintain Lighthouse scores above 95.

------------------------------------------------------------------------

# 3. Target Audience

## Primary

-   Software recruiters
-   Engineering managers
-   Startup founders

## Secondary

-   Developers
-   Open-source collaborators
-   Technical interviewers

------------------------------------------------------------------------

# 4. Brand Identity

Tone: - Professional - Modern - Confident - Precise - Friendly

Avoid: - Buzzwords - Excessive animations - Large text blocks - Generic
templates

------------------------------------------------------------------------

# 5. Design Language

Inspiration: - Apple - Vercel - Linear - Stripe - Awwwards

Use: - Large typography - Editorial spacing - High contrast - Subtle
crimson accents - Rounded components - Smooth transitions

------------------------------------------------------------------------

# 6. Color System

  Token          Value     Usage
  -------------- --------- --------------------
  Background     #050505   Primary background
  Surface        #161616   Cards
  Surface Alt    #0F0F0F   Alternate sections
  Border         #2A2A2A   Borders
  Accent         #DC2626   CTAs
  Accent Hover   #EF4444   Hover
  Text           #F8F8F8   Headings
  Muted          #A8A8A8   Secondary text
  Success        #22C55E   Success
  Warning        #F59E0B   Warnings

Rules: - One accent color per screen. - Do not use gradients for body
text. - Reserve crimson for interactive elements.

------------------------------------------------------------------------

# 7. Typography

Headings: - Space Grotesk - Font weights: 600--700

Body: - Inter

Code: - JetBrains Mono

Scale: - Display: clamp(4rem,10vw,8rem) - H1: clamp(3rem,8vw,5rem) - H2:
clamp(2.25rem,5vw,3.5rem) - H3: 2rem - Body: 1rem - Small: 0.875rem

------------------------------------------------------------------------

# 8. Layout System

Container: - max-width: 1440px - centered - responsive padding

Grid: - 12-column desktop - 8-column tablet - 4-column mobile

Spacing: - Base unit: 8px - Section spacing: 120--180px desktop - Card
padding: 24--40px

------------------------------------------------------------------------

# 9. Responsive Strategy

Breakpoints: - sm 640 - md 768 - lg 1024 - xl 1280 - 2xl 1536

Rules: - Mobile-first - Never hide important content - Reflow instead of
shrinking excessively

------------------------------------------------------------------------

# 10. Motion Principles

Library: - Framer Motion

Animation Types: - Fade Up - Fade In - Blur Reveal - Character Reveal -
Scale - Image Zoom - Magnetic Buttons

Guidelines: - Duration: 0.4--0.8s - Ease: easeOut - Respect
reduced-motion preference

------------------------------------------------------------------------

# 11. Components

Global: - Navbar - Footer - SectionHeading - Button - Card - Timeline -
Badge - Tooltip - Modal - Cursor Glow - Scroll Progress

Every component must define: - Props - States - Accessibility - Hover
behavior - Loading state

------------------------------------------------------------------------

# 12. Images & Media

-   WebP preferred
-   Lazy load below fold
-   Preserve aspect ratio
-   Rounded corners
-   Responsive sizes
-   Blur placeholders

------------------------------------------------------------------------

# 13. Accessibility

-   Semantic HTML
-   Keyboard navigation
-   Focus indicators
-   ARIA labels
-   WCAG AA contrast
-   Reduced motion support

------------------------------------------------------------------------

# 14. Performance Budget

Targets: - Lighthouse \>95 - LCP \<2.5s - CLS \<0.1 - INP \<200ms

Optimization: - Code splitting - Tree shaking - Font preloading - Image
optimization - Dynamic imports

------------------------------------------------------------------------

# 15. SEO

-   React Helmet
-   Open Graph
-   Twitter Cards
-   sitemap.xml
-   robots.txt
-   JSON-LD Person schema

------------------------------------------------------------------------

# 16. Folder Structure

``` text
src/
  assets/
  components/
    common/
    layout/
    sections/
    ui/
  data/
  hooks/
  lib/
  pages/
  styles/
  types/
  utils/
```

------------------------------------------------------------------------

# 17. Coding Standards

-   TypeScript strict mode
-   Functional components
-   Reusable hooks
-   No duplicated styles
-   Keep business logic out of UI components
-   Prefer composition over inheritance

------------------------------------------------------------------------

# 18. Acceptance Criteria

The portfolio should: - Feel premium on desktop and mobile. - Guide
recruiters naturally through the content. - Showcase projects before
credentials. - Remain performant and accessible. - Be easy to extend
with future projects and publications.

------------------------------------------------------------------------

# Next Document

**MASTER_PROMPT_02.md** will specify the Hero section in exhaustive
detail, including layout, animations, responsive behavior, component
hierarchy, interaction design, and implementation guidance.
