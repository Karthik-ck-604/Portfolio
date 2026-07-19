# MASTER_PROMPT_06.md

# Engineering Architecture, Components, Motion, QA & Deployment

> This document defines how the portfolio should be engineered,
> maintained, tested, and deployed.

------------------------------------------------------------------------

# 1. Engineering Philosophy

Build for: - Maintainability - Reusability - Performance -
Accessibility - Scalability

Principles: - Components over pages - Composition over duplication -
Strong typing - Predictable state - Clean separation of concerns

------------------------------------------------------------------------

# 2. Technology Stack

Core: - React 19 - TypeScript - Vite - Tailwind CSS - Framer Motion -
Lucide React

Utilities: - React Hook Form - Zod - clsx - tailwind-merge

Deployment: - GitHub - Vercel

------------------------------------------------------------------------

# 3. Folder Architecture

``` text
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
├── hooks/
├── lib/
├── pages/
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

Rules: - One component per file. - Keep section-specific logic inside
its section. - Shared utilities belong in `lib` or `utils`.

------------------------------------------------------------------------

# 4. Data Layer

Store content separately from UI.

Recommended files: - profile.ts - experience.ts - projects.ts -
publications.ts - certifications.ts - skills.ts - socials.ts

Avoid hardcoding portfolio content in JSX.

------------------------------------------------------------------------

# 5. Component Standards

Every component should define: - Purpose - Props interface - Default
behavior - Responsive behavior - Accessibility notes

Prefer: - Functional components - Named exports - Memoization only when
beneficial

------------------------------------------------------------------------

# 6. Motion System

Centralize animation variants.

Example categories: - fadeUp - fadeIn - slideLeft - slideRight -
staggerContainer - staggerItem - scaleIn - blurReveal

Guidelines: - Duration: 0.4--0.8s - Ease: easeOut - Use transform +
opacity only.

------------------------------------------------------------------------

# 7. Reusable UI

Buttons: - Primary - Secondary - Ghost

Cards: - Project - Experience - Certification - Publication

Utilities: - SectionHeading - Badge - TechChip - Timeline - Tooltip -
Modal

------------------------------------------------------------------------

# 8. State Management

Use local state whenever possible.

Context only for: - Theme (future) - Global UI

Avoid unnecessary global stores.

------------------------------------------------------------------------

# 9. Performance

Targets: - Lighthouse \>95 - LCP \<2.5s - CLS \<0.1

Checklist: - Lazy-load images - Dynamic imports - Tree shaking - Font
preload - Code splitting - Optimize video assets

------------------------------------------------------------------------

# 10. Accessibility

-   Semantic HTML
-   Keyboard navigation
-   Focus-visible
-   ARIA labels
-   Skip-to-content link
-   Respect prefers-reduced-motion

------------------------------------------------------------------------

# 11. SEO

Implement: - React Helmet - Open Graph - Twitter Cards - JSON-LD
Person - robots.txt - sitemap.xml

------------------------------------------------------------------------

# 12. Coding Conventions

-   Strict TypeScript
-   ESLint
-   Prettier
-   Descriptive naming
-   Small components
-   No duplicated utilities

Naming: - PascalCase: Components - camelCase: Functions - kebab-case:
Assets

------------------------------------------------------------------------

# 13. Git Workflow

Branches: - main - develop - feature/* - fix/*

Commit format: - feat: - fix: - refactor: - docs: - chore:

------------------------------------------------------------------------

# 14. Quality Assurance

Before release verify: - Responsive layouts - Keyboard navigation - Form
validation - Broken links - Image loading - Animation smoothness -
Lighthouse scores - Cross-browser support

Browsers: - Chrome - Edge - Firefox - Safari

------------------------------------------------------------------------

# 15. Deployment Pipeline

1.  Push to GitHub
2.  Automatic Vercel deployment
3.  Production build verification
4.  Lighthouse audit
5.  Manual regression check

------------------------------------------------------------------------

# 16. Future Roadmap

Phase 2: - Blog - CMS - Analytics - Theme switcher

Phase 3: - Case studies - Testimonials - Command palette - Search -
Multi-language support

------------------------------------------------------------------------

# 17. Documentation

Maintain: - README - CHANGELOG - Environment setup - Deployment guide

------------------------------------------------------------------------

# 18. Final Acceptance Criteria

The completed portfolio should:

-   Present Karthikeyan C as a modern software engineer.
-   Showcase projects before credentials.
-   Demonstrate clean frontend architecture.
-   Feel premium across all screen sizes.
-   Be maintainable for future growth.
-   Meet accessibility and performance goals.
-   Serve as both a portfolio and a reference implementation for modern
    React development.
