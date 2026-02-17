# PocketBase Schema: Rise

## Collections

### 1. `users` (System)
- `username`: string
- `email`: email
- `weight`: number (73.0)
- `protein_goal`: number (120)
- `water_goal`: number (2500)
- `ramadan_mode`: bool
- `protein_current`: number
- `water_current`: number

### 2. `exercises`
- `name`: string
- `target_muscle`: string
- `demo_video`: url
- `cues`: json (text array)
- `tempo`: string (e.g. 3-1-1)

### 3. `workouts`
- `name`: string
- `description`: text
- `exercises`: relation (multiple exercises)
- `difficulty`: select (beginner, intermediate, advanced)
- `category`: select (push, pull, legs, core, fullbody)

### 4. `workout_logs`
- `user`: relation (users)
- `workout`: relation (workouts)
- `session_data`: json (the sets/reps/rpe recorded)
- `duration_minutes`: number
- `date`: date

### 5. `daily_stats`
- `user`: relation (users)
- `date`: date
- `weight`: number
- `protein_intake`: number
- `water_intake`: number
- `ramadan_noted`: bool
