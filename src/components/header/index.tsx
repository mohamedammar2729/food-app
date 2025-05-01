import { Routes } from "@/constants/enums";
import Link from "../link";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between ">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          🍕 Food
        </Link>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
