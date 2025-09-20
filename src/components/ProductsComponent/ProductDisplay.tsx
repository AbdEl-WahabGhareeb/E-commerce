"use client"
import { Products } from "@/app/types/product.model";
import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

export default function ProductDisplay({ products }: { products: Products[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return products;

        return products?.filter((product) => {
            const searchText = searchQuery.toLowerCase();
            return (
                product.title.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText) ||
                product.category.name.toLowerCase().includes(searchText) ||
                product.brand.name.toLowerCase().includes(searchText)
            );
        });
    }, [products, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="mb-12">
            <ProductSearch onSearch={handleSearch} />
            
            {filteredProducts?.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <p className="text-xl">No products found matching &ldquo;{searchQuery}&rdquo;</p>
                </div>
            ) : (
                <div className="container mx-auto my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
