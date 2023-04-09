// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem, RemoveItem } from "@/lib/types";
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function addToUserBag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { removeItem }: { removeItem: RemoveItem } = JSON.parse(req.body);
  try {
    const deleteItem = await prisma.cart.delete({
      where: {
        id: removeItem.id,
      },
    });
    res.json({ message: deleteItem });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
