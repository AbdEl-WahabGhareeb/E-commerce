import React from "react";
import Image from "next/image";
import { Brands } from "@/app/types/brands.model";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function BrandsDisplay({ brands }: { brands: Brands[] }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
                {brands?.map((brand) => (
                    <Dialog key={brand?._id}>
                        <DialogTrigger asChild>
                            <div className="brands border pb-8 hover:shadow-special transition-all duration-500 rounded-sm">
                                <div className="relative h-[200px] mb-2 ">
                                    <Image
                                        src={brand?.image}
                                        alt={brand?.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-[14px]">{brand?.name}</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className=" pb-3">
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-between items-center py-3 border-y-2 flex-row gap-4">
                                <div>
                                    <p className="font-bold text-4xl text-green-600 ">{brand?.name}</p>
                                    <p>{brand?.name}</p>
                                </div>
                                <div className="relative w-1/2 h-[140px] mb-2 ">
                                    <Image
                                        src={brand?.image}
                                        alt={brand?.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="cursor-pointer bg-gray-500 hover:bg-gray-700 " >Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </>
    );
}
