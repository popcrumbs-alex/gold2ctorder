import React, { FC } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../components/alert/Alert";
import OtoReviews from "../../components/otos/oto2/OtoReviews";
import OtoScreen2 from "../../components/otos/oto2/OtoScreen2";

const Main = styled.main``;

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

const Oto2: FC = () => {
  return (
    <Main>
      <Helmet>
        <title>Eternity Band</title>
        <script
          async
          src="//loox.io/widget/loox.js?shop=luciana-rose-couture.myshopify.com"
        ></script>
      </Helmet>
      <Globalstyle />
      <Alert />
      <OtoScreen2 />
      <OtoReviews />
    </Main>
  );
};

export default Oto2;
