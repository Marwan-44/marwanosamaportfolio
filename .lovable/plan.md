# Marwan Osama Zolfakar — Flutter Developer Portfolio

## Overview
Build a polished single-page portfolio that adapts the reference’s editorial rhythm into a developer-focused glass interface. The site will present Marwan honestly as a Computer Science student developing his Flutter expertise while highlighting his established programming foundation.

## Page structure
1. **Sticky glass navigation** — name mark, section links, active-section indicator, desktop contact action, and animated mobile menu.
2. **Home** — Marwan’s portrait in a softly rounded glass frame, name, Flutter title, supporting line, concise introduction, project/contact actions, social links, and restrained floating mobile-development details.
3. **About** — personal introduction plus compact information cards for role, university, graduation, GPA, and Cairo location.
4. **Education** — focused timeline for October 6 University, 2024–2027, with GPA and “Very Good” distinction.
5. **Skills** — separate technical and soft-skill groups; Flutter is explicitly labeled “Currently Learning,” with no invented proficiency scores.
6. **Services** — one prominent Flutter App Development panel with the supplied description and a contact action.
7. **Selected Projects** — five authentic projects: Student Grade Management System, Expense Tracker, Java Ball Animation Tool, Arduino Smart Car, and Bank Management System. Each gets its own custom abstract, code-inspired illustration and technology tags; no fake app screenshots.
8. **Certifications & Training** — chronological cards for QNB Egypt, McKinsey.org Forward, and the three Meta/Coursera courses.
9. **Contact** — final invitation, email, phone, LinkedIn, GitHub, and a validated name/email/message form. Submission will open a prepared email in the visitor’s mail app, avoiding a fake success state or unnecessary data collection.
10. **Footer** — concise identity and section shortcuts consistent with the reference.

## Visual direction
- Use the exact palette: primary `#092C4C`, secondary `#B6C4F2`, tertiary `#F498AD`, and surface `#FFF6D9`, translated into semantic design tokens with accessible text and state colors.
- Use Outfit throughout, loaded through the page head.
- Follow the reference’s spacious editorial composition: oversized typography, alternating light and deep-primary bands, asymmetric feature layouts, and varied card groupings rather than a generic repeated grid.
- Glass surfaces will use controlled transparency, blur, fine borders, subtle shadows, and small radii while preserving legibility.
- The supplied reference remains inspiration only and will not be embedded.

## Motion and behavior
- Smooth anchor navigation with scroll-aware active navigation.
- Subtle entrance and viewport-reveal motion, card lift, profile glow, and slow floating mobile/code details.
- Motion is restrained and disabled or simplified when reduced motion is preferred.
- Responsive composition includes a purpose-built mobile navigation, stacked content order, touch-friendly controls, and typography that fits narrow screens.

## Technical details
- Implement the complete experience at `/` with accessible semantic sections and one H1.
- Add reusable local building blocks for navigation, section headings, glass surfaces, reveals, project illustrations, and form controls.
- Create abstract project visuals with CSS and inline decorative shapes rather than external stock imagery.
- Validate contact fields in the browser with clear inline errors, length limits, and safely encoded email content.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify navigation, form behavior, animations, overflow, and readability at desktop and mobile viewport sizes.

## Required asset
- Use Marwan’s uploaded professional portrait in both the arched Home glass frame and the About section.
