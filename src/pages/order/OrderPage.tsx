import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../../components/footer.tsx/Footer";
import Hero from "../../components/orderpage/hero/Hero";
import Nav from "../../components/orderpage/nav/Nav";
import Form from "../../components/orderpage/order-form/Form";
import Message from "../../components/orderpage/section/Message";
import Colors from "../../constants/Colors";
import { Helmet } from "react-helmet";
import Loox from "../../components/reviews/Loox";
import Alert from "../../components/alert/Alert";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import HelmetWrapper from "../layout/HelmetWrapper";

const Main = styled.main``;

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
  useEffect(() => {
    if (window.localStorage.getItem("order_id")) {
      window.localStorage.removeItem("order_id");
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     TagManager.initialize({
  //       gtmId: "GTM-N2FNX5N",
  //       dataLayerName: "OrderPage",
  //     });

  //     TagManager.dataLayer({
  //       dataLayer: {
  //         event: "loadOrderPage",
  //         pagePath: "Order Page",
  //         pageTitle: "Gold 2CT Order Page",
  //       },
  //       dataLayerName: "OrderPage",
  //     });
  //   }
  // }, []);
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
      </Main>
    </ThemeContext.Provider>
  );
};

export default OrderPage;
