# Appcharge Storefront

[![Vercel](https://vercel.com/button)](https://appcharge-alpha.vercel.app)

Live Demo: [https://appcharge-alpha.vercel.app](https://appcharge-alpha.vercel.app)

# Mini Storefront (Appcharge Home Assignment)

A Next.js mini storefront using the Fake Store API, with dynamic product previews, Open Graph images, and modern UI/UX.

---

## 🚀 Setup Instructions

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Create a `.env.local` file in the project root:**

   ```env
   API_BASE_URL=https://fakestoreapi.com
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   - For production, set `NEXT_PUBLIC_BASE_URL` to your deployed URL (e.g. `https://your-app.vercel.app`).

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📝 Notes on Decisions & Known Limitations

### Server-Side Fetching

- **Why?**
  - I use server-side fetching (`getStaticProps`/`getStaticPaths`) for products to ensure fast, SEO-friendly pages and to avoid exposing API keys or logic to the client.
  - Product detail pages are statically generated at build time, and new ones are generated on-demand (ISR/fallback).
  - **Note:** I decided to fetch all products on the server because I assumed SEO is important for this project. If SEO was not a priority and infinite scroll or a modern app-like experience was required, I would use client-side fetching (e.g., with React Query) for paginated or infinite product lists.

### Loading State for Product Details (but not Home Page)

- **Product Details:**
  - I show a skeleton loader when a product page is being generated on-demand (fallback mode). This provides a smooth UX for users who visit a product page that hasn't been pre-rendered yet.
- **Home Page:**
  - No loading state is needed because the home page is always statically generated and instantly available (no client-side fetching).

### Open Graph Images

- OG images are generated dynamically via an API route using `@vercel/og` for rich social sharing previews.

### Known Limitations

- **Localhost OG images** cannot be previewed on Facebook/Twitter; you must deploy to a public URL to test social sharing.
- **No client-side search/filter**: All product fetching is server-side for simplicity.
- **No persistent cart or checkout**: This is a demo storefront, not a full e-commerce solution.
- **No unit tests included**: I did not have time to write unit tests because I needed to learn how Open Graph image generation works and how to use ShadCN/UI components for the first time.

---

## 📚 Tech Stack

- Next.js (Pages Router, TypeScript)
- Tailwind CSS
- ShadCN/UI components
- @vercel/og for dynamic Open Graph images
- Fake Store API

---

## 💡 Further Improvements

- Add tests and CI
