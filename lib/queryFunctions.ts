"use client";

import { getGamesByIds, searchGames } from "@/app/(grid)/api/api";
import { getUser } from "@/app/functions/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const { data: user , isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
    return { user, isLoading };
}

export function useGetGamesWithIds(ids:string[]) {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${ids}`],
    queryFn: () => getGamesByIds(ids),
  });
  return { games, isLoading };
}

interface getGameProps{
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: { filterName: string; option: string }[] | any;
  isDisabled?: boolean;
}

export function useGetGames({
  query = "",
  page = 1,
  pageSize = 21,
  filters = [],
  isDisabled = false,
}:
  getGameProps) {

  // search query ""  i am disabled when there is not query to search
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => await searchGames(query, page, filters, pageSize),
    enabled: !isDisabled,
  });
  return { games, isLoading };
};