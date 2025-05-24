import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTranslation from "@/lib/translation";


async function Footer() {
  const locale = await getCurrentLocale();
  const { copyRight } = await getTranslation(locale);
  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>{copyRight}</p>
      </div>
    </footer>
  );
}

export default Footer