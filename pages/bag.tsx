import {
  getBagProductData,
  getUserBag,
  handleQuantityChange,
} from "@/lib/functions";
import { CartItem, Product, RemoveItem, SetBag, UserData } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Montserrat } from "@next/font/google";
import { LoadingContext } from "@/lib/loadingState";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const StyledBagPage = styled.div`
  color: lightgrey;
  display: grid;
  grid-template-columns: 2fr 1fr;
  .product-section {
    border-right: 3px solid lightgrey;
  }
  .page-title {
    margin: 50px;
  }
  .single-item {
    display: flex;
    gap: 30px;
    margin: 20px 50px;
    border: 1px solid #505050;
    padding: 25px;
    box-shadow: 2px 5px 30px #212121;
  }
  .photo {
    position: relative;
    width: 100%;
    height: 250px;
    grid-area: photo;
    flex: 1;
    img {
      object-fit: cover;
    }
  }
  .detail {
    flex: 1;
    position: relative;
  }
  .number {
    padding-inline: 10px;
    font-size: 14px;
  }
  .quantity {
    display: flex;
    align-items: center;
    position: absolute;
    top: 30%;
  }
  .title {
    display: flex;
  }
  .name {
    flex: 1;
    font-size: var(--medium-text);
  }
  .quantity-control {
  }
  .tag {
    width: min(25vw, 100px);
  }
  .control-button {
    border: 1px solid #777777;
    padding: 0;
    font-size: 14px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .remove {
    position: absolute;
    bottom: 0px;
    cursor: pointer;
    right: 0px;
    padding: 0;
    border-bottom: 1px solid lightgrey;
  }
`;
const Bag = ({
  userData,
  shoppingBag,
  setShoppingBag,
}: {
  userData: UserData;
  shoppingBag: CartItem[];
  setShoppingBag: SetBag;
}) => {
  const [products, setProducts] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    async function getProductDetail() {
      const products = await getBagProductData(shoppingBag);
      setProducts(products);
    }
    getProductDetail();
  }, [shoppingBag]);

  async function handleRemove(item: CartItem) {
    setLoading(true);
    const removeItem = shoppingBag.filter(
      (product) => product.product_id === item.product_id
    )[0];
    const res = await fetch("/api/removeBagItem", {
      method: "POST",
      body: JSON.stringify({ removeItem }),
    });
    const feedBack = await res.json();
    if (feedBack) {
      const newBag = await getUserBag(userData.id);
      setShoppingBag(newBag);
      setLoading(false);
    }
  }
  return (
    <StyledBagPage>
      <div className="product-section">
        <h1 className="page-title">My Shopping Bag</h1>
        {products.map((product: Product) => {
          const bagItem = shoppingBag.filter(
            (el) => el.product_id === product.id
          )[0];
          return (
            <div className="single-item" key={product.id}>
              <div className="photo">
                <Image src={product.cover_photo} alt="cover" fill />
              </div>
              <div className="detail">
                <div className="title">
                  <p className={`${montserrat.className} name`}>
                    {product.name}
                  </p>
                  <p className="amount">
                    £ {(product.price * bagItem?.quantity) / 100}
                  </p>
                </div>
                <div className="quantity">
                  <span className="tag">Quantity : </span>
                  <div className="quantity-control">
                    <button
                      className="control-button"
                      onClick={() =>
                        handleQuantityChange(
                          "less",
                          bagItem,
                          shoppingBag,
                          userData,
                          setShoppingBag
                        )
                      }
                    >
                      -
                    </button>
                    <span className="number">{bagItem?.quantity}</span>
                    <button
                      className="control-button"
                      onClick={() =>
                        handleQuantityChange(
                          "more",
                          bagItem,
                          shoppingBag,
                          userData,
                          setShoppingBag
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove"
                  type="button"
                  onClick={() => handleRemove(bagItem)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="check-out"></div>
    </StyledBagPage>
  );
};

export default Bag;
