/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuItem from "./MenuItem";

function Menu({ items }: { items: any }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default Menu;
