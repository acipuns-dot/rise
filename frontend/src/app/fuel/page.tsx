"use client";

import {
    Beef,
    Droplets,
    Clock,
    Plus,
    Flame,
    ChevronRight
} from "lucide-react";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Fuel() {
    const { ramadanMode, weight, proteinGoal, proteinCurrent, waterCurrent } = useUser();
    const [timeLeft, setTimeLeft] = useState("");
    const [nextEvent, setNextEvent] = useState<"Suhoor" | "Iftar">("Suhoor");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const timer = setInterval(() => {
            const now = new Date();
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
    }, [isMounted]);

    return (
        <div className="flex flex-col gap-6 pb-20">
            <header>
                <h1 className="text-2xl font-bold text-white tracking-tight">Fuel</h1>
                <p className="text-muted-foreground text-xs mt-1">Nutrition & Hydration Tracker</p>
            </header>

            {/* Protein Dashboard */}
            <section className="glass-card p-6 bg-gradient-to-br from-[#FF5F00]/5 to-transparent border-[#FF5F00]/20">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF5F00]/10 flex items-center justify-center border border-[#FF5F00]/20">
                        <Flame className="w-6 h-6 text-[#FF5F00]" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#FF5F00] uppercase tracking-widest">Protein Target</p>
                        <p className="text-2xl font-black text-white">{proteinCurrent} / {proteinGoal}g</p>
                    </div>
                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#FF5F00] to-orange-400 transition-all duration-1000"
                        style={{ width: `${(proteinCurrent / proteinGoal) * 100}%` }}
                    />
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 font-medium text-center italic">
                    You need 75g more to maintain 73kg muscle mass today.
                </p>
            </section>

            {/* Quick Add Actions */}
            <div className="grid grid-cols-2 gap-4">
                <FoodCard icon={<Beef className="w-5 h-5" />} label="Log Protein" color="bg-orange-500" />
                <FoodCard icon={<Droplets className="w-5 h-5" />} label="Log Water" color="bg-glow-blue" />
            </div>

            {/* History / Logs */}
            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Recent Logs</h3>

                <LogItem time="12:30 PM" label="Lunch: Chicken & Rice" value="38g Protein" icon={<Clock className="w-4 h-4" />} />
                <LogItem time="09:15 AM" label="Protein Shake" value="25g Protein" icon={<Clock className="w-4 h-4" />} />
                <LogItem time="07:45 AM" label="Water Intake" value="500 ml" icon={<Droplets className="w-4 h-4 text-glow-blue" />} />
            </div>

            {/* Ramadan Mode Insight (Conditional) */}
            {ramadanMode && isMounted && (
                <div className="glass-card p-5 border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5">
                            <Clock className="w-5 h-5 text-glow-blue" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Next Feed Window</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-black">{nextEvent} in {timeLeft}</p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                </div>
            )}
        </div>
    );
}

function FoodCard({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
    return (
        <button className="glass-card p-4 flex flex-col items-center gap-3 hover:bg-white/5 transition-colors">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white shadow-lg shadow-${color.split('-')[1]}-500/20`}>
                {icon}
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">{label}</span>
        </button>
    )
}

function LogItem({ time, label, value, icon }: { time: string; label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-muted-foreground">
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">{time}</p>
                    <p className="text-xs font-bold text-white">{label}</p>
                </div>
            </div>
            <span className="text-xs font-black text-white italic">{value}</span>
        </div>
    )
}
