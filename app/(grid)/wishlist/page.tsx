'use client'
import React from 'react'
import GridContainer from '@/app/components/defaults/GridContainer'
import { useWishlist } from '@/app/context/wishlistContext'
import { useGetGamesWithIds } from '@/lib/queryFunctions';
import GameCard from '@/app/components/GameCard';
import Heading from '@/app/components/Heading';
import GameSkeleton from '@/app/components/GameSkeleton';
import Empty from "@/app/components/defaults/Empty";

function page() {
    const { wishlistLocal } = useWishlist();
    const { games = [], isLoading } = useGetGamesWithIds(wishlistLocal);

    return (
        <div className="flex flex-col gap-4 mt-10">

            <Heading text='My Wishlist 💛' />
            <GridContainer cols={4}>
                {isLoading ? <GameSkeleton />
                    : games?.length > 0
                        ? games?.map((game: any) => (
                            <GameCard
                                key={game.id}
                                wishlist
                                game={{ ...game.data, short_screenshots: game.screenshorts }}
                            />
                        ))
                        : <Empty
                            message="You have not added anything to your wishlist yet !"
                            link="/games"
                            linkText="Browse More Games"
                        />}
            </GridContainer>
        </div>
    )
}

export default page