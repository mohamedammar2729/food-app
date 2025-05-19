
import { Locale } from "@/i18n-config";
import { headers } from "next/headers";

export const getCurrentLocale = async () => {
  // x-url is the url of the request which is set in the middleware
  const url = (await headers()).get("x-url");
  const locale = url?.split("/")[3] as Locale;
  return locale;
};
