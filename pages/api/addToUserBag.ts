// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/lib/types";
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function addToUserBag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { newItem } = JSON.parse(req.body);
  try {
    const returnValue = await Promise.all(
      newItem.map(async (item: CartItem) => {
        if (item.id) {
          const result = await prisma.cart.update({
            where: {
              id: item.id,
            },
            data: {
              quantity: item.quantity,
            },
          });
          return result;
        } else {
          const result = await prisma.cart.create({
            data: item,
          });
          return result;
        }
      })
    );
    res.json({ message: returnValue });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
