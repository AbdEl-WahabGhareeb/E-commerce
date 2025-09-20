"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

interface ShippingAddressType {
    details: string;
    phone: string;
    city: string;
}

async function getCashPayment(
    cartId: string,
    shippingAddress: { shippingAddress: ShippingAddressType }
) {
    try {
        const token = await getUserToken();

        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress },
            { headers: { token: token as string } }
        );

        // console.log(response , "cash payment");

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

async function getOnlinePayment(
    cartId: string,
    shippingAddress: { shippingAddress: ShippingAddressType }
) {
    try {
        const token = await getUserToken();

        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress },
            { headers: { token: token as string } }
        );

        // console.log(response , "cash payment");

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

async function getAllOrders() {
    try {

        const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/orders/`,
        );

        // console.log(response , "cash payment");

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

export { getCashPayment , getOnlinePayment ,getAllOrders};
