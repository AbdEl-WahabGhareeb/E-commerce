import { createContext, useContext, useEffect, useState } from "react";
import { getUserWishList } from "../serveractions/wishlist.action";
import { WishListData } from "../types/wishlist.model";

interface WishListContextType {
    wishListDetails: WishListData | null;
    getWishListDetails: () => Promise<void>;
}

const WishListContext = createContext<WishListContextType>({
    wishListDetails: null,
    getWishListDetails: async () => {},
});
export default function WishListContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [wishListDetails, setWishListDetails] = useState(null);

    async function getWishListDetails() {
        const response = await getUserWishList();

        setWishListDetails(response?.data);
    }
    

    useEffect(() => {
        getWishListDetails();
    }, []);

    return (
        <WishListContext.Provider
            value={{ wishListDetails, getWishListDetails }}
        >
            {children}
        </WishListContext.Provider>
    );
}

export function useWishList() {
    const myWishList = useContext(WishListContext);
    return myWishList;
}
