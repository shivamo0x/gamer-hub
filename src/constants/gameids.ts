export type GamePlayItem = {
  slug: string;
  name: string;
  image: string;
  description: string;
  note: string;
};

export const gamesIPlay: GamePlayItem[] = [
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    image: "/ids-picture/genshin-uid.jpg",
    description: "Open-world action RPG with elemental team building and large-scale exploration.",
    note: "Usually my comfort game for long sessions, resin spending, and random late-night exploration.",
  },
  {
    slug: "star-rail",
    name: "Honkai: Star Rail",
    image: "/ids-picture/star-rail-uid.png",
    description: "Turn-based sci-fi RPG with stylish combat, character synergy, and polished progression.",
    note: "I enjoy this one when I want cleaner turn-based planning and polished character-focused runs.",
  },
  {
    slug: "wuthering-waves",
    name: "Wuthering Waves",
    image: "/ids-picture/wuwa-id.jpg",
    description: "Fast-paced action RPG focused on fluid combat loops and cinematic character playstyles.",
    note: "This is the one I open when I want fast combat, flashy rotations, and a smoother action feel.",
  },
  {
    slug: "free-fire-max",
    name: "Free Fire Max",
    image: "/ids-picture/free-fire-uid.jpg",
    description: "Competitive battle royale experience built around quick matches and fast squad coordination.",
    note: "Mostly a fun squad game for quick matches and chill sessions with friends.",
  },
  {
    slug: "bgmi",
    name: "PUBG",
    image: "/ids-picture/bgmi-uid.jpg",
    description: "Tactical shooter and battle royale title with ranked matches, strategy, and steady mechanics.",
    note: "I usually play this for longer team sessions where strategy and communication matter more.",
  },
  {
    slug: "arknights-endfield",
    name: "Arknights: Endfield",
    image: "/ids-picture/arknight-endfields.jpg",
    description: "A sci-fi title I actively follow for its worldbuilding, visual style, and future team possibilities.",
    note: "More of a worldbuilding and style pick for me right now, but it is one I keep a close eye on.",
  },
  // {
  //   slug: "ghost-of-tsushima",
  //   name: "Ghost of Tsushima",
  //   image: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/9h423wCC1FFb8tknYFAU4NC9.png",
  //   description: "Cinematic samurai action-adventure with stealth, duels, exploration, and a strong revenge story.",
  //   note: "A story-first pick for clean sword combat, quiet exploration, and that full samurai cinema feeling.",
  // },
  // {
  //   slug: "the-last-of-us",
  //   name: "The Last of Us",
  //   image: "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg",
  //   description: "Survival action-adventure built around stealth, scarce resources, and emotional character storytelling.",
  //   note: "One of the strongest story picks for tense survival pacing and the Joel-Ellie journey.",
  // },
  // {
  //   slug: "spider-man-miles-morales",
  //   name: "Marvel's Spider-Man: Miles Morales",
  //   image: "https://image.api.playstation.com/vulcan/ap/rnd/202008/1420/HcLcfeQBXd2RiQaCeWQDCIFN.jpg",
  //   description: "Superhero action-adventure with fast traversal, venom powers, stealth, and a Harlem-centered story.",
  //   note: "A clean action pick for web-swinging, stylish combat, and Miles becoming his own Spider-Man.",
  // },
];
