"use client";

import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

type HeaderProps = {
  onMenuClick?: () => void;
  selectedGameName?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export default function Header({
  onMenuClick = () => {},
  selectedGameName = "Dashboard",
  searchValue = "",
  onSearchChange = () => {},
}: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel-strong accent-glow sticky top-0 z-30 rounded-sm border border-white/10 px-4 py-3 sm:px-5"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white shadow-[0_10px_24px_rgba(20,20,22,0.18)] transition hover:border-neutral-300/35 hover:bg-white/8 md:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/profile-pic.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-10 w-10 object-contain sm:h-[46px] sm:w-[46px]"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-300/75">
                {selectedGameName}
              </p>
              <h1 className="truncate bg-gradient-to-r from-white via-neutral-100 to-zinc-300 bg-clip-text text-base font-semibold tracking-wide text-transparent sm:text-lg">
                Gamer Hub
              </h1>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-neutral-100/80 shadow-[0_10px_24px_rgba(20,20,22,0.18)] transition hover:border-neutral-300/35 hover:bg-white/8"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            <div className="glass-card flex items-center gap-3 rounded-sm border border-white/10 px-2 py-1.5 transition hover:border-neutral-300/30 hover:bg-white/6">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-neutral-300/55 shadow-[0_0_18px_rgba(176,179,184,0.38)] sm:h-10 sm:w-10">
                <Image
                  src="/Engen.jpg"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Shivam</p>
                <p className="text-xs text-neutral-300/62">Online now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card flex w-full items-center gap-2 rounded-sm border border-white/10 px-3 py-2 transition focus-within:border-neutral-300/45 focus-within:ring-1 focus-within:ring-neutral-400/30 sm:max-w-xl">
          <Search size={18} className="text-neutral-100/75" />
          <input
            type="text"
            placeholder="Search your game IDs..."
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-300/60"
          />
        </div>
      </div>
    </motion.header>
  );
}
