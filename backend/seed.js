const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

// Configuration
const PB_URL = process.env.PB_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

async function seed() {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.error('❌ Please set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD environment variables.');
        process.exit(1);
    }

    const pb = new PocketBase(PB_URL);

    try {
        console.log('🔗 Connecting to PocketBase at:', PB_URL);
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Authenticated as admin.');

        const exercisesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'EXERCISES.json'), 'utf8'));

        for (const workoutGroup of exercisesData) {
            console.log(`📦 Processing workout: ${workoutGroup.name}`);

            const exerciseIds = [];

            for (const ex of workoutGroup.exercises) {
                // Check if exercise exists
                let exerciseRecord;
                try {
                    exerciseRecord = await pb.collection('exercises').getFirstListItem(`name="${ex.name}"`);
                    console.log(`  - Exercise "${ex.name}" already exists. Skipping creation.`);
                } catch (e) {
                    exerciseRecord = await pb.collection('exercises').create({
                        name: ex.name,
                        target_muscle: ex.target,
                        demo_video: ex.video,
                        cues: ex.cues,
                        tempo: ex.tempo
                    });
                    console.log(`  + Created exercise: ${ex.name}`);
                }
                exerciseIds.push(exerciseRecord.id);
            }

            // Create or update workout
            try {
                const existingWorkout = await pb.collection('workouts').getFirstListItem(`name="${workoutGroup.name}"`);
                await pb.collection('workouts').update(existingWorkout.id, {
                    description: workoutGroup.description,
                    exercises: exerciseIds,
                    category: workoutGroup.id.includes('push') ? 'push' : (workoutGroup.id.includes('lower') ? 'legs' : 'fullbody'),
                    difficulty: 'beginner'
                });
                console.log(`  ↻ Updated workout: ${workoutGroup.name}`);
            } catch (e) {
                await pb.collection('workouts').create({
                    name: workoutGroup.name,
                    description: workoutGroup.description,
                    exercises: exerciseIds,
                    category: workoutGroup.id.includes('push') ? 'push' : (workoutGroup.id.includes('lower') ? 'legs' : 'fullbody'),
                    difficulty: 'beginner'
                });
                console.log(`  + Created workout: ${workoutGroup.name}`);
            }
        }

        console.log('\n✨ Database seeding completed successfully!');
    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message);
        if (error.response) console.error('Data:', error.response.data);
    }
}

seed();
