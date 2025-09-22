"use client";
import { Categories } from "@/app/types/category.model";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


export default function CategoryDisplay({
    category,
}: {
    category: Categories[];
}) {



    return (
        <>
            {category?.map((cat) => (
                <div key={cat._id}>
                    <Link href={`/category/${cat?._id}`}>
                        <Card className="relative w-full justify-around gap-0 p-0 text-center  hover:shadow-special transition-all duration-500">
                        <CardContent className="p-0">
                            <div className="relative w-full h-[300px] ">
                                <Image
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw , 25vw"
                                    priority
                                    loading="eager"
                                    fill
                                    src={cat?.image}
                                    alt={cat?.name}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="text-center items-center justify-center py-3">
                            <p className="text-3xl text-green-700 font-semibold p-2">
                                {cat?.name}
                            </p>
                        </CardFooter>
                    </Card>
                    </Link>
                </div>
            ))}
        </>
    );
}
