import { OrderItemType, OrderType, Product, UserDataType } from "@/lib/types";
import { Montserrat } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const montserratThin = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
});
const montserratNormal = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const OrderCard = ({
  productData,
  order,
  orderItems,
  userData,
}: {
  productData: Product[];
  order: OrderType;
  orderItems: OrderItemType[];
  userData: UserDataType;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const orderPlacedDate = new Date(order.create_at);
  const [controlOrderStatus, setControlOrderStatus] = useState({
    orderStatus: order.order_status,
    trackingNumber: order.tracking_number,
  });
  async function handleUpdateOrderStatus() {
    const res = await fetch("/api/updateOrderStatus", {
      method: "POST",
      body: JSON.stringify({
        order_id: order.id,
        tracking_number: controlOrderStatus.trackingNumber,
        order_status: controlOrderStatus.orderStatus,
      }),
    });
    const result = await res.json();
    if (result.message) {
      alert(`Order is updated : 
      Order id : ${JSON.stringify(result.message.id)}
      Order Status : ${JSON.stringify(result.message.order_status)}
      Tracking Number : ${JSON.stringify(result.message.tracking_number)}
      `);
      window.location.reload();
    }
  }

  return (
    <div className="single-order">
      <div className="order-info">
        <div className="cell">
          <p>Order No.:</p>
          <p>{order.id}</p>
        </div>
        <div className="cell">
          <p>Order Placed at:</p>
          <p>
            {`${orderPlacedDate.getFullYear()}-${orderPlacedDate.getMonth()}-${orderPlacedDate.getDate()}`}
          </p>
        </div>

        <div className="cell">
          <p>Total Amount</p>
          <p>£{order.amount / 100}</p>
        </div>
        <div className="delivery-section cell">
          <p className="name">Deliver To:</p>
          <div>
            {order.delivery_first_name}

            <Image
              className={`arrow ${!showDetail && `show`}`}
              src="/arrow-down.png"
              alt="arrow"
              width={8}
              height={8}
            />
          </div>
          {!showDetail && (
            <div className="delivery-address">
              <p>
                {order.delivery_address_1},<br />
                {order.delivery_address_2 !== "" &&
                  `${order.delivery_address_2},`}
                {order.delivery_city},<br />
                {order.delivery_country},<br />
                {order.delivery_postal_code}
              </p>
            </div>
          )}
        </div>
      </div>
      {showDetail ? (
        <div className={`photos-detail`}>
          {orderItems
            .filter((el) => el.order_id === order.id)
            .map((product, i) => {
              const productInfo = productData.find(
                (el) => product.product_id === el.id
              );
              return (
                <div key={i} className="single-item">
                  <div className="thumbnail">
                    <Link href={`products/${product.product_id}`}>
                      <Image
                        fill
                        alt="photo"
                        src={productInfo?.cover_photo || ""}
                      />
                    </Link>
                  </div>
                  <div className="info">
                    <div>
                      <p className={`name ${montserratNormal.className}`}>
                        {" "}
                        {productInfo?.name}
                      </p>
                      <p className="quantity">Quantity: {product.quantity}</p>
                    </div>
                    <div>
                      <p className="item-price">
                        £{" "}
                        {(
                          (product.product_price * product.quantity) /
                          100
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className={`photos`}>
          {orderItems
            .filter((el) => el.order_id === order.id)
            .map((product, i) => {
              return (
                <div key={i} className="thumbnail">
                  <Link href={`products/${product.product_id}`}>
                    <Image
                      fill
                      alt="photo"
                      src={
                        productData.find((el) => product.product_id === el.id)
                          ?.cover_photo || ""
                      }
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      )}
      <div className="more-detail">
        <div>
          {showDetail && (
            <p>
              Ship to: <br />
              {order.delivery_address_1},<br />
              {order.delivery_address_2 !== "" &&
                `${order.delivery_address_2},`}
              {order.delivery_city},<br />
              {order.delivery_country},<br />
              {order.delivery_postal_code}
            </p>
          )}
          <p>
            Order Status:{" "}
            {order.order_status[0].toUpperCase() + order.order_status.slice(1)}
          </p>
          {order.tracking_number !== null &&
            order.order_status !== "delivered" && (
              <div>
                <p className="tracking-number">
                  Shipping Service Provider: Royal Mail
                </p>
                <p className="tracking-number">
                  Tracking Number: {order.tracking_number}
                </p>
              </div>
            )}{" "}
        </div>
        <button
          type="button"
          className={montserratThin.className}
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? (
            <span className="expand">Close Order Details</span>
          ) : (
            <span className="shrink">Show Order Details</span>
          )}

          <Image
            className={`arrow show ${showDetail && `upside-down`}`}
            src="/arrow-down.png"
            alt="arrow"
            width={8}
            height={8}
          />
        </button>
      </div>
      {userData.role === "admin" && (
        <div className="update-section">
          <h4>Update Order</h4>
          <label>Order Status:</label>
          <select
            onChange={(e) =>
              setControlOrderStatus({
                ...controlOrderStatus,
                orderStatus: e.target.value,
              })
            }
            value={controlOrderStatus.orderStatus}
          >
            <option value="placed">Placed</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
            <option value="delivered">Delivered</option>
            <option value="waiting for refund">Waiting for refund</option>
            <option value="refunded">Refunded</option>
          </select>
          <label>Tracking Number:</label>
          <input
            type="text"
            value={controlOrderStatus.trackingNumber}
            onChange={(e) =>
              setControlOrderStatus({
                ...controlOrderStatus,
                trackingNumber: e.target.value,
              })
            }
          />
          <button type="button" onClick={() => handleUpdateOrderStatus()}>
            Update Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
