'use client'

import { selectCartItems } from "@/redux/features/cart/cartSlice"
import { useAppSelector } from "@/redux/hooks"

function CartItems() {
  const cartItems = useAppSelector(selectCartItems)
  return (
    <div>CartOtems</div>
  )
}

export default CartItems