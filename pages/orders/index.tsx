import React, { useEffect, useState } from "react";
import { StyledOrderPage, StyledToLogInPage } from "../../lib/orderStyles";
import { OrderItemType, OrderType, Product, UserDataType } from "@/lib/types";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
import OrderCard from "@/components/Body/OrderCard";
const montserratThin = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
});
const montserratNormal = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const Order = ({ userData }: { userData: UserDataType }) => {
  const [ongoingOrders, setOngoingOrders] = useState<OrderType[]>([]);
  const [previousOrders, setPreviousOrders] = useState<OrderType[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderItemType[]>([]);
  const [productInfo, setProductInfo] = useState<Product[]>([]);
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
    if (userData.role === "admin") {
      getOrder("admin");
    } else if (userData.id !== "") {
      getOrder(userData.id);
    }
  }, [userData]);
  console.log(previousOrders);
  return userData.id === "" ? (
    <StyledToLogInPage className={montserratNormal.className}>
      <div className="container">
        <h2>Log In to see your order</h2>
        <Link href={"/account"}>Go to log in page</Link>
      </div>
    </StyledToLogInPage>
  ) : orderProducts ? (
    <StyledOrderPage>
      <div className="current-order">
        <h2 className={montserratNormal.className}>Ongoing Orders</h2>
        {ongoingOrders.length === 0 ? (
          <p>No ongoing orders</p>
        ) : (
          <div className={`container ${montserratThin.className}`}>
            {ongoingOrders.map((ongoingOrder: OrderType, i) => {
              const orderItems = orderProducts.filter(
                (el) => el.order_id === ongoingOrder.id
              );
              return (
                <OrderCard
                  key={i}
                  productData={productInfo}
                  order={ongoingOrder}
                  orderItems={orderItems}
                  userData={userData}
                ></OrderCard>
              );
            })}
          </div>
        )}
      </div>
      <div className="previous-order">
        <h2 className={montserratNormal.className}>Previous Orders</h2>
        {previousOrders.length === 0 ? (
          <p className={`no-orders ${montserratThin.className}`}>
            No previous orders
          </p>
        ) : (
          <div className={`container ${montserratThin.className}`}>
            {previousOrders.map((previousOrder: OrderType, i) => {
              const orderItems = orderProducts.filter(
                (el) => el.order_id === previousOrder.id
              );
              return (
                <OrderCard
                  key={i}
                  productData={productInfo}
                  order={previousOrder}
                  orderItems={orderItems}
                  userData={userData}
                ></OrderCard>
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
