import React from "react";
import { StyledOrderPage } from "./styles";

const Order = () => {
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
