'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useGetUser } from "@/lib/queryFunctions";
import Spinner from "../components/defaults/Spinner";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AddToWishList, removeFromWishlist } from "../functions/actions";

interface WishListProps {
  handleAddToWishlist: (gameId: string) => void;
  wishlistLocal: string[];
}

const wishlistContext = createContext<WishListProps | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {

  const [mount, setIsMounted] = useState(false);
  const { user, isLoading } = useGetUser();
  const [wishlistLocal, setWishlistLocal] = useLocalStorageState<string[]>('wishlist', user?.data ? [...user?.data.wishlist] : []);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const queryClient = useQueryClient();
  const wishlist = user?.data ? user.data.wishlist : wishlistLocal;

  const handleAddToWishlist = async (gameId: string) => {
    if (!mount) return null
    const isWishlist = wishlistLocal.some((wish) => wish === gameId)

    if (user?.data) {
      const res = isWishlist ? await removeFromWishlist(gameId) : await AddToWishList(gameId);
      if (res.success) {
        toast.success(res.success);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else toast.error(res.error);
    } else {
      if (isWishlist) setWishlistLocal((prev) => prev.filter((wish) => wish !== gameId))
      else setWishlistLocal(prev => [...prev, gameId]);
    }; // scope handleToWishlist  
  }

  if (!mount) return null
  if (isLoading) return <Spinner />
  return <wishlistContext.Provider value={{ handleAddToWishlist, wishlistLocal }} >{children}</wishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(wishlistContext);
  if (!context) throw new Error("useWishlist must be used within a wishlistProvider")
  return context;
}