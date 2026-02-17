const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const path = require('path');

// Configuration
const PB_URL = process.env.PB_URL || 'https://rise-production-c348.up.railway.app';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

async function seed() {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.error('❌ Please set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD environment variables.');
        process.exit(1);
    }

    try {
        console.log('🔗 Connecting to PocketBase at:', PB_URL);

        // 1. Authenticate
        const authRes = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        });

        if (!authRes.ok) {
            const err = await authRes.json();
            console.error('❌ Authentication failed:', err.message);
            return;
        }

        const { token } = await authRes.json();
        console.log('✅ Authenticated as admin.');

        const exercisesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'EXERCISES.json'), 'utf8'));

        for (const workoutGroup of exercisesData) {
            console.log(`\n📦 Processing workout: ${workoutGroup.name}`);

            const exerciseIds = [];

            for (const ex of workoutGroup.exercises) {
                // Try to find if exercise exists
                const listRes = await fetch(`${PB_URL}/api/collections/exercises/records?filter=(name='${ex.name}')`, {
                    headers: { 'Authorization': token }
                });
                const listData = await listRes.json();

                if (!listData.items) {
                    console.error(`  ❌ Collection "exercises" not found. did you import collections.json?`);
                    console.error('  Response:', JSON.stringify(listData));
                    return;
                }

                let exerciseId;
                const exerciseBody = {
                    name: ex.name,
                    target_muscle: ex.target,
                    demo_video: ex.video,
                    cues: ex.cues,
                    tempo: ex.tempo
                };

                if (listData.items.length > 0) {
                    exerciseId = listData.items[0].id;
                    await fetch(`${PB_URL}/api/collections/exercises/records/${exerciseId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify(exerciseBody)
                    });
                    console.log(`  ↻ Updated exercise: ${ex.name}`);
                } else {
                    const createRes = await fetch(`${PB_URL}/api/collections/exercises/records`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify(exerciseBody)
                    });
                    const createdNode = await createRes.json();
                    exerciseId = createdNode.id;
                    console.log(`  + Created exercise: ${ex.name}`);
                }
                exerciseIds.push(exerciseId);
            }

            // Create or update workout
            const workoutListRes = await fetch(`${PB_URL}/api/collections/workouts/records?filter=(name='${workoutGroup.name}')`, {
                headers: { 'Authorization': token }
            });
            const workoutListData = await workoutListRes.json();

            const workoutBody = {
                name: workoutGroup.name,
                description: workoutGroup.description,
                exercises: exerciseIds,
                category: workoutGroup.id.includes('push') ? 'push' : (workoutGroup.id.includes('lower') ? 'legs' : 'fullbody'),
                difficulty: 'beginner'
            };

            if (workoutListData.items.length > 0) {
                await fetch(`${PB_URL}/api/collections/workouts/records/${workoutListData.items[0].id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(workoutBody)
                });
                console.log(`  ↻ Updated workout: ${workoutGroup.name}`);
            } else {
                await fetch(`${PB_URL}/api/collections/workouts/records`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(workoutBody)
                });
                console.log(`  + Created workout: ${workoutGroup.name}`);
            }
        }

        console.log('\n✨ Database seeding completed successfully!');

    } catch (error) {
        console.error('\n❌ Unexpected error:', error.message);
    }
}

seed();
