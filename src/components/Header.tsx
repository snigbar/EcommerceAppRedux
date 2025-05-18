import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import type { CartItem, RootState } from "../interfaces/Cart";
import { useEffect, useRef, useState } from "react";
import CartDropdown from "./CartDropdown";

function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice: number = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity * Number(item.price),
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  //   close the modal when clicking outside of it

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const totalItems: number = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white sticky top-0 z-10">
      <div className="flex space-x-4">
        <Link
          to="/"
          className={`hover:underline${
            location.pathname === "/" ? " font-bold" : ""
          }`}
        >
          Products
        </Link>
        <Link
          to="/cart"
          className={`hover:underline${
            location.pathname === "/cart" ? " font-bold" : ""
          }`}
        >
          Cart {totalItems > 0 && `(${totalItems})`}
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-blue-600 px-3 py-1 rounded space-x-2 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span>Cart ({totalItems})</span>
        </button>

        {isOpen && (
          <CartDropdown
            cartItems={cartItems}
            totalPrice={totalPrice}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </nav>
  );
}

export default Header;
