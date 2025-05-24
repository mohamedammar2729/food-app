

import { getCurrentLocale } from "@/lib/getCurrentLocale";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/Types/products";
import getTranslation from "@/lib/translation";

async function Menu({ items }: { items: ProductWithRelations[] }) {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTranslation(locale);
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{noProductsFound}</p>
  );
}

export default Menu;
