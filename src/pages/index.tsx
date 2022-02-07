import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/footer.tsx/Footer";
import Hero from "../components/orderpage/hero/Hero";
import Nav from "../components/orderpage/nav/Nav";
import Form from "../components/orderpage/order-form/Form";
import Message from "../components/orderpage/section/Message";
import Colors from "../constants/Colors";
import { Helmet } from "react-helmet";
import Loox from "../components/reviews/Loox";
import Alert from "../components/alert/Alert";
import { useEffect } from "react";

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

const IndexPage = () => {
  useEffect(() => {
    if (window.localStorage.getItem("order_id")) {
      window.localStorage.removeItem("order_id");
    }
  }, []);
  return (
    <ThemeContext.Provider value={Colors}>
      <Globalstyle />
      <Helmet>
        <title>Gold 2CT Stud Order Page</title>
        <script
          async
          src="//loox.io/widget/loox.js?shop=luciana-rose-couture.myshopify.com"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-1003840432"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-1003840432')`,
          }}
        ></script>

        <script src="https://www.poptrkr.com/scripts/sdk/everflow.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `EF.conversion({
              offer_id: 75,
              event_id: 329
            })`,
          }}
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-1003840432"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` 
      window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-1003840432');`,
          }}
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':

new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

})(window,document,'script','dataLayer','GTM-M66C9TR');`,
          }}
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-306958873"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];

            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'AW-306958873');`,
          }}
        ></script>
      </Helmet>
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

export default IndexPage;
