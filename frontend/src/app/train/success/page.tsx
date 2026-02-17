"use client";

import { motion } from "framer-motion";
import {
    Trophy,
    ArrowRight,
    Dumbbell,
    Flame,
    Clock,
    Share2,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkoutSuccess() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex flex-col p-6 pt-12 pb-20 overflow-y-auto no-scrollbar">
            {/* Hero Animation */}
            <div className="flex flex-col items-center text-center gap-4 mb-12">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-electric-cyan to-glow-blue flex items-center justify-center shadow-[0_0_50px_rgba(0,245,255,0.4)]"
                >
                    <Trophy className="w-12 h-12 text-black" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="text-4xl font-black text-white italic tracking-tighter">SESSION COMPLETE</h1>
                    <p className="text-electric-cyan text-sm font-bold uppercase tracking-widest mt-2">Evolution in Progress</p>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <StatCard
                    icon={<Dumbbell className="w-5 h-5 text-white" />}
                    label="Exercises"
                    value="8"
                    sub="Foundation"
                />
                <StatCard
                    icon={<Clock className="w-5 h-5 text-white" />}
                    label="Tension Time"
                    value="32m"
                    sub="Hypertrophy"
                />
                <StatCard
                    icon={<Flame className="w-5 h-5 text-orange-500" />}
                    label="Work Done"
                    value="2,450kg"
                    sub="Relative Volume"
                />
                <StatCard
                    icon={<TrendingUp className="w-5 h-5 text-green-500" />}
                    label="Progression"
                    value="+2 Reps"
                    sub="Overload Metric"
                />
            </div>

            {/* Focus Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6 bg-glow-blue/5 border-glow-blue/20 mb-8"
            >
                <h3 className="text-xs font-black text-glow-blue uppercase tracking-widest mb-2">Rise Protocol Advice</h3>
                <p className="text-sm text-white/80 leading-relaxed font-medium italic">
                    Your 73kg frame just exceeded previous limits. Prioritize <span className="text-electric-cyan text-bold">Protein (Target: 120g)</span> in the next 2 hours to maximize tissue repair.
                </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col gap-4">
                <button
                    className="h-16 w-full glass rounded-2xl flex items-center justify-center gap-3 border border-white/10 hover:bg-white/5 active:scale-95 transition-all"
                >
                    <Share2 className="w-5 h-5 text-white" />
                    <span className="text-sm font-black text-white uppercase tracking-tighter">Share Journey</span>
                </button>

                <Link
                    href="/"
                    className="h-16 w-full bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
                >
                    <span>BACK TO DASHBOARD</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; subText?: string, subText2?: string, sub: string }) {
    return (
        <div className="glass-card p-4 flex flex-col gap-1">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                {icon}
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
            <div className="flex items-baseline gap-1">
                <p className="text-xl font-black text-white italic">{value}</p>
                <span className="text-[8px] font-bold text-muted-foreground uppercase">{sub}</span>
            </div>
        </div>
    );
}
