# Keyboard Configurator

Static keyboard configurator and reference library.

## GitHub Pages

- Entry point: `index.html`
- Reference pages: `Pages/*.html`
- Shared reference styling/scripts: `Pages/shared-page.css`, `Pages/shared-theme.js`
- Image assets: `Reference Library/`
- `.nojekyll` is included so GitHub Pages serves folders and files exactly as they are named.

The site is intentionally static and uses relative paths, so it can be served from GitHub Pages without a build step.

## Local Checks

If Node.js is available, run:

```bash
npm run validate
```

The validator checks active HTML pages for parseable inline JavaScript and missing local static file references. It does not require any npm dependencies.
