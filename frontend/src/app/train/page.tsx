"use client";

import {
    Dumbbell,
    History,
    ChevronRight,
    ArrowUpRight,
    TrendingUp,
    CircleCheck
} from "lucide-react";

export default function Training() {
    const currentWeek = 1;

    const workouts = [
        { title: "Foundational Push", type: "Upper Body", completed: true },
        { title: "Foundational Pull", type: "Upper Body", current: true },
        { title: "Lower Body Tone", type: "Thigh Sculpt" },
    ];

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
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Current Routine</h3>
                {workouts.map((w, idx) => (
                    <div
                        key={idx}
                        className={`glass-card p-4 flex items-center justify-between border-l-4 transition-all ${w.current ? 'border-l-electric-cyan bg-white/[0.03]' : w.completed ? 'border-l-green-500' : 'border-l-transparent opacity-60'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${w.current ? 'bg-electric-cyan/10' : 'bg-white/5'}`}>
                                {w.completed ? <CircleCheck className="w-5 h-5 text-green-500" /> : <Dumbbell className={`w-5 h-5 ${w.current ? 'text-electric-cyan' : 'text-zinc-500'}`} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{w.title}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{w.type}</p>
                            </div>
                        </div>
                        {w.current && (
                            <button className="px-4 py-2 bg-white text-black text-[10px] font-black rounded-lg uppercase tracking-tight">
                                Start
                            </button>
                        )}
                    </div>
                ))}
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
