"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

async function getUserWishList() {
    try {
        const token = await getUserToken();

        const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { headers: { token: token as string } }
        );

        return {
            data: response?.data,
            status: response?.status,
            message: response?.data?.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error?.response?.status,
                message: error?.response?.data?.message,
            };
        }
    }
}

async function addToWishList(productId: string) {
    try {
        const token = await getUserToken();

        const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId },
            { headers: { token: token as string } }
        );

        return {
            data: response?.data?.data,
            status: response?.status,
            message: response?.data?.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error?.response?.status,
                message: error?.response?.data?.message,
            };
        }
    }
}

async function removeFromWishList(productId: string) {
    try {
        const token = await getUserToken();

        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers: { token: token as string } }
        );

        return {
            data: response?.data?.data,
            status: response?.status,
            message: response?.data?.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error?.response?.status,
                message: error?.response?.data?.message,
            };
        }
    }
}

export { getUserWishList, addToWishList, removeFromWishList };
