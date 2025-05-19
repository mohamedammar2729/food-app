import { RootState } from "@/redux/store";
import { Extra, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    name: string;
    basePrice: number;
    quantity?: number;
    image: string;
    size?: Size;
    extras?: Extra[];
};

type CartState = {
    items: CartItem[];
}

const initialCartItem = localStorage.getItem('cartItems');


const initialState: CartState = {
  items: initialCartItem ? JSON.parse(initialCartItem) : [],
}; 
export const cartSlice = createSlice({
  name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state,action:PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
                existingItem.size = action.payload.size;
                existingItem.extras = action.payload.extras;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },
        removeCartItem: (state, action: PayloadAction<{id:string}>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity && existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                }
            }
        },
        removeItemFromCart: (state, action: PayloadAction<{id:string}>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },

});

export const {addCartItem, removeCartItem, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state:RootState) => state.cart.items;