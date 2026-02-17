"use client";

import {
    Dumbbell,
    History,
    ChevronRight,
    ArrowUpRight,
    TrendingUp,
    CircleCheck,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function Training() {
    const currentWeek = 1;
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const records = await pb.collection('workouts').getFullList({
                    sort: '-created',
                });
                setWorkouts(records);
            } catch (err) {
                console.error("Failed to fetch library:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchWorkouts();
    }, []);

    return (
        <div className="flex flex-col gap-6 pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Training</h1>
                    <p className="text-muted-foreground text-xs mt-1">Week {currentWeek} • Phase 1</p>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                        <TrendingUp className="w-5 h-5 text-electric-cyan" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                        <History className="w-5 h-5 text-white/50" />
                    </button>
                </div>
            </header>

            {/* Progress Metric */}
            <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-electric-cyan rounded-full shadow-[0_0_12px_rgba(0,245,255,0.4)]" />
                    <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Plan Completion</p>
                        <p className="text-sm font-bold text-white">33% Towards W2 Unlock</p>
                    </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-electric-cyan" />
            </div>

            {/* Workout List */}
            <div className="flex flex-col gap-3">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Protocol Library</h3>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 gap-4">
                        <Loader2 className="w-8 h-8 text-electric-cyan animate-spin" />
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center italic">
                            Synchronizing Muscle-Recom Library...
                        </p>
                    </div>
                ) : workouts.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                        <p className="text-zinc-500 text-sm">No workouts found. Run seed script.</p>
                    </div>
                ) : (
                    workouts.map((w, idx) => (
                        <div
                            key={w.id}
                            className={`glass-card p-4 flex items-center justify-between border-l-4 transition-all ${idx === 0 ? 'border-l-electric-cyan bg-white/[0.03]' : 'border-l-transparent opacity-60 hover:opacity-100 hover:bg-white/[0.02]'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-electric-cyan/10' : 'bg-white/5'}`}>
                                    <Dumbbell className={`w-5 h-5 ${idx === 0 ? 'text-electric-cyan' : 'text-zinc-500'}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-tighter">{w.name}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{w.category || "General"}</p>
                                </div>
                            </div>
                            <Link
                                href={`/train/${w.id}`}
                                className="px-4 py-2 bg-white text-black text-[10px] font-black rounded-lg uppercase tracking-tight active:scale-95 transition-transform"
                            >
                                Start
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Tips / Education */}
            <div className="glass-card p-5 bg-glow-blue/5 border-glow-blue/20">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-glow-blue animate-pulse" />
                    <p className="text-xs font-bold text-glow-blue uppercase">Pro Tip: Tempo</p>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                    Remember the <span className="text-electric-cyan">3-1-1 Tempo</span>.
                    Slow descent is what builds muscle when you don't have weights. No rushing.
                </p>
            </div>
        </div>
    );
}
