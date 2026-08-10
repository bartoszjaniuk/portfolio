# Launch domain checklist (`bjaniuk.com`)

Canonical production URL: **https://bjaniuk.com**

## A. DNS → Vercel

1. Add the domain in Vercel: Project → **Settings** → **Domains** → `bjaniuk.com`.
2. Prefer one canonical host (apex `bjaniuk.com`). Point `www` to the apex with a redirect if you add it.
3. At your registrar, create the records Vercel shows (typically an `A` / `ALIAS` for apex and `CNAME` for `www`).
4. Wait until SSL shows as valid in Vercel.

## B. Production environment variables

Set these on Vercel (Production):

| Variable                        | Value                                 |
| ------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | `https://bjaniuk.com`                 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id                     |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`                          |
| `RESEND_API_KEY`                | Resend API key                        |
| `CONTACT_EMAIL_TO`              | Inbox that receives contact form mail |

Optional: `NEXT_PUBLIC_SANITY_STUDIO_URL` for Visual Editing / Studio URL.

## C. Verify the sending domain in Resend

The contact form sends as `Contact <noreply@bjaniuk.com>` ([`lib/actions/send-contact-email.ts`](../lib/actions/send-contact-email.ts)). Resend must verify `bjaniuk.com` first.

1. Sign in at [resend.com](https://resend.com) → **Domains** → **Add Domain** → `bjaniuk.com`.
2. Add the DNS records Resend displays (usually DKIM `CNAME`s, SPF `TXT`, optional DMARC `_dmarc` `TXT`).
3. Click **Verify**. Status must be **Verified**.
4. On production, submit the contact form once.
5. Confirm mail arrives at `CONTACT_EMAIL_TO` and that **Reply-To** is the visitor’s address.

Until verification succeeds, Resend may reject sends from `@bjaniuk.com`. Do not fall back to `onboarding@resend.dev` for a public form — that address can only deliver to the Resend account owner.

## D. Sanity / brand sync

After go-live, align CMS fields with the canonical domain:

- `siteSettings.person.url` → `https://bjaniuk.com`
- Remove nav item `#offer` if still present

Safe patch (dry-run first):

```bash
cd sanity
bun run patch-nav-launch -- --dry-run
bun run patch-nav-launch -- --confirm
```

Requires `SANITY_API_WRITE_TOKEN`.

## E. Crawl surfaces

After deploy, verify:

- https://bjaniuk.com/robots.txt — allows `/`, disallows `/*/workbench`, points at sitemap
- https://bjaniuk.com/sitemap.xml — only `/en` and `/pl` homepage URLs
- Workbench pages include `noindex` metadata
