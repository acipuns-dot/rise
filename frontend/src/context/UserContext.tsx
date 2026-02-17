"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    ramadanMode: boolean;
    setRamadanMode: (val: boolean) => void;
    weight: number;
    setWeight: (val: number) => void;
    proteinGoal: number;
    proteinCurrent: number;
    waterCurrent: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [ramadanMode, setRamadanMode] = useState(false);
    const [weight, setWeight] = useState(73.0);
    const [proteinGoal] = useState(120);
    const [proteinCurrent] = useState(45);
    const [waterCurrent] = useState(1.2);

    // Sync with localStorage on client
    useEffect(() => {
        const saved = localStorage.getItem('ramadanMode');
        if (saved !== null) setRamadanMode(saved === 'true');
    }, []);

    const handleSetRamadanMode = (val: boolean) => {
        setRamadanMode(val);
        localStorage.setItem('ramadanMode', val.toString());
    };

    return (
        <UserContext.Provider value={{
            ramadanMode,
            setRamadanMode: handleSetRamadanMode,
            weight,
            setWeight,
            proteinGoal,
            proteinCurrent,
            waterCurrent
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
