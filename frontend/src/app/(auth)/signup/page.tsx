"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [weight, setWeight] = useState(73);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // Protocol Calculations
    const proteinGoal = Math.round(weight * 1.6);
    const waterGoal = Math.round(weight * 35);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 1. Create the user with dynamic protocol data
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                name,
                weight: weight,
                protein_goal: proteinGoal,
                water_goal: waterGoal,
                ramadan_mode: false,
            });

            // 2. Log them in immediately
            await pb.collection('users').authWithPassword(email, password);

            router.push("/");
        } catch (err: any) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col justify-center gap-8 py-10">
            {/* Back Button */}
            <Link href="/login" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-bold tracking-tight">Login</span>
            </Link>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <h1 className="text-4xl font-black text-white italic tracking-tighter">JOIN RISE</h1>
                <p className="text-muted-foreground text-sm font-medium mt-1 uppercase tracking-widest">Start your 12-week evolution</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="flex flex-col gap-4 px-2">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold"
                    >
                        {error}
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-electric-cyan transition-colors" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-electric-cyan/50 focus:bg-white/[0.08] transition-all"
                        required
                        disabled={isLoading}
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-electric-cyan transition-colors" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-electric-cyan/50 focus:bg-white/[0.08] transition-all"
                        required
                        disabled={isLoading}
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-electric-cyan transition-colors" />
                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-electric-cyan/50 focus:bg-white/[0.08] transition-all"
                        required
                        disabled={isLoading}
                    />
                </motion.div>

                {/* Protocol Settings (Weight & Goals) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-3xl p-5"
                >
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Starting Weight</p>
                            <h3 className="text-2xl font-black text-white italic tracking-tighter">{weight} <span className="text-xs non-italic text-zinc-500">KG</span></h3>
                        </div>
                        <input
                            type="range"
                            min="40"
                            max="150"
                            step="0.5"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            className="w-32 accent-electric-cyan opacity-80"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                        <div className="bg-white/5 rounded-2xl p-3">
                            <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest mb-1">Target Protein</p>
                            <p className="text-sm font-black text-white italic">{proteinGoal}G</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3">
                            <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest mb-1">Target Water</p>
                            <p className="text-sm font-black text-electric-cyan italic">{waterGoal}ML</p>
                        </div>
                    </div>

                    <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-tight text-center mt-2 leading-relaxed">
                        Rise applies a 1.6g/kg protein protocol & 35ml/kg hydration baseline for muscle-recom.
                    </p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.98] transition-all mt-4 shadow-[0_10px_40px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:scale-100"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>INITIALIZE PROTOCOL</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </motion.button>
            </form>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] px-8"
            >
                By joining, you commit to the 12-week Rise protocol.
            </motion.p>
        </div>
    );
}
