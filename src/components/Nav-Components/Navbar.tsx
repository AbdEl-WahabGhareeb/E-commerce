"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
    const session = useSession();
    const { cartDetails } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    console.log(session);

    return (
        <>
            <div className="bg-gray-200 fixed z-50 top-0 left-0 right-0">
                <NavigationMenu className="p-4 max-w-7xl mx-auto justify-between items-center px-4 md:px-8">
                    <NavigationMenuList>
                        <NavigationMenuItem className="font-bold text-lg">
                            <Link href="/">Ecommerce</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <div className="invisible md:visible justify-between flex-grow">
                        {session?.data ? (
                            <>
                                <NavigationMenuList className="gap-5 items-center">
                                    <NavigationMenuItem>
                                        <Link href="/">Home</Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/cart">Cart</Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/wishlist">Wish List</Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/products">Products</Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/category">Category</Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/brands">Brands</Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </>
                        ) : null}
                    </div>

                    <NavigationMenuList className="gap-2 invisible sm:visible ">
                        {session?.data ? (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        href="/cart"
                                        className="relative block p-1.5"
                                    >
                                        {cartDetails?.numOfCartItems ? (
                                            <Badge
                                                variant="default"
                                                className="absolute bg-green-700 top-[-10px] right-[-8px]"
                                            >
                                                {cartDetails?.numOfCartItems}
                                            </Badge>
                                        ) : null}
                                        <ShoppingCart />
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/"
                                        onClick={() =>
                                            signOut({
                                                callbackUrl: `/login`,
                                            })
                                        }
                                    >
                                        Logout
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link href="/login">Login</Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/register">Register</Link>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenuList>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <MenuIcon className="h-6 w-6" />
                        )}
                    </button>

                    {isMobileMenuOpen && (
                        <div className="md:hidden vissible absolute top-full left-0 right-0 bg-gray-200 py-2 px-4 shadow-lg">
                            {session?.data ? (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/"
                                        className="hover:text-green-600"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/cart"
                                        className="hover:text-green-600"
                                    >
                                        Cart
                                    </Link>
                                    <Link
                                        href="/wishlist"
                                        className="hover:text-green-600"
                                    >
                                        Wish List
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="hover:text-green-600"
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        href="/category"
                                        className="hover:text-green-600"
                                    >
                                        Category
                                    </Link>
                                    <Link
                                        href="/brands"
                                        className="hover:text-green-600"
                                    >
                                        Brands
                                    </Link>
                                    <div className="flex items-center flex-col gap-2 justify-between pt-4 border-t">
                                        <Link href="/cart" className="relative">
                                            {cartDetails?.numOfCartItems ? (
                                                <Badge
                                                    variant="default"
                                                    className="absolute bg-green-700 top-[-10px] right-[-8px]"
                                                >
                                                    {
                                                        cartDetails?.numOfCartItems
                                                    }
                                                </Badge>
                                            ) : null}
                                            <ShoppingCart />
                                        </Link>
                                        <Link
                                            href="/"
                                            onClick={() =>
                                                signOut({
                                                    callbackUrl: `/login`,
                                                })
                                            }
                                            className="hover:text-green-600"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/login"
                                        className="hover:text-green-600"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="hover:text-green-600"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </NavigationMenu>
            </div>
        </>
    );
}
