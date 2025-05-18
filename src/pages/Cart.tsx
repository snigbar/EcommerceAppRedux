import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
