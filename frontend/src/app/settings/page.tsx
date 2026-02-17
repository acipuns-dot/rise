"use client";

import { useState } from "react";
import {
    Moon,
    MapPin,
    Bell,
    ChevronRight,
    Info,
    LogOut,
    User,
    Scale
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";

export default function Settings() {
    const { ramadanMode, setRamadanMode, weight, setWeight } = useUser();

    return (
        <div className="flex flex-col gap-6 pb-12">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-muted-foreground text-xs mt-1">Manage your profile and app preferences</p>
            </header>

            {/* User Profile Summary */}
            <section className="glass-card p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/20 flex items-center justify-center">
                    <User className="w-7 h-7 text-electric-cyan" />
                </div>
                <div>
                    <h2 className="text-white font-bold">User Journey</h2>
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-tight">Phase: The Foundation (W1)</p>
                </div>
            </section>

            {/* Preference Groups */}
            <div className="flex flex-col gap-8">

                {/* Goal Tracking */}
                <div>
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-2">Core Metrics</h3>
                    <div className="glass-card overflow-hidden">
                        <SettingItem
                            icon={<Scale className="w-5 h-5 text-glow-blue" />}
                            label="Current Weight"
                            value={`${weight} kg`}
                            onClick={() => { }}
                        />
                        <div className="h-px bg-white/5 mx-4" />
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <Moon className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Ramadan Mode</p>
                                    <p className="text-[10px] text-muted-foreground">Adjust goals for fasting hours</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setRamadanMode(!ramadanMode)}
                                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${ramadanMode ? 'bg-electric-cyan' : 'bg-zinc-800'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${ramadanMode ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div>
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-2">System</h3>
                    <div className="glass-card overflow-hidden">
                        <SettingItem
                            icon={<MapPin className="w-5 h-5 text-white" />}
                            label="Local Climate Sync"
                            value="On"
                            onClick={() => { }}
                        />
                        <div className="h-px bg-white/5 mx-4" />
                        <SettingItem
                            icon={<Bell className="w-5 h-5 text-white" />}
                            label="Notifications"
                            value="Enabled"
                            onClick={() => { }}
                        />
                    </div>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-2">Support</h3>
                    <div className="glass-card overflow-hidden">
                        <SettingItem
                            icon={<Info className="w-5 h-5 text-zinc-400" />}
                            label="About Rise"
                            onClick={() => { }}
                        />
                        <div className="h-px bg-white/5 mx-4" />
                        <SettingItem
                            icon={<LogOut className="w-5 h-5 text-red-400" />}
                            label="Sign Out"
                            onClick={() => { }}
                            color="text-red-400"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

function SettingItem({ icon, label, value, onClick, color = "text-white" }: { icon: React.ReactNode; label: string; value?: string; onClick: () => void; color?: string }) {
    return (
        <button
            onClick={onClick}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 active:bg-white/10 transition-colors"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
                <p className={`text-sm font-bold ${color}`}>{label}</p>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-xs text-muted-foreground font-medium">{value}</span>}
                <ChevronRight className="w-4 h-4 text-zinc-600" />
            </div>
        </button>
    );
}
