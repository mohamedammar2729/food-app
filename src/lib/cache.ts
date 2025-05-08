/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache as nextCache } from "next/cache";

import { cache as ReactCache } from "react";

// This is a wrapper around the unstable_cache function from Next.js
// that provides a consistent interface for caching data in both server and client components.
// It uses the Cache API from React and the Cache API from Next.js to provide a consistent interface for caching data.
// It also provides a way to invalidate the cache when the data changes.
// This is useful for caching data that is expensive to fetch or compute, such as API responses or database queries.
// It also provides a way to invalidate the cache when the data changes, such as when a user updates their profile or when a new product is added to the database.
// This is useful for caching data that is expensive to fetch or compute, such as API responses or database queries.

type CallBack = (...args: any[]) => Promise<any>;

export function createCache<T extends CallBack>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] }
) {
  return nextCache(ReactCache(cb), keyParts, options);
}
