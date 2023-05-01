// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/lib/types";
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function addToUserBag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order_id, tracking_number, order_status } = JSON.parse(req.body);
  try {
    const returnValue = await prisma.orders.update({
      where: {
        id: order_id,
      },
      data: {
        tracking_number,
        order_status,
      },
    });
    console.log(returnValue);
    res.json({ message: returnValue });
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
