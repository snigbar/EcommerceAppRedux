import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";

type ProductCardProps = {
  image: string;
  title: string;
  price: number | string;
  onAddToCart: () => void;
  removeFromCart: () => void;
};

const ProductCard = ({
  image,
  title,
  price,
  onAddToCart,
  removeFromCart,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
  };

  const handleRemoveFromCart = () => {
    setAdded(false);
    removeFromCart();
  };

  return (
    <>
      {/* Product Card */}
      <div className="max-w-sm h-[460px] flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg bg-white p-4 hover:scale-105 hover:shadow-xl transition duration-200">
        <img
          className="w-full h-64 object-contain cursor-pointer"
          src={image}
          alt={title}
          onClick={() => setShowModal(true)}
        />
        <div className="px-2 py-4 flex-1">
          <div
            className="font-bold text-xl mb-2 cursor-pointer line-clamp-2 h-14"
            onClick={() => setShowModal(true)}
          >
            {title}
          </div>
          <p className="text-gray-700 text-base font-semibold">${price}</p>
        </div>
        <div className="px-2 pb-4">
          {added ? (
            <button
              className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition duration-200 w-full"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Modal */}

      <ProductDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image={image}
        title={title}
        price={price}
        added={added}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
};

export default ProductCard;
