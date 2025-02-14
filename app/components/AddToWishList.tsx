'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle } from 'lucide-react';
import { useWishlist } from '../context/wishlistContext';

function AddToWishList({ gameId, plus }: { gameId: string; plus?: boolean }) {

    const { handleAddToWishlist, wishlistLocal } = useWishlist();
    const isWishlist = wishlistLocal.includes(gameId)!!;
    return plus ? (
        isWishlist ? (
            <XCircle onClick={() => handleAddToWishlist(gameId)} />
        ) : (
            <PlusCircle onClick={() => handleAddToWishlist(gameId)} />
        )
    ) : (
        <Button className=" capitalize" onClick={() => handleAddToWishlist(gameId)}>
                {isWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </Button>
    );
}

export default AddToWishList