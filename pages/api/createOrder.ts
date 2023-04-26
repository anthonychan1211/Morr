import { CartItem, Product } from "@/lib/types";
import { prisma } from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      res.json(order);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
