'use server'
import User from "../models/user";
import { protect } from "./auth";

export async function AddToWishList(gameId: string) {
  try {
    const { decoded } = await protect();
    const user = await User.findById((decoded as any).id);
    if (!user) return { error: "User not found" };
    user.wishlist = user.wishlist?.filter((wish: string) => wish !== gameId) || [];
    user.wishlist.push(gameId);
    await user.save();
    return { success: "Game added to wishlist" };
  } catch (error) {
    console.error(error);
    return { error: "add to wishlist failed" };
  }
}

export async function removeFromWishlist(gameId: string) {
  try {
    const { decoded } = await protect();
    const user = await User.findById((decoded as any).id);
    if (!user) return { error: " user not found" };
    user.wishlist = user.wishlist.filter((id: string) => id !== gameId);
    await user.save();
    return { success: "Game removed from wishlist" };
  } catch (error) {
    return { error: "add to wishlist failed" };
  }
}
