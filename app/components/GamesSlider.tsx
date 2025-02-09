import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '../(grid)/@types';
import SwiperCards from '../components/SwiperCards';
import Heading from './Heading';
import AddToWishList from './AddToWishList';

interface GamesSliderProps {
  games: Game[];
  title: string;
  slidePreview?: number;
  big?: boolean;
  screenBig?: boolean
}

function GamesSlider({ games, title, slidePreview, big, screenBig }: GamesSliderProps) {
  return (
    <div className="mt-14 flex flex-col gap-6">
      <Heading text={title} className="text-white lg:text-4xl text-2xl font-semibold capitalize" />
      <SwiperCards
        className='h-full'
        slidesPerView={slidePreview || 4}
        items={games.map((game: Game) => {
          return {
            card: ( big ? (
              <div className='flex items-center overflow-hidden bg-[#333839] rounded-sxl'>

                <div className="flex w-[60%] flex-col px-6 items-start">
                  <h1 className="text-2xl font-semibold border-b-2 w-full border-neutral-100 pb-3 text-white">{game.name}</h1>
                  <p className='line-clamp-4 text-sm text-gray-100 pt-3'>{game.description_raw}</p>
                </div>

                <div className="w-[60%] relative">
                  <Image src={game.background_image} alt={game.name} fill className='group-hover:scale-125 group-hover:rotate-12 duration-200 object-cover' />
                </div>

              </div>
            ) : (
              <div className='cursor-pointer group'>

                <div className="hover:after:w-full after:absolute after:inset-0 after:w-0 after:h-full after:bg-rose-500/60 after:duration-200 after:rounded-2xl w-full h-96 rounded-2xl overflow-hidden relative">
                  <Image src={game.background_image} alt={game.name} fill className='group-hover:scale-125 group-hover:rotate-12 duration-200 object-cover' />
                </div>

                <Link href={`/game/${game.id}`} className=" text-base line-clamp-1 mt-2 text-white font-semibold ">
                  {game.name}
                </Link>

                <div className=" absolute top-2 left-4">
                  <AddToWishList plus gameId={game.id.toString()} />
                </div>

              </div>
            )
            )
          }
        })}
      />
    </div>)
}

export default GamesSlider