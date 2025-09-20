import { getAllOrders } from "@/app/serveractions/payment.action";
import React from "react";

export default async function AllOrders() {
    
        const response = await getAllOrders()
        console.log(response);
        
    return (
        <>
            <p className="font-bold mt-24 text-2xl text-center">
                All Orders Page
            </p>
        </>
    );
}
