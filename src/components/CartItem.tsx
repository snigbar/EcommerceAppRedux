import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import type { CartItem as CartItemType } from "../interfaces/Cart";

type Props = {
  item: CartItemType & { image?: string };
};

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center h-[420px] md:h-[460px]">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-48 h-48 object-contain mb-2"
        />
      )}
      <h2 className="font-bold mb-1 text-center">{item.title}</h2>
      <p className="text-gray-700 mb-1">${item.price}</p>
      <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
      <p className="text-blue-700 font-semibold mb-3">
        Total: ${(item.price * item.quantity).toFixed(2)}
      </p>

      <div className="flex space-x-2">
        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
