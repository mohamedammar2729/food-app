import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n-config";


async function SignupPage({params}: {params:Promise <{locale:Locale}>}) {
    const {locale} = await params;
  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              Register
            </h2>
            <form>Form</form>
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>Already have an account </span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
    );
}

export default SignupPage;
