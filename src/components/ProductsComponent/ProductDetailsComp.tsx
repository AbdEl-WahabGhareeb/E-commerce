"use client";
import { ProductDetails } from "@/app/types/productDetails.model";
import React from "react";
import { StarRating } from "react-flexible-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { addToUserCart } from "@/app/serveractions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsComp({
    productDetails,
}: {
    productDetails: ProductDetails;
}) {
    console.log(productDetails, "productDetails");

    const { getCartDetails } = useCart();
    async function handleAddToCart(productId: string) {
        const addToCart = await addToUserCart(productId);
        toast.success(addToCart?.message);
        await getCartDetails();
        console.log(addToCart);
    }

    return (
        <>
            <div className="flex justify-between gap-8 items-center mt-10">
                <div className="w-full md:w-1/2">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, Pagination]}
                        className="mySwiper "
                    >
                        {productDetails?.images?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-[500px]">
                                    <Image
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw , 25vw"
                                        priority
                                        loading="eager"
                                        fill
                                        src={image}
                                        alt={`Nature ${index + 1}`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="w-full md:w-1/2 ">
                    <h2 className="text-2xl font-bold mb-3">
                        {productDetails?.title}
                    </h2>
                    <p className="text-gray-400 text-[12px] mb-3">
                        {productDetails?.description}
                    </p>
                    <div className="flex justify-between items-center  mb-3">
                        <div className="cat-price">
                            <p className="text-[14px]">
                                {productDetails?.category?.name}
                            </p>
                            <p className="text-[14px]">
                                {productDetails?.price} EGP
                            </p>
                        </div>
                        <div className="rate flex items-center gap-1">
                            <StarRating
                                initialRating={1}
                                starsLength={1}
                                dimension={1}
                            ></StarRating>
                            <p className="text-[14px]">
                                {productDetails?.ratingsAverage}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleAddToCart(productDetails?._id)}
                        type="button"
                        className="bg-green-600 text-white w-full cursor-pointer  px-3 py-1.5 text-[13px] rounded-md hover:bg-green-700 transition-all"
                    >
                        + Add To Cart
                    </button>
                </div>
            </div>
        </>
    );
}
