"use client";
import { Categories } from "@/app/types/category.model";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function CatDisplay({
    categories,
}: {
    categories: Categories[];
}) {
    return (
        <> 
            <div className="container mx-auto my-12">
                <Swiper
                    spaceBetween={20}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // when window width is >= 320px (mobile)
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        // when window width is >= 768px (tablet)
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        // when window width is >= 1024px (laptop)
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        // when window width is >= 1280px (desktop)
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    {categories?.map((cat) => (
                        <SwiperSlide key={cat?._id}>
                            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                                <Image
                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    priority
                                    loading="eager"
                                    fill
                                    src={cat?.image}
                                    alt={cat?.name || 'Category image'}
                                />
                            </div>
                            <p className="text-center font-semibold text-lg p-2 mt-3">
                                {cat?.name}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
