import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import type { CartItem as CartItemType } from "../interfaces/Cart";

type Props = {
  cartItems: CartItemType[];
  totalPrice: number;
  setIsOpen: (open: boolean) => void;
};

export default function CartDropdown({
  cartItems,
  totalPrice,
  setIsOpen,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-2 w-80 bg-white text-black shadow-lg rounded p-4 z-10 max-h-[80vh] scroll-auto overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold mb-2">Cart Items</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-sm">Cart is empty.</p>
      ) : (
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b pb-2">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm">Qty: {item.quantity}</p>
              <div className="flex space-x-2 mt-1">
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-yellow-500 text-white px-2 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  x
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 font-semibold text-right">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <Link
            to="/cart"
            className="mt-2 block text-center bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            View Full Cart
          </Link>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
