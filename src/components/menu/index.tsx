

import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/Types/products";

function Menu({ items }: { items: ProductWithRelations[] }) {
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">No Products Found</p>
  );
}

export default Menu;
