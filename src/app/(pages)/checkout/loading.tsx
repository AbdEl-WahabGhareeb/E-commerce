import React from "react";
import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Loader className="animate-spin mb-5" size={70}/>
            <p className="animate-bounce text-4xl">Loading.....</p>
        </div>
    );
}
