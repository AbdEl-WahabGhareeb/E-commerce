export interface Products {
    sold: number;
    images: string;
    subcategory: Subcategory;
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: cat;
    brand: cat;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

interface cat {
    _id: string;
    name: string;
    slug: string;
    image: string;
}
