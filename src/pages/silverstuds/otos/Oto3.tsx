import React, { FC, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../../silver-components/alert/Alert";
import OtoThreeScreen from "../../../silver-components/otos/oto3/OtoThreeScreen";
import HelmetWrapper from "../../layout/HelmetWrapper";
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

const Oto3: FC = () => {
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
      <HelmetWrapper pageTitle="Rose Gold Earrings and Pendant" efScript="" />
      <Globalstyle />
      <Alert />
      <OtoThreeScreen />
    </Main>
  );
};

export default Oto3;
