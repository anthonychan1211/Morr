import { CartItem, Product } from "@/lib/types";
import { prisma } from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { CompletionTriggerKind } from "typescript";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sgApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sgApiKey!);
  const { amount, deliveryInfo, billingInfo, shoppingBag, productData } =
    JSON.parse(req.body);
  try {
    const order = await prisma.orders.create({
      data: {
        user_id: deliveryInfo.id === "" ? null : deliveryInfo.id,
        delivery_email: deliveryInfo.email,
        amount: amount * 100,
        delivery_first_name: deliveryInfo.first_name,
        delivery_last_name: deliveryInfo.last_name,
        delivery_phone_num: deliveryInfo.phone_num,
        delivery_address_1: deliveryInfo.address_1,
        delivery_address_2: deliveryInfo.address_2,
        delivery_city: deliveryInfo.city,
        delivery_country: deliveryInfo.country,
        delivery_postal_code: deliveryInfo.postal_code,
        billing_first_name: billingInfo.first_name,
        billing_last_name: billingInfo.last_name,
        billing_email: billingInfo.email,
        billing_phone_num: billingInfo.phone_num,
        billing_address_1: billingInfo.address_1,
        billing_address_2: billingInfo.address_2,
        billing_city: billingInfo.city,
        billing_country: billingInfo.country,
        billing_postal_code: billingInfo.postal_code,
        order_status: "placed",
      },
    });
    if (order) {
      const items = shoppingBag.reduce((accu: [], curr: CartItem) => {
        return [
          ...accu,
          {
            order_id: order.id,
            product_id: curr.product_id,
            quantity: curr.quantity,
            product_price: productData.find(
              (el: Product) => el.id === curr.product_id
            ).price,
          },
        ];
      }, []);
      const orderItem = await prisma.order_items.createMany({
        data: items,
      });
      if (orderItem && order.user_id !== null) {
        const deleteBag = await prisma.cart.deleteMany({
          where: {
            user_id: order.user_id,
          },
        });
      }
      for (const item of shoppingBag) {
        await prisma.products.update({
          where: { id: item.product_id },
          data: { quantity: { decrement: item.quantity } },
        });
      }
      console.log(order.delivery_email, order.billing_email);
      await sgMail.send({
        to:
          order.delivery_email === order.billing_email
            ? order.delivery_email
            : [order.delivery_email, order.billing_email],
        from: `Anthony Chan <${process.env.SENDER_EMAIL}>`,
        subject: `Order No.${order.id} is placed`,
        html: `<div
        style="
          width: 90%;
          min-width: 330px;
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid black;
          background: #2e2e2e;
          color: #dddddd;
        "
      >
        <img
          style="
            display: block;
            width: 110px;
            height: auto;
            margin: 20px auto;
            text-align: center;
          "
          alt="logo"
          src="https://res.cloudinary.com/doeejabc9/image/upload/v1676587183/morr/cle7opxol0000zin05ey62ix2.png"
        ></img>

        <h3 style="text-align: center; margin: 20px auto; color: #dddddd;">
          Thank you for your purchase!
        </h3>
        <p
          style="text-align: center; margin: 20px auto; font-size: 14px; color: #dddddd;"
        >
          Order ID : ${order.id}
        </p>
        <div style="margin: 10px auto; width: 330px;">
        ${shoppingBag.map((el: CartItem, i: number) => {
          const itemData = productData.find(
            (product: Product) => product.id === el.product_id
          );
          return ` <div
            key={i}
            style="display: flex; gap: 10px; margin: 10px auto"
          >
            <div
              style="
                width: 100px;
                height: 100px;
                position: relative;
              "
            >
              <img
                style="
                  object-fit: cover;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                "
                src='${itemData?.cover_photo}'
              />
            </div>
            <div>
              <p style="font-size: 12px; color: #dddddd; margin-left: 10px">${itemData?.name}</p>
              <p style="font-size: 12px; color: #dddddd; margin-left: 10px">Quantity: ${el.quantity}</p>
            </div>
          </div>`;
        })}

          <p style="font-size: 12px; margin: 20px 0px; color: #dddddd;">
            We will send an email once we have your order dispatched. If you
            want to track your order, you may go to your
            <a
              href="https://morr.vercel.app/orders"
              style="color: #b8a0a0"
            >
              account orders page
            </a>
            to check the tracking number.
          </p>
        </div>
      </div>
        `,
      });
      res.json(order);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
