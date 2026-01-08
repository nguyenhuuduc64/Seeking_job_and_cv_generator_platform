=================================================================
AI AGENT CODING RULES – TOPCV-LIKE PROJECT
React + TypeScript
=================================================================

## PURPOSE

This project is a web application similar to TopCV, including:

- CV builder with templates
- AI-based CV content suggestion
- CV scoring and evaluation
- Job search and job matching
- User profile management

The AI Agent must generate code that is:

- Clean and readable
- Easy to maintain
- Highly reusable
- UI-focused and professional
- Free of unnecessary boilerplate

=================================================================

1. # REQUIRED TECH STACK

- React with TypeScript
- Function Components only (NO class components)
- React Query for server state management
- Axios with centralized configuration
- CSS Modules or TailwindCSS (NO inline styles)
- Folder-based, scalable architecture

================================================================= 2. MANDATORY PROJECT STRUCTURE
=================================================================

src/
├── api/
│ └── axiosClient.ts # single Axios configuration
│
├── components/
│ ├── common/ # reusable UI components
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ └── Modal.tsx
│ │
│ ├── layout/ # layout-level components
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── Sidebar.tsx
│ │
│ └── cv/ # CV-specific components
│ ├── CVPreview.tsx
│ ├── CVSection.tsx
│ └── CVScore.tsx
│
├── pages/
│ ├── Home/
│ ├── Login/
│ ├── CVBuilder/
│ ├── JobSearch/
│ └── Profile/
│
├── layouts/
│ ├── MainLayout.tsx
│ └── AuthLayout.tsx
│
├── hooks/
│ ├── useAuth.ts
│ ├── useCV.ts
│ └── useJobs.ts
│
├── services/
│ ├── auth.service.ts
│ ├── cv.service.ts
│ └── job.service.ts
│
├── types/
│ ├── user.type.ts
│ ├── cv.type.ts
│ └── job.type.ts
│
├── utils/
│ ├── constants.ts
│ ├── format.ts
│ └── validators.ts
│
└── App.tsx

================================================================= 3. ARCHITECTURE RULES (STRICT)
=================================================================

UI (Component / Page)
→ Custom Hook (business logic)
→ Service (API layer)
→ Axios Client

FORBIDDEN:

- Calling axios directly inside components
- Writing business logic inside JSX
- Validating data inside UI components

REQUIRED:

- API calls must be in services
- Business logic must be in hooks or utils
- Components only handle rendering

================================================================= 4. CODE REUSE & OPTIMIZATION RULES
=================================================================

## 4.1 Components

- One component = one responsibility
- Props must be strongly typed
- No complex logic inside components

  4.2 Custom Hooks

---

- Any logic used in 2+ places MUST be extracted into a hook
- Hooks must not return JSX
- Hooks manage data fetching, state, and orchestration

  4.3 Utils

---

- Pure functions only
- No React dependency
- Examples:
  - CV scoring logic
  - Date formatting
  - Input validation

================================================================= 5. COMMENTING RULES
=================================================================

ONLY add comments when:

- The logic is non-obvious
- A technical decision needs explanation
- An edge case is handled

DO NOT comment:

- Obvious code
- Simple JSX
- Self-explanatory logic

## GOOD example:

## // debounce is used here to avoid excessive API calls

================================================================= 6. REMOVE UNNECESSARY CODE
=================================================================

The AI Agent MUST:

- Not generate unused files
- Not generate unused components
- Not generate unused types
- Not leave TODO comments without purpose

If a feature is not implemented:

- DO NOT generate placeholder code
- Add a short note in README only

================================================================= 7. UI / UX GUIDELINES (TOPCV STYLE)
=================================================================

- Clean layout with sufficient whitespace
- Information grouped into clear sections
- Avoid visual clutter

Page rules:

- One main heading per page
- Content divided into sections
- No horizontal scrolling

Buttons:

- Clear hierarchy (primary / secondary)
- No aggressive colors

================================================================= 8. CV BUILDER – SPECIAL RULES
=================================================================

- CV is composed of independent sections
- Each section has:
  - Its own component
  - Its own TypeScript type
  - Its own validation logic

Examples:

- Education
- Experience
- Skills
- Projects

CV Scoring:

- Implemented as pure functions
- No UI dependency
- No direct API calls

================================================================= 9. TYPESCRIPT RULES
=================================================================

- any is strictly forbidden
- All props must be typed
- All API responses must be typed
- All hooks must have explicit return types

Use:

- interface for object shapes
- type for unions and primitives

================================================================= 10. WHEN THE AI IS UNSURE
=================================================================

The AI Agent must:

1. Choose the simplest maintainable solution
2. Prioritize long-term maintainability
3. Respect the architecture rules
4. Add a short comment explaining the decision if needed

=================================================================
FINAL STATEMENT
=================================================================

This file defines the RULES for the AI Agent.

All generated code must be:

- Architecturally correct
- Clean and readable
- Easy to extend
- Suitable for real-world products, internships, and academic projects

=================================================================
