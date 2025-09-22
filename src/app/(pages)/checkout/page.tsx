"use client";
import { useCart } from "@/app/context/CartContext";
import {
    getCashPayment,
    getOnlinePayment,
} from "@/app/serveractions/payment.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "./loading";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckOut() {
    interface inputs {
        details: string;
        phone: string;
        city: string;
    }
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<
        "cash" | "online" | null
    >(null);

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<inputs>();

    const router = useRouter();
    const { cartDetails, setCartDetails } = useCart();
    const cartId = cartDetails?.cartId;


    async function onSubmit(values: inputs) {
        if (paymentMethod == "cash") {
            try {
                setIsLoading(true);
                const response = await getCashPayment(cartId as string, { shippingAddress: values });
                console.log(response);
                if (response?.data?.status === "success") {
                    setCartDetails(null);
                    router.push(`/`);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (paymentMethod == "online") {
            console.log(paymentMethod, "Payment Method");
            try {
                setIsLoading(true);
                const response = await getOnlinePayment(
                    cartId as string,
                    { shippingAddress: values }
                );
                console.log(response);
                if (response?.data?.status === "success") {
                    window.location.href = response.data.session.url
                    console.log(response?.data ,"online payment response");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <p className="font-bold mb-8 mt-20 text-2xl text-center ">
                Check Out Page
            </p>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-1/2 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            className="mb-4"
                            type="text"
                            placeholder="Enter Your Details"
                            {...register("details", {
                                required: "Details is required",
                            })}
                        />
                        {errors.details && (
                            <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                                {errors.details.message}
                            </p>
                        )}

                        <Input
                            className="mb-4"
                            type="tel"
                            placeholder="Enter Your Phone Number"
                            {...register("phone", {
                                required: "Phone Number is required",
                            })}
                        />
                        {errors.phone && (
                            <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                                {errors.phone.message}
                            </p>
                        )}

                        <Input
                            className="mb-4"
                            type="text"
                            placeholder="Enter Your City"
                            {...register("city", {
                                required: "City is required",
                            })}
                        />
                        {errors.city && (
                            <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                                {errors.city.message}
                            </p>
                        )}

                        <RadioGroup
                            onValueChange={(value) =>
                                setPaymentMethod(value as "online" | "cash")
                            }
                            className=" flex flex-row gap-3 my-4"
                        >
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash Payment</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="online" id="online" />
                                <Label htmlFor="online">Online Payment</Label>
                            </div>
                        </RadioGroup>

                        <Button
                            type="submit"
                            className="cursor-pointer px-7 py-5"
                        >
                            Check Out
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}
