import React, { useEffect, useState } from "react";
import { StyledOrderPage } from "../lib/orderStyles";
import { OrderType, UserDataType } from "@/lib/types";
import { prisma } from "@/prisma/db";

const Order = ({ userData }: { userData: UserDataType }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
 
  return (
    <StyledOrderPage>
      <div className="current-order">
        <h4>Ongoing Orders</h4>
        <p>No ongoing orders</p>
      </div>
      <div className="previous-order">
        <h4>Previous Orders</h4>
        <p>Place your first orders</p>
      </div>
    </StyledOrderPage>
  );
};

export default Order;
