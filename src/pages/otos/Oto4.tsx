import React, { FC, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../components/alert/Alert";
import OtoThreeScreen from "../../components/otos/oto3/OtoThreeScreen";
import OtoFourScreen from "../../components/otos/oto4/OtoFourScreen";
import HelmetWrapper from "../layout/HelmetWrapper";
const Main = styled.main``;

declare const window: any;

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

const Oto4: FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.fbq) {
        console.log(window.fbq);
        window.fbq("track", "PageView");
      }
    }
  }, []);
  return (
    <Main>
      <HelmetWrapper pageTitle="Victoria Earrings" efScript="" />
      <Globalstyle />
      <Alert />
      <OtoFourScreen />
    </Main>
  );
};

export default Oto4;
