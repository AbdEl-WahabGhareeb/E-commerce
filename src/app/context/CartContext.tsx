import { createContext, useContext, useEffect, useState } from "react";
import { clearUserCart, getUserCart } from "../serveractions/cart.action";
import { CartData } from "../types/cart.model";

interface CartContextType {
    cartDetails: CartData | null;
    getCartDetails: () => Promise<void>;
    clearTheCart: () => Promise<void>;
    setCartDetails:(cart : CartData | null) => void
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
    getCartDetails: async () => {},
    clearTheCart: async () => {},
    setCartDetails:()=>{}
});
export default function CartContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cartDetails, setCartDetails] = useState(null);

    async function getCartDetails() {
        const response = await getUserCart();
        setCartDetails(response?.data);
        console.log(cartDetails, "cart details from cart context");
    }

    async function clearTheCart() {
        const response = await clearUserCart();
        setCartDetails(response?.data);

    }   

    useEffect(() => {
        getCartDetails();
    }, []);



    return (
        <CartContext.Provider
            value={{ cartDetails, getCartDetails ,clearTheCart, setCartDetails }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const myCart = useContext(CartContext);
    return myCart;
}
  