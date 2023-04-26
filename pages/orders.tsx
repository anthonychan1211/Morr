import React, { useEffect, useState } from "react";
import { StyledOrderPage, StyledToLogInPage } from "../lib/orderStyles";
import { OrderItemType, OrderType, Product, UserDataType } from "@/lib/types";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100"],
});
const Order = ({ userData }: { userData: UserDataType }) => {
  const [ongoingOrders, setOngoingOrders] = useState<OrderType[]>([]);
  const [previousOrders, setPreviousOrders] = useState<OrderType[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderItemType[]>([]);
  const [productInfo, setProductInfo] = useState<Product[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getOrder(userID: string) {
      const res = await fetch("/api/getOrders", {
        method: "POST",
        body: JSON.stringify({ user_id: userID }),
      });
      const result = await res.json();
      if (result) {
        const split = result.orders.reduce(
          (accu: OrderType[][], curr: OrderType) => {
            curr.order_status === "delivered"
              ? accu[0].push(curr)
              : accu[1].push(curr);
            return accu;
          },
          [[], []]
        );

        setPreviousOrders(
          split[0].sort((a: OrderType, b: OrderType) => b.id - a.id)
        );
        setOngoingOrders(
          split[1].sort((a: OrderType, b: OrderType) => b.id - a.id)
        );
        setOrderProducts(result.items);
        setProductInfo(result.productsInfo);
      }
    }
    if (userData.id !== "") {
      getOrder(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userData.id === "" ? (
    <StyledToLogInPage className={montserrat.className}>
      <div className="container">
        <h2>Log In to see your order</h2>
        <Link href={"/account"}>Go to log in page</Link>
      </div>
    </StyledToLogInPage>
  ) : orderProducts ? (
    <StyledOrderPage>
      <div className="current-order">
        <h1>Ongoing Orders</h1>
        {ongoingOrders.length === 0 ? (
          <p>No ongoing orders</p>
        ) : (
          <div className="container">
            {ongoingOrders.map((ongoingOrder: OrderType, i) => {
              return (
                <div key={i} className="single-order">
                  <p>Order Number: {ongoingOrder.id}</p>
                  <div className="photos">
                    {orderProducts
                      .filter((el) => el.order_id === ongoingOrder.id)
                      .map((product, i) => {
                        return (
                          <div key={i} className="thumbnail">
                            <Image
                              fill
                              alt="photo"
                              src={
                                productInfo.find(
                                  (el) => product.product_id === el.id
                                )?.cover_photo || ""
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                  <p>Order Status: {ongoingOrder.order_status}</p>
                  {ongoingOrder.tracking_number !== null && (
                    <p>Tracking Number: {ongoingOrder.tracking_number}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="previous-order">
        <h1>Previous Orders</h1>
        {previousOrders.length === 0 ? (
          <p>No ongoing orders</p>
        ) : (
          <div className="container">
            {previousOrders.map((previousOrder: OrderType, i) => {
              return (
                <div key={i} className="single-order">
                  <p>Order Number: {previousOrder.id}</p>
                  <div className="thumbnail">
                    {orderProducts
                      .filter((el) => el.order_id === previousOrder.id)
                      .map((product, i) => {
                        return (
                          <Image
                            key={i}
                            height={50}
                            width={50}
                            alt="photo"
                            src={
                              productInfo.find(
                                (el) => product.product_id === el.id
                              )?.cover_photo || ""
                            }
                          />
                        );
                      })}
                  </div>
                  <p>Order Status: {previousOrder.order_status}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </StyledOrderPage>
  ) : (
    <p>Place your first order</p>
  );
};

export default Order;
