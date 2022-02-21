import * as React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Footer from "../../components/footer.tsx/Footer";
import Hero from "../../components/orderpage/hero/Hero";
import Nav from "../../components/orderpage/nav/Nav";
import Form from "../../components/orderpage/order-form/Form";
import Message from "../../components/orderpage/section/Message";
import Colors from "../../constants/Colors";
import Loox from "../../components/reviews/Loox";
import Alert from "../../components/alert/Alert";
import { useEffect } from "react";
import HelmetWrapper from "../layout/HelmetWrapper";
import Popups from "../../reusable/Popups";

declare const window: any;

const fadein = keyframes`
0%{
  opacity:0;
}
100% {
  opacity:1;
}`;

const Main = styled.main`
  opacity: 0;
  animation: ${fadein} 1s linear forwards;
`;

export const ThemeContext = React.createContext(Colors);

const Globalstyle = createGlobalStyle`
    @import url("https://use.typekit.net/wzi3sml.css");
    html, body {
    font-family: new-order,sans-serif;
    font-weight: 400;
    font-style: normal; 
    font-size:16px;
    margin:0;
    padding:0;
    box-sizing:border-box;
}`;

const OrderPage = () => {
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      if (window?.localStorage.getItem("order_id")) {
        window?.localStorage.removeItem("order_id");
      }
      if (window?.localStorage.getItem("orderType") !== null) {
        window.localStorage.removeItem("orderType");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.fbq) {
        console.log(window.fbq);
        window.fbq("track", "PageView");
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={Colors}>
      <Globalstyle />
      <HelmetWrapper pageTitle="Gold 2CT Stud Order Page" efScript="" />
      <Nav />
      <Main>
        <Alert />
        <Hero />
        <Message />
        <Form />
        <Loox />
        <Footer />
        <Popups />
      </Main>
    </ThemeContext.Provider>
  );
};

export default OrderPage;
