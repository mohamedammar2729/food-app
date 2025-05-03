/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

function MenuItem({product}: {product: any}) {
  return (
    <li>
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={product.image}
          className="object-cover"
          alt={product.title}
          fill
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{product.title}</h4>
        <strong className="text-accent">{formatCurrency(product.price)}</strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">
        {product.description}
      </p>
      <AddToCartButton product={product} />
    </li>
  );
}

export default MenuItem