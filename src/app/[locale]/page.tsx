import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import About from "../../components/about/index";
import Contact from "@/components/contact";


export default async function Home() {


  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
}
