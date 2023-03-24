// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = JSON.parse(req.body);
  try {
    const itemsInBag = prisma.cart.findMany({
      where: {
        user_id,
      },
    });
    itemsInBag.then((data) => res.json({ data: data }));
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  }
}
