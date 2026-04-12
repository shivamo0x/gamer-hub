"use client";

import { type Game } from "@/constants";
import { Sparkles, X } from "lucide-react";
import GameCard from "@/components/GameCard";

type SidebarProps = {
  games: Game[];
  selectedGame: Game;
  onSelectGame: (game: Game) => void;
  onClose?: () => void;
  mobile?: boolean;
  query: string;
};

export default function Sidebar({
  games,
  selectedGame,
  onSelectGame,
  onClose,
  mobile = false,
  query,
}: SidebarProps) {
  return (
    <nav className="glass-panel-strong accent-glow flex h-full flex-col gap-5 rounded-sm border border-white/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-200/70">
            Library
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Games</h2>
          <p className="mt-1 text-sm text-slate-300/70">
            Select a profile to update the dashboard.
          </p>
        </div>

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition hover:border-violet-300/35 hover:bg-white/8"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className="glass-card rounded-sm border border-sky-300/12 bg-gradient-to-r from-violet-500/8 via-indigo-500/7 to-sky-500/8 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/5 text-sky-100">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Identity Vault</p>
            <p className="text-xs text-slate-300/70">{games.length} connected game profiles</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-1 pr-1 pt-1">
        {games.length > 0 ? (
          games.map((game, index) => (
            <GameCard
              key={game.name}
              game={game}
              index={index}
              isActive={selectedGame.name === game.name}
              onSelect={onSelectGame}
            />
          ))
        ) : (
          <div className="glass-card rounded-sm border border-white/10 p-5 text-center">
            <p className="text-sm font-medium text-white">No games found</p>
            <p className="mt-2 text-sm leading-6 text-slate-300/70">
              No profile matches &quot;{query}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
