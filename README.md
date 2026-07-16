# JUNSU Aluminum Systems website

Multi-route B2B website for aluminum fence, gate and pergola project inquiries.

## Local development

1. Copy `.env.example` to `.env.local` and add the real domain and mail delivery values.
2. Run `npm install`.
3. Run `npm run dev`.
4. Run `npm run build` before deployment.

## Content locations

- Product, solution, FAQ, search and media-slot content: `lib/site-data.ts`
- Site-wide styling: `app/globals.css`
- Inquiry form UI: `components/InquiryForm.tsx`
- Inquiry validation and email delivery: `app/api/inquiry/route.ts`
- Public images: `public/images/`
- Public video files: `public/media/` (prefer CDN URLs for production videos)

## Media policy

- Hero posters should be WebP or AVIF and ideally below 400 KB.
- Do not preload nonessential videos.
- For video entries, add a poster and set `src` in `lib/site-data.ts` only after the optimized file or CDN URL is ready.
- Use separate mobile and desktop files for autoplay backgrounds. The current implementation uses click-to-load video for the fastest initial page.

## Required before public launch

- Verified domain and company contact details
- Resend API key, verified sender domain and recipient mailbox
- Turnstile anti-spam keys
- Approved factory facts, certificates, project photography and videos
- Approved privacy notice and retention period
- Real catalogs and technical documents
