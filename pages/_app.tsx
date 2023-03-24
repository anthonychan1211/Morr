import Header from "../components/Header";
import type { AppInitialProps, AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createGlobalStyle } from "styled-components";
import { Manrope } from "@next/font/google";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Location from "@/components/Body/Location";
import Footer from "@/components/Footer";
import { CartItem, UserDataType } from "@/lib/types";
import { addToUserBag, getUserBag } from "@/lib/functions";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600"],
});
const GlobalStyles = createGlobalStyle`
  :root{
    --tiny-text: max(11px, 0.85vw);
    --small-text: max(14px, 1vw);
    --medium-text: max(18px, 1.15vw);
    --large-text: max(24px, 1.4vw);
    --background-grey: #2e2e2e;
    --dark-gold: #e9d8c4;
  }
  html {
    box-sizing: border-box;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--background-grey);
    *, *::before, *::after{
     padding: 0;
     margin: 0;
     box-sizing: border-box;
    }
    

  }

  input[type='text'], input[type='password'], input[type='email'],input[type='number']{
    padding: 14px;
    font-size: 16px;
    border: 1px solid #dddddd;
    width: 100%;
  }
  label{
    display: block;
    font-size: 12px;
  }
  button{
    color: lightgrey;
    background-color: var(--background-grey);
    border: none;
    padding: 15px;
    
  }
  `;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  useEffect(() => {
    async function getUser() {
      const user = (await supabase.auth.getUser()).data.user;
      if (user)
        setUserData({ role: user.role as string, id: user.id as string });
    }
    getUser();
  }, [supabaseClient]);

  const [userData, setUserData] = useState<UserDataType>({
    role: "",
    id: "",
  });
  const [shoppingBag, setShoppingBag] = useState<CartItem[]>([]);

  useEffect(() => {
    async function setUpShoppingBag() {
      if (userData.id !== "") {
        const itemsInBag = await getUserBag(userData.id);

        const localBag = JSON.parse(localStorage.getItem("bag") as string);
        if (localBag !== null) {
          let mergedBag: CartItem[] = [];
          for (const product in localBag) {
            const existingProduct = itemsInBag.filter(
              (el: CartItem) => el.product_id === parseInt(product)
            );
            if (existingProduct.length > 0) {
              let merged: CartItem = {
                ...existingProduct[0],
                quantity: existingProduct[0].quantity + localBag[product],
              };
              mergedBag.push(merged);
            } else {
              let newItem: CartItem = {
                user_id: userData.id,
                product_id: parseInt(product),
                quantity: localBag[product],
              };

              mergedBag.push(newItem);
            }
          }
          const result = addToUserBag(mergedBag);
          result.then((data) => {
            if (data) localStorage.removeItem("bag");
          });
        } else {
          setShoppingBag(itemsInBag);
        }
      } else {
        const localBag = JSON.parse(localStorage.getItem("bag") as string);
        if (localBag !== null) {
          setShoppingBag(
            Object.entries(localBag).map((el) => {
              return {
                user_id: "",
                product_id: parseInt(el[0]),
                quantity: el[1] as number,
              };
            })
          );
        }
      }
    }
    setUpShoppingBag();
  }, [userData]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        className={manrope.className}
      >
        <GlobalStyles />
        <Header userData={userData} shoppingBag={shoppingBag} />
        <Location />
        <Component
          {...pageProps}
          userData={userData}
          shoppingBag={shoppingBag}
          setShoppingBag={setShoppingBag}
        ></Component>
        <Footer />
      </main>
    </SessionContextProvider>
  );
}
