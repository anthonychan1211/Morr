/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { StyledCart, StyledHeader } from "./styles";
import Image from "next/image";
import logo from "../../public/MorrLogo.png";
import { Montserrat } from "@next/font/google";
import { useContext, useEffect, useState } from "react";
import { CartItem, UserDataType } from "@/lib/types";
import {
  getBagProductData,
  getTotalAmount,
  setUserShoppingBag,
} from "@/lib/functions";
import { Context } from "@/lib/context";
import MenuIcon from "../Body/MenuIcon";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const Header = ({
  userData,
  shoppingBag,
}: {
  userData: UserDataType;
  shoppingBag: CartItem[];
}) => {
  const [bag, setBag] = useState<CartItem[]>([]);
  const [showBag, setShowBag] = useState<boolean>(false);
  const [bagLength, setBagLength] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { setLoading, productData, setProductData } = useContext(Context);

  useEffect(() => {
    if (userData.id === "" && shoppingBag.length > 0) {
      setLoading(true);
      setBag(shoppingBag);
      setBagLength(
        shoppingBag.reduce((a, b) => {
          return a + b.quantity;
        }, 0)
      );
      const bagProductData = getBagProductData(shoppingBag);
      bagProductData.then((res) => {
        setProductData(res);
      });
      setLoading(false);
    } else if (userData.id !== "") {
      setUserShoppingBag(userData, setBagLength, setBag, setProductData);
    }
    setLoading(false);
  }, [shoppingBag, userData]);

  useEffect(() => {
    if (bag.length > 0) {
      setTotalAmount(getTotalAmount(productData, bag));
    }
    setLoading(false);
  }, [bag, productData]);
  useEffect(() => {
    showBag
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showBag]);
  return (
    <StyledHeader className={montserrat.className}>
      <div className={showBanner ? `banner` : `banner close`}>
        Free Delivery in the UK{" "}
        <span className="cross" onClick={() => setShowBanner(false)}>
          &#10005;
        </span>
      </div>
      <div className="top-section">
        <Link href="/" className="logo-section">
          <div className="logo">
            <Image src={logo} alt="logo" fill />
          </div>
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
      <MenuIcon showMenu={showMenu} setShowMenu={setShowMenu} />
      <nav className={`nav-bar ${showMenu ? "show" : ""}`}>
        <Link
          href="/"
          className="header-tag"
          onClick={() => setShowMenu(false)}
        >
          HOME
        </Link>

        <Link
          href="/products"
          className="header-tag"
          onClick={() => setShowMenu(false)}
        >
          PRODUCTS
        </Link>

        <Link
          href="/orders"
          className="header-tag"
          onClick={() => setShowMenu(false)}
        >
          ORDERS
        </Link>

        <Link
          href="/contact"
          className="header-tag"
          onClick={() => setShowMenu(false)}
        >
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
            {productData.map((el, i) => {
              const productInfo = bag.filter(
                (bagItem) => bagItem.product_id === el.id
              )[0];

              return (
                <div key={i} className="single-item">
                  <Link
                    href={`/products/${el.id}`}
                    className="link"
                    onClick={() => setShowBag(false)}
                  >
                    {" "}
                  </Link>
                  <div className="photo">
                    <Image src={el.cover_photo} alt="cover_photo" fill />
                  </div>
                  <div className="product_info">
                    <p>{el.name}</p>
                    <p className="quantity">
                      Quantity: {productInfo?.quantity}
                    </p>
                    <p className="price">
                      £ {((productInfo?.quantity * el.price) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <p>
              TOTAL :{" "}
              <span className="price-number">£ {totalAmount.toFixed(2)}</span>
            </p>
            <Link href={"/bag"} onClick={() => setShowBag(false)}>
              <button className="go-to-bag">View My Shopping Bag</button>
            </Link>
          </div>
        </div>
      </StyledCart>
    </StyledHeader>
  );
};

export default Header;
