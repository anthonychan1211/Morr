import { Context } from "@/lib/context";
import { CartItem } from "@/lib/types";
import React, { useContext } from "react";

const PaymentSuccess = ({ shoppingBag }: { shoppingBag: CartItem[] }) => {
  const { productData } = useContext(Context);
  console.log(shoppingBag);
  console.log(productData);
  return (
    <div>
      <h3>Your Order Has Been Placed!</h3>
    </div>
  );
};

export default PaymentSuccess;
