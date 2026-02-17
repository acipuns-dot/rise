"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight } from "lucide-react";

interface TutorialModalProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: {
        name: string;
        instructions: string;
        target: string;
        video: string;
    };
}

export default function TutorialModal({ isOpen, onClose, exercise }: TutorialModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-full max-w-md bg-zinc-900 rounded-[32px] border border-white/10 overflow-hidden relative shadow-2xl"
                    >
                        {/* Header Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{exercise.name}</h2>
                                    <p className="text-electric-cyan text-[10px] font-bold uppercase tracking-widest">{exercise.target}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Video placeholder */}
                            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 relative group">
                                <img
                                    src={exercise.video}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                    <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Execution Cues</h3>
                                <div className="flex flex-col gap-3">
                                    {exercise.instructions.split('.').filter(i => i.trim()).map((step, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-electric-cyan">{idx + 1}</span>
                                            </div>
                                            <p className="text-sm text-white/80 font-medium leading-relaxed italic">{step.trim()}.</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full h-14 bg-electric-cyan text-black font-black rounded-2xl mt-8 flex items-center justify-center gap-2"
                            >
                                <span>UNDERSTOOD</span>
                                <CheckCircle2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
