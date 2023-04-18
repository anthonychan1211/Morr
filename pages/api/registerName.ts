// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    country,
    postal_code,
    phone_num,
    is_default_shipping_address,
  } = JSON.parse(req.body);

  try {
    const resultPromise = prisma.profiles.create({
      data: {
        id,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        country,
        postal_code,
        phone_num,
        is_default_shipping_address,
      },
    });
    resultPromise.then((data) => res.json(data));
  } catch (e) {
    console.error(e);
  } finally {
    prisma.$disconnect();
  }
}
