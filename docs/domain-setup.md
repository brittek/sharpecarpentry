# Custom Domain Configuration — sharpecarpentry.com.au

This guide explains how to connect **sharpecarpentry.com.au** to the static site that lives in this repository using GitHub Pages. It covers repository settings and registrar (GoDaddy) DNS changes so the apex domain (`sharpecarpentry.com.au`) and `www` subdomain both resolve to the deployed site.

---

## 1. Repository configuration

1. Commit a [`CNAME`](../CNAME) file at the repository root containing `sharpecarpentry.com.au` (already included in this update). GitHub Pages will read this file and automatically enforce the custom domain.
2. In GitHub, open **Settings → Pages** and configure:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
   - **Custom domain:** `sharpecarpentry.com.au`
   - Enable **Enforce HTTPS** once the DNS changes below have propagated.
3. Save the settings. GitHub will provision certificates after the DNS changes resolve.

---

## 2. GoDaddy DNS changes

> ⚠️ Leave all existing Microsoft 365 (MX, CNAME, SRV, TXT) records untouched so email continues to work. Only adjust the A record(s) for `@` and the CNAME for `www` if necessary.

1. Sign in to GoDaddy and open **My Products → sharpecarpentry.com.au → DNS**.
2. Update the **apex A record (`@`)**:
   - Delete the current value `35.219.200.8`.
   - Add four separate A records for `@` pointing to GitHub Pages:
     | Host | Type | Value | TTL |
     |------|------|-------|-----|
     | `@` | `A`  | `185.199.108.153` | 1 Hour |
     | `@` | `A`  | `185.199.109.153` | 1 Hour |
     | `@` | `A`  | `185.199.110.153` | 1 Hour |
     | `@` | `A`  | `185.199.111.153` | 1 Hour |
3. Confirm the **`www` record**:
   - Preferred: `Type=CNAME`, `Host=www`, `Points to=<github-account>.github.io.` (example: `brittek-digital.github.io.`), TTL 1 Hour.
   - If you keep the current alias `www → sharpecarpentry.com.au`, ensure the apex record above resolves correctly first to avoid loops.
4. Save all changes. DNS propagation can take up to an hour (usually much faster with GoDaddy).

---

## 3. Verification checklist

Run the following checks after DNS updates:

```bash
dig sharpecarpentry.com.au +noall +answer
dig www.sharpecarpentry.com.au +noall +answer
```

Both queries should return GitHub Pages IP addresses or CNAME to `<github-account>.github.io`.

In the GitHub Pages settings page, wait for HTTPS provisioning to complete. Once "Certificate is ready" appears, enable **Enforce HTTPS**.

---

## 4. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| GitHub Pages warns about "Another site is using this domain" | DNS still points to an old host | Double-check A/CNAME records and wait for TTL expiry |
| `www` works but apex does not | Missing GitHub A records | Ensure all four A records exist | 
| Apex works but `www` loops | `www` CNAME points back to apex before apex resolves | Update `www` CNAME to `<github-account>.github.io.` |
| HTTPS not available | Certificate not issued yet | Wait for DNS propagation, then toggle **Enforce HTTPS** |

Once the above is complete, both `https://sharpecarpentry.com.au/` and `https://www.sharpecarpentry.com.au/` should load the site served from this repository.
