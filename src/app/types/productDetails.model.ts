export interface Review {}
export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface ProductDetails {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    imageCover: string;
    images: string[];
    quantity: number;
    sold: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    brand: Brand;
    category: Category;
    subcategory: Subcategory[];
    reviews: Review[]; // You can create a separate Review interface if needed
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}
