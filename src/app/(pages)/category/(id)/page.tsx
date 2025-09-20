import {
    getSupCategories,
} from "@/app/serveractions/categories.action";
import SubCategoryDisplay from "@/components/CategoryComponent/SubCategoryDisplay";
import React from "react";

export default async function SubCatId({ params }: { params: { id: string } }) {

    
    const { id } = await params;
    
    const subCategories = await getSupCategories(id);
    


    return (
        <div className="container mx-auto mt-20">
            <SubCategoryDisplay
                subcategories={subCategories?.data}
                category={subCategories?.data || []}
            />
        </div>
    );
}
