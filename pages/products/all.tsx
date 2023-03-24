import { AddProductModal, DocumentObject, SingleObject } from "../../lib/types";
import Image from "next/image";
import {
  StyledProductPage,
  StyledProductContainer,
  StyledProductCard,
} from "./styles";
import SearchBar from "../../components/Body/SearchBar";
import { Montserrat } from "@next/font/google";
import FilterModal from "../../components/Body/FilterModal";
import { useEffect, useState } from "react";
import AddProduct from "@/components/Body/AddProduct";
import { sortProducts } from "@/lib/functions";
import { prisma } from "@/prisma/db";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

const All = ({
  data,
  userData,
}: {
  data: DocumentObject;
  userData: SingleObject;
}) => {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [addProductModal, setAddProductModal] = useState<AddProductModal>(null);
  const [filterNumber, setFilterNumber] = useState(0);
  const [sortedProduct, setSortedProduct] = useState<DocumentObject>([]);
  const [afterFilterProducts, setAfterFilterProducts] =
    useState<DocumentObject>([]);
  const [sortMethod, setSortMethod] = useState<string>("Recommandation");

  useEffect(() => {
    const sorted = sortProducts(afterFilterProducts, sortMethod);
    setSortedProduct([...sorted]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethod, afterFilterProducts]);
  useEffect(() => {
    filterModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [filterModal]);
  async function handleEditProduct(e: any) {
    setAddProductModal(e.target.dataset.id);
  }
  return (
    <StyledProductPage className={montserrat.className}>
      <SearchBar
        products={data}
        setFilterModal={setFilterModal}
        filterNumber={filterNumber}
        setSortMethod={setSortMethod}
        sortMethod={sortMethod}
      />

      <StyledProductContainer>
        {userData.role === "admin" && (
          <button
            className="add-product"
            onClick={() => setAddProductModal("new")}
          >
            Add Product
          </button>
        )}
        {sortedProduct.map((el: SingleObject, i) => {
          const price = (parseInt(el.price as string) / 100).toFixed(2);
          return (
            <StyledProductCard key={i}>
              <div className="image-container">
                <Link href={`/products/${el.id}`}>
                  <Image
                    src={el["cover_photo"] as string}
                    alt={`photo${i}`}
                    fill
                    data-id={el.id}
                  />
                </Link>
              </div>
              <div className="product-info">
                <p className="product-name">{el.name}</p>
                <p className="product-price">£{price}</p>
              </div>
              {userData.role === "admin" && (
                <button
                  className="edit-product"
                  data-id={el.id}
                  onClick={(e) => handleEditProduct(e)}
                >
                  Edit Product
                </button>
              )}
            </StyledProductCard>
          );
        })}
      </StyledProductContainer>

      <FilterModal
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        setFilterNumber={setFilterNumber}
        setAfterFilterProducts={setAfterFilterProducts}
        afterFilterProducts={afterFilterProducts}
        filterNumber={filterNumber}
        products={data}
      />
      {addProductModal !== null && (
        <AddProduct
          setAddProductModal={setAddProductModal}
          addProductModal={addProductModal}
          products={data}
        />
      )}
    </StyledProductPage>
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

export default All;
