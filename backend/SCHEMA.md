# PocketBase Schema: Rise

## Collections

### 1. `users` (System)
- `username`: string
- `email`: email
- `weight`: number (default: 73.0)
- `protein_goal`: number (default: 120)
- `water_goal`: number (default: 2500)
- `ramadan_mode`: bool (default: false)
- `level`: number (1-10)
- `thigh_focus`: bool (default: true)

### 2. `exercises`
- `name`: string
- `type`: select (push, pull, lower, core)
- `difficulty`: select (beginner, intermediate, advanced)
- `demo_url`: url (GIF/Video)
- `instructions`: text
- `target_muscles`: json
- `tempo`: string (e.g., "3-1-1")

### 3. `daily_logs`
- `user`: relation (users)
- `date`: date
- `protein_intake`: number
- `water_intake`: number
- `weight`: number
- `workout_completed`: bool
- `fasting_log`: json (Ramadan specific data)

### 4. `workout_sessions`
- `user`: relation (users)
- `exercise`: relation (exercises)
- `sets`: json (e.g., [{"reps": 12, "rpe": 8}, ...])
- `date`: date
- `completed`: bool
