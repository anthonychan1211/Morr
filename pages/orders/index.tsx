import React, { useEffect, useState } from "react";
import { StyledOrderPage, StyledToLogInPage } from "../../lib/orderStyles";
import { OrderItemType, OrderType, Product, UserDataType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
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
    if (userData.id !== "") {
      getOrder(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              const orderPlacedDate = new Date(ongoingOrder.create_at);
              return (
                <div key={i} className="single-order">
                  <div className="order-info">
                    <div className="cell">
                      <p>Order No.:</p>
                      <p>{ongoingOrder.id}</p>
                    </div>
                    <div className="cell">
                      <p>Order Placed at:</p>
                      <p>
                        {`${orderPlacedDate.getFullYear()}-${orderPlacedDate.getMonth()}-${orderPlacedDate.getDate()}`}
                      </p>
                    </div>

                    <div className="cell">
                      <p>Total Amount</p>
                      <p>£{ongoingOrder.amount / 100}</p>
                    </div>
                    <div className="delivery-section cell">
                      <p className="name">Deliver To:</p>
                      <div>
                        {ongoingOrder.delivery_first_name}
                        <Image
                          className="arrow"
                          src="/arrow-down.png"
                          alt="arrow"
                          width={8}
                          height={8}
                        />
                      </div>
                      <div className="delivery-address">
                        <p>
                          {ongoingOrder.delivery_address_1},<br />
                          {ongoingOrder.delivery_address_2 !== "" &&
                            `${ongoingOrder.delivery_address_2},`}
                          {ongoingOrder.delivery_city},<br />
                          {ongoingOrder.delivery_country},<br />
                          {ongoingOrder.delivery_postal_code}
                        </p>
                      </div>
                    </div>
                  </div>
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
                  <div className="more-detail">
                    {ongoingOrder.tracking_number !== null ? (
                      <p>Tracking Number: {ongoingOrder.tracking_number}</p>
                    ) : (
                      <p>
                        Order Status:
                        {ongoingOrder.order_status[0].toUpperCase() +
                          ongoingOrder.order_status.slice(1)}
                      </p>
                    )}

                    <button
                      type="button"
                      className={`detail-toggle ${montserratThin.className}`}
                      onClick={(e) => {
                        (e.target as HTMLElement)
                          .closest(".single-order")
                          ?.classList.add("open");
                      }}
                    >
                      <span className="shrink">Show Order Details</span>
                      <span className="expand">Close Order Details</span>
                      <Image
                        className="arrow"
                        src="/arrow-down.png"
                        alt="arrow"
                        width={8}
                        height={8}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="previous-order">
        <h2 className={montserratNormal.className}>Previous Orders</h2>
        {previousOrders.length === 0 ? (
          <p className={montserratThin.className}>No previous orders</p>
        ) : (
          <div className={`container ${montserratThin.className}`}>
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
