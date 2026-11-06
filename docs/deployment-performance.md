# Static asset delivery

The Node adapter serves the prerendered pages and handles `/admin/` and `/api/`.
The application does not own the production reverse proxy, so the proxy must
compress text responses with gzip or Brotli. It must also send
`Cache-Control: public, max-age=31536000, immutable` for fingerprinted `/_astro/`
assets and `Cache-Control: no-cache` for HTML. Apply these settings in the
Coolify proxy configuration before relying on compression or browser caching;
the application build alone does not prove either response header is present.
