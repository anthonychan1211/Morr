// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/lib/types";
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function addToUserBag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, role, email, ...rest } = JSON.parse(req.body);

  try {
    const result = prisma.profiles.update({
      where: {
        id,
      },
      data: rest,
    });
    result.then((data) => res.json(data));
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
