"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Search } from "lucide-react";

interface ProductSearchProps {
    onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
    return (
        <div className="relative w-full max-w-xl mx-auto mb-8">
            <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
    );
}