"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await pb.collection('users').authWithPassword(email, password);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col justify-center gap-8 py-10">
            {/* Brand Header */}
            <div className="flex flex-col items-center text-center gap-2">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-electric-cyan to-glow-blue flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                >
                    <h1 className="text-4xl font-black text-black italic leading-none ml-1">R</h1>
                </motion.div>
                <h1 className="text-4xl font-black text-white italic tracking-tighter">RISE</h1>
                <p className="text-muted-foreground text-sm font-medium">Elevate your physique. Master your fast.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 px-2">
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">
                        {error}
                    </div>
                )}
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
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-electric-cyan/50 focus:bg-white/[0.08] transition-all"
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-electric-cyan text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00e1ff] active:scale-[0.98] transition-all mt-2 disabled:opacity-50 disabled:active:scale-100"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>CONTINUE</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {/* Footer Actions */}
            <div className="flex flex-col items-center gap-6 mt-4">
                <div className="flex items-center gap-4 w-full px-2">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Or join with</span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="flex gap-4 w-full px-2">
                    <button className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Github className="w-5 h-5 text-white" />
                    </button>
                    <button className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors py-2 px-4 whitespace-nowrap">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold">G</div>
                    </button>
                </div>

                <p className="text-xs text-muted-foreground font-medium">
                    New to the movement? <Link href="/signup" className="text-electric-cyan font-bold hover:underline">Create Account</Link>
                </p>
            </div>
        </div>
    );
}
