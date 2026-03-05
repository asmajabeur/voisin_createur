# Project Brief (Persistent)

## Product Vision
Permettre aux artisans talentueux qui travaillent à domicile de vendre facilement leurs créations uniques (pâtisseries, mode, accessoires) directement aux habitants de leur quartier.

## Coding Conventions

### Architecture
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS with design tokens
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **File Storage:** Cloudinary

### Code Style
- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Error Handling:** Proper try-catch with user feedback
- **API Design:** RESTful endpoints with consistent responses
- **State Management:** React hooks + local state

### File Organization
- **Pages:** `app/` directory with route-based structure
- **Components:** `components/` directory organized by feature
- **Utilities:** `lib/` directory for shared logic
- **Types:** `lib/types.ts` for TypeScript interfaces
- **Constants:** `lib/constants.ts` for configuration

### Design System
- **Colors:** Black, white, gray scale (Instagram-style)
- **Typography:** Inter font family
- **Spacing:** Tailwind default spacing scale
- **Components:** Reusable UI components in `components/ui/`

## Quality Gates

### Pre-commit Hooks
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript compiler
- **Testing:** Jest tests (when implemented)
- **Formatting:** Prettier auto-format

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Components are responsive
- [ ] Accessibility basics are covered
- [ ] Performance considerations addressed

### Testing Strategy
- **Unit Tests:** Jest + React Testing Library
- **E2E Tests:** Playwright (for critical flows)
- **Manual Testing:** Mobile-first approach
- **Performance:** Core Web Vitals monitoring

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run tests
npm run format       # Format code with Prettier
```

### Database
```bash
npx supabase start    # Start local Supabase
npx supabase db push  # Push schema changes
npx supabase db reset  # Reset database
```

## Update Cadence
- **AGENTS.md:** Update after each major milestone
- **agent_docs/:** Update when architecture changes
- **README.md:** Update for new features
- **Changelog:** Maintain for releases

## Success Metrics
- **Performance:** Load time < 2 seconds
- **Mobile:** Responsive design works on all devices
- **Accessibility:** WCAG 2.1 AA compliance
- **Code Quality:** 90%+ test coverage (eventually)
- **User Experience:** Intuitive navigation

## Constraints
- **Budget:** 0€/mois (free tiers only)
- **Timeline:** MVP in 2 weeks
- **Scope:** Only features in PRD
- **Technology:** Fixed stack (Next.js + Supabase)

## Decision Log
- **Next.js:** Chosen for full-stack capability
- **Supabase:** Chosen for simplicity and free tier
- **Tailwind CSS:** Chosen for rapid development
- **TypeScript:** Chosen for type safety
- **Vercel:** Chosen for seamless Next.js deployment
