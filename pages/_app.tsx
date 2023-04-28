import Header from "../components/Header";
import type { AppInitialProps, AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createGlobalStyle } from "styled-components";
import { Manrope } from "@next/font/google";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Location from "@/components/Body/Location";
import Footer from "@/components/Footer";
import { CartItem, UserDataType } from "@/lib/types";
import { addToUserBag, getUserBag } from "@/lib/functions";
import { Context, LoadingProvider } from "@/lib/context";
import Loading from "@/components/Loading";
import Head from "next/head";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600"],
});
const GlobalStyles = createGlobalStyle`
  :root{
    --tiny-text: max(10px, 0.83vw);
    --small-text: max(12px, 1vw);
    --medium-text: max(18px, 1.15vw);
    --large-text: max(24px, 1.4vw);
    --mega-text:max(36px, 2vw);
    --background-grey: #2e2e2e;
    --dark-gold: #e9d8c4;
  }
  html {
    
    padding: 0;
    box-sizing: border-box;
    background-color: var(--background-grey);
    *, *::before, *::after{
     padding: 0;
     margin: 0;
     box-sizing: border-box;
    }
    

  }

  input[type='text'], input[type='password'], input[type='email'],input[type='number'], input[type='tel'], textarea, select{
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
    cursor: pointer;
  }
  `;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
export default function MyApp({ Component, pageProps }: AppProps) {
  const { setLoading } = useContext(Context);
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [userData, setUserData] = useState<UserDataType>({
    role: "",
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postal_code: "",
    phone_num: "",
    is_default_shipping_address: false,
  });
  const [shoppingBag, setShoppingBag] = useState<CartItem[]>([]);
  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        const res = await fetch("/api/getName", {
          method: "POST",
          body: JSON.stringify({
            id: user.id,
          }),
        });
        const result = await res.json();

        setUserData({
          role: user.role as string,
          id: user.id as string,
          first_name: result.first_name as string,
          last_name: result.last_name as string,
          email: user.email as string,
          address_1: (result.address_1 as string) || "",
          address_2: (result.address_2 as string) || "",
          city: (result.city as string) || "",
          country: (result.country as string) || "",
          postal_code: (result.postal_code as string) || "",
          phone_num: (result.phone_num as string) || "",
          is_default_shipping_address:
            (result.is_default_shipping_address as boolean) || false,
        });
      }
    }
    getUser();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient]);

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
          localStorage.removeItem("bag");

          const result = addToUserBag(mergedBag);
          result.then((data) => {
            if (data) {
              router.reload();
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <LoadingProvider>
      <Loading />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Head>
          <title>Morr</title>
        </Head>
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
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
    </LoadingProvider>
  );
}
