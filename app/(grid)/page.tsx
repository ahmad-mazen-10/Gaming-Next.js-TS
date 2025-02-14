"use client";

import React from "react";
import { getGamesByIds, searchGames } from "./api/api";
import Hero from "../components/Hero";
import GamesSlider from "../components/GamesSlider";

export default async function Home() {
  let ps5 = null;
  let data = null;
  let pc = null;
  let customGames = null;

  try {
    data = await searchGames("", 1, [], 10);
    ps5 = await searchGames(
      "",
      1,
      [
        { filterName: "platforms", option: "187" },
        { filterName: "ordering", option: "-metacritic" },
      ],
      10
    );
    pc = await searchGames("", 1, [{ filterName: "platforms", option: "4" }], 10);
    customGames = await getGamesByIds([
      "799265",
      "58550",
      "2462",
      "494384",
      "452642",
      "452634",
    ]);
  } catch (error) {
    console.error("❌ Error fetching games:", JSON.stringify(error, null, 2));
    return <div>Error loading games</div>;
  }

  function cleanGameData(game: any) {
    try {
      return JSON.parse(JSON.stringify({
        id: game?.id || "",
        name: game?.name || "Unknown",
        background_image: game?.background_image || "",
        description_raw: game?.description_raw || "",
        parent_platforms: game?.parent_platforms || [],
        short_screenshots: game?.short_screenshots || [],
      }));
    } catch (error) {
      console.error("❌ Error cleaning game data:", JSON.stringify(error, null, 2));
      return null;
    }
  }

  function logType(data: any, label: string) {
    console.log(`🔍 ${label} - Type:`, typeof data);
    console.log(`🔍 ${label} - Prototype:`, Object.getPrototypeOf(data));
    console.log(`🔍 ${label} - JSON:`, JSON.stringify(data, null, 2));
  }

  console.log("========== Debugging Data ==========");
  logType(ps5?.data?.results, "PS5 Data");
  logType(data?.data?.results, "Top Games");
  logType(customGames, "Custom Games");
  logType(pc?.data?.results, "PC Games");
  console.log("====================================");

  return (
    <main>
      <Hero />

      {ps5?.data?.results && (
        <GamesSlider
          title="Top Games for PS5"
          games={ps5.data.results.map(cleanGameData).filter(Boolean)}
        />
      )}

      {data?.data?.results && (
        <GamesSlider
          title="Top Games"
          games={data.data.results.map(cleanGameData).filter(Boolean)}
        />
      )}

      {customGames && (
        <GamesSlider
          screenBig
          big
          slidePreview={2}
          title="PLAYSTATION EXCLUSIVES"
          games={customGames.map((game) => cleanGameData(game?.data)).filter(Boolean)}
        />
      )}

      {pc?.data?.results && (
        <GamesSlider
          slidePreview={4}
          title="Top PC Games"
          games={pc.data.results.map(cleanGameData).filter(Boolean)}
        />
      )}
    </main>
  );
}
