/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { StyledCart, StyledHeader } from "./styles";
import Image from "next/image";
import logo from "../../public/MorrLogo.png";
import { Montserrat } from "@next/font/google";
import { useEffect, useState } from "react";
import { CartItem, Product, UserData } from "@/lib/types";
import {
  getBagProductData,
  getTotalAmount,
  setUserShoppingBag,
} from "@/lib/functions";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const Header = ({
  userData,
  shoppingBag,
}: {
  userData: UserData;
  shoppingBag: CartItem[];
}) => {
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [bag, setBag] = useState<CartItem[]>([]);
  const [showBag, setShowBag] = useState<boolean>(false);
  const [bagLength, setBagLength] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    console.log("run setup header");
    console.log(shoppingBag);
    if (userData.id === "" && shoppingBag.length > 0) {
      setBag(shoppingBag);
      setBagLength(
        shoppingBag.reduce((a, b) => {
          return a + b.quantity;
        }, 0)
      );
      const bagProductData = getBagProductData(shoppingBag);
      bagProductData.then((res) => {
        setBagItems(res);
      });
    } else {
      setUserShoppingBag(userData, setBagLength, setBag, setBagItems);
    }
  }, [shoppingBag, userData]);
  useEffect(() => {
    setTotalAmount(getTotalAmount(bagItems, bag));
  }, [bagItems]);
  useEffect(() => {
    showBag
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showBag]);

  return (
    <StyledHeader className={montserrat.className}>
      <div className="top-section">
        <Link href="/" className="logo-section">
          <Image src={logo} alt="logo" className="logo" height={40} />
          <h4>COLLECTION</h4>
        </Link>
        <button className="user">
          <Link href="/account">
            <Image src="/user.png" width={21} height={21} alt="user" />
          </Link>
        </button>
        <button className="shopping-bag" onClick={() => setShowBag(!showBag)}>
          {bagLength > 0 && (
            <div className="cart-length">
              <p>{bagLength}</p>
            </div>
          )}
          <Image
            src="/shopping_bag.png"
            width={20}
            height={20}
            alt="shopping_bag"
          />
        </button>
      </div>
      <nav className="nav-bar">
        <Link href="/" className="header-tag">
          HOME
        </Link>
        <div className="product-tag">
          <Link href="/products" className="header-tag">
            PRODUCTS
          </Link>
        </div>

        <Link href="/orders" className="header-tag">
          ORDERS
        </Link>

        <Link href="/contact" className="header-tag">
          CONTACT US
        </Link>
      </nav>

      <StyledCart className={`bag ${showBag && "open"}`}>
        <div className="inner-modal">
          <div className="header">
            <h1>Shopping Bag</h1>
            <button className="close" onClick={() => setShowBag(false)}>
              &#9587;
            </button>
          </div>
          <div className="items">
            {bagItems.map((el, i) => {
              const productInfo = bag.filter(
                (bagItem) => bagItem.product_id === el.id
              )[0];

              return (
                <div key={i} className="single-item">
                  <div className="photo">
                    <Image src={el.cover_photo} alt="cover_photo" fill />
                  </div>
                  <div className="product_info">
                    <p>{el.name}</p>
                    <p className="quantity">
                      Quantity: {productInfo?.quantity}
                    </p>
                    <p className="price">
                      £ {(productInfo?.quantity * el.price) / 100}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <p>
              TOTAL : <span className="price-number">£ {totalAmount}</span>
            </p>
            <button className="go-to-bag">
              <Link href={"/bag"} onClick={() => setShowBag(false)}>
                View My Shopping Bag
              </Link>
            </button>
          </div>
        </div>
      </StyledCart>
    </StyledHeader>
  );
};

export default Header;
