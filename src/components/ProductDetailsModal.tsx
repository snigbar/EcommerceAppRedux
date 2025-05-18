type ProductModalProps = {
  image: string;
  title: string;
  price: number | string;
  isOpen: boolean;
  onClose: () => void;
  added: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
};

const ProductDetailsModal = ({
  image,
  title,
  price,
  isOpen,
  onClose,
  added,
  onAddToCart,
  onRemoveFromCart,
}: ProductModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 sm:w-4/5 md:w-[40%] max-w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">${price}</p>
        <p className="text-sm text-gray-500 mb-4">
          This is a great product for daily use. Compact, stylish, and highly
          functional — perfect for professionals and students alike.
        </p>
        {added ? (
          <button
            className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition duration-200 w-full"
            onClick={() => {
              onRemoveFromCart();
              onClose();
            }}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 w-full"
            onClick={() => {
              onAddToCart();
              onClose();
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;
