"use client";

import { gamesIPlay, type Game } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type MainContentProps = {
  selectedGame: Game;
};

const projects = [
  {
    title: "Zombie Game",
    description:
      "Built using Unreal Engine 5 with C++ and Blueprints, featuring multiple maps, missions, and gameplay systems.",
  },
  {
    title: "Report Generator",
    description:
      "Desktop application with CRUD operations using VB6 and MS Access, including PDF generation.",
  },
  {
    title: "AI Focus Monitor",
    description:
      "Built with Python, OpenCV, MediaPipe, and Streamlit for eye tracking, fatigue detection, and dashboard reporting.",
  },
  {
    title: "SkillTrack",
    description:
      "Created with Next.js, React, and Tailwind CSS with add/edit/delete skill flows, dynamic routing, and validation.",
  },
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Next.js",
  "C++",
  "SQL",
  "Visual Basic 6.0",
  "Data Structures & Algorithms",
];

const education = [
  {
    title: "B-TECH CSE",
    place: "BWU Kolkata",
    score: "8.85 GPA (up to 7th semester)",
    year: "2023 - 2026",
  },
  {
    title: "Diploma CSE",
    place: "BIT Mesra",
    score: "7.88 GPA",
    year: "2020 - 2023",
  },
];

function SectionCard({
  title,
  children,
  delay = 0,
  animated = true,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  animated?: boolean;
}) {
  const classes =
    "glass-card rounded-sm border border-white/10 p-5 sm:p-6";

  if (!animated) {
    return (
      <section className={classes}>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300/75">
          {title}
        </p>
        <div className="mt-4">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
      className={classes}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300/75">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

export default function MainContent({ selectedGame }: MainContentProps) {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 1, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-panel-strong relative overflow-hidden rounded-sm border border-white/12 p-5 shadow-[0_24px_80px_rgba(20,20,22,0.45)] sm:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,179,184,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(176,179,184,0.14),transparent_32%)]" />
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-sm border border-neutral-300/30 shadow-[0_0_36px_rgba(176,179,184,0.22)] sm:h-36 sm:w-36">
            <Image
              src="/Engen.jpg"
              alt="Shivam Kumar Rana"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.34em] text-neutral-300/75">
            Resume Dashboard
          </p>
          <h1 className="mt-3 bg-gradient-to-r from-white via-neutral-200 to-zinc-300 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl">
            hey, I&apos;m Shivam
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-medium text-neutral-100/72 sm:text-base">
            Right now I&apos;m mostly a frontend guy who enjoys building cool UIs, with a little bit of C++ and DSA on the side. Backend and other stuff… coming soon.
          </p>

          <div className="mt-6 glass-card rounded-sm border border-white/10 px-4 py-3 text-sm text-zinc-200/75">
            Currently exploring: <span className="font-medium text-white">{selectedGame.name}</span>
          </div>
        </div>
      </motion.section>

      <SectionCard title="Profile" delay={0.05}>
        <p className="text-sm leading-7 text-zinc-200/78 sm:text-base">
          I like building things that actually work and look good. Right now I spend most of my time working on frontend and making UIs feel smooth and clean, while slowly improving my problem-solving with C++. I enjoy learning by building real projects, breaking stuff, and fixing it again 😄. Next, I&apos;m planning to dive into backend, iOS development, and AI.
        </p>
      </SectionCard>

      <SectionCard title="Projects" delay={0.08}>
        <div className="relative space-y-4 pt-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 1, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className="group relative rounded-sm border border-white/10 bg-white/4 p-5 transition hover:border-neutral-300/20 hover:shadow-[0_14px_36px_rgba(160,163,168,0.1)]"
            >
              <div className="absolute bottom-5 left-0 top-5 w-px bg-gradient-to-b from-transparent via-neutral-200/40 to-transparent" />
              <div className="pl-5">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-200/75">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Skills" delay={0.1}>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 1, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-100/85 shadow-[0_8px_20px_rgba(20,20,22,0.12)] transition hover:border-neutral-300/25"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Education" delay={0.12}>
        <div className="space-y-4">
          {education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-sm border border-white/10 bg-white/4 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300/75">{item.place}</p>
                </div>
                <p className="text-sm font-medium text-neutral-100/75">{item.year}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-200/75">{item.score}</p>
            </motion.div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Games I Play" animated={false}>
        <div className="grid grid-cols-1 gap-5 pt-1 md:grid-cols-2">
          {gamesIPlay.map((game) => (
            <article
              key={game.name}
              className="group w-full overflow-hidden rounded-sm border border-white/10 bg-white/4 transition duration-300 hover:-translate-y-1 hover:border-neutral-300/20 hover:shadow-[0_16px_40px_rgba(160,163,168,0.1)]"
            >
              <div
                className="relative aspect-[16/8] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(176,179,184,0.18),transparent_55%),linear-gradient(180deg,rgba(20,20,22,0.72),rgba(0,0,0,0.92))]"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-zinc-950/5" />
              </div>

              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{game.name}</h3>
                <p className="text-sm leading-7 text-zinc-200/75">
                  {game.description}
                </p>
                <p className="text-sm leading-7 text-neutral-200/68">
                  {game.note}
                </p>
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-flex items-center rounded-sm border border-neutral-300/20 bg-neutral-400/12 px-4 py-2 text-sm font-medium text-neutral-50 transition hover:border-neutral-300/30 hover:bg-neutral-300/12"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
