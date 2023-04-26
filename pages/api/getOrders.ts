// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id } = JSON.parse(req.body);

  try {
    const orders = await prisma.orders.findMany({
      where: {
        user_id,
      },
    });

    const items = await prisma.order_items.findMany({
      where: {
        order_id: { in: orders.map((el) => el.id) },
      },
    });
    const productsInfo = await prisma.products.findMany({
      where: {
        id: { in: items.map((el) => el.product_id) },
      },
    });
    res.json({ orders, items, productsInfo });
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  }
}
