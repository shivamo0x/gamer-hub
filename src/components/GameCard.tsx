"use client";

import { type Game } from "@/constants";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type GameCardProps = {
  game: Game;
  isActive: boolean;
  index: number;
  onSelect: (game: Game) => void;
};

export default function GameCard({ game, isActive, index, onSelect }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 1, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-sm border p-3 text-left transition-all duration-300 ${
        isActive
          ? "border-neutral-300/40 bg-gradient-to-r from-zinc-400/18 to-neutral-700/20 shadow-[0_16px_40px_rgba(176,179,184,0.14)]"
          : "glass-card border-white/8 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-neutral-300/25 hover:bg-gradient-to-r hover:from-zinc-400/16 hover:to-neutral-700/18"
      }`}
      >
      <div className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-white/55 to-transparent opacity-0 transition group-hover:opacity-100" />
      <button
        type="button"
        onClick={() => onSelect(game)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <div className="h-11 w-11 overflow-hidden rounded-sm border border-white/10 shadow-[0_0_24px_rgba(176,179,184,0.12)] transition group-hover:border-neutral-300/45">
          <Image
            src={game.imgSrc}
            alt={game.name}
            width={100}
            height={100}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{game.name}</p>
          <p className="mt-1 truncate text-xs text-zinc-300/65">{game.status}</p>
        </div>
        <div
          className={`ml-auto h-2.5 w-2.5 rounded-full bg-gradient-to-r from-zinc-300 to-neutral-500 shadow-[0_0_14px_rgba(176,179,184,0.65)] transition ${
            isActive ? "opacity-100" : "opacity-45 group-hover:opacity-100"
          }`}
        />
      </button>
      <Link
        href={`/games/${game.slug}`}
        className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-100/80 transition hover:bg-white/8"
      >
        Open
      </Link>
    </motion.div>
  );
}
