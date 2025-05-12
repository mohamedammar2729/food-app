import { Routes } from "../../constants/enums";
import MainHeading from "./../main-heading/index";

function Contact() {
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading subTitle="Dont Hisitate" title="Contact Us" />
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
