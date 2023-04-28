import { OrderItemType, OrderType, Product } from "@/lib/types";
import { prisma } from "@/prisma/db";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
const StyledOrderdPlaced = styled.div`
  flex: 1;
  background-color: white;
  .big-title {
    margin-top: 5vw;
    text-align: center;
    font-size: var(--large-text);
  }
  .small-title {
    margin-top: 2vw;
    text-align: center;
    font-size: var(--medium-text);
  }
  .items {
    width: 38%;
    min-width: fit-content;
    margin: 4vw auto;
  }
  .single-item {
    position: relative;
    height: 150px;
    display: flex;
    gap: 20px;

    pointer-events: none;
    .photo {
      position: relative;
      height: 90%;
      width: 150px;
      min-width: 150px;
      margin: 0 10px;
      img {
        object-fit: cover;
      }
    }
    p {
      font-size: var(--small-text);
    }
    .quantity,
    .price {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 300;
      font-size: var(--tiny-text);
      color: #949494;
      line-height: 1.8rem;
    }
  }

  h3 {
    text-align: center;
  }
  .p-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    text-align: center;
    margin: 20px;
  }
  .continue-shopping,
  .see-orders {
    display: block;
    width: 15vw;
    min-width: 200px;
    text-align: center;
    margin: 20px auto;
    padding: 10px;
    background-color: var(--background-grey);
    text-decoration: none;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
    font-size: var(--small-text);
  }
`;
const Orderplaced = ({
  order,
  order_items,
  items_data,
}: {
  order: OrderType;
  order_items: OrderItemType[];
  items_data: Product[];
}) => {
  return (
    <StyledOrderdPlaced>
      <h1 className="big-title">Thank you for your purchase!</h1>
      <h1 className="small-title">Your order has been placed.</h1>
      <div className="items">
        {order_items.map((item, i) => {
          const itemInfo: Product = items_data.find(
            (el) => el.id === item.product_id
          )!;
          return (
            <div key={i} className="single-item">
              <div className="photo">
                <Image src={itemInfo.cover_photo} alt="cover_photo" fill />
              </div>
              <div className="product_info">
                <p>{itemInfo.name}</p>
                <p className="quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="p-text">Your Order Number is : {order.id}</p>
      <p className="p-text">
        You will receive an order confirmation email with details of your order.
      </p>
      <Link href={"/products"} className="continue-shopping">
        Continue Shopping
      </Link>
      <Link href={"/orders"} className="see-orders">
        See Order Details
      </Link>
    </StyledOrderdPlaced>
  );
};
export async function getServerSideProps(ctx: { query: any }) {
  async function main() {
    const order = await prisma.orders.findUnique({
      where: {
        id: parseInt(ctx.query.order_id),
      },
    });
    const order_items = await prisma.order_items.findMany({
      where: {
        order_id: parseInt(ctx.query.order_id),
      },
    });
    const items_data = await Promise.all(
      order_items.map(async (item) => {
        const data = await prisma.products.findUnique({
          where: {
            id: item.product_id,
          },
        });
        return data;
      })
    );
    return [order, order_items, items_data];
  }
  try {
    const data = await main();

    await prisma.$disconnect();
    return {
      props: {
        order: JSON.parse(JSON.stringify(data[0])),
        order_items: data[1],
        items_data: data[2],
      },
    };
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
export default Orderplaced;
