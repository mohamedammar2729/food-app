/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelations } from "@/Types/products";

function MenuItem({ product }: { product: ProductWithRelations }) {
  return (
    <li>
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={product.image}
          className="object-cover"
          alt={product.name}
          fill
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{product.name}</h4>
        <strong className="text-accent">
          {formatCurrency(product.baseprice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">
        {product.description}
      </p>
      <AddToCartButton product={product} />
    </li>
  );
}

export default MenuItem