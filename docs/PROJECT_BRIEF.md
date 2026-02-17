# Project Brief: Rise (The Muscle-Recom App)

## 👤 User Context
- **Current Stats:** 73kg (Gained from 67kg after a peak loss from 100kg).
- **Goal:** Body Recomposition. Moving from "light but soft" to a muscular, toned physique.
- **Constraints:** No workout equipment, home-based training, limited space.

---

## 💪 Training Strategy: "Mechanical Tension"
Without external weights, the app will focus on **Progressive Overload** via body mechanical manipulation.

### 1. The Core Pillars
*   **Push:** Mastering push-up variations to build chest, shoulders, and triceps.
*   **Pull:** Creative back training using furniture (Table Rows, Doorway Rows, Reverse Plank).
*   **Legs:** Unilateral work (Split squats) to double the effective bodyweight load.
*   **Running:** Zone 2 Steady State (Cardiovascular health & fat management) - 2-3x weekly.
## 🌙 Special Adaptation: Ramadan Mode
During Ramadan, the plan shifts to **Maintenance & Steady Growth**. 

| Aspect | Ramadan Strategy |
| :--- | :--- |
| **Workout Time** | 1 Hour before Iftar (30 min sessions) OR 2 Hours after Iftar. |
| **Exercise Intensity** | Focus on **Tempo (3-1-1)** rather than high reps. Quality over quantity. |
| **Nutrition (Iftar)** | Start with dates/water, then high-protein main meal (40-50g protein). |
| **Nutrition (Suhoor)** | Essential "Slow Protein" (Casein/Eggs) to maintain muscle while fasting. |
| **Water** | Drink 500ml every hour between Iftar and Suhoor to hit the customized goal. |

### 2. The Tempo Rule
To stimulate hypertrophy (muscle growth) without weights, all movements follow a **3-1-1 Tempo**:
- 3 seconds on the eccentric (lowering)
- 1 second pause at the bottom (maximum stretch)
- 1 second explosive concentric (push/pull)

---

## 🥗 Nutrition: "The 120g Protein Protocol"
- **Daily Target:** approx. 120g Protein (1.6g per kg of body weight).
- **Water Intake:** Goal-based tracking with **Weather Sync**. Baseline is 35ml/kg (approx 2.5L for 73kg), automatically adjusted (+500ml to +1L) based on workout intensity and local **Humidity/Climate** data.
- **Calories:** Focus on "Maintenance+". Enough to fuel hard workouts without aggressive fat gain.
- **Tracking:** The app will prioritize Protein and Water Tracking over total calorie counting to simplify the user experience.

---

## 🔔 Notifications & Engagement
- **Provider:** Firebase Cloud Messaging (FCM).
- **Triggers:**
    - **Hydration Alerts:** Smart reminders throughout the day to drink water (Paused during fasting hours in Ramadan Mode).
    - **Workout Reminders:** Nudges to start your session based on your preferred time.
    - **Protein Check-ins:** Reminders to log protein intake between Iftar and Suhoor.

---

## 🌙 Ramadan Mode
The app will feature a dedicated toggle to adapt your journey for the Holy Month.
- **Dynamic Timers:** Smart countdowns to Iftar and Suhoor.
- **Workout Scheduling:** Recommendations for "Pre-Iftar" (Low intensity) or "Post-Iftar" (High intensity) sessions.
- **Hydration Target:** Shifts the Water Goal tracking to the feeding window (Iftar to Suhoor).
- **Nutritional Guidance:** High-protein Suhoor and Iftar logging to ensure the 120g goal is met within the window.
- **The Rise Ritual:** A special notification to wake up for Suhoor with hydration and protein reminders.

---

## 📱 Product Vision: "Native UI Experience"
The goal is to build a web app that **doesn't look or feel like a website**.

### UI/UX Design Principles
- **Aesthetic:** "Midnight Stealth" – Deep charcoal/navy background, Glassmorphic cards, Glowing cyan/electric blue accents.
- **Navigation:** Fixed Bottom Nav Bar (iOS/Android style).
- **Interactions:**
    - Page transitions via Framer Motion (Slide/Fade).
    - Haptic feedback simulations (Scale animations on press).
    - No browser UI visible (Full-screen PWA mode).
- **The "Muscle Map":** A visual representation of the body that highlights which muscle groups were stimulated based on the workout logs.

---

## Current Build Status (v1.1)
- [x] **Core UI Framework:** Midnight Stealth theme & Glassmorphism.
- [x] **Authentication:** PocketBase login/signup logic implemented.
- [x] **Dashboard:** Protein ring, Muscle Map, and Ramadan Countdown.
- [x] **Training Engine:** Live workout session with a 3-1-1 Tempo Guide.
- [x] **Nutrition/Fuel:** Dynamic hydration (Weather-aware) and protein tracking.
- [x] **PWA Foundation:** manifest.json and Service Workers initialized.
- [x] **Backend:** Schema defined and EXERCISES.json seed data created.
- [x] **Evolution Engine:** Progressive overload logic (RPE-based) added.
- [x] **Success Screen:** Premium workout summary and recovery advice.
- [ ] **Cloud Sync:** Linking frontend to live Railway/PocketBase instance.
- [ ] **Weather API:** Plugging in real API keys for humidity-based water goals.
- [ ] **Push Notifications:** Finalizing Firebase messaging setup.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (React) + Tailwind CSS + Framer Motion.
- **Hosting:** Vercel.
- **Backend/Database:** PocketBase (Hosted on Railway).
- **Push Notifications:** Firebase (FCM) for PWA notifications.
- **External APIs:** OpenWeatherMap API (or similar) for Climate/Humidity-based hydration scaling.
- **Architecture:** 
    - Real-time sync for logs and progress via PocketBase.
    - Service Workers for offline support and FCM push notifications.
    - PWA Manifest for "Add to Home Screen" capability.

---

## 🚀 Execution Roadmap
1.  **Phase 1: App Shell & Aesthetics**
    - Initialize Next.js project.
    - Setup Tailwind Config with "Midnight Stealth" palette.
    - Build the Bottom Nav and Basic Glass Card components.
2.  **Phase 2: Database Integration**
    - Setup PocketBase schema (Users, Logs, Exercises).
    - Implement Authentication (Social/Email).
3.  **Phase 3: The Workout Engine**
    - Build the interactive exercise logger with tempo timers.
    - Implement "Level Up" logic for no-equipment variations.
4.  **Phase 4: Diet & Progress**
    - Build the Protein Dashboard.
    - Create the Weight/Progress visualization charts.
5.  **Phase 5: PWA Deployment**
    - Finalize manifest and service workers.
    - Deploy to Vercel/Railway.
