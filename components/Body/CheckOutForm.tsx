import React, { useContext, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import { CartItem, Product, UserDataType } from "@/lib/types";
import { handleUpdateUser, handleUserInfoChange } from "@/lib/functions";
import CountrySelector from "./CountrySelector";
import { Context } from "@/lib/context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { Router, useRouter } from "next/router";
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
  .title {
    margin-block: 3vw;
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
export default function CheckoutForm({
  userData,
  amount,
  shoppingBag,
  productData,
}: {
  userData: UserDataType;
  amount: number;
  shoppingBag: CartItem[];
  productData: Product[];
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { setLoading } = useContext(Context);
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [tempUserInfo, setTempUserInfo] = useState<UserDataType>(userData);
  const [billingAddress, setBillingAddress] = useState<UserDataType>({
    role: userData.role,
    id: userData.id,
    email: userData.email,
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postal_code: "",
    phone_num: "",
    is_default_shipping_address: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
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

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/bag`,
        receipt_email: userData.email,
      },
      redirect: "if_required",
    });
    if (paymentIntent?.status === "succeeded") {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({
          amount,
          deliveryInfo: tempUserInfo,
          billingInfo: showBillingAddress ? billingAddress : tempUserInfo,
          shoppingBag,
          productData,
        }),
      });
      const feedBack = await res.json();
      if (feedBack.user_id === null) {
        console.log(feedBack);
        localStorage.removeItem("bag");
      }
      router
        .push({
          pathname: "/orderplaced",
          query: { order_id: feedBack.id },
        })
        .then(() => router.reload());
    }
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message as string);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };
  return (
    <StyledForm>
      <form id="payment-form" onSubmit={handleSubmit}>
        <h3 className="title">Delivery Information</h3>
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              className="firstName"
              value={tempUserInfo.first_name}
              required
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="last_name"
              value={tempUserInfo.last_name}
              required
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              value={tempUserInfo.email}
              required
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_1">Address 1*</label>
            <input
              type="text"
              name="address_1"
              value={tempUserInfo.address_1}
              required
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_2">Address 2</label>
            <input
              type="text"
              name="address_2"
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
              value={tempUserInfo.address_2}
            />
          </div>

          <div className="input-field">
            <label htmlFor="city">City*</label>
            <input
              id="city"
              type="text"
              name="city"
              value={tempUserInfo.city}
              required
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="">Country*</label>
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
              value={tempUserInfo.postal_code}
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="postal_code">Phone Number*</label>
            <PhoneInput
              country={"gb"}
              value={tempUserInfo.phone_num}
              inputStyle={{
                fontSize: "16px",
                height: "80%",
                padding: "14px",
                paddingLeft: "60px",
                width: "100%",
                borderColor: "#dddddd",
                borderRadius: "0",
              }}
              buttonStyle={{ borderRadius: "0" }}
              onChange={(value) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  phone_num: value,
                })
              }
            />
          </div>
        </div>

        <div className="default-address">
          <input
            type="checkbox"
            name="billing_address"
            id="is_default_shipping_address"
            checked={!showBillingAddress}
            onClick={() => setShowBillingAddress(!showBillingAddress)}
          />
          <label htmlFor="is_default_shipping_address">
            Billing Information is same as delivery information
          </label>
        </div>

        {showBillingAddress && (
          <>
            <h3 className="title">Billing Information</h3>
            <div className="inputs">
              <div className="input-field">
                <label htmlFor="first_name">First Name*</label>
                <input
                  type="text"
                  name="first_name"
                  value={billingAddress.first_name}
                  required
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="last_name">Last Name*</label>
                <input
                  type="text"
                  name="last_name"
                  value={billingAddress.last_name}
                  required
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="address_1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={tempUserInfo.email}
                  required
                  onChange={(e) =>
                    setTempUserInfo({
                      ...tempUserInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="address_1">Address 1*</label>
                <input
                  type="text"
                  name="address_1"
                  value={billingAddress.address_1}
                  required
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="address_2">Address 2</label>
                <input
                  type="text"
                  name="address_2"
                  value={billingAddress.address_2}
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>

              <div className="input-field">
                <label htmlFor="city">City*</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={billingAddress.city}
                  required
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="">Country*</label>
                <CountrySelector
                  edit={true}
                  setUserInfo={setBillingAddress}
                  userInfo={billingAddress}
                />
              </div>

              <div className="input-field">
                <label htmlFor="postal_code">Postal Code*</label>
                <input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  value={billingAddress.postal_code}
                  onChange={(e) =>
                    handleUserInfoChange(e, setBillingAddress, billingAddress)
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="postal_code">Phone Number*</label>
                <PhoneInput
                  country={"gb"}
                  value={billingAddress.phone_num}
                  inputStyle={{
                    fontSize: "16px",
                    height: "80%",
                    padding: "14px",
                    paddingLeft: "60px",
                    width: "100%",
                    borderColor: "#dddddd",
                    borderRadius: "0",
                  }}
                  buttonStyle={{ borderRadius: "0" }}
                  onChange={(value) =>
                    setBillingAddress({ ...billingAddress, phone_num: value })
                  }
                />
              </div>
            </div>
          </>
        )}
        <h3 className="title">Payment Information</h3>
        <PaymentElement />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              `Pay £ ${amount.toFixed(2)}`
            )}
          </span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
    </StyledForm>
  );
}
