
import { db } from "@/lib/prisma";
import { createCache } from "@/lib/cache";

export const getCategories = createCache(
  () => {
    const categories = db.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);
