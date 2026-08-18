# HeritageVerse

**A production-ready digital platform for preserving and exploring India's cultural heritage through modern web, AR, and VR experiences.**

![HeritageVerse](public/images/readme-banner.jpg)

---

## 🌟 Project Overview

HeritageVerse is a scalable, team-friendly base platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides:

- A rich, searchable directory of India's heritage sites
- Detailed site pages with timelines, galleries, and cultural context  
- A 3D viewer architecture ready for Three.js / React Three Fiber integration
- AR and VR placeholder components for WebXR integration
- An admin dashboard foundation for content management
- A RESTful API layer with Prisma ORM ready for PostgreSQL

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| ORM | Prisma |
| Database | PostgreSQL |
| 3D (future) | Three.js / React Three Fiber |
| AR/VR (future) | WebXR Device API |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL (for full database features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/heritageverse.git
cd heritageverse

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/heritageverse"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STORAGE_URL="http://localhost:3000"
```

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes (for DB features) |
| `NEXT_PUBLIC_APP_URL` | App URL for OpenGraph/SEO | Yes |
| `NEXT_PUBLIC_STORAGE_URL` | CDN/storage base URL | Yes |

---

## 🗄 Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (requires DATABASE_URL)
npx prisma migrate dev --name init

# Open Prisma Studio to browse data
npx prisma studio
```

> **Note:** The app currently runs on **in-memory sample data** and does NOT require a database connection. Connect the database when you're ready to go to production.

### Switching from Sample Data to Database

In `lib/services/heritage.service.ts`, replace each function's implementation with the commented Prisma calls. Look for `// TODO:` comments.

---

## 📁 Folder Structure

```
heritageverse/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── explore/page.tsx          # Heritage directory
│   ├── heritage/[slug]/page.tsx  # Site detail page
│   ├── experience/[slug]/page.tsx # 3D experience page
│   ├── about/page.tsx            # About page
│   ├── admin/page.tsx            # Admin dashboard
│   ├── api/heritage/             # REST API routes
│   ├── not-found.tsx             # 404 page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global design system
│
├── components/
│   ├── ui/                       # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Spinner.tsx
│   │   └── EmptyState.tsx
│   ├── layout/                   # Page structure components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageWrapper.tsx
│   ├── heritage/                 # Heritage-specific components
│   │   ├── HeritageCard.tsx
│   │   ├── HeritageGrid.tsx
│   │   ├── HeritageHero.tsx
│   │   ├── HeritageTimeline.tsx
│   │   ├── HeritageGallery.tsx
│   │   ├── HeritageInfo.tsx
│   │   └── RelatedSites.tsx
│   └── experience/               # 3D/AR/VR components
│       ├── ExperienceViewer.tsx  # ← Three.js Canvas goes here
│       ├── ViewerControls.tsx
│       ├── ExperienceInfo.tsx
│       ├── ARPlaceholder.tsx
│       └── VRPlaceholder.tsx
│
├── lib/
│   ├── db/prisma.ts              # Prisma client singleton
│   ├── services/
│   │   └── heritage.service.ts  # Business logic layer
│   └── utils/
│       ├── index.ts              # cn(), slugify, etc.
│       └── filters.ts            # Filter option constants
│
├── data/
│   └── sample-heritage-sites.ts  # Demo data (5 sites)
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── public/
│   ├── images/                   # Heritage site images
│   └── models/                   # 3D model files (.glb/.gltf)
│
├── .env.example                  # Environment variable template
└── README.md
```

---

## ➕ How to Add a New Heritage Site

### Option A: Add to Sample Data (no database needed)

1. Open `data/sample-heritage-sites.ts`
2. Add a new entry to the `sampleHeritageSites` array following the existing format
3. The site will appear immediately in the Explore page and be accessible at `/heritage/your-slug`

### Option B: Via Database (when connected)

```bash
# Use Prisma Studio
npx prisma studio
# Navigate to HeritageSite → Add record

# Or via the API
curl -X POST http://localhost:3000/api/heritage \
  -H "Content-Type: application/json" \
  -d '{ "name": "Mysore Palace", "slug": "mysore-palace", ... }'
```

---

## 🎮 How to Add a 3D Model

1. Place your `.glb` or `.gltf` file in `public/models/`
2. Link it to a heritage site via the `ThreeDModel` schema or sample data
3. In `components/experience/ExperienceViewer.tsx`, find the comment:
   ```
   /* Three.js Canvas goes here */
   ```
4. Replace the placeholder div with a `<Canvas>` from `@react-three/fiber`:

```tsx
// Install first: npm install three @react-three/fiber @react-three/drei
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Replace the placeholder with:
<Canvas camera={{ position: [0, 2, 5] }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 5]} />
  <Model url="/models/taj-mahal.glb" />
  <OrbitControls />
  <Environment preset="sunset" />
</Canvas>
```

---

## 📄 How to Create a New Page

1. Create a file in `app/your-page/page.tsx`
2. Use the `PageWrapper` and `Section` layout primitives:

```tsx
import { PageWrapper, Section, SectionHeader } from "@/components/layout/PageWrapper";

export default function YourPage() {
  return (
    <PageWrapper>
      <Section>
        <SectionHeader title="Your Title" subtitle="Description" />
        {/* Content */}
      </Section>
    </PageWrapper>
  );
}
```

3. Add metadata export for SEO:
```tsx
export const metadata: Metadata = {
  title: "Your Page",
  description: "Page description",
};
```

---

## 👥 Team Development Guide

This codebase is designed for parallel team development. Here's who should work on what:

### Frontend / UI Developer
- `components/ui/` — Design system primitives
- `app/globals.css` — Design tokens and animations
- `components/layout/` — Navbar, Footer, layouts

### Database / Backend Developer
- `prisma/schema.prisma` — Schema changes
- `lib/services/heritage.service.ts` — Replace sample data with Prisma
- `lib/db/prisma.ts` — Database connection
- `app/api/` — API routes

### 3D / Three.js Developer
- `components/experience/ExperienceViewer.tsx` — Insert Canvas here
- `public/models/` — Place GLB files here
- Install: `npm install three @react-three/fiber @react-three/drei`
- The `ViewerControls` callbacks in ExperienceViewer are already wired for you

### AR / VR Developer
- `components/experience/ARPlaceholder.tsx` — Replace with WebXR AR
- `components/experience/VRPlaceholder.tsx` — Replace with WebXR VR session
- Reference: [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)

### Content / Data Manager
- `data/sample-heritage-sites.ts` — Add real data here
- `public/images/heritage/` — Add real photography
- Run `npx prisma studio` once DB is connected to manage content

### Admin Dashboard Developer
- `app/admin/page.tsx` — Extend with real CRUD operations
- Connect to API routes in `app/api/`
- Add authentication (NextAuth.js recommended)

---

## 🌐 Future AR/VR Integration Plan

### Phase 1 (Current) — Web Platform
- ✅ Heritage directory with rich site pages
- ✅ 3D viewer placeholder structure
- ✅ AR/VR placeholder components
- ✅ REST API foundation

### Phase 2 — 3D Integration
```
npm install three @react-three/fiber @react-three/drei
```
- Replace `ExperienceViewer.tsx` placeholder with `<Canvas>`
- Upload `.glb` models to `public/models/` or cloud storage
- Implement model LOD (Level of Detail) for performance

### Phase 3 — AR Mode
- Use [WebXR Augmented Reality Module](https://immersive-web.github.io/webxr-ar-module/)
- Or integrate [8th Wall](https://www.8thwall.com/) for broader device support
- Replace `ARPlaceholder.tsx` with real `<ARViewer>` component

### Phase 4 — VR Tours
- Use WebXR VR session via `@react-three/xr`
- Create 360° panorama assets for each heritage site
- Replace `VRPlaceholder.tsx` with `<VRTour>` component

---

## 🔗 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/heritage` | Get all sites (paginated) |
| GET | `/api/heritage?query=taj` | Search sites |
| GET | `/api/heritage?region=North+India` | Filter sites |
| GET | `/api/heritage/[slug]` | Get site by slug |
| POST | `/api/heritage` | Create new site |
| PUT | `/api/heritage/[slug]` | Update site |
| DELETE | `/api/heritage/[slug]` | Delete site |

---

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint

npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run database migrations
npx prisma studio    # Open database GUI
```

---

## 📝 License

MIT — Built for India's heritage, for everyone.
