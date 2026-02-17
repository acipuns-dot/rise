"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  Droplets,
  Trophy,
  ChevronRight,
  Play,
  Moon,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { calculateWaterGoal } from "@/lib/weather";

export default function Dashboard() {
  const { ramadanMode, setRamadanMode, weight, proteinGoal, proteinCurrent, waterCurrent } = useUser();
  const [timeLeft, setTimeLeft] = useState("");
  const [nextEvent, setNextEvent] = useState<"Suhoor" | "Iftar">("Suhoor");
  const [isMounted, setIsMounted] = useState(false);

  // Dynamic Water Goal
  const waterGoal = calculateWaterGoal(weight, false, ramadanMode);

  // Handle mounting status
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ramadan Countdown Logic
  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      const now = new Date();
      // Placeholder times for demo: Suhoor 4:30 AM, Iftar 6:30 PM
      const suhoor = new Date(); suhoor.setHours(4, 30, 0);
      const iftar = new Date(); iftar.setHours(18, 30, 0);

      let target: Date;
      let eventName: "Suhoor" | "Iftar";

      if (now < suhoor) {
        target = suhoor;
        eventName = "Suhoor";
      } else if (now < iftar) {
        target = iftar;
        eventName = "Iftar";
      } else {
        // Next day suhoor
        target = new Date();
        target.setDate(target.getDate() + 1);
        target.setHours(4, 30, 0);
        eventName = "Suhoor";
      }

      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setNextEvent(eventName);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white italic font-mono">
            RISE<span className="text-electric-cyan text-sm align-top leading-none ml-1 font-sans not-italic">v1.1</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-1 font-medium tracking-widest uppercase">
            {isMounted ? new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : "Loading..."}
          </p>
        </div>

        <button
          onClick={() => setRamadanMode(!ramadanMode)}
          className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 ${ramadanMode ? 'bg-glow-blue/10 border-glow-blue/20 text-glow-blue' : 'bg-white/5 border-white/10 text-muted-foreground'}`}
        >
          <Moon className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            {ramadanMode ? 'Fast Active' : 'Ramadan Mode'}
          </span>
        </button>
      </header>

      {/* Hero: Daily Performance Ring */}
      <section className="glass-card p-6 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-electric-cyan/10 transition-colors" />

        <div className="flex flex-col gap-1 z-10">
          <h2 className="text-lg font-bold text-white">Daily Growth</h2>
          <p className="text-muted-foreground text-xs font-medium">
            {ramadanMode ? "Ramadan Optimization Active" : "Regular Protocol Active"}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <Flame className="w-4 h-4 text-[#FF5F00]" />
              <span className="text-sm font-bold text-white">{proteinCurrent}g</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <Droplets className="w-4 h-4 text-glow-blue" />
              <span className="text-sm font-bold text-white">{waterCurrent}L</span>
            </div>
          </div>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center z-10">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="56" cy="56" r="48"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <motion.circle
              initial={{ strokeDasharray: "0 302" }}
              animate={{ strokeDasharray: `${(proteinCurrent / proteinGoal) * 302} 302` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="56" cy="56" r="48"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#00a3ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-black text-white">{Math.round((proteinCurrent / proteinGoal) * 100)}%</span>
            <span className="text-[8px] font-bold text-muted-foreground uppercase">Protein</span>
          </div>
        </div>
      </section>

      {/* Ramadan Countdown Area */}
      {ramadanMode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="glass-card p-5 bg-glow-blue/5 border-glow-blue/20 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-glow-blue/10 flex items-center justify-center border border-glow-blue/20">
                <Clock className="w-5 h-5 text-glow-blue" />
              </div>
              <div>
                <p className="text-[10px] font-black text-glow-blue uppercase tracking-widest">Countdown to {nextEvent}</p>
                <p className="text-xl font-black text-white tabular-nums">{timeLeft}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Water Goal</p>
              <p className="text-lg font-black text-white">{waterGoal}L</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Body Map Card */}
      <section className="glass-card p-6 overflow-hidden relative">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Muscle Map</h3>
        <div className="flex items-center justify-center h-48 py-4">
          <div className="relative w-24 h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 w-12 h-12 bg-electric-cyan/20 blur-xl rounded-full" />
            <div className="absolute top-10 w-16 h-8 bg-electric-cyan/20 blur-lg rounded-full animate-pulse" />
            <div className="w-12 h-32 border-2 border-white/10 rounded-full flex flex-col items-center pt-2">
              <div className="w-6 h-6 rounded-full bg-white/10" />
              <div className="w-10 h-16 rounded-2xl bg-white/5 mt-2 flex justify-around p-1">
                <div className="w-3 h-full rounded-full bg-electric-cyan/30 shadow-[0_0_8px_#00f5ff50]" />
                <div className="w-3 h-full rounded-full bg-electric-cyan/30 shadow-[0_0_8px_#00f5ff50]" />
              </div>
            </div>
          </div>

          <div className="ml-8 flex flex-col gap-3">
            <MuscleLegend label="Chest" active />
            <MuscleLegend label="Back" active />
            <MuscleLegend label="Shoulders" />
            <MuscleLegend label="Legs (Tone)" />
          </div>
        </div>
      </section>

      {/* Today's Workout Card */}
      <section className="glass-card p-6 group cursor-pointer active:scale-95 transition-transform">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-electric-cyan text-[10px] font-black uppercase tracking-[0.2em]">Next Selection</p>
            <h3 className="text-xl font-bold text-white mt-1">Foundational Push</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex -space-x-2">
            {[1, 2].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center overflow-hidden shadow-lg">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="Avatar" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-medium italic">Join 228 others today</p>
        </div>

        <Link href="/train/foundational-push" className="w-full h-14 bg-electric-cyan text-black font-black rounded-2xl flex items-center justify-center gap-2 group-hover:bg-[#00e1ff] transition-all shadow-[0_4px_20px_rgba(0,245,255,0.3)]">
          <Play className="w-5 h-5 fill-black" />
          <span>START SESSION</span>
        </Link>
      </section>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Current Goal</p>
          <p className="text-lg font-black text-white italic tracking-tighter">RECOMP <span className="text-[10px] text-electric-cyan">PHASE 1</span></p>
        </div>
        <div className="glass-card p-4 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Body Mass</p>
          <p className="text-lg font-black text-white italic">73.0 <span className="text-xs not-italic text-muted-foreground">kg</span></p>
        </div>
      </div>
    </div>
  );
}

function MuscleLegend({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-electric-cyan shadow-[0_0_8px_rgba(0,245,255,0.8)]' : 'bg-white/10'}`} />
      <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-white' : 'text-muted-foreground'}`}>{label}</span>
    </div>
  );
}
