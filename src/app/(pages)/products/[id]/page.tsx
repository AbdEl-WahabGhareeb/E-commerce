import { getProductDetails } from "@/app/serveractions/products.action";
import ProductDetailsComp from "@/components/ProductsComponent/ProductDetailsComp";
import React from "react";

export default async function ProductDetailsId({params}: {params: { id: string };}) {
    
    const { id } = await params;

    const productDetails = await getProductDetails(id);


    return (
        <div className="container mx-auto mt-20">
            <p className="text-2xl font-bold text-center">
                Product Details Page
            </p>
            <ProductDetailsComp productDetails={productDetails?.data} />
        </div>
    );
}
    