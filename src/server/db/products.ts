// this file is responsible for all the queries and mutations related to products

import { createCache } from "@/lib/cache";
import { db } from "@/lib/prisma";

// createCache accepts a callback function, a key, and options
export const getProductsByCategory = createCache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return products;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);

export const getBestSellers = createCache(
  (limit?: number | undefined) => {
    const bestSellers = db.product.findMany({
      where: {
        // give me products at least has one order
        orders: {
          some: { },
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        sizes: true,
        extras: true,
      },
      take: limit,
    });
    return bestSellers;
  },
  ["best-sellers"],
  {
    revalidate: 3600,
  }
);

export const getProducts = createCache(
  () => {
    const products = db.product.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return products;
  },
  ['products'],
  { revalidate: 3600 }
);

export const getProduct = createCache(
  (id: string) => {
    const product = db.product.findUnique({
      where: {
        id,
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);