# Tech Stack & Tools

## Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Tailwind
- **State Management:** React hooks + Zustand (if needed)

## Backend
- **Framework:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **File Storage:** Cloudinary
- **API:** RESTful endpoints

## Development Tools
- **IDE:** Windsurf / Cursor
- **Package Manager:** npm
- **Git:** Version control
- **Environment:** Node.js 18+

## Deployment
- **Frontend:** Vercel
- **Database:** Supabase (hosted)
- **Images:** Cloudinary
- **Domain:** Custom domain (optional)

## Key Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "cloudinary": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.0.0"
  }
}
```

## Project Structure
```
voisin-createur/
├── app/                    # Next.js app router
│   ├── (auth)/            # Auth routes
│   ├── dashboard/         # User dashboards
│   ├── products/          # Product management
│   ├── orders/            # Order management
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configs
│   ├── supabase.ts       # Supabase client
│   ├── cloudinary.ts     # Cloudinary config
│   └── types.ts          # TypeScript types
├── public/               # Static assets
└── styles/               # Global styles
```

## Error Handling
```typescript
// Example error handling pattern
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  return { 
    success: false, 
    error: error instanceof Error ? error.message : 'Unknown error' 
  };
}
```

## Naming Conventions
- **Files:** kebab-case (product-card.tsx)
- **Components:** PascalCase (ProductCard)
- **Variables:** camelCase (productName)
- **Constants:** UPPER_SNAKE_CASE (API_BASE_URL)
- **Types:** PascalCase (ProductType)
- **Database:** snake_case (created_at)

## Code Patterns
- Use TypeScript interfaces for all data structures
- Implement proper error boundaries
- Use React Server Components by default
- Client components only when necessary (use 'use client')
- Follow Next.js 15 conventions
- Use Tailwind CSS classes, avoid inline styles
