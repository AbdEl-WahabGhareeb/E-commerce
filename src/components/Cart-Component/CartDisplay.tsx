"use client";
import React, { useState } from "react";

import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "@/app/context/CartContext";
import {
    clearUserCart,
    removeItem,
    updateQuantity,
} from "@/app/serveractions/cart.action";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartDisplay() {
    const { cartDetails, getCartDetails, clearTheCart } = useCart();

    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteItem(productId: string) {
        setIsLoading(true);
        const removeFromCart = await removeItem(productId);
        toast.success("Item Successfuly Removed");
        await getCartDetails();
        setIsLoading(false);
        console.log(removeFromCart);

    }

    console.log(cartDetails);
    

    async function handleClearCart() {
        setIsLoading(true);
        const clearCart = await clearUserCart();
        toast.success("Cart is empty now");
        await clearTheCart();
        setIsLoading(false);
        console.log(clearCart);

    }

    async function handleUpdateQuantity(productId: string, count: number) {
        setIsLoading(true);
        const updateCount = await updateQuantity(productId, count);
        toast.success("Quantity Updated Successfuly");
        await getCartDetails();
console.log(updateCount);

        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-4xl font-semibold text-start mb-7">
                                Cart Shop
                            </p>
                            <Link href="/checkout">
                                <Button className="cursor-pointer bg-blue-600 px-6 py-6 hover:bg-blue-800 transition-all">
                                    Check Out
                                </Button>
                            </Link>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-[20px]">
                                <span>total price: </span>
                                <span className="text-green-500">
                                    {cartDetails?.data?.totalCartPrice}
                                </span>
                            </p>

                            <p className="font-semibold text-[20px]">
                                <span>total number of items: </span>
                                <span className="text-green-500">
                                    {cartDetails?.numOfCartItems}
                                </span>
                            </p>
                        </div>
                    </div>
                    {cartDetails?.data?.products?.map((product) => (
                        <div key={product?._id} className="border-b">
                            <div className="flex justify-between items-center">
                                <div className="left flex w-3/4 items-center gap-6">
                                    <div className="relative h-[200px] w-1/6">
                                        <Image
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw , 25vw"
                                            fill
                                            src={product?.product?.imageCover}
                                            alt={product?.product?.title}
                                        />
                                    </div>
                                    <div className="titles">
                                        <p className="font-semibold text-lg ">
                                            {product?.product?.title
                                                .split(" ")
                                                .slice(0, 2)
                                                .join(" ")}{" "}
                                        </p>
                                        <p className="font-medium text-sm text-start">
                                            {product?.price} EGP
                                        </p>
                                        <p
                                            onClick={() =>
                                                handleDeleteItem(
                                                    product?.product?._id
                                                )
                                            }
                                            className="text-[14px] mt-3 text-red-600 flex items-center gap-0.5 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 " />
                                            Remove
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                product?.product?._id,
                                                product?.count + 1
                                            )
                                        }
                                        variant={"outline"}
                                        className="border-green-600 p-3 cursor-pointer"
                                    >
                                        +
                                    </Button>

                                    {product?.count}

                                    <Button
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                product?.product?._id,
                                                product?.count - 1
                                            )
                                        }
                                        variant={"outline"}
                                        className="border-green-600 p-3 cursor-pointer"
                                    >
                                        -
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button
                        className="cursor-pointer border-green-500 px-8 py-5 mt-8"
                        variant={"outline"}
                        onClick={() => handleClearCart()}
                    >
                        Clear Cart
                    </Button>
                </>
            )}
        </>
    );
}
