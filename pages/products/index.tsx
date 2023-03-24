import { DocumentObject, SingleObject, StateBoolean } from "../../lib/types";

import { StyledProductLandingPage } from "./styles";

import { Montserrat } from "@next/font/google";

import Carousel from "@/components/Body/Carousel";
import Link from "next/link";
import { prisma } from "@/prisma/db";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

const Products = ({
  data,
  userData,
}: {
  data: DocumentObject;
  userData: SingleObject;
}) => {
  return (
    <StyledProductLandingPage className={montserrat.className}>
      <div className="section">
        <div className="section-header">
          <h1>Trending</h1>
          <Link href={"/products/all"}>See All Products</Link>
        </div>
        <Carousel data={data} />
      </div>

      <div className="section">
        <div className="section-header">
          <h1>Earrings</h1>
          <Link href={"/products/earrings"}>See All Earrings</Link>
        </div>
        <Carousel
          data={data.filter(
            (el) => (el.category as string).toLowerCase() === "earrings"
          )}
        />
      </div>
      <div className="section">
        <div className="section-header">
          <h1>Necklaces</h1>
          <Link href={"/products/necklaces"}>See All Necklaces</Link>
        </div>
        <Carousel
          data={data.filter(
            (el) => (el.category as string).toLowerCase() === "necklace"
          )}
        />
      </div>
      <div className="section">
        <div className="section-header">
          <h1>Bracelets</h1>
          <Link href={"/products/bracelets"}>See All Bracelets</Link>
        </div>
        <Carousel
          data={data.filter(
            (el) => (el.category as string).toLowerCase() === "bracelet"
          )}
        />
      </div>
    </StyledProductLandingPage>
  );
};
export async function getServerSideProps() {
  async function main() {
    return await prisma.products.findMany();
  }
  try {
    const allProduct = await main();
    await prisma.$disconnect();
    return {
      props: { data: allProduct },
    };
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export default Products;
