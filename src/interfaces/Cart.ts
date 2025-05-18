export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export interface RootState {
  cart: {
    items: CartItem[];
  };
}
