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

const initialState: CartState = {
    items:[],
}; 
export const cartSlice = createSlice({
  name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state,action:PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        }
    },

});

export const {addCartItem } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state:RootState) => state.cart.items;