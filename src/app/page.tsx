"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import MainContent from "@/components/MainContent";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { gameData, type Game } from "@/constants";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game>(gameData[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return gameData;
    }

    return gameData.filter((game) =>
      [game.name, game.uid, game.favoriteCharacter, game.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [searchQuery]);

  const visibleSelectedGame = useMemo(() => {
    const matchingSelectedGame = filteredGames.find(
      (game) => game.name === selectedGame.name,
    );

    return matchingSelectedGame ?? filteredGames[0] ?? selectedGame;
  }, [filteredGames, selectedGame]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-8rem] h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute right-[-10rem] top-24 h-80 w-80 rounded-full bg-blue-500/24 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-cyan-400/14 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        selectedGameName={visibleSelectedGame.name}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="relative flex min-h-0 flex-1 gap-5 px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-5">
        <aside className="hidden md:block md:w-64 md:shrink-0">
          <div className="sticky top-0 h-[calc(100vh-6.5rem)]">
            <Sidebar
              games={filteredGames}
              selectedGame={visibleSelectedGame}
              onSelectGame={setSelectedGame}
              query={searchQuery}
            />
          </div>
        </aside>

        <AnimatePresence>
          {isSidebarOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close sidebar menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-slate-950/72 backdrop-blur-md md:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] p-3 shadow-2xl md:hidden"
              >
                <Sidebar
                  games={filteredGames}
                  selectedGame={visibleSelectedGame}
                  onSelectGame={(game) => {
                    setSelectedGame(game);
                    setIsSidebarOpen(false);
                  }}
                  mobile
                  onClose={() => setIsSidebarOpen(false)}
                  query={searchQuery}
                />
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <MainContent selectedGame={visibleSelectedGame} />
        </main>
      </div>
    </div>
  );
}
