import React from 'react'

import { getGamesByIds, searchGames } from './api/api'
import Hero from '../components/Hero'
import GamesSlider from '../components/GamesSlider';


//server page  ==>  performance, SEO
export default async function Home() {

  const  data  = await searchGames('', 1, [], 10);
  const ps5 = await searchGames(
    "",
    1,
    [
      { filterName: "platforms", option: "187" },
      {
        filterName: "ordering",
        option: "-metacritic",
      },
    ],
    10
  );

  const pc = await searchGames("", 1, [{ filterName: "platforms", option: "4" }], 10);
  const { results } = data.data;
  const customGames = await getGamesByIds(["799265", "58550", "2462", "494384", "452642", "452634"]);

  return (
    <main>
      <Hero />
      <GamesSlider title="Top Games for PS5" games={ps5.data.results} />
      <GamesSlider title="Top Games" games={results} />
      <GamesSlider screenBig big slidePreview={2} title="PLAYSTATION EXCLUSIVES" games={customGames.map((game) => game.data)} />
      <GamesSlider slidePreview={4} title="Top PC Games" games={pc.data.results} />    </main>
  )
}
