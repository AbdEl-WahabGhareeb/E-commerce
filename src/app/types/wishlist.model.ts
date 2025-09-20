interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

interface ProductInWishList {
    _id: string;
    title: string;
    imageCover: string;
    quantity: number;
    ratingsAverage: number;
    id: string;
    brand: Brand;
    category: Category;
    subcategory: Subcategory[];
}

interface WishListItem {
    count: number;
    _id: string;
    product: ProductInWishList;
    price: number;
}

export interface WishListData {
    cartId: string;
    data: {
        cartOwner: string;
        products: WishListItem[];
        totalCartPrice: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
        _id: string;
    };
    numOfCartItems: number;
}
