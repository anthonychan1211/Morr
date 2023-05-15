import { handleAddProduct } from "@/lib/functions";
import { Context } from "@/lib/context";
import { CartItem, Product, SetBag, UserDataType } from "@/lib/types";
import { prisma } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { StyledProductDetail } from "../../lib/productStyles";
import { Montserrat } from "@next/font/google";
const montserratThick = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const montserratThin = Montserrat({
  subsets: ["latin"],
  weight: ["200"],
});
const Product = ({
  data,
  userData,
  shoppingBag,
  setShoppingBag,
}: {
  data: Product;
  userData: UserDataType;
  shoppingBag: CartItem[];
  setShoppingBag: SetBag;
}) => {
  const { setLoading, productData, setProductData } = useContext(Context);
  const [showDetail, setShowDetail] = useState(false);
  const [addedNotification, setAddedNotification] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  const quantityInShoppingBag =
    shoppingBag.filter((el) => el.product_id === data.id)[0]?.quantity || 0;
  return (
    <StyledProductDetail>
      <div className="gallery">
        <div className="photo cover_photo">
          <Link href={data.cover_photo} target="_blank">
            <Image src={data.cover_photo as string} alt="cover_photo" fill />
          </Link>
        </div>
        {data.gallery?.map((el, i) => {
          return (
            <div className="photo" key={i}>
              <Link href={el} target="_blank">
                <Image src={el} alt="cover_photo" fill />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="text">
        <h1 className={`name ${montserratThick.className}`}>{data.name}</h1>
        <h4 className={`price ${montserratThin.className}`}>
          £{(data.price / 100).toFixed(2)}
        </h4>
        <div
          className={
            addedNotification
              ? "added-product-container show"
              : "added-product-container"
          }
        >
          <p className={`added-notification ${montserratThin.className}`}>
            ITEM ADDED!
          </p>
          <button
            className={`add-to-cart ${montserratThin.className}`}
            disabled={
              data.quantity === null ||
              data.quantity === 0 ||
              quantityInShoppingBag >= data.quantity
                ? true
                : false
            }
            onClick={() => {
              setLoading(true);
              let result = handleAddProduct(
                userData,
                shoppingBag,
                data,
                setShoppingBag,
                productData,
                setProductData
              );
              result.then((data) => {
                if (data === "added") {
                  setAddedNotification(true);
                  setTimeout(() => {
                    setAddedNotification(false);
                  }, 2000);
                }
              });
            }}
          >
            {(data.quantity as number) === 0
              ? "OUT OF STOCK"
              : "ADD TO SHOPPING BAG"}
          </button>
        </div>
        <div className={showDetail ? "detail-section open" : "detail-section"}>
          <div
            className="detail-header"
            onClick={() => setShowDetail(!showDetail)}
          >
            <div className="triangle">&#9654;</div>
            <button className={`detail ${montserratThick.className}`}>
              Detail
            </button>
          </div>
          <div className="description-container">
            <p className="description">{data.description}</p>
          </div>
        </div>
        <div
          className={showProductCare ? "detail-section open" : "detail-section"}
        >
          <div
            className="detail-header"
            onClick={() => setShowProductCare(!showProductCare)}
          >
            <div className="triangle">&#9654;</div>
            <button className={`detail ${montserratThick.className}`}>
              Product Care
            </button>
          </div>
          <div className="description-container">
            <p className="description">{data.product_care}</p>
          </div>
        </div>
        <div className="policy">
          <p>Free Standard Delivery in the UK</p>
          <br />
          <br />
          <h4>Returns and Exchanges within 7 days</h4>
          <br />
          <p>
            Buyer is responsible for return postage costs and any loss in value
            if an item isn&apos;t returned in original condition.
          </p>
        </div>
      </div>
    </StyledProductDetail>
  );
};
export async function getServerSideProps(ctx: { query: any }) {
  async function main() {
    return await prisma.products.findUnique({
      where: {
        id: parseInt(ctx.query.id),
      },
    });
  }
  try {
    const product = await main();

    await prisma.$disconnect();
    return {
      props: { data: product },
    };
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export default Product;
