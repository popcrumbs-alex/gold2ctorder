import React, { FC, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../../reusable/Alert";
import OtoReviews from "../../../victoria-components/otos/oto3/OtoReviews";
import RoyaltyRingScreen from "../../../victoria-components/otos/oto3/RoyaltyRingScreen";
import HelmetWrapper from "../../../layout/HelmetWrapper";
import SilverPendantScreen from "../../../victoria-components/otos/oto4/SilverPendantScreen";
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

const SilverPendant: FC = (props) => {
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
      <HelmetWrapper pageTitle="Silver Pendant" efScript="" />
      <Globalstyle />
      <Alert />
      <SilverPendantScreen />
    </Main>
  );
};

export default SilverPendant;
