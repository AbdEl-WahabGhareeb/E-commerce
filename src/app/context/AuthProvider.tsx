"use client";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";
import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./WishListContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CartContextProvider>
                <WishListContextProvider>{children}</WishListContextProvider>
            </CartContextProvider>
            <Toaster position="top-center" reverseOrder={false} />
        </SessionProvider>
    );
}
