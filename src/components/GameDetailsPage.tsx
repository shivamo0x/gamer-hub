"use client";

import { type Character, type Game } from "@/constants";
import { ArrowLeft, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type GameDetailsPageProps = {
  game: Game;
};

const typeImageMap: Record<string, string> = {
  anemo: "/element/Element_Anemo.webp",
  cryo: "/element/Element_Cryo.webp",
  dendro: "/element/Element_Dendro.webp",
  destruction: "/element/Icon_Path_Destruction_Medium.webp",
  electro: "/element/Element_Electro.webp",
  erudition: "/element/Icon_Path_Erudition_Medium.webp",
  geo: "/element/Element_Geo.webp",
  harmony: "/element/Icon_Path_Harmony_Medium.webp",
  hydro: "/element/Element_Hydro.webp",
  nihility: "/element/Icon_Path_Nihility_Medium.webp",
  pyro: "/element/Element_Pyro.webp",
  remembrance: "/element/Icon_Path_Remembrance_Medium.webp",
  "the hunt": "/element/Icon_Path_The_Hunt_Medium.webp",
  hunt: "/element/Icon_Path_The_Hunt_Medium.webp",
  unknown: "/weapon-core.svg",
};

const weaponTypeImageMap: Record<string, string> = {
  bow: "/weapon-type/Weapon-class-bow-icon.webp",
  catalyst: "/weapon-type/Weapon-class-catalyst-icon.webp",
  claymore: "/weapon-type/Weapon-class-claymore-icon.webp",
  polearm: "/weapon-type/Weapon-class-polearm-icon.webp",
  sword: "/weapon-type/Weapon-class-sword-icon.webp",
};

const wutheringWavesWeaponTypeImageMap: Record<string, string> = {
  broadblade: "/weapon-type/Broadblade_Icon.webp",
  gauntlets: "/weapon-type/Gauntlets_Icon.webp",
  pistols: "/weapon-type/Pistols_Icon.webp",
  rectifier: "/weapon-type/Rectifier_Icon.webp",
  sword: "/weapon-type/Sword_Icon.webp",
};

const combatTypeImageMap: Record<string, string> = {
  fire: "/element/Type_Fire.webp",
  ice: "/element/Type_Ice.webp",
  imaginary: "/element/Type_Imaginary.webp",
  lightning: "/element/Type_Lightning.webp",
  physical: "/element/Type_Physical_Small.webp",
  quantum: "/element/Type_Quantum.webp",
  wind: "/element/Type_Wind.webp",
};

const wutheringWavesTypeImageMap: Record<string, string> = {
  aero: "/element/Aero.webp",
  electro: "/element/Electro.webp",
  fusion: "/element/Fusion.webp",
  glacio: "/element/Glacio.webp",
  havoc: "/element/Havoc.webp",
  spectro: "/element/Spectro.webp",
};

function getTypeImage(
  type: string,
  explicitTypeImage?: string,
  gameSlug?: string,
) {
  if (explicitTypeImage) {
    return explicitTypeImage;
  }

  const normalizedType = type.trim().toLowerCase();

  if (gameSlug === "wuthering-waves") {
    return wutheringWavesTypeImageMap[normalizedType] ?? "/weapon-core.svg";
  }

  return typeImageMap[normalizedType] ?? "/weapon-core.svg";
}

function getWeaponTypeImage(weaponType?: string, gameSlug?: string) {
  if (!weaponType) {
    return "/weapon-core.svg";
  }

  const normalizedWeaponType = weaponType.trim().toLowerCase();

  if (gameSlug === "wuthering-waves") {
    return (
      wutheringWavesWeaponTypeImageMap[normalizedWeaponType] ??
      "/weapon-core.svg"
    );
  }

  return weaponTypeImageMap[normalizedWeaponType] ?? "/weapon-core.svg";
}

function getCombatTypeImage(combatType?: string) {
  if (!combatType) {
    return "/weapon-core.svg";
  }

  return combatTypeImageMap[combatType.trim().toLowerCase()] ?? "/weapon-core.svg";
}

function getStarRailPathDescriptor(pathType?: string) {
  if (!pathType) {
    return "Combat Role";
  }

  const normalizedPath = pathType.trim().toLowerCase();

  switch (normalizedPath) {
    case "destruction":
      return "All-Rounder";
    case "the hunt":
    case "hunt":
      return "Single Target";
    case "erudition":
      return "AoE Damage";
    case "harmony":
      return "Support";
    case "nihility":
      return "Debuff";
    case "remembrance":
      return "Summon";
    case "abundance":
      return "Healing";
    case "preservation":
      return "Defense";
    default:
      return "Combat Role";
  }
}

function getImagePanelStyle(imageSrc: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(18,18,20,0.82), rgba(64,64,68,0.58)), url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;
}

export default function GameDetailsPage({ game }: GameDetailsPageProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    game.characters[0],
  );
  const [query, setQuery] = useState("");
  const detailsSectionRef = useRef<HTMLElement | null>(null);
  const typeLabel = game.slug === "star-rail" ? "Path (Combat Class)" : "Type";
  const isStarRail = game.slug === "star-rail";
  const usesNaturalRatioCharacterImages =
    game.slug === "free-fire-max" ||
    game.slug === "bgmi" ||
    game.slug === "arknight-endfield";
  const hidesVoiceActors = game.slug === "free-fire-max" || game.slug === "bgmi";
  const showsCharacterBadges = game.slug !== "arknight-endfield";
  const showsCharacterMetadata = game.slug !== "arknight-endfield" && game.slug !== "bgmi";

  const filteredCharacters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return game.characters;
    }

    return game.characters.filter((character) =>
      [character.name, character.role, character.type]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [game.characters, query]);

  const visibleCharacter = useMemo(() => {
    const match = filteredCharacters.find(
      (character) => character.name === selectedCharacter.name,
    );

    return match ?? filteredCharacters[0] ?? selectedCharacter;
  }, [filteredCharacters, selectedCharacter]);

  const supportsEquipment = Boolean(visibleCharacter.weapon);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);

    requestAnimationFrame(() => {
      detailsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(118,121,126,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(180,183,187,0.16),transparent_24%),linear-gradient(180deg,#0a0b0d_0%,#17181b_45%,#25272b_100%)] px-4 pb-8 pt-4 sm:px-6 sm:pb-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-6rem] h-72 w-72 rounded-full bg-neutral-500/18 blur-3xl" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-zinc-400/16 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          initial={{ y: -28, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="glass-panel-strong accent-glow sticky top-4 z-20 flex flex-col gap-4 rounded-sm border border-white/10 px-4 py-4 sm:px-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10">
                <Image
                  src={game.imgSrc}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300/75">
                  Character Hub
                </p>
                <h1 className="truncate bg-gradient-to-r from-white via-neutral-100 to-zinc-300 bg-clip-text text-xl font-semibold text-transparent">
                  {game.name}
                </h1>
              </div>
            </div>

            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-neutral-300/30 hover:bg-white/8"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>

          <div className="glass-card flex w-full items-center gap-2 rounded-sm border border-white/10 px-3 py-2 sm:max-w-xl">
            <Search size={18} className="text-neutral-100/75" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search characters..."
              className="w-full bg-transparent text-sm text-white outline-none"
            />
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 1, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="glass-panel-strong rounded-sm border border-white/10 p-5 sm:p-6"
        >
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300/75">
              My character picks
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Select a character to view details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filteredCharacters.map((character, index) => {
              const isActive = character.name === visibleCharacter.name;

              return (
                <motion.div
                  key={character.name}
                  initial={{ opacity: 1, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`group overflow-hidden rounded-sm border text-left transition-all duration-300 ${
                    isActive
                      ? "border-neutral-300/30 bg-gradient-to-br from-zinc-400/12 to-neutral-600/12 shadow-[0_14px_38px_rgba(176,179,184,0.12)]"
                      : "glass-card border-white/10 hover:border-neutral-300/20 hover:shadow-[0_16px_36px_rgba(160,163,168,0.1)]"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      usesNaturalRatioCharacterImages
                        ? "aspect-[3/4]"
                        : "h-28 sm:h-32"
                    }`}
                  >
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      style={{
                        objectPosition: character.imagePosition ?? "center",
                      }}
                      sizes="(max-width: 1280px) 100vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                    {showsCharacterBadges ? (
                      <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 rounded-sm border border-white/10 bg-zinc-950/60 px-1.5 py-1 backdrop-blur-sm">
                          <div className="relative h-4 w-4 overflow-hidden rounded-sm">
                            <Image
                              src={getTypeImage(character.type, character.typeImage, game.slug)}
                              alt={character.type}
                              fill
                              className="object-cover"
                              sizes="16px"
                            />
                          </div>
                        </div>
                        {isStarRail ? (
                          <div className="flex items-center gap-1 rounded-sm border border-white/10 bg-zinc-950/60 px-1.5 py-1 backdrop-blur-sm">
                            <div className="relative h-4 w-4 overflow-hidden rounded-sm">
                              <Image
                                src={getCombatTypeImage(character.weapon)}
                                alt={character.weapon ?? "Combat Type"}
                                fill
                                className="object-cover"
                                sizes="16px"
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-white">{character.name}</p>
                      {character.region && character.regionImage ? (
                        <div className="flex items-center gap-1 rounded-sm border border-white/10 bg-white/6 px-1.5 py-1">
                          <div className="relative h-4 w-4 overflow-hidden rounded-sm">
                            <Image
                              src={character.regionImage}
                              alt={character.region}
                              fill
                              className="object-cover"
                              sizes="16px"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCharacterSelect(character)}
                      className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-neutral-100/85 transition hover:bg-white/8"
                    >
                      Show Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <AnimatePresence mode="wait">
          <motion.section
            ref={detailsSectionRef}
            key={visibleCharacter.name}
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="scroll-mt-28 glass-panel-strong rounded-sm border border-white/10 p-5 sm:scroll-mt-32 sm:p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className={`relative overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(circle_at_top,rgba(176,179,184,0.18),transparent_34%),linear-gradient(180deg,rgba(20,20,22,0.72),rgba(0,0,0,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.32)] ${
                  usesNaturalRatioCharacterImages ? "" : "min-h-[320px]"
                }`}
                style={
                  usesNaturalRatioCharacterImages
                    ? {
                        aspectRatio:
                          visibleCharacter.imageAspectRatio ?? "1 / 1",
                      }
                    : undefined
                }
              >
                <Image
                  src={visibleCharacter.image}
                  alt={visibleCharacter.name}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition:
                      visibleCharacter.detailImagePosition ??
                      visibleCharacter.imagePosition ??
                      "center",
                  }}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/8 to-transparent" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300/75">
                    Character Details
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-3xl font-semibold text-white">
                      {visibleCharacter.name}
                    </h3>
                    {isStarRail ? (
                      <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/6 px-3 py-2">
                        <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                          <Image
                            src={getTypeImage(visibleCharacter.type, visibleCharacter.typeImage, game.slug)}
                            alt={visibleCharacter.type}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-100/85">
                          {getStarRailPathDescriptor(visibleCharacter.type)}
                        </span>
                      </div>
                    ) : visibleCharacter.region && visibleCharacter.regionImage ? (
                      <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/6 px-3 py-2">
                        <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                          <Image
                            src={visibleCharacter.regionImage}
                            alt={visibleCharacter.region}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-100/85">
                          {visibleCharacter.region}
                        </span>
                      </div>
                    ) : visibleCharacter.skillType ? (
                      <div className="inline-flex items-center rounded-sm border border-white/10 bg-white/6 px-3 py-2">
                        <span className="text-sm font-medium text-neutral-100/85">
                          {visibleCharacter.skillType}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-200/78 sm:text-base">
                    {visibleCharacter.description}
                  </p>
                  {(visibleCharacter.releaseDate || visibleCharacter.birthday) ? (
                    <div className="mt-4 space-y-1 text-sm text-neutral-100/72">
                      {visibleCharacter.releaseDate ? (
                        <p>
                          Release Date: <span className="font-medium text-white">{visibleCharacter.releaseDate}</span>
                        </p>
                      ) : null}
                      {visibleCharacter.birthday ? (
                        <p>
                          Birthday: <span className="font-medium text-white">{visibleCharacter.birthday}</span>
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {!hidesVoiceActors && (visibleCharacter.japaneseVoiceActor || visibleCharacter.englishVoiceActor) ? (
                    <p className="mt-4 text-sm leading-7 text-neutral-100/72">
                      Voice Actor :{" "}
                      <span className="font-medium text-white">
                        Japanese VA - {visibleCharacter.japaneseVoiceActor ?? "Not listed"}. English VA - {visibleCharacter.englishVoiceActor ?? "Not listed"}
                      </span>
                    </p>
                  ) : null}
                </div>

                {showsCharacterMetadata && supportsEquipment ? (
                  <div className="grid gap-4">
                    {isStarRail ? (
                      <div className="glass-card rounded-sm border border-white/10 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                          Combat Type
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10 bg-white/5">
                            <Image
                              src={getCombatTypeImage(visibleCharacter.weapon)}
                              alt={visibleCharacter.weapon ?? "Combat Type"}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <p className="text-lg font-semibold text-white">
                            {visibleCharacter.weapon}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="overflow-hidden rounded-sm border border-white/10"
                          style={getImagePanelStyle(visibleCharacter.weaponImage ?? "/weapon-core.svg")}
                        >
                          <div className="bg-[radial-gradient(circle_at_top_right,rgba(176,179,184,0.14),transparent_28%)] p-5 backdrop-blur-[2px]">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                            Weapon
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10 bg-zinc-950/45 shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
                              <Image
                                src={visibleCharacter.weaponImage ?? "/weapon-core.svg"}
                                alt={visibleCharacter.weaponName ?? visibleCharacter.weapon ?? "Weapon"}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <p className="text-lg font-semibold text-white">
                              {visibleCharacter.weaponName ?? visibleCharacter.weapon}
                            </p>
                          </div>
                        </div>
                        </div>

                        <div className="glass-card rounded-sm border border-white/10 p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                            Weapon Type
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10 bg-white/5">
                              <Image
                                src={getWeaponTypeImage(visibleCharacter.weapon, game.slug)}
                                alt={visibleCharacter.weapon ?? "Weapon Type"}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <p className="text-lg font-semibold text-white">
                              {visibleCharacter.weapon}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="glass-card rounded-sm border border-white/10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                        {typeLabel}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10 bg-white/5">
                          <Image
                            src={getTypeImage(visibleCharacter.type, visibleCharacter.typeImage, game.slug)}
                            alt={visibleCharacter.type}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <p className="text-lg font-semibold text-white">
                          {visibleCharacter.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : showsCharacterMetadata ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="glass-card rounded-sm border border-white/10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                        Role
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {visibleCharacter.role}
                      </p>
                    </div>
                    <div className="glass-card rounded-sm border border-white/10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                        {typeLabel}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {visibleCharacter.type}
                      </p>
                    </div>
                    {visibleCharacter.skillName || visibleCharacter.skillDescription ? (
                      <div className="glass-card rounded-sm border border-white/10 p-5 sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300/70">
                          Skill
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          {visibleCharacter.typeImage ? (
                            <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-white/10 bg-white/5">
                              <Image
                                src={visibleCharacter.typeImage}
                                alt={`${visibleCharacter.name} skill logo`}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          ) : null}
                          <p className="text-lg font-semibold text-white">
                            {visibleCharacter.skillName ?? "Character Skill"}
                          </p>
                        </div>
                        {visibleCharacter.skillDescription ? (
                          <p className="mt-4 text-sm leading-7 text-zinc-200/75">
                            {visibleCharacter.skillDescription}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
