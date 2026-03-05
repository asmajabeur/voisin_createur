# GEMINI.md - Gemini CLI Configuration for Voisin Créateur

## 🎯 Project Context
**App:** Voisin Créateur
**Stack:** Next.js + Supabase + Tailwind CSS + Vercel
**Stage:** MVP Development
**User Level:** A/C (Vibe-coder / Learning while building)

## 📋 Directives
1. **Master Plan:** Always read `AGENTS.md` first. It contains the current phase and tasks.
2. **Documentation:** Refer to `agent_docs/` for tech stack details, code patterns, and testing guides.
3. **Plan-First:** Propose a brief plan and wait for approval before coding.
4. **Incremental Build:** Build one small feature at a time. Test frequently.
5. **Pre-Commit:** If hooks exist, run them before commits; fix failures.
6. **No Linting:** Do not act as a linter. Use `npm run lint` if needed.
7. **Communication:** Be concise. Ask clarifying questions when needed.

## 🛠 Commands
- `npm run dev` - Start server
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run type-check` - TypeScript validation
- `npm run build` - Build for production

## 🎨 Design Guidelines
- **Style:** Instagram-inspired, clean, white background
- **Mobile-First:** Always design for mobile first
- **Typography:** Inter font, clean and minimal
- **Colors:** Black, white, gray scale only
- **Components:** Use Tailwind CSS classes, no inline styles

## 🚫 What NOT To Do
- Do NOT delete files without explicit confirmation
- Do NOT modify database schemas without backup plan
- Do NOT add features not in the current phase
- Do NOT skip tests for "simple" changes
- Do NOT bypass failing tests or pre-commit hooks
- Do NOT use deprecated libraries or patterns
