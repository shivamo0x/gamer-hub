"use client";

import { gameData } from "@/constants";
import { Sparkles, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

type NavBarProps = {
  onItemClick?: () => void;
  onClose?: () => void;
  mobile?: boolean;
};

export default function NavBar({ onItemClick, onClose, mobile = false }: NavBarProps) {
  return (
    <nav className="glass-panel-strong flex h-full flex-col gap-5 rounded-[28px] border border-white/10 p-5">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
            Library
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">Games</h2>
          <p className="mt-1 text-sm text-slate-300/70">
            Quick access to your favorite titles.
          </p>
        </div>

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition hover:border-fuchsia-300/40 hover:bg-white/14"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className="glass-card rounded-2xl border border-cyan-300/12 bg-gradient-to-r from-fuchsia-500/12 via-violet-500/10 to-blue-500/12 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Synced Library</p>
            <p className="text-xs text-slate-300/70">{gameData.length} games ready</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {gameData.map((gamedata, index) => (
          <motion.button
            key={gamedata.name}
            type="button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onItemClick}
            className="glass-card group flex min-w-0 cursor-pointer items-center gap-3 rounded-2xl border border-white/8 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-gradient-to-r hover:from-fuchsia-500/18 hover:to-blue-500/18"
          >
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 shadow-[0_0_24px_rgba(96,165,250,0.12)] transition group-hover:border-fuchsia-300/50">
              <Image
                src={gamedata.imgSrc}
                alt={gamedata.name}
                width={100}
                height={100}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-slate-200 transition group-hover:text-white">
              {gamedata.name}
            </span>
            <div className="ml-auto h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 opacity-50 shadow-[0_0_14px_rgba(168,85,247,0.65)] transition group-hover:opacity-100"></div>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
