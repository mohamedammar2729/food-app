import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Form from "./_components/Form";

import getTranslation from "@/lib/translation";

async function SigninPage() {
    const locale = await getCurrentLocale();
    const translations = await getTranslation(locale);
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              Welcome Back!
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>Dont have an account </span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SigninPage;
