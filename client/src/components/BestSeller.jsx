import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

function BestSeller() {

    const { products } = useAppContext();

    return (
        <section className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
            <div className="grid grid-cols-2 sm:grid-cols-2-gap-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5 gap-3 mt-3">
                {products.filter((product) => product.inStock).slice(0, 5).map((products, index) => (
                <ProductCard key={index} product={products} />
                ))}
              
            </div>
        </section>
    )
}
export default BestSeller;