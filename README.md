# Sharpe Carpentry Marketing Site

This repository hosts the static marketing page for [sharpecarpentry.com.au](https://sharpecarpentry.com.au/). The site is a single `index.html` document designed to be published via GitHub Pages.

## Editing the site
- Update the copy, imagery, or styling directly inside [`index.html`](index.html).
- No build tools are required—open the file in your editor and commit the changes.

## Local preview
Open the file in a browser:

```bash
# from the repo root
google-chrome index.html
# or use any browser capable of loading a local file
```

## Deployment
1. Push to the `main` branch.
2. GitHub Pages serves the latest commit (configured to use the repository root).

## Custom domain configuration
Use the [`CNAME`](CNAME) file together with the DNS steps documented in [`docs/domain-setup.md`](docs/domain-setup.md) to point **sharpecarpentry.com.au** at this repository.
