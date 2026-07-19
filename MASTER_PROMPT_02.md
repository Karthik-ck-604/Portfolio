# MASTER_PROMPT_02.md

# Hero Section Specification

> Purpose: The Hero must communicate identity, expertise, and quality
> within the first 10 seconds.

------------------------------------------------------------------------

# 1. Objectives

-   Establish a memorable first impression.
-   Present Karthikeyan C as a Full Stack Developer.
-   Encourage recruiters to explore projects.
-   Showcase craftsmanship through motion and layout.

------------------------------------------------------------------------

# 2. Layout

-   Height: 100vh minimum.
-   Sticky transparent navbar.
-   Fullscreen background (video or animated gradient).
-   Dark overlay for readability.
-   12-column desktop grid.
-   Left-aligned content.
-   Decorative visual on the right (3D illustration, portrait, or
    abstract developer scene).

Desktop: - Left 7 columns: content. - Right 5 columns: visual.

Tablet: - Stacked with visual below heading.

Mobile: - Single-column layout.

------------------------------------------------------------------------

# 3. Navbar

Left: - Logo / KC monogram.

Center: - About - Experience - Projects - Publications - Contact

Right: - Resume button.

Behavior: - Transparent initially. - Blur + subtle surface after
scrolling. - Mobile hamburger below md breakpoint.

Hover: - Underline grow animation. - Accent text transition.

------------------------------------------------------------------------

# 4. Hero Content

## Eyebrow

Examples: - Full Stack Developer - MERN • Spring Boot • AI - Building
scalable web applications

Style: - Uppercase - Letter spacing 0.3em - Muted color

Animation: - Fade up.

------------------------------------------------------------------------

## Main Heading

Example:

Hi, I'm

Karthikeyan C

Building fast, modern digital experiences.

Rules: - Maximum 3 lines. - Clamp typography. - Space Grotesk. -
Font-weight 700. - Tight line height.

Animation: - Character reveal. - Stagger by word.

------------------------------------------------------------------------

## Description

2--3 concise sentences covering: - Final-year engineer. - Full Stack
specialization. - Interest in AI and scalable systems. - Focus on
user-centric products.

Max width: 620px.

Animation: - Fade + blur.

------------------------------------------------------------------------

## CTA Row

Primary: View Projects

Secondary: Download Resume

Optional: Contact Me

Button Rules: - Pill shape. - Large tap targets. - Crimson accent only
on primary.

Hover: - Lift 2px. - Shadow. - Icon translation.

------------------------------------------------------------------------

## Social Links

GitHub LinkedIn Email

Presentation: - Minimal icon buttons. - Tooltip labels. - Keyboard
accessible.

------------------------------------------------------------------------

## Quick Metrics

Examples: - 4 Internships - 15+ Certifications - 3 Publications - 10+
Projects

Display: - Responsive grid. - Number emphasis. - Label muted.

------------------------------------------------------------------------

# 5. Background

Preferred: - Cinematic looping video.

Fallback: - Animated mesh gradient.

Overlay: - Black 60--70%.

Avoid distracting visuals behind text.

------------------------------------------------------------------------

# 6. Motion Design

Entrance sequence:

1.  Navbar
2.  Eyebrow
3.  Heading
4.  Description
5.  CTA
6.  Metrics
7.  Decorative visual

Timing: - 0.15--0.2s stagger. - Total intro under 1.5s.

Scroll: - Gentle parallax. - Background scale 1.00 → 1.05. - Navbar
blur.

------------------------------------------------------------------------

# 7. Visual Element

Possible options: - Professional portrait. - Abstract developer
illustration. - Floating UI windows. - Code snippets. - 3D geometric
objects.

Rules: - Never compete with heading. - Low visual noise. - Responsive
scaling.

------------------------------------------------------------------------

# 8. Responsive Rules

Desktop: - Horizontal composition.

Tablet: - Reduced heading size. - Visual centered.

Mobile: - Stack content. - Hide decorative-only elements. - Maintain CTA
visibility without scrolling.

------------------------------------------------------------------------

# 9. Accessibility

-   Semantic
    ```{=html}
    <header>
    ```
    .
-   Focus-visible states.
-   Keyboard navigation.
-   Respect prefers-reduced-motion.
-   Video muted and playsInline.

------------------------------------------------------------------------

# 10. Performance

-   Lazy-load noncritical assets.
-   Compressed video.
-   Poster image fallback.
-   GPU-friendly transforms only.

------------------------------------------------------------------------

# 11. Tailwind Guidance

Use: - max-w-7xl - mx-auto - px-6 md:px-10 lg:px-16 - gap-8 lg:gap-16 -
min-h-screen - flex - grid - items-center

Avoid deeply nested utility chains by extracting reusable components.

------------------------------------------------------------------------

# 12. Component Hierarchy

Hero ├── Navbar ├── HeroBackground ├── HeroContent │ ├── Eyebrow │ ├──
Heading │ ├── Description │ ├── CTAGroup │ ├── SocialLinks │ └── Metrics
└── HeroVisual

------------------------------------------------------------------------

# 13. Acceptance Criteria

The Hero should: - Identify the developer within seconds. - Highlight
projects before credentials. - Feel premium and cinematic. - Remain
responsive across devices. - Achieve smooth 60fps animations. -
Encourage scrolling to the About section.
