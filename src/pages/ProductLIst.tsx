import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store";
import { fetchProducts } from "../store/productSlice";
import type { Product } from "../interfaces/Product";
import ProductCard from "../components/ProductCard";
import { addToCart, removeFromCart } from "../store/cartSlice";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="my-4 text-center text-lg font-bold">Product List</h1>
      {loading && <Loader />}
      {error && <ErrorPage />}
      <ul className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            price={product.price}
            image={product.image}
            title={product.title}
            onAddToCart={() => {
              dispatch(addToCart({ ...product }));
            }}
            removeFromCart={() => {
              dispatch(removeFromCart(product.id));
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
