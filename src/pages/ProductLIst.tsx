import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store";
import { fetchProducts } from "../store/productSlice";
import type { Product } from "../interfaces/Product";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            price={product.price}
            image={product.image}
            title={product.title}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
