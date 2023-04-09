import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const amount = JSON.parse(req.body.amount);

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
}
