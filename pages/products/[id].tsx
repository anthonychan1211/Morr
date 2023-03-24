import { addToUserBag, getUserBag } from "@/lib/functions";
import {
  CartItem,
  Product,
  SetBag,
  SetStateBoolean,
  UserData,
} from "@/lib/types";
import { prisma } from "@/prisma/db";
import Image from "next/image";
import { useState } from "react";

import { StyledProductDetail } from "./styles";

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
  const [showDetail, setShowDetail] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  async function handleAddProduct() {
    if (userData.id !== "") {
      const productInBag = shoppingBag.filter(
        (productInBag) => productInBag.product_id === data.id
      );

      const newItem: CartItem[] = productInBag.length
        ? [
            {
              id: productInBag[0].id,
              user_id: userData.id,
              product_id: data.id,
              quantity: productInBag[0].quantity + 1,
            },
          ]
        : [
            {
              user_id: userData.id,
              product_id: data.id,
              quantity: 1,
            },
          ];
      addToUserBag(newItem);
      setTimeout(() => {
        const newBag = getUserBag(userData.id);
        newBag.then((res) => setShoppingBag(res));
      }, 1000);
    } else {
      const currentCart =
        JSON.parse(localStorage.getItem("bag") as string) || {};
      localStorage.setItem(
        "bag",
        JSON.stringify({
          ...currentCart,
          [data.id]: currentCart[data.id] + 1 || 1,
        })
      );
      const updateArr = shoppingBag.map((el) => {
        if (el.product_id === data.id) {
          el.quantity += 1;
        }
        return el;
      });
      setShoppingBag([...updateArr]);
    }
  }
  return (
    <StyledProductDetail>
      <div className="gallery">
        <div className="cover-container">
          <Image
            id="cover_photo"
            src={data.cover_photo as string}
            alt="cover_photo"
            fill
          />
          <Image
            className="animation_photo"
            src={data.cover_photo as string}
            alt="cover_photo"
            width={400}
            height={300}
          />
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
        <h1>{data.name}</h1>
        <h4 className="price">£{data.price / 100}</h4>
        <button className="add-to-cart" onClick={handleAddProduct}>
          ADD TO BAG
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
