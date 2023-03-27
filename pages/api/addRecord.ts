// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = JSON.parse(req.body);

  try {
    if (form.id) {
      const updateProduct = prisma.products
        .update({
          where: {
            id: form.id || undefined,
          },
          data: {
            ...form,
          },
        })
        .then(async () => {
          await prisma.$disconnect();
        });
    } else {
      const newProduct = prisma.products
        .create({
          data: form,
        })
        .then(async () => {
          await prisma.$disconnect();
        });
    }
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
  } finally {
    res.json({ message: "done" });
  }
}
