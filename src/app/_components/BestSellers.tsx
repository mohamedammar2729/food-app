import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";


function BestSellers() {
  const bestSellers = [
    {
      id: crypto.randomUUID(),
      title: "Product 1",
      image: "/assets/images/food.png",
      price: 29.99,
      description: "Delicious pizza with fresh ingredients.",
    },
    {
      id: crypto.randomUUID(),
      title: "Product 2",
      image: "/assets/images/food.png",
      price: 19.99,
      description: "Tasty pasta with homemade sauce.",
    },
    {
      id: crypto.randomUUID(),
      title: "Product 3",
      image: "/assets/images/food.png",
      price: 24.99,
      description: "Fresh salad with seasonal vegetables.",
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"Check Out"} title={"Our Best Sellers"} />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
}

export default BestSellers;
