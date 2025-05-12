
import { Routes } from "../../constants/enums";
import MainHeading from "./../main-heading/index";


export default function About() {
  return (
    <section className="section-gap" id={Routes.ABOUT} >
      <div className="container text-center">
        <MainHeading subTitle="Our Story" title="About Us" />
        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Welcome to our Food website, where serve the finest foods We are
            passionate about bringing you the best culinary experience
          </p>
          <p>
            Our team of expert chefs and food enthusiasts work tirelessly to
            create delicious dishes that will tantalize your taste buds.
          </p>
          <p>
            We source only the freshest ingredients from local farms and
            markets, ensuring that every bite is bursting with flavor.
          </p>
          <p>
            Whether you&apos;re looking for a quick bite or a gourmet meal, we
            have something for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
