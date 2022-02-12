import React, { FC, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../components/alert/Alert";
import OtoReviews from "../../components/otos/oto2/OtoReviews";
import OtoScreen2 from "../../components/otos/oto2/OtoScreen2";
import BodyTags from "../layout/BodyTags";
import HelmetWrapper from "../layout/HelmetWrapper";
import TagManager from "react-gtm-module";
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      TagManager.initialize({
        gtmId: "GTM-N2FNX5N",
        dataLayerName: "Oto2Page",
      });

      TagManager.dataLayer({
        dataLayerName: "Oto2Page",
        dataLayer: {
          event: "oto2PageView",
        },
      });
    }
  }, []);
  return (
    <Main>
      <HelmetWrapper pageTitle="Eternity Band" efScript="" />
      <Globalstyle />
      <Alert />
      <OtoScreen2 />
      <OtoReviews />
      <BodyTags />
    </Main>
  );
};

export default Oto2;
