"use client";
import React from "react";
import { Categories } from "@/app/types/category.model";

export default function SubCategoryDisplay({
    subcategories,
    category,
}: {
    subcategories: Categories[] | undefined;
    category: Categories[];
}) {


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
                {category?.map((subcat) => (
                        
                        <div
                            key={subcat?._id}
                            className="bg-transparent font-semibold text-black text-center py-5 hover:bg-transparent hover:shadow-special transition-all duration-500 text-2xl border "
                        >
                            {subcat?.name}
                        </div>
                ))}
            </div>
        </>
    );
}
