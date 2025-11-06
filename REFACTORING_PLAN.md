# Portfolio Refactoring Plan - Ehnand Azucena

## 🚨 Critical Discovery

Your **app/page.tsx is currently broken** - it only renders a LinkPreviewTester component instead of your actual portfolio content (Hero, About, Experience, Projects, Skills, etc.)!

This refactoring will:
1. **Fix the broken portfolio page**
2. **Remove ~1,742 lines of unnecessary code**
3. **Reduce bundle size by ~400KB+**
4. **Follow Next.js 15 best practices**
5. **Keep your 3D cube but optimize it**

---

## Execution Plan

### Phase 1: Fix Broken Portfolio Page ⚠️ **CRITICAL**

**Problem**: `app/page.tsx` only renders a test component

**Solution**: Rebuild with actual portfolio sections
- Import and render: Hero, About, Experience, Projects, Skills, Education, Certificates, Contact
- Add: Navigation, Footer, ScrollProgress, SectionIndicator, LoadingScreen
- Remove: LinkPreviewTester

### Phase 2: Remove Email Components (Unused)

**Why**: User confirmed these aren't being used (impossible without server)

**Files to delete**:
- `/components/email-template-builder.tsx`
- `/components/email-preview-modal.tsx`
- `/app/api/send-email/route.ts`

### Phase 3: Remove Testing/Development Tools

**Why**: Development tools shouldn't be in production

**Files to delete**:
- `/components/link-preview-tester.tsx`
- `/lib/link-preview-generator.ts`
- `/app/api/preview/route.tsx`

### Phase 4: Remove Performance Monitoring System

**Why**: Developer tooling, not portfolio features (~970 lines of code)

**Files to delete**:
- `/components/performance-dashboard.tsx`
- `/components/performance-widget.tsx`
- `/components/performance-optimized-layout.tsx`
- `/lib/performance-optimizer.ts`
- `/lib/performance-monitor.ts`
- `/lib/critical-resource-loader.ts`
- `/app/api/analytics/performance/route.ts`

**Files to modify**:
- `components/footer.tsx` - Remove PerformanceWidget import and usage
- `app/layout.tsx` - Remove PerformanceOptimizedLayout wrapper

### Phase 5: Replace Custom Image Optimization

**Why**: Next.js handles this natively and better

**Files to delete**:
- `/components/optimized-image.tsx`
- `/lib/image-optimizer.ts`

**Files to modify**:
- `components/about.tsx` - Replace `OptimizedImage` with `next/image`

### Phase 6: Fix Next.js Image Configuration

**Why**: Currently disabled (`unoptimized: true`), preventing Next.js optimization

**Update** `next.config.mjs`:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Phase 7: Optimize 3D Cube (Keep Feature)

**Why**: Keep the cube as requested, but lazy load to save ~600KB from initial bundle

**Update** `components/3d-cube.tsx` usage:
- Wrap with `next/dynamic` and `ssr: false`
- Loads only when needed, not on initial page load

### Phase 8: Clean Dependencies

**Why**: Remove unused/wrong packages

**Remove from package.json**:
- `vue-router` - Vue library in a React app (mistake!)
- `recharts` - Only used by performance dashboard
- `@emotion/is-prop-valid` - Unused
- `@vercel/speed-insights` - Third-party tracking

**Run**: `npm uninstall vue-router recharts @emotion/is-prop-valid @vercel/speed-insights`

### Phase 9: Remove Vercel Speed Insights

**Files to modify**:
- `app/layout.tsx` - Remove SpeedInsights import and `<SpeedInsights />` component

### Phase 10: Final Verification

**Test everything**:
- Run `npm run build` to verify no errors
- Test all portfolio sections render
- Verify images load properly with Next.js optimization
- Check 3D cube still works (lazy loaded)
- Test theme switching
- Verify navigation and scroll progress work
- Test contact section displays properly

---

## Summary of Changes

### Files to DELETE (15 total):
1. `components/email-template-builder.tsx`
2. `components/email-preview-modal.tsx`
3. `components/link-preview-tester.tsx`
4. `components/performance-dashboard.tsx`
5. `components/performance-widget.tsx`
6. `components/performance-optimized-layout.tsx`
7. `components/optimized-image.tsx`
8. `lib/performance-optimizer.ts`
9. `lib/performance-monitor.ts`
10. `lib/critical-resource-loader.ts`
11. `lib/image-optimizer.ts`
12. `lib/link-preview-generator.ts`
13. `app/api/send-email/route.ts`
14. `app/api/preview/route.tsx`
15. `app/api/analytics/performance/route.ts`

### Files to MODIFY (6 total):
1. `app/page.tsx` - Rebuild with actual portfolio
2. `app/layout.tsx` - Remove wrappers and SpeedInsights
3. `components/footer.tsx` - Remove PerformanceWidget
4. `components/about.tsx` - Use Next.js Image
5. `next.config.mjs` - Enable image optimization
6. `package.json` - Remove dependencies

### Dependencies to UNINSTALL (4 total):
- `vue-router`
- `recharts`
- `@emotion/is-prop-valid`
- `@vercel/speed-insights`

---

## Expected Benefits

### Performance:
- **~400KB+ smaller** initial JavaScript bundle
- **~600KB 3D library** lazy-loaded (not in initial bundle)
- **Faster initial page load** (no monitoring overhead)
- **Better Core Web Vitals** (optimized images)
- **Improved Lighthouse scores**

### Code Quality:
- **~1,742 lines** of code removed
- **15 files** deleted
- **Simpler, cleaner** codebase
- **Follows Next.js 15** best practices
- **No redundant abstractions**

### Functionality:
- ✅ **Working portfolio** (currently broken!)
- ✅ **Keeps 3D cube** (your favorite feature)
- ✅ **Contact info displayed** (no server needed)
- ✅ **Proper image optimization**
- ✅ **All portfolio sections visible**

---

## Risk Assessment

### Low Risk (Safe):
- Removing unused email components
- Removing testing components
- Cleaning up dependencies
- Removing vue-router (wrong framework)

### Medium Risk (Test thoroughly):
- Replacing OptimizedImage component
- Lazy loading 3D cube
- Modifying footer and layout

### High Risk (Currently broken anyway):
- Rebuilding page.tsx (currently shows test component only)
- Enabling image optimization (need to test all images)

### Mitigation Strategy:
- Work in phases
- Test after each phase
- Keep ability to rollback
- Verify build passes before moving forward

---

## Post-Refactoring Next Steps

Once refactoring is complete, consider:

### 1. Fix build configuration (Phase 11 - Optional):
- Remove `ignoreDuringBuilds: true` from eslint
- Remove `ignoreBuildErrors: true` from typescript
- Fix any revealed errors properly

### 2. Add production features:
- Implement contact form (with form service like Formspree)
- Add Google Analytics (if desired)
- Add sitemap.xml and robots.txt
- Update domain in metadata

### 3. Performance optimization:
- Consider SSG for static sections
- Add loading states
- Implement error boundaries

---

**Ready to proceed?** Once approved, I'll execute all 10 phases, test the build, and report results.
