import { addToUserBag, getUserBag, handleAddProduct } from "@/lib/functions";
import { LoadingContext } from "@/lib/loadingState";
import {
  CartItem,
  Product,
  SetBag,
  SetStateBoolean,
  UserData,
} from "@/lib/types";
import { prisma } from "@/prisma/db";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { StyledProductDetail } from "../../lib/prodcutStyles";

const Product = ({
  data,
  userData,
  shoppingBag,
  setShoppingBag,
}: {
  data: Product;
  userData: UserData;
  shoppingBag: CartItem[];
  setShoppingBag: SetBag;
}) => {
  const { setLoading } = useContext(LoadingContext);
  const [showDetail, setShowDetail] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  const quantityInShoppingBag =
    shoppingBag.filter((el) => el.product_id === data.id)[0]?.quantity || 0;
  return (
    <StyledProductDetail>
      <div className="gallery">
        <div className="photo cover_photo">
          <Image src={data.cover_photo as string} alt="cover_photo" fill />
        </div>
        {data.gallery?.map((el, i) => {
          return (
            <div className="photo" key={i}>
              <Image src={el} alt="cover_photo" fill />
            </div>
          );
        })}
      </div>
      <div className="text">
        <h1 className="name">{data.name}</h1>
        <h4 className="price">£{data.price / 100}</h4>
        <button
          className="add-to-cart"
          disabled={
            data.quantity === null ||
            data.quantity === 0 ||
            quantityInShoppingBag >= data.quantity
              ? true
              : false
          }
          onClick={() => {
            setLoading(true);
            handleAddProduct(userData, shoppingBag, data, setShoppingBag);
            setTimeout(() => {
              setLoading(false);
            }, 0);
          }}
        >
          {(data.quantity as number) > 0
            ? "ADD TO SHOPPING BAG"
            : "OUT OF STOCK"}
        </button>

        <div className={showDetail ? "detail-section open" : "detail-section"}>
          <div
            className="detail-header"
            onClick={() => setShowDetail(!showDetail)}
          >
            <div className="triangle">&#9654;</div>
            <button className="detail">Detail</button>
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
            <button className="detail">Product Care</button>
          </div>
          <div className="description-container">
            <p className="description">{data.product_care}</p>
          </div>
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
