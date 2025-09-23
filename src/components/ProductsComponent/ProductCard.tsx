"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Products } from "@/app/types/product.model";
import { StarRating } from "react-flexible-star-rating";
import { Heart } from "lucide-react";
import Link from "next/link";
import { addToUserCart } from "@/app/serveractions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import { useWishList } from "@/app/context/WishListContext";
import { addToWishList, removeFromWishList } from "@/app/serveractions/wishlist.action";
import Loading from "@/app/loading";

export default function ProductCard({ product }: { product: Products }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInWishList, setIsInWishList] = useState(false);
    const { getCartDetails } = useCart();
    const { wishListDetails } = useWishList();
    async function handleAddToCart(productId: string) {
        setIsLoading(true);
        const addToCart = await addToUserCart(productId);
        toast.success(addToCart?.message);
        await getCartDetails();
        setIsLoading(false);
    }

    const { getWishListDetails } = useWishList();
    async function handleAddToWishList(productId: string) {
        setIsLoading(true);
        try {
            if (isInWishList) {
                const removeItem = await removeFromWishList(productId);
                toast.success(removeItem?.message);
                setIsInWishList(false);
            } else {
                const addItem = await addToWishList(productId);
                toast.success(addItem?.message);
                setIsInWishList(true);
            }
            await getWishListDetails();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        // Check if the current product is in the wishlist
        const isProductInWishList = wishListDetails?.data?.some(
            (item) => item._id === product._id
        );
        setIsInWishList(!!isProductInWishList);
    }, [wishListDetails, product._id]);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Card
                    key={product?._id}
                    className="relative group gap-0 pt-2 border-0 outline-0 shadow-none hover:shadow-special transition-all duration-500"
                >
                    <Link href={`/products/${product?._id}`}>
                        <CardHeader className="p-2 pb-0">
                            <div className="relative w-full h-[350px] ">
                                <Image
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw , 25vw"
                                    priority
                                    loading="eager"
                                    fill
                                    src={product?.imageCover}
                                    alt={product?.title}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex px-4 justify-between items-end">
                            <div className=" flex items-start flex-col w-3/4">
                                <p className="text-[14px] mb-4 text-green-600">
                                    {product?.category?.name
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                </p>
                                <p className="text-[14px]">
                                    {product?.slug
                                        .split("-")
                                        .slice(0, 2)
                                        .join(" ")}
                                </p>
                                <div>
                                    <span className="text-[14px] font-medium me-[5px]">
                                        {product?.price}
                                    </span>
                                    <span className="text-[12px] font-normal">
                                        EGP
                                    </span>
                                </div>
                            </div>
                            <div className="text-lg w-1/4 flex justify-end items-center gap-0.5">
                                <StarRating
                                    initialRating={1}
                                    starsLength={1}
                                    dimension={1}
                                ></StarRating>
                                {product?.ratingsAverage}
                            </div>
                        </CardContent>
                    </Link>

                    <CardFooter className="flex justify-end items-center gap-3 relative px-2  py-3">
                        <button
                            className="cursor-pointer right-12 w-3/4 text-white bg-green-600 rounded-2xl text-center p-2 absolute top-36 z-10 opacity-0 group-hover:opacity-100 group-hover:top-3 transition-all duration-500 "
                            onClick={() => handleAddToCart(product?._id)}
                        >
                            + Add
                        </button>
                        <button
                            onClick={() => handleAddToWishList(product?._id)}
                            className="cursor-pointer p-2 "
                            aria-label="Add to wishlist"
                        >
                            <Heart className={`text-2xl transition-all ${isInWishList ? 'fill-red-500 stroke-red-500' : 'fill-black stroke-black'}`} />
                        </button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
