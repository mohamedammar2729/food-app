import { Routes } from "@/constants/enums";
import Link from "../link";
import NavBar from "./NavBar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTranslation from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";

async function Header() {
  const locale = await getCurrentLocale();
  const { logo, navbar } = await getTranslation(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between ">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {logo}
        </Link>
        <NavBar tarnslations={navbar} />
        <LanguageSwitcher />
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
