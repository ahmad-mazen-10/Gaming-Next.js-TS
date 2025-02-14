"use client";
import React, { useState } from "react";
import GridContainer from "./defaults/GridContainer";
import { useGetGames } from "@/lib/queryFunctions";
import GameSkeleton from "./GameSkeleton";
import { Game } from "../(grid)/@types";
import Empty from "./defaults/Empty";
import GameCard from "./GameCard";
import PaginationCustom from "./PaginationCustom";

function Filters({ generes }: { generes: any[] }) {
    const [page, setPage] = useState(1);
    const [activeGenres, setActiveGenres] = useState<number[]>([]);

    const { games, isLoading } = useGetGames({
        page,
        filters:
            activeGenres.length > 0
                ? [{ filterName: "genres", option: activeGenres?.join(",") }]
                : [],
    });

    const onclickBtn = (genre: any) => {
        setActiveGenres((prevGenres) =>
            prevGenres.includes(genre.id)
                ? prevGenres.filter((id) => id !== genre.id)
                : [...prevGenres, genre.id]
        );
    };

    const totalPages = games?.data?.count
        ? Math.ceil(games?.data.count / 21)
        : 1;

    return (
        <GridContainer className="gap-5 relative" cols={11}>
            <div className="lg:sticky lg:h-screen inset-0 col-span-full lg:col-span-2">
                <div className="flex flex-row flex-wrap lg:flex-col gap-3 bg-main py-4 px-8 rounded-2xl">
                    {generes.map((genre: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => onclickBtn(genre)}
                            className={`${activeGenres.includes(genre.id) ? "bg-rose-400" : ""
                                } text-base rounded-xl`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            <GridContainer cols={3} className="gap-3 col-span-9">
                {isLoading ? (
                    <GameSkeleton number={21} />
                ) : games?.data?.results?.length > 0 ? (
                    games?.data.results.map((game: Game) => (
                        <GameCard
                            screenBig={false}
                            wishlist
                            key={game.id}
                            game={game}
                        />
                    ))
                ) : (
                    <Empty message="Sorry, no games found in this page" />
                )}
            </GridContainer>

            {totalPages > 1 && (
                <PaginationCustom setPage={setPage} page={page} count={totalPages} />
            )}
        </GridContainer>
    );
}

export default Filters;
