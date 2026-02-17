"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Home,
  Dumbbell,
  Utensils,
  Settings as SettingsIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Hide bottom nav on specific pages if needed
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup');
  const isWorkoutSession = pathname.startsWith('/train/') && pathname !== '/train/success';

  return (
    <html lang="en" className="dark no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-hidden selection:bg-electric-cyan selection:text-black`}
      >
        <UserProvider>
          <main className="relative h-[100dvh] w-full max-w-md mx-auto overflow-hidden flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
              {children}
            </div>

            {/* Bottom Navigation */}
            {!isAuthPage && !isWorkoutSession && (
              <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="glass mt-auto h-20 px-6 flex items-center justify-around rounded-t-[32px] border-t border-white/10 z-50"
              >
                <NavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" active={pathname === "/"} />
                <NavLink href="/train" icon={<Dumbbell className="w-5 h-5" />} label="Train" active={pathname.startsWith("/train")} />
                <NavLink href="/fuel" icon={<Utensils className="w-5 h-5" />} label="Fuel" active={pathname === "/fuel"} />
                <NavLink href="/settings" icon={<SettingsIcon className="w-5 h-5" />} label="Settings" active={pathname === "/settings"} />
              </motion.nav>
            )}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}

function NavLink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group ${active ? 'text-electric-cyan' : 'text-muted-foreground hover:text-white'}`}>
      <motion.div
        animate={{ scale: active ? 1.1 : 1 }}
        className={`p-1 rounded-xl transition-all ${active ? 'bg-electric-cyan/10' : ''}`}
      >
        {icon}
      </motion.div>
      <span className="text-[9px] font-bold tracking-[0.1em] uppercase">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-dot"
          className="w-1 h-1 rounded-full bg-electric-cyan absolute -bottom-1"
        />
      )}
    </Link>
  );
}
