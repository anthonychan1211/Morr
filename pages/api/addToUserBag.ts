// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function addToUserBag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { newItem } = JSON.parse(req.body);
  try {
    for (const item of newItem) {
      if (item.id) {
        const result = prisma.cart.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity,
          },
        });
        result.then((data) => console.log("create", data));
      } else {
        const result = prisma.cart.create({
          data: item,
        });
        result.then((data) => console.log("update", data));
      }
    }
    res.json({ message: "done" });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
