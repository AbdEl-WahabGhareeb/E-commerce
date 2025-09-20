"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
    interface inputs {
        name: string;
        email: string;
        password: string;
        rePassword: string;
        phone: string;
    }

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<inputs>();

    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    async function onSubmit(values: inputs) {
        console.log(values, "sign up data");

        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                values
            );
            console.log(response, "axios response");
            if (response?.data?.message === "success") {
                router.push(`/login`);
            }
            setErrorMessage(null);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error, "axios error message");
                setErrorMessage(
                    error?.response?.data?.message ||
                        error?.response?.data?.errors?.msg
                );
            }
        }
    }

    return (
        <>
            <p className="font-bold mt-24 mb-12 text-2xl text-center">
                Register Page
            </p>
            <div className="w-1/2 mx-auto">
                {errorMessage && (
                    <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className="mb-4"
                        type="text"
                        placeholder="Enter Your Name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                        <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                            {errors.name.message}
                        </p>
                    )}

                    <Input
                        className="mb-4"
                        type="email"
                        placeholder="Enter Your Email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                            {errors.email.message}
                        </p>
                    )}

                    <Input
                        className="mb-4"
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                            {errors.password.message}
                        </p>
                    )}

                    <Input
                        className="mb-4"
                        type="password"
                        placeholder="Confirm Your Password"
                        {...register("rePassword", {
                            required: "Confirm Password is required",
                        })}
                    />
                    {errors.rePassword && (
                        <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                            {errors.rePassword.message}
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

                    <Button type="submit" className="cursor-pointer px-7 py-5">
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}
