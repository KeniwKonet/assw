# ASSW Nigeria — website & SCCN enterprise portal

Institutional website for the **Association for Students’ Social Welfare Nigeria (ASSW)** with the **Students Chamber of Commerce Nigeria (SCCN)** integrated as its flagship enterprise initiative: public site, Student Enterprise Catalogue, Opportunity Desk, member/founder portals and an admin layer.

Built with **React 18 + Vite + React Router**. Styling is a single token-based stylesheet (`src/styles/assw.css`) using the colours from the official ASSW logo.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

Deploys as a static SPA. `vercel.json` (Vercel) and `public/_redirects` (Netlify) route every path to `index.html`.

## Demo logins (mock data layer)

| Email | Opens |
|---|---|
| `founder@example.com` | Enterprise Portal (approved member, Ìrẹ̀sí Kitchen) |
| `admin@assw.ng` | Admin |
| any other email | Member Portal |

Any password works. Data is stored in `localStorage` under `assw-mvp-v1`; clear site data to reset.

## Routes

**Public:** `/`, `/about`, `/what-we-do`, `/sccn`, `/catalogue`, `/catalogue/:slug`, `/register-business`, `/membership`, `/opportunities`, `/opportunities/:slug`, `/programmes`, `/impact`, `/get-involved`, `/news`, `/contact`, `/verify`, `/policies/:key`

**Portal:** `/auth` (sign in, create account, reset, verify), `/apply` (10-step enterprise application with save-and-resume), `/payment`, `/portal/enterprise`, `/portal/member`, `/certificate/:no`

**Admin:** `/admin`, `/admin/registry`, `/admin/review/:id`, `/admin/opportunities`, `/admin/payments`, `/admin/content`

**Design system:** `/style-guide`

## Working end-to-end flow

Create a founder account → verify → complete the application (validated per step, autosaved) → pay (simulated gateway with success/failure) → admin reviews (readiness assessment, approve/correct/decline with a required reason, audit log) → an SCCN number and certificate are issued → the founder previews and publishes the listing → the number verifies at `/verify`.

## Structure

```
src/
  components/   Header, Footer, Brand (logo/sticker), Icons, UI (Field, Note, Tabs…), Cards, Shells (admin/flow layouts)
  data/         site constants, categories, sample businesses, opportunities, programmes, news
  lib/store.js  mock API + localStorage persistence (replace with real API)
  lib/admin.js  registry helpers, status labels
  pages/        public/, portal/, admin/, StyleGuide.jsx
public/brand/   ASSW logo (full, white, mark) and favicons
```

## Backend handoff

`src/lib/store.js` is the only place that touches data. Each exported function maps to an API endpoint:

| Function | Suggested endpoint |
|---|---|
| `signIn`, `signUp`, `signOut` | `POST /auth/login`, `POST /auth/register`, `POST /auth/logout` (+ email verification, MFA for admins) |
| `saveDraft`, `submitApplication` | `PUT /applications/draft`, `POST /applications` |
| `startPayment` | `POST /payments/init` → Paystack/Flutterwave checkout URL + unique reference |
| `confirmPayment` | **Server-side only:** gateway webhook `POST /webhooks/paystack` verifies and updates status |
| `decide`, `updateApp` | `POST /admin/applications/:id/decision` (role: Enterprise Reviewer), audit-logged |
| `setPublished` | `POST /applications/:id/publication` (founder consent) |
| `recordEnquiry` | `POST /enquiries` (rate-limited, anti-spam) |
| `verifyNumber` | `GET /verify/:no` (public status only) |

Catalogue, opportunity and programme data in `src/data/` should come from the CMS/API. Opportunity status is derived from the deadline (`oppStatus`), so expired calls are never shown as open.

## Before launch (from the brief)

Everything marked `[…]` or with a **“pending / to be confirmed”** flag needs ASSW approval: legal name, impact figures (metrics register), the ₦5,000 contribution terms, payment gateway, leadership names and photos, partner logos and wording, programme facts, policies (Privacy Notice, Terms, Catalogue Listing Terms) and the age policy. Sample businesses and opportunities are placeholders for development.

Accessibility target: WCAG 2.2 AA (labelled fields, keyboard-operable controls, visible focus, text + colour statuses, reduced-motion support).
