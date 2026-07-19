# Tech Stack Specification

## Portfolio Website -- Karthikeyan C

## Philosophy

Build a fast, scalable, maintainable portfolio using a modern React
ecosystem. Every technology should improve performance, developer
experience, accessibility, or user experience.

------------------------------------------------------------------------

# Core Stack

  -----------------------------------------------------------------------
  Layer                   Technology              Why
  ----------------------- ----------------------- -----------------------
  Runtime                 Node.js LTS             Development & tooling

  Package Manager         pnpm                    Fast installs,
                                                  efficient disk usage

  Build Tool              Vite                    Lightning-fast HMR and
                                                  optimized production
                                                  builds

  Language                TypeScript              Type safety and
                                                  maintainability

  Framework               React 19                Component-based
                                                  architecture
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# UI & Styling

-   Tailwind CSS
-   CSS Variables for design tokens
-   clsx + tailwind-merge for conditional classes
-   Lucide React (icons)
-   shadcn/ui for accessible components

### Design Tokens

Background: `#050505` Secondary Background: `#0F0F0F` Card: `#161616`
Border: `#2A2A2A` Primary Text: `#F8F8F8` Secondary Text: `#A8A8A8`
Accent: `#DC2626` Accent Hover: `#EF4444`

Fonts - Space Grotesk (Headings) - Inter (Body) - JetBrains Mono (Code)

------------------------------------------------------------------------

# Animation

Primary - Framer Motion

Optional - GSAP (hero only)

Effects - Page reveal - Scroll reveal - Card hover - Cursor glow -
Gradient text - Smooth transitions

------------------------------------------------------------------------

# Routing

-   React Router
-   Lazy loaded routes
-   Scroll restoration

------------------------------------------------------------------------

# State Management

-   React Context
-   React Hooks
-   Minimal global state
-   Local component state where possible

------------------------------------------------------------------------

# Forms

-   React Hook Form
-   Zod validation

Contact Delivery - EmailJS or Formspree

------------------------------------------------------------------------

# Data Layer

Static JSON / TypeScript modules

Recommended data files: - profile.ts - experience.ts - projects.ts -
publications.ts - certifications.ts - skills.ts - socials.ts

------------------------------------------------------------------------

# Project Structure

src/ ├── assets/ ├── components/ │ ├── common/ │ ├── layout/ │ ├──
sections/ │ └── ui/ ├── data/ ├── hooks/ ├── lib/ ├── pages/ ├── styles/
├── types/ ├── utils/ ├── App.tsx └── main.tsx

------------------------------------------------------------------------

# Component Architecture

Layout - Navbar - Footer - ScrollProgress - CursorGlow

Sections - Hero - About - Skills - Experience - Projects -
Publications - Certifications - Contact

Reusable - Button - Card - Badge - Timeline - SectionHeading -
TechChip - Modal - Tooltip

------------------------------------------------------------------------

# Performance

-   Code splitting
-   Lazy loading
-   Image optimization
-   Font preloading
-   Tree shaking
-   Lighthouse target \>95

------------------------------------------------------------------------

# SEO

-   React Helmet
-   Open Graph
-   Twitter Cards
-   sitemap.xml
-   robots.txt
-   Structured data (Person)

------------------------------------------------------------------------

# Accessibility

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   WCAG AA contrast
-   ARIA labels
-   Reduced-motion support

------------------------------------------------------------------------

# Deployment

Hosting - Vercel

Domain - Custom domain

CI - GitHub + Vercel automatic deployments

------------------------------------------------------------------------

# Development Tools

-   ESLint
-   Prettier
-   Husky
-   lint-staged
-   GitHub Actions (optional)

------------------------------------------------------------------------

# External Services

-   GitHub API (repositories)
-   EmailJS/Formspree
-   Google Fonts

------------------------------------------------------------------------

# Browser Support

-   Chrome
-   Edge
-   Firefox
-   Safari
-   Mobile browsers

------------------------------------------------------------------------

# Features

-   Responsive Design
-   Dark Theme
-   Smooth Scroll
-   Resume Download
-   GitHub Links
-   LinkedIn Links
-   Project Gallery
-   Publication Timeline
-   Certification Grid
-   Contact Form
-   Scroll Progress
-   Active Navigation
-   Animated Counters

------------------------------------------------------------------------

# Excluded Technologies

Do not use: - Bootstrap - jQuery - Redux (unnecessary) - Material UI -
Heavy animation libraries - Large CSS frameworks

------------------------------------------------------------------------

# Recommended Versions

-   React 19
-   TypeScript 5+
-   Vite 7+
-   Tailwind CSS 4
-   Framer Motion 12+
-   pnpm 10+

------------------------------------------------------------------------

# Outcome

The stack prioritizes: - Performance - Maintainability - Accessibility -
Premium UI - Clean architecture - Recruiter-friendly presentation
