import React, { useContext, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import { UserDataType } from "@/lib/types";
import { handleUpdateUser, handleUserInfoChange } from "@/lib/functions";
import CountrySelector from "./CountrySelector";
import { Context } from "@/lib/context";

const StyledForm = styled.div`
  flex: 1;
  background-color: white;
  #payment-form {
    width: 70%;
    margin: 7vw auto;
  }
  .set-default-address {
    display: flex;
    margin: 10px 0 40px 0;
    gap: 5px;
    align-items: center;
  }
  #submit {
    margin-top: 20px;
  }
  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 3vw;
  }
  .span2 {
    grid-column-start: 1;
    grid-column-end: -1;
  }
  .default-address {
    display: flex;
    padding: 10px 0px 20px 0px;
    gap: 5px;
  }
  .spinner {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
export default function CheckoutForm({ userData }: { userData: UserDataType }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setLoading } = useContext(Context);
  const [message, setMessage] = useState<string | null>(null);
  const [tempUserInfo, setTempUserInfo] = useState<UserDataType>(userData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    if (
      tempUserInfo.is_default_shipping_address &&
      JSON.stringify(userData.is_default_shipping_address) !==
        JSON.stringify(tempUserInfo.is_default_shipping_address)
    ) {
      handleUpdateUser(e, tempUserInfo, setLoading);
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  return (
    <StyledForm>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              className="firstName"
              defaultValue={tempUserInfo.first_name}
              required
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="lastName"
              defaultValue={tempUserInfo.last_name}
              required
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_1">Address 1*</label>
            <input
              type="text"
              name="address_1"
              required
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_2">Address 2</label>
            <input
              type="text"
              name="address_2"
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
              defaultValue={tempUserInfo.address_2}
            />
          </div>

          <div className="input-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              defaultValue={tempUserInfo.city}
              required
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
            />
          </div>
          <div className="input-field">
            <CountrySelector
              edit={true}
              setUserInfo={setTempUserInfo}
              userInfo={tempUserInfo}
            />
          </div>

          <div className="input-field">
            <label htmlFor="postal_code">Postal Code*</label>
            <input
              type="text"
              name="postal_code"
              id="postal_code"
              defaultValue={tempUserInfo.postal_code}
              onChange={(e) =>
                handleUserInfoChange(e, setTempUserInfo, tempUserInfo)
              }
            />
          </div>
        </div>
        <div className="default-address">
          <input
            type="checkbox"
            name="is_default_shipping_address"
            id="is_default_shipping_address"
            checked={tempUserInfo.is_default_shipping_address}
            onClick={() =>
              setTempUserInfo({
                ...tempUserInfo,
                is_default_shipping_address:
                  !tempUserInfo.is_default_shipping_address,
              })
            }
          />
          <label htmlFor="is_default_shipping_address">
            Default Shipping Address
          </label>
        </div>
        <PaymentElement />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
    </StyledForm>
  );
}
