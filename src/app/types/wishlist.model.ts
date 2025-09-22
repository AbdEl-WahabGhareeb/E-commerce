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
    price: number
}

export interface WishListData {
    status: string;
    count: number;
    data: ProductInWishList[];
}
