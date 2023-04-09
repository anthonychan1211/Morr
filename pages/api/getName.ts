// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = JSON.parse(req.body);
  try {
    const user = prisma.profiles.findUnique({
      where: {
        id,
      },
    });
    user.then((data) => res.json(data));
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  }
}
