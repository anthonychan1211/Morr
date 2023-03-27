// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { product_id } = JSON.parse(req.body);

  try {
    const itemsInBag = prisma.products.findMany({
      where: {
        id: { in: product_id },
      },
    });
    itemsInBag.then((data) => {
      res.json({ data });
    });
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  }
}
