# Testing Strategy

## Unit Tests
- **Tool:** Jest + React Testing Library
- **Coverage Goal:** 80%+ for critical components
- **Focus:** Business logic, form validation, API responses

### Test Structure
```typescript
// Example test pattern
describe('ProductCard', () => {
  it('displays product information correctly', () => {
    const product = {
      id: '1',
      name: 'Gâteau au chocolat',
      price: 15.99,
      image_url: 'https://example.com/image.jpg'
    };
    
    render(<ProductCard product={product} />);
    expect(screen.getByText('Gâteau au chocolat')).toBeInTheDocument();
    expect(screen.getByText('15.99 €')).toBeInTheDocument();
  });
});
```

## E2E Tests
- **Tool:** Playwright
- **Critical Paths:** User registration, product creation, ordering
- **Browsers:** Chrome, Safari, Mobile Chrome

### Key Test Scenarios
1. **User Registration Flow**
   - Navigate to signup
   - Fill form with valid data
   - Verify successful registration
   - Check profile creation

2. **Product Management**
   - Login as artisan
   - Create new product
   - Edit product details
   - Delete product

3. **Order Processing**
   - Browse products as client
   - Click order button
   - Verify order creation
   - Check order history

## Manual Checks

### Mobile Testing
- **Devices:** iPhone 12, Samsung Galaxy S21, iPad
- **Orientation:** Portrait and landscape
- **Touch Gestures:** Swipe, tap, pinch-to-zoom

### Performance Testing
- **Load Time:** < 2 seconds on 3G
- **Image Optimization:** WebP format, lazy loading
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

### Accessibility Testing
- **Tools:** axe DevTools, WAVE
- **Standards:** WCAG 2.1 AA
- **Checks:** Color contrast, keyboard navigation, screen reader

## Pre-commit Hooks

### Required Checks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,md}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

### Hook Scripts
```bash
#!/bin/sh
# .husky/pre-commit
npm run lint
npm run type-check
npm run test:ci
```

## Verification Loop

### After Each Feature
1. **Unit Tests:** Run `npm test`
2. **Linting:** Run `npm run lint`
3. **Type Check:** Run `npm run type-check`
4. **Manual Test:** Test feature in browser
5. **Mobile Test:** Verify responsive design
6. **Performance:** Check load times

### Before Deployment
1. **Full Test Suite:** `npm run test:coverage`
2. **E2E Tests:** `npm run test:e2e`
3. **Build Test:** `npm run build`
4. **Accessibility:** Run axe DevTools
5. **Performance:** Lighthouse audit

## Test Commands

### Development
```bash
npm test              # Run tests in watch mode
npm run test:ci       # Run tests once
npm run test:coverage # Run with coverage report
npm run test:e2e      # Run E2E tests
npm run test:mobile   # Run mobile-specific tests
```

### Quality Assurance
```bash
npm run lint          # ESLint check
npm run type-check    # TypeScript compiler
npm run format        # Prettier formatting
npm run audit         # Security audit
```

## Error Handling Tests

### API Error Scenarios
```typescript
describe('API Error Handling', () => {
  it('handles network errors gracefully', async () => {
    // Mock network error
    fetch.mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useProducts());
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

### Form Validation
```typescript
describe('Product Form Validation', () => {
  it('shows error for missing required fields', async () => {
    render(<ProductForm />);
    
    const submitButton = screen.getByText('Publier');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
  });
});
```

## Performance Monitoring

### Core Web Vitals
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Monitoring Tools
- **Development:** Lighthouse CI
- **Production:** Vercel Analytics
- **Real User:** Vercel Speed Insights

## Bug Reporting

### Template
```
**Description:** Brief description of the issue
**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:** What should happen
**Actual Behavior:** What actually happens
**Environment:** Browser, OS, Device
**Screenshots:** If applicable
```

### Priority Levels
- **Critical:** Blocks core functionality
- **High:** Affects user experience significantly
- **Medium:** Minor issues, workarounds available
- **Low:** Cosmetic issues, nice to fix
