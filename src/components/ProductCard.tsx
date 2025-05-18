type ProductCardProps = {
  image: string;
  title: string;
  price: number | string;
  onAddToCart?: () => void;
};

const ProductCard = ({
  image,
  title,
  price,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4">
      <img className="w-full h-64 object-contain" src={image} alt={title} />
      <div className="px-2 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base font-semibold">${price}</p>
      </div>
      <div className="px-2 pb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 w-full"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
