# 🚀 Rise Deployment Guide (v1.2)

This guide will take you from local code to a live, production PWA running on your phone.

---

## Phase 1: Backend Deployment (Railway.app)

Railway will host your **PocketBase** instance using the `Dockerfile` in the `backend/` folder.

1.  **Login to Railway:** Go to [railway.app](https://railway.app/) and sign in with GitHub.
2.  **New Project:** Click `+ New Project` > `Deploy from GitHub repo`.
3.  **Select Repo:** Choose your `acipuns-dot/rise` repository.
4.  **Configure Service:**
    *   Railway will ask for the "Root Directory". Set this to `/backend`.
    *   Railway will detect the `Dockerfile` and start building.
5.  **Add a Domain:**
    *   Go to the **Settings** tab of your new service.
    *   Click **Generate Domain** (e.g., `rise-production.up.railway.app`).
    *   **COPY THIS URL.** You will need it for the frontend.

---

## Phase 2: Frontend Deployment (Vercel.com)

Vercel will host your **Next.js** application.

1.  **Login to Vercel:** Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2.  **Add New:** Click `Add New...` > `Project`.
3.  **Import Repo:** Select your `acipuns-dot/rise` repository.
4.  **Configure Project:**
    *   **Root Directory:** Set this to `frontend`.
    *   **Framework Preset:** Ensure "Next.js" is selected.
5.  **Add Environment Variables:**
    *   Open the `Environment Variables` section.
    *   Add `NEXT_PUBLIC_POCKETBASE_URL`: Paste your Railway URL here.
    *   Add `NEXT_PUBLIC_WEATHER_API_KEY`: Your OpenWeatherMap key.
6.  **Deploy:** Click **Deploy**.

---

### Phase 3: PocketBase Initialization

Once your Railway backend is live:

1.  **Admin Setup:** Go to `https://your-railway-url.up.railway.app/_/` and create your admin account.
2.  **Import Schema:**
    *   Go to **Settings (Gear Icon) > Import Collections**.
    *   Click **Load from JSON** and select `backend/collections.json`.
    *   Review the changes and click **Import**.
3.  **Add User Fields:**
    *   Go to the `users` collection.
    *   Add these fields manually: `weight` (number), `protein_goal` (number), `water_goal` (number), `ramadan_mode` (bool), `protein_current` (number), `water_current` (number).
4.  **Seeding Data (Automated):**
    *   Open your terminal in the project root.
    *   Run: `set PB_ADMIN_EMAIL=your@email.com && set PB_ADMIN_PASSWORD=yourpassword && node backend/seed.js`
    *   This will automatically populate your Exercises and Workouts.

---

## Phase 4: Installing on your Phone (PWA)

1.  Open your Vercel URL (e.g., `rise-fitness.vercel.app`) in **Safari (iOS)** or **Chrome (Android)**.
2.  **iOS:** Tap the "Share" button and select **"Add to Home Screen"**.
3.  **Android:** Tap the three dots and select **"Install App"**.

### 🎉 You are now live!
The app will now behave like a native mobile app with splash screens and full-screen mode.
