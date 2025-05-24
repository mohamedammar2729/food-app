import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Routes } from "../../constants/enums";
import MainHeading from "./../main-heading/index";
import getTranslation from "@/lib/translation";

async function Contact() {
  const locale = await getCurrentLocale();
  const { home } = await getTranslation(locale);
  const { contact } = home;
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading subTitle={contact["Don'tHesitate"]} title={contact.contactUs} />
        <div className="mt-8">
          <a
            className="text-4xl underline text-accent"
            href="tel : +201019000009"
          >
            +201019000009
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
