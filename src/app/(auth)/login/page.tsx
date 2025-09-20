"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    interface inputs {
        email: string;
        password: string;
    }

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<inputs>();

    async function onSubmit(values: inputs) {
        console.log(values, "sign up data");

        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if(response?.ok){
                router.push("/")
            }
            console.log(response, "login response");
        } catch (error) {
            console.log(error, "login error");
        }
    }

    return (
        <>
            <div className="w-1/2 mx-auto">
                <p className="font-bold mt-24 mb-12 text-2xl text-center">
                    Login Page
                </p>
                {errorMessage && (
                    <p className="w-full text-black bg-red-700 px-4 py-2 mb-4 rounded-2xl ">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" className="cursor-pointer px-7 py-5">
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
}
