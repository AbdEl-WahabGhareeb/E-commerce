import {
    getCategories,
    getSupCategories,
} from "@/app/serveractions/categories.action";
import CategoryDisplay from "@/components/CategoryComponent/CategoryDisplay";
import SubCategoryDisplay from "@/components/CategoryComponent/SubCategoryDisplay"; 
import React from "react";

export default async function Category(id: string) {
    const categories = await getCategories();
    console.log(categories);

    const subCategory = await getSupCategories(id);
    console.log(subCategory, " sub cat from caaaaaaaaaaaat");
    console.log(id, "id from categooor");
    

    return (
        <>
            <div className="container  mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 pt-24 gap-6">
                    <CategoryDisplay category={categories?.data} />
                    
                </div>
                {/* <div className="mt-5">
                        <SubCategoryDisplay subcategories={subCategory?.data} category={categories?.data} />
                    </div> */}
            </div>
        </>
    );
}
