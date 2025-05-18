import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import CartItem from "../components/CartItem";
import { clearCart } from "../store/cartSlice";
import type { CartItem as CartItemType } from "../interfaces/Cart";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice: number = cartItems.reduce(
    (sum: number, item: CartItemType) =>
      sum + item.quantity * Number(item.price),
    0
  );

  const dispatch = useDispatch();
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-lg font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="w-full flex justify-center">
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-8 bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 mx-auto "
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
