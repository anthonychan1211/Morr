// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem, Product } from "@/lib/types";
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = JSON.parse(req.body);
  const product_id = products.reduce((accu: number[], curr: CartItem) => {
    return [...accu, curr.product_id];
  }, []);
  try {
    const itemsInBag = await prisma.products.findMany({
      where: {
        id: { in: product_id },
      },
    });

    const productLow = itemsInBag.filter((item) => {
      if (
        item.quantity! <
        products.find((el: CartItem) => el.product_id === item.id).quantity
      ) {
        return true;
      }
      return false;
    });

    res.json({ result: productLow });
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  }
}
