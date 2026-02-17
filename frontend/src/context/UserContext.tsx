"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbase';

interface UserContextType {
    user: any;
    ramadanMode: boolean;
    setRamadanMode: (val: boolean) => void;
    weight: number;
    setWeight: (val: number) => void;
    proteinGoal: number;
    waterGoal: number;
    proteinCurrent: number;
    waterCurrent: number;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(pb.authStore.model);
    const [ramadanMode, setRamadanMode] = useState(user?.ramadan_mode || false);
    const [weight, setWeight] = useState(user?.weight || 73.0);
    const [proteinGoal, setProteinGoal] = useState(user?.protein_goal || 120);
    const [waterGoal, setWaterGoal] = useState(user?.water_goal || 2500);
    const [proteinCurrent] = useState(45);
    const [waterCurrent] = useState(1.2);

    // Sync with pb.authStore on client
    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setUser(model);
            if (model) {
                setRamadanMode(model.ramadan_mode || false);
                setWeight(model.weight || 73.0);
                setProteinGoal(model.protein_goal || 120);
                setWaterGoal(model.water_goal || 2500);
            }
        });
    }, []);

    // Sync with localStorage on client (fallback)
    useEffect(() => {
        const saved = localStorage.getItem('ramadanMode');
        if (saved !== null && !user) setRamadanMode(saved === 'true');
    }, [user]);

    const handleSetRamadanMode = async (val: boolean) => {
        setRamadanMode(val);
        localStorage.setItem('ramadanMode', val.toString());

        if (user) {
            try {
                await pb.collection('users').update(user.id, { ramadan_mode: val });
            } catch (e) {
                console.error("Failed to sync ramadan mode:", e);
            }
        }
    };

    const logout = () => {
        pb.authStore.clear();
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <UserContext.Provider value={{
            user,
            ramadanMode,
            setRamadanMode: handleSetRamadanMode,
            weight,
            setWeight,
            proteinGoal,
            waterGoal,
            proteinCurrent,
            waterCurrent,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
