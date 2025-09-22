import { getCategories } from "@/app/serveractions/categories.action";
import CategoryDisplay from "@/components/CategoryComponent/CategoryDisplay";
import React from "react";

export default async function Category() {
    const categories = await getCategories();
    return (
        <>
            <div className="container  mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 pt-24 gap-6">
                    <CategoryDisplay category={categories?.data} />
                </div>
            </div>
        </>
    );
}
