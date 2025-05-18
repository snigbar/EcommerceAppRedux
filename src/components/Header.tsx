import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  interface CartItem {
    id: number;
    title: string;
    quantity: number;
  }

  interface RootState {
    cart: {
      items: CartItem[];
    };
  }

  const totalItems: number = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">
          Products
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Cart ({totalItems})
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white text-black shadow-lg rounded p-4 z-10">
            <h2 className="text-lg font-bold mb-2">Cart Items</h2>
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
                <button
                  onClick={() => dispatch(clearCart())}
                  className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
