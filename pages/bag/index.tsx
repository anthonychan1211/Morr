import {
  addToUserBag,
  getBagProductData,
  getTotalAmount,
  getUserBag,
  handleAddProduct,
  handleQuantityChange,
} from "@/lib/functions";
import { CartItem, Product, SetBag, UserDataType } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Montserrat } from "@next/font/google";
import { Context } from "@/lib/context";
import Link from "next/link";
import { StyledBagPage } from "@/lib/bagStyles";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

const Bag = ({
  userData,
  shoppingBag,
  setShoppingBag,
}: {
  userData: UserDataType;
  shoppingBag: CartItem[];
  setShoppingBag: SetBag;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const { setLoading } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      let newShoppingBag = shoppingBag;
      for (let i = 0; i < shoppingBag.length; i++) {
        const item = newShoppingBag[i];
        const productId = item.product_id;

        const newQuantity = router.query[productId] as string;
        if (newQuantity !== undefined) {
          item.quantity = parseInt(newQuantity);
          if (userData.id == "") {
            let localItem = localStorage.getItem("bag");
            if (localItem !== null) {
              localStorage.setItem(
                "bag",
                JSON.stringify({
                  ...JSON.parse(localItem),
                  [productId]: parseInt(newQuantity),
                })
              );
            }
          } else {
            setLoading(true);
            const result = addToUserBag(newShoppingBag);
          }
        }
      }

      setShoppingBag(newShoppingBag);
      router.reload();
      alert(
        "Some of the product is running short while your shopping. Please check the item quantity of your shopping bag. Sorry for the inconvinience."
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getProductDetail() {
      setLoading(true);
      const products = await getBagProductData(shoppingBag);
      setProducts(products);
      setTotal(getTotalAmount(products, shoppingBag));
      setLoading(false);
    }
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingBag]);
  async function handleRemove(item: CartItem) {
    setLoading(true);
    const removeItem = shoppingBag.filter(
      (product) => product.product_id === item.product_id
    )[0];
    if (userData.id !== "") {
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
    } else {
      const updatedBag = [
        ...shoppingBag.filter(
          (product) => product.product_id !== item.product_id
        ),
      ];

      const localbag = JSON.parse(localStorage.getItem("bag") as string);
      delete localbag[(removeItem.product_id as number)?.toString()];
      localStorage.setItem("bag", JSON.stringify(localbag));
      setShoppingBag(updatedBag);
      setLoading(false);
    }
  }
  return (
    <StyledBagPage>
      <div className="product-section">
        <h1 className={`page-title ${montserrat.className}`}>
          My Shopping Bag
        </h1>
        {products.map((product: Product) => {
          const bagItem = shoppingBag.filter(
            (el) => el.product_id === product.id
          )[0];

          return (
            <div className="single-item" key={product.id}>
              <div className="photo">
                <Link href={`products/${product.id}`}>
                  <Image src={product.cover_photo} alt="cover" fill />
                </Link>
              </div>
              <div className="detail">
                <div className="title">
                  <Link
                    href={`products/${product.id}`}
                    className={`${montserrat.className} name`}
                  >
                    <p className={`${montserrat.className} name`}>
                      {product.name}
                    </p>
                  </Link>
                  <p className="amount">
                    £ {((product.price * bagItem?.quantity) / 100).toFixed(2)}
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
                    {bagItem?.quantity < product.quantity! && (
                      <button
                        className="control-button"
                        onClick={() => {
                          handleAddProduct(
                            userData,
                            shoppingBag,
                            product,
                            setShoppingBag,
                            products,
                            setProducts
                          );
                        }}
                      >
                        +
                      </button>
                    )}
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
      <div className="check-out">
        <h2 className={`total ${montserrat.className}`}>
          TOTAL : <span>£ {total.toFixed(2)}</span>
        </h2>

        <Link href={"/bag/checkout"} className={`link ${montserrat.className}`}>
          PROCEED TO CHECKOUT
        </Link>
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
    </StyledBagPage>
  );
};

export default Bag;
