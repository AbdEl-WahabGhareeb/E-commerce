import { getUserCart } from "@/app/serveractions/cart.action";
import CartDisplay from "@/components/Cart-Component/CartDisplay";
import React from "react";

export default async function Cart() {
    const cart = await getUserCart();
    console.log(cart, "cartttttttttttttttttttttttttt");

    return (
        <>
            <p className="font-bold mt-24 text-2xl text-center">
                Cart Page
            </p>

            <div className="container mx-auto text-2xl text-center mt-8 bg-gray-100 p-8 mb-16">
                <CartDisplay />
            </div>
        </>
    );
}
