# Virasat — product plan and business model

Virasat is a heritage companion: learn about a monument (3D, AR, photos, audio,
books), then plan a visit to it (what to see nearby, where to stay, how to get
there) — all in one place, free for students and teachers.

## What exists today

| Area | Status |
| --- | --- |
| Six monuments with history, timeline, 8-photo galleries | Live |
| 3D models with AR on phones, guided tours with narration | Live |
| Plan your visit: map of nearby places, stays, directions, best time, hours | Live |
| Heritage Library: 18 titles, order through Virasat or buy online | Live |
| Accounts: email and password sign-in, Google optional | Live |
| My account: book orders, saved trip | Live |
| Admin dashboard: orders, partner clicks, users and roles, content overview | Live |
| Backend: Netlify Blobs store (no external database) | Live |

## How Virasat makes money

1. **Hotel referrals (Booking.com Affiliate Partner Programme).** Every stay
   links through `/go/stay/<id>`, which counts the click and opens Booking.com
   with our affiliate id. Booking.com pays a share of its commission on
   completed stays. *Action:* apply at Booking.com Affiliate Partner Centre,
   then set `BOOKING_AFFILIATE_ID` in Netlify.
2. **Book sales.** Two routes: (a) "Buy online" goes to Amazon.in with an
   Associates tag (set `AMAZON_ASSOCIATE_TAG`); (b) "Order through Virasat"
   collects a delivery request that the team fulfils through a partner
   bookshop or distributor at a margin, with bulk pricing for school libraries.
3. **Schools and institutions (next).** A paid classroom plan: teacher
   dashboard, worksheets and quizzes per monument, offline 3D packs, invoices.
   The content stays free for individual learners.
4. **Local experiences (later).** Licensed guides, heritage walks and craft
   workshops near each monument, booked through partners such as GetYourGuide
   or local operators, on commission.
5. **Government and tourism boards (later).** White-label 3D and AR kiosks for
   site museums and state tourism portals.

## Plan of action

### Next 2 weeks — launch-ready
- Set `AUTH_SECRET`, `ADMIN_EMAILS`, `BOOKING_AFFILIATE_ID` and
  `AMAZON_ASSOCIATE_TAG` in Netlify.
- Order emails: confirmation to the reader and an alert to the team
  (Resend or Netlify Email integration).
- Privacy policy, terms and an affiliate disclosure page.
- Analytics (Plausible or PostHog) on monument views, AR launches and
  partner clicks.

### Weeks 3–6 — grow the catalogue
- Add five more monuments (Qutub Minar, Khajuraho, Sanchi, Mahabalipuram,
  Hawa Mahal) with photos, travel guides and books.
- Guided-tour landmarks on the detailed and scanned models, not only on the
  Virasat reconstructions.
- Hindi interface, then Tamil, Telugu, Bengali and Marathi.
- Itinerary builder: turn a saved trip into a day-by-day plan with travel
  times, shareable by link and printable.

### Months 2–3 — scale the backend
- Move from Netlify Blobs to Postgres (Neon or Supabase) through the existing
  Prisma schema once there are more than a few thousand users or orders.
- Content editor in the admin dashboard (monuments, photos, places, stays,
  books) writing to the database instead of `data/` files.
- Online payment for library orders (Razorpay) with GST invoices.
- School plan pilot with three schools; teacher accounts and class codes.

### Months 4–6 — mobile and partnerships
- Installable app (PWA first, then React Native) with offline monument packs.
- Apply for partnerships with the ASI and state tourism boards; museum
  kiosk pilot.
- Local experiences marketplace.

## Running the backend

- **Local:** data is written to `.data/*.json` (git-ignored). Add your email
  to `ADMIN_EMAILS` in `.env.local` to see the admin dashboard.
- **Netlify:** data is written to Netlify Blobs automatically (Site →
  Blobs in the Netlify UI shows the stores `virasat-users`, `virasat-orders`,
  `virasat-saved`, `virasat-clicks`).
