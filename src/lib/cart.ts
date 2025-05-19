import { CartItem } from "@/redux/features/cart/cartSlice";

export const delivaryFee = 5;

export const getCartQuantity = (items: CartItem[]) => {
  // accumulator represents the total quantity of items in the cart
  // current value represents the item being processed
  return items.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);
};

export const getItemQuantity = (items: CartItem[], id: string) => {
  const item = items.find((item) => item.id === id);
  return item ? item.quantity : 0;
};

export const getSubTotal = (items: CartItem[]) => {
  // accumulator represents the total price of items in the cart
  // current value represents the item being processed
  return items.reduce((total, item) => {
    const extraTotal = (item.extras?.reduce((sum, extra) => sum + extra.Price, 0) || 0);
    const itemTotal = item.basePrice + extraTotal + (item.size?.Price || 0);
    return total + itemTotal * (item.quantity || 0);
  }, 0);
}

export const getTotalAmount = (items: CartItem[]) => {
  const subTotal = getSubTotal(items);
  return subTotal + delivaryFee;
}