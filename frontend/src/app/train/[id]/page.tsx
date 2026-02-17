"use client";

import { useState, useEffect } from "react";
import {
    ChevronLeft,
    Info,
    Clock,
    CheckCircle2,
    ChevronRight,
    Play,
    RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import TutorialModal from "@/components/TutorialModal";

export default function WorkoutSession() {
    const params = useParams();
    const router = useRouter();

    // State for the walkthrough
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [restTimer, setRestTimer] = useState(60);
    const [tempoState, setTempoState] = useState<"down" | "pause" | "up" | "wait">("wait");
    const [tempoCount, setTempoCount] = useState(0);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);

    // ... (workoutData remains the same for now)
    const workoutData = {
        title: "Foundational Push",
        exercises: [
            {
                id: "1",
                name: "Incline Push-ups",
                target: "Upper Chest & Shoulders",
                sets: 3,
                reps: "10-12",
                tempo: "3-1-1",
                instructions: "Hands on a bed or chair. Keep body straight. Lower chest slowly. Pause briefly. Push back up.",
                video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndzR4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxP5O5D6hFe/giphy.gif"
            },
            {
                id: "2",
                name: "Doorway Rows",
                target: "Back & Rear Delts",
                sets: 3,
                reps: "12-15",
                tempo: "2-1-1",
                instructions: "Stand in doorway. Lean back. Pull yourself forward using back muscles.",
                video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndzR4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4NXp4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vWku8YNwyy5FTgop9B/giphy.gif"
            }
        ]
    };

    const currentExercise = workoutData.exercises[currentExerciseIndex];

    // Rest Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isResting && restTimer > 0) {
            interval = setInterval(() => setRestTimer(t => t - 1), 1000);
        } else if (restTimer === 0) {
            setIsResting(false);
            setRestTimer(60);
        }
        return () => clearInterval(interval);
    }, [isResting, restTimer]);

    // Tempo Logic (Visual Aid)
    const startTempo = () => {
        if (tempoState !== "wait") return;
        setTempoState("down");
        setTempoCount(3);
    };

    useEffect(() => {
        if (tempoState === "wait") return;

        const interval = setInterval(() => {
            setTempoCount(prev => {
                if (prev <= 1) {
                    if (tempoState === "down") {
                        setTempoState("pause");
                        return 1;
                    }
                    if (tempoState === "pause") {
                        setTempoState("up");
                        return 1;
                    }
                    if (tempoState === "up") {
                        setTempoState("wait");
                        return 0;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [tempoState]);

    const handleCompleteSet = () => {
        if (currentSet < currentExercise.sets) {
            setCurrentSet(prev => prev + 1);
            setIsResting(true);
        } else {
            if (currentExerciseIndex < workoutData.exercises.length - 1) {
                setCurrentExerciseIndex(prev => prev + 1);
                setCurrentSet(1);
                setIsResting(true);
            } else {
                router.push("/train/success");
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-background overflow-hidden relative">
            <TutorialModal
                isOpen={isTutorialOpen}
                onClose={() => setIsTutorialOpen(false)}
                exercise={currentExercise}
            />

            {/* Absolute Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between">
                <Link href="/train" className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10">
                    <ChevronLeft className="w-5 h-5 text-white" />
                </Link>
                <div className="glass px-4 py-2 rounded-full border border-white/10">
                    <p className="text-[10px] font-black text-electric-cyan uppercase tracking-widest leading-none text-center">
                        Set {currentSet} of {currentExercise.sets}
                    </p>
                </div>
                <button
                    onClick={() => setIsTutorialOpen(true)}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10"
                >
                    <Info className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-end pt-24">
                {/* Exercise Video/Animation Area */}
                <div className="flex-1 max-h-[40vh] relative group overflow-hidden rounded-3xl mx-2">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <img
                        src={currentExercise.video}
                        alt={currentExercise.name}
                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-10 left-6 right-6 z-10">
                        <h1 className="text-3xl font-black text-white italic leading-tight uppercase tracking-tighter">
                            {currentExercise.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="px-2 py-0.5 rounded bg-electric-cyan/20 border border-electric-cyan/30">
                                <span className="text-[9px] font-bold text-electric-cyan uppercase">{currentExercise.tempo} Tempo</span>
                            </div>
                            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{currentExercise.target}</span>
                        </div>
                    </div>
                </div>

                {/* Interaction Area */}
                <div className="glass-card mt-[-20px] rounded-t-[40px] p-8 flex flex-col gap-8 z-20 bg-[#0f1115]/80 border-t border-white/10">
                    {/* Visual Tempo Pulse */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-4 items-center">
                            <div className={`flex flex-col items-center gap-1 opacity-100`}>
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Down</p>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: tempoState === 'down' && tempoCount === (4 - i) ? 1.2 : 1,
                                                backgroundColor: tempoState === 'down' && tempoCount >= (4 - i) ? '#00f5ff' : 'rgba(255,255,255,0.05)'
                                            }}
                                            className="h-1.5 w-6 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Hold</p>
                                <motion.div
                                    animate={{
                                        scale: tempoState === 'pause' ? 1.2 : 1,
                                        backgroundColor: tempoState === 'pause' ? '#00f5ff' : 'rgba(255,255,255,0.05)'
                                    }}
                                    className="h-1.5 w-8 rounded-full"
                                />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Up</p>
                                <motion.div
                                    animate={{
                                        scale: tempoState === 'up' ? 1.2 : 1,
                                        backgroundColor: tempoState === 'up' ? '#00f5ff' : 'rgba(255,255,255,0.05)'
                                    }}
                                    className="h-1.5 w-10 rounded-full"
                                />
                            </div>
                        </div>

                        <div
                            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all h-2 flex items-center ${tempoState !== 'wait' ? 'text-electric-cyan' : 'text-zinc-700'}`}
                        >
                            {tempoState === 'wait' ? 'Tap Play for Tempo' : `${tempoState}${tempoState === 'down' ? ` ${tempoCount}` : ''}`}
                        </div>
                    </div>

                    {/* Rep Counter Display */}
                    <div className="flex items-center justify-around py-2">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Goal</p>
                            <p className="text-3xl font-black text-white italic">{currentExercise.reps}</p>
                        </div>
                        <div className="h-12 w-px bg-white/10" />
                        <button
                            onClick={startTempo}
                            className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all ${tempoState !== 'wait' ? 'bg-electric-cyan/20 border-electric-cyan/50' : 'bg-white/5 border-white/10 hover:bg-white/10 active:scale-95'}`}
                        >
                            {tempoState !== 'wait' ? (
                                <div className="text-electric-cyan font-black text-xl italic">{tempoCount || "!"}</div>
                            ) : (
                                <Play className="w-7 h-7 text-white fill-white" />
                            )}
                        </button>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleCompleteSet}
                        className="h-16 w-full bg-electric-cyan text-black font-black rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-[0_8px_30px_rgba(0,245,255,0.25)]"
                    >
                        <span>LOG COMPLETED SET</span>
                        <CheckCircle2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Rest Overlay (Modal feel) */}
            <AnimatePresence>
                {isResting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="112" cy="112" r="100" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                <motion.circle
                                    initial={{ strokeDashoffset: 628 }}
                                    animate={{ strokeDashoffset: (628 - (restTimer / 60) * 628) }}
                                    cx="112" cy="112" r="100" fill="transparent" stroke="#00f5ff" strokeWidth="6" strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-6xl font-black text-white italic tracking-tighter">{restTimer}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-1">Recovery</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Rise & Recover</h2>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[260px]">
                            Deep breaths. You are building the version of yourself that once struggled at 100kg.
                        </p>

                        <div className="flex gap-4 mt-12 w-full">
                            <button
                                onClick={() => setRestTimer(t => t + 10)}
                                className="flex-1 h-14 glass rounded-2xl border border-white/10 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-white"
                            >
                                <RotateCcw className="w-4 h-4" /> +10s
                            </button>
                            <button
                                onClick={() => setIsResting(false)}
                                className="flex-3 h-14 bg-white text-black rounded-2xl flex items-center justify-center text-[10px] font-black uppercase"
                            >
                                SKIP REST
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
