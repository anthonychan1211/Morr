import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import CheckoutForm from "@/components/Body/CheckOutForm";
import { CartItem, UserDataType } from "@/lib/types";
import { Context } from "@/lib/context";
import { getTotalAmount } from "@/lib/functions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export default function CheckOut({
  shoppingBag,
  userData,
}: {
  shoppingBag: CartItem[];
  userData: UserDataType;
}) {
  const { productData } = useContext(Context);
  const [clientSecret, setClientSecret] = useState<string>("");
  let amount = getTotalAmount(productData, shoppingBag);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function getClientSecret() {
      const res = await fetch("/api/createPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const feedBack = await res.json();
      console.log(feedBack);
      setClientSecret(feedBack.clientSecret);
    }
    getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance: { theme: "stripe" },
          }}
          stripe={stripePromise}
        >
          <CheckoutForm userData={userData} />
        </Elements>
      )}
    </>
  );
}
