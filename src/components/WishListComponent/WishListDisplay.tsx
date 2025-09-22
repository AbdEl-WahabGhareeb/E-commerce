"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useWishList } from "@/app/context/WishListContext";
import { removeFromWishList } from "@/app/serveractions/wishlist.action";
import { useCart } from "@/app/context/CartContext";
import { addToUserCart } from "@/app/serveractions/cart.action";
import Loading from "@/app/loading";

export default function WishListDisplay() {
    const [isLoading, setIsLoading] = useState(false);

    const { getCartDetails } = useCart();
    async function handleAddToCart(productId: string) {
        setIsLoading(true);
        const addToCart = await addToUserCart(productId);
        await getCartDetails();
        toast.success(addToCart?.message);
        setIsLoading(false);
    }


    const { wishListDetails, getWishListDetails } = useWishList();

    async function handleDeleteItemFromWishList(productId: string) {
        setIsLoading(true);
        const removeItem = await removeFromWishList(productId);
        toast.success(removeItem?.message || "Item Successfully Removed");
        await getWishListDetails();
        setIsLoading(false);
    }


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="container mx-auto p-10 bg-gray-100">
                    <p className="text-4xl font-semibold mb-7">My wish list</p>
                    {wishListDetails?.data?.map((item) => (
                        <div key={item?._id}>
                            <div className="flex justify-between items-center mb-5">
                                <div className="left flex w-3/4 items-center gap-6">
                                    <div className="relative h-[200px] w-1/6">
                                        <Image
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw , 25vw"
                                            fill
                                            src={item?.imageCover}
                                            alt={item?.title || ""}
                                        />
                                    </div>
                                    <div className="titles">
                                        <p className="font-semibold text-2xl ">
                                            {item?.title}
                                        </p>
                                        <p className="font-medium text-2xl text-green-600">
                                            {item?.price} EGP{" "}
                                        </p>
                                        <p
                                            onClick={() =>
                                                handleDeleteItemFromWishList(
                                                    item?._id
                                                )
                                            }
                                            className="text-[18px] text-red-600 flex items-center gap-0.5 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 " />
                                            Remove
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        handleAddToCart(item?._id)
                                    }
                                    variant={"outline"}
                                    className="border-green-600 px-5 py-5 cursor-pointer"
                                >
                                    Add To Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
