import {
  AddProductModal,
  DocumentObject,
  SetStateBoolean,
  SingleObject,
  StateBoolean,
} from "../../lib/types";
import Image from "next/image";
import {
  StyledProductPage,
  StyledProductContainer,
  StyledProductCard,
} from "../../lib/prodcutStyles";
import SearchBar from "../../components/Body/SearchBar";
import { Montserrat } from "@next/font/google";
import FilterModal from "../../components/Body/FilterModal";
import { useEffect, useState } from "react";
import AddProduct from "@/components/Body/AddProduct";
import { sortProducts } from "@/lib/functions";
import { prisma } from "@/prisma/db";

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
    console.log(sorted);
    setSortedProduct([...sorted]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethod, afterFilterProducts]);
  useEffect(() => {
    filterModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [filterModal]);
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
                <Image
                  src={el["cover_photo"] as string}
                  alt={`photo${i}`}
                  fill
                />
              </div>
              <div className="product-info">
                <p className="product-name">{el.name}</p>
                <p className="product-price">£{price}</p>
              </div>
              {userData.role === "admin" && (
                <button className="edit-product">Edit Product</button>
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
      {addProductModal && (
        <AddProduct
          setAddProductModal={setAddProductModal}
          addProductModal={addProductModal}
          products={afterFilterProducts}
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
    const necklaces = allProduct.filter(
      (product) => product.category?.toLowerCase() === "necklace"
    );
    await prisma.$disconnect();
    return {
      props: { data: necklaces },
    };
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export default All;
