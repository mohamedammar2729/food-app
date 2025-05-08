// this file is responsible for all the queries and mutations related to products

import { createCache } from "@/lib/cache";
import { db } from "@/lib/prisma";

// createCache accepts a callback function, a key, and options

export const getBestSellers = createCache(
  () => {
    const bestSellers = db.product.findMany({
      include: {
        sizes: true,
        extras: true,
      },
    });
    return bestSellers;
  },
  ["best-sellers"],
  {
    revalidate: 3600,
  }
);
