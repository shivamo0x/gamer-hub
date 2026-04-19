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
    <nav className="glass-panel-strong flex h-full min-h-0 flex-col gap-5 overflow-hidden rounded-sm border border-white/10 p-5">
      <div className="mb-1 flex shrink-0 items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300/75">
            Library
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">Games</h2>
          <p className="mt-1 text-sm text-zinc-300/70">
            Quick access to your favorite titles.
          </p>
        </div>

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/10 text-white transition hover:border-neutral-300/40 hover:bg-white/14"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className="glass-card shrink-0 rounded-sm border border-neutral-300/14 bg-gradient-to-r from-zinc-400/12 via-neutral-500/10 to-stone-500/12 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-neutral-100">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Synced Library</p>
            <p className="text-xs text-zinc-300/70">{gameData.length} games ready</p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1">
        {gameData.map((gamedata, index) => (
          <motion.button
            key={gamedata.name}
            type="button"
            initial={{ opacity: 1, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onItemClick}
            className="glass-card group flex min-w-0 cursor-pointer items-center gap-3 rounded-sm border border-white/8 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300/25 hover:bg-gradient-to-r hover:from-zinc-400/16 hover:to-neutral-700/18"
          >
            <div className="h-10 w-10 overflow-hidden rounded-sm border border-white/10 shadow-[0_0_24px_rgba(176,179,184,0.12)] transition group-hover:border-neutral-300/45">
              <Image
                src={gamedata.imgSrc}
                alt={gamedata.name}
                width={100}
                height={100}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-zinc-200 transition group-hover:text-white">
              {gamedata.name}
            </span>
            <div className="ml-auto h-2.5 w-2.5 rounded-full bg-gradient-to-r from-zinc-300 to-neutral-500 opacity-50 shadow-[0_0_14px_rgba(176,179,184,0.65)] transition group-hover:opacity-100"></div>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
