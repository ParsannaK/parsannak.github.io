# Parsanna Koirala Portfolio

Revamped personal portfolio built with React, Vite, and TypeScript.

## Stack

- React + TypeScript + Vite
- `@react-three/fiber` + `@react-three/drei` for 3D hero interaction
- Typed local content model for projects, skills, experience, and contact details

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Content Updates

Update structured site content in:

- `src/content/siteContent.ts`

Runtime validation for required fields and links is enforced from:

- `src/content/validateContent.ts`

## Resume

- Replace `public/resume.pdf` with the latest resume file.
- The site includes both embedded preview and download support.

## Deployment

A GitHub Actions workflow deploys the built site to GitHub Pages on pushes to `main`:

- `.github/workflows/deploy.yml`
