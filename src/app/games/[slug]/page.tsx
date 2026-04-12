import GameDetailsPage from "@/components/GameDetailsPage";
import { gameData, getGameBySlug } from "@/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type GamePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return gameData.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return {
      title: "Game Not Found | Gamer Hub",
    };
  }

  return {
    title: `${game.name} | Gamer Hub`,
    description: `${game.name} character dashboard with details, roles, and profile info.`,
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameDetailsPage game={game} />;
}
