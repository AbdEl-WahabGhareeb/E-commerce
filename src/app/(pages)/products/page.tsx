import { getProducts } from "@/app/serveractions/products.action";
import ProductDisplay from "@/components/ProductsComponent/ProductDisplay";
import React from "react";

export default async function Products() {
    const product = await getProducts();
    console.log(product?.data, "product");
    return (
        <>
            <p className="font-bold mb-8 mt-20 text-2xl text-center ">
                Products Page
            </p>
            <div className=" py-5">
                <ProductDisplay products={product?.data} />
            </div>
        </>
    );
}
