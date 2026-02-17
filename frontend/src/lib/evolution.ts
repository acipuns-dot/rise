export interface EvolutionStats {
    exerciseId: string;
    previousReps: number;
    previousRPE: number; // 1-10 (Rate of Perceived Exertion)
    history: number[]; // Trend of reps over time
}

export interface ProgressionResult {
    nextReps: number;
    intensityChange: 'none' | 'increase' | 'deload';
    message: string;
}

/**
 * Rise Evolution Engine
 * Calculates the next target based on RPE (Rate of Perceived Exertion)
 */
export function calculateProgression(stats: EvolutionStats): ProgressionResult {
    const { previousReps, previousRPE } = stats;

    // Too Easy (RPE 1-6) -> Increase intensity
    if (previousRPE <= 6) {
        return {
            nextReps: previousReps + 2,
            intensityChange: 'increase',
            message: "Strong performance. Increasing volume to challenge your 73kg frame."
        };
    }

    // Sweet Spot (RPE 7-8) -> Maintain or small increment
    if (previousRPE <= 8) {
        return {
            nextReps: previousReps + 1,
            intensityChange: 'none',
            message: "Perfect tension. Focus on refining tempo today."
        };
    }

    // Near Failure (RPE 9) -> Maintain
    if (previousRPE === 9) {
        return {
            nextReps: previousReps,
            intensityChange: 'none',
            message: "Maximum hypertrophy zone. Solidify this volume."
        };
    }

    // Failure / Overreached (RPE 10) -> Optional Deload
    return {
        nextReps: previousReps,
        intensityChange: 'none',
        message: "Total failure reached. Prioritize 3-1-1 control over extra reps."
    };
}
