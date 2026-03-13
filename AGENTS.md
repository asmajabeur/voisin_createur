# AGENTS.md - Master Plan for Voisin Créateur

## 🎯 Project Overview
**App:** Voisin Créateur
**Goal:** Permettre aux artisans talentueux qui travaillent à domicile de vendre facilement leurs créations uniques (pâtisseries, mode, accessoires) directement aux habitants de leur quartier
**Stack:** Next.js + Supabase + Tailwind CSS + Vercel
**Current Phase:** Phase 1 - Foundation

## 🧠 How I Should Think
1. **Understand Intent First**: Before answering, identify what the user actually needs
2. **Ask If Unsure**: If critical information is missing, ask before proceeding
3. **Plan Before Coding**: Propose a plan, ask for approval, then implement
4. **Verify After Changes**: Run tests/linters or manual checks after each change
5. **Explain Trade-offs**: When recommending something, mention alternatives

## 🔁 Plan → Execute → Verify
1. **Plan:** Outline a brief approach and ask for approval before coding.
2. **Plan Mode:** If supported, use a Plan/Reflect mode for this step.
3. **Execute:** Implement one feature at a time.
4. **Verify:** Run tests/linters or manual checks after each feature; fix before moving on.

## 🧠 Context & Memory
- Treat `AGENTS.md` and `agent_docs/` as living docs.
- Use persistent tool configs (`.windsurfrules`, `GEMINI.md`) for project rules.
- Update these files as the project scales (commands, conventions, constraints).

## 🤝 Optional Roles (If Supported)
- **Explorer:** Scan codebase or docs in parallel for relevant info.
- **Builder:** Implement features based on the approved plan.
- **Tester:** Run tests/linters and report failures.

## ✅ Testing & Verification
- Follow `agent_docs/testing.md` for test strategy.
- If no tests exist, propose minimal checks before proceeding.
- Do not move forward when verification fails.

## 🧩 Checkpoints & Pre-Commit Hooks
- Create checkpoints/commits after milestones.
- Ensure pre-commit hooks pass before commits.

## 📁 Context Files
Refer to these for details (load only when needed):
- `agent_docs/tech_stack.md`: Tech stack & libraries
- `agent_docs/code_patterns.md`: Code style & patterns
- `agent_docs/project_brief.md`: Persistent project rules and conventions
- `agent_docs/product_requirements.md`: Full PRD
- `agent_docs/testing.md`: Verification strategy and commands

## 🔄 Current State (Update This!)
**Last Updated:** Aujourd'hui (Juste maintenant)
**Working On:** Phase 3 Polish & Launch (Préparation)
**Recently Completed:** Système de commande simple, Notifications temps réel, Peaufinage UI (Typographie Inter & Notifs), Navigation.
**Blocked By:** Aucun.

## 🚀 Roadmap
### Phase 1: Foundation
- [x] Initialize Next.js project with TypeScript and Tailwind
- [x] Setup Supabase database (Reset & Re-configured)
- [x] Set up pre-commit hooks
- [x] Configure environment variables
- [x] Double profil (Artisan/Client) system

### Phase 2: Core Features
- [x] UI Dashboard Artisan (CSS)
- [x] Flux visuel Instagram-style
- [x] CRUD catalogue produits
- [x] Système de commande simple

### Phase 3: Polish & Launch
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Beta testing with real users

## ⚠️ What NOT To Do
- Do NOT delete files without explicit confirmation
- Do NOT modify database schemas without backup plan
- Do NOT add features not in the current phase
- Do NOT skip tests for "simple" changes
- Do NOT bypass failing tests or pre-commit hooks
- Do NOT use deprecated libraries or patterns

## ⛔ Engineering Constraints

### Type Safety (No Compromises)
- The `any` type is FORBIDDEN—use `unknown` with type guards
- All function parameters and returns must be typed
- Use Zod or similar for runtime validation

### Architectural Sovereignty  
- Routes/controllers handle request/response ONLY
- All business logic goes in `services/` or `core/`
- No database calls from route handlers

### Library Governance
- Check existing `package.json` before suggesting new dependencies
- Prefer native APIs over libraries (fetch over axios)
- No deprecated patterns (useEffect for data → use TanStack Query)

### The "No Apologies" Rule
- Do NOT apologize for errors—fix them immediately
- Do NOT generate filler text before providing solutions
- If context is missing, ask ONE specific clarifying question

### Workflow Discipline
- Pre-commit hooks must pass before commits (or ask if they should be bypassed)
- If verification fails, fix issues before continuing
