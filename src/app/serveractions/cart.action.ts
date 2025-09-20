"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

async function getUserCart() {
    try {
        const token = await getUserToken();
        const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart",
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
                data: null,
                status: error?.response?.status,
                message: error?.response?.data?.message,
            };
        }
    }
}

async function clearUserCart() {
    try {
        const token = await getUserToken();
        const response = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/cart",
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
                data: null,
                status: error?.response?.status,
                message: error?.response?.data?.message,
            };
        }
        // Handle non-axios errors
        return {
            data: null,
            status: 500,
            message: 'An unexpected error occurred',
        };  
    }
}

async function addToUserCart(productId: string) {
    try {
        const token = await getUserToken();

        const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
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

async function removeItem(productId: string) {
    try {
        const token = await getUserToken();

        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
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

async function updateQuantity(productId: string, count: number) {
    try {
        const token = await getUserToken();

        const response = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
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

export { getUserCart, addToUserCart, removeItem, updateQuantity ,clearUserCart };
