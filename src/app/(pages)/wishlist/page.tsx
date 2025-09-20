import { getUserWishList } from "@/app/serveractions/wishlist.action";
import WishListDisplay from "@/components/WishListComponent/WishListDisplay";
import React from "react";

export default async function WishList() {
    const wishList = await getUserWishList();
    console.log(wishList?.data?.data, " wish list from main wish list component");

    return (
        <div>
            <p className="font-bold mb-8 mt-20 text-2xl text-center ">
                Wish List Page
            </p>
            
            <WishListDisplay />
        </div>
    );
}
