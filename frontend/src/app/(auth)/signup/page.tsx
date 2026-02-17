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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 1. Create the user
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                name,
                weight: 73.0,
                protein_goal: 120,
                water_goal: 2500,
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
            <div>
                <h1 className="text-4xl font-black text-white italic tracking-tighter">JOIN RISE</h1>
                <p className="text-muted-foreground text-sm font-medium mt-1 uppercase tracking-widest">Start your 12-week evolution</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="flex flex-col gap-4 px-2">
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">
                        {error}
                    </div>
                )}
                <div className="relative group">
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
                </div>

                <div className="relative group">
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
                </div>

                <div className="relative group">
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
                </div>

                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-4 gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
                        <span className="text-electric-cyan font-bold">73</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                        We'll optimize your water goal (35ml/kg) and protein (120g) based on your starting weight.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.98] transition-all mt-2 shadow-[0_4px_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:scale-100"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>FINALIZE PROFILE</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] px-8">
                By continuing, you agree to the Rise Terms of Protocol and Physique Privacy.
            </p>
        </div>
    );
}
