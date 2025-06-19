import Link from "../link";
import NavBar from "./NavBar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTranslation from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTranslation(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translations.logo}
        </Link>
        <NavBar translations={translations} initialSession={initialSession} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
