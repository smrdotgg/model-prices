# Agent Guidelines for model-prices-tr

## Build/Test Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (runs vite build && tsc)
- `npm run test` - Run all tests with vitest
- `npm run serve` - Preview production build

## Code Style & Conventions
- **TypeScript**: Strict mode enabled, use proper types (avoid `any`)
- **Imports**: Use `@/` alias for src imports, group external imports first
- **Components**: Use default exports for components, PascalCase naming
- **Styling**: TailwindCSS classes, use `className` prop
- **State**: Use React hooks (useState, useEffect), prefer functional components
- **Routing**: TanStack Router with file-based routing in src/routes/
- **UI Components**: Use shadcn/ui components, install with `pnpx shadcn@latest add <component>`

## Project Structure
- Components in `src/components/` with ui/ subfolder for shadcn components
- Routes in `src/routes/` with file-based routing
- Types in separate files (e.g., data-type.ts)
- Use theme provider for dark/light mode support

## Error Handling
- Throw errors in loaders for route-level error handling
- Use proper TypeScript types instead of `any`
- Handle async operations with proper error boundaries