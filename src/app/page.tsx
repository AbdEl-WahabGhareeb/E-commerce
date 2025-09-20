import MainSlider from "@/components/Slider-Components/MainSlider";
import CatDisplay from "@/components/Slider-Components/CatDisplay";
import { getCategories } from "./serveractions/categories.action";
import { getProducts } from "./serveractions/products.action";
import ProductDisplay from "@/components/ProductsComponent/ProductDisplay";


export default async function Home() {
    

    const category = await getCategories();

    const product = await getProducts();

    return (
        <>
            <div className="text-2xl text-center mt-12 pt-15">
                <h1 className="text-2xl font-bold text-center mb-8">
                    Home Page
                </h1>
                <MainSlider />
                <CatDisplay categories={category?.data} />
                <div className=" py-5">
                    <ProductDisplay products={product?.data} />
                </div>
            </div>
        </>
    );
}
