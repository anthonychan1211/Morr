// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, firstName, lastName } = JSON.parse(req.body);

  try {
    const resultPromise = prisma.profiles.create({
      data: {
        id,
        first_name: firstName,
        last_name: lastName,
      },
    });
    resultPromise.then((data) => res.json(data));
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
