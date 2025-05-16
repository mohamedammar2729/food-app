import { Routes } from "@/constants/enums"
import Link from "../link"
import { ShoppingCartIcon } from "lucide-react"


function CartButton() {
  return (
    <Link href={`/${Routes.CART}`} className="block relative group">
      <span className="absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        2
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
}

export default CartButton