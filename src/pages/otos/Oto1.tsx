import React, { FC } from "react";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import Alert from "../../components/alert/Alert";
import OtoScreen from "../../components/otos/oto1/OtoScreen";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
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

const Oto1: FC = () => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: "GTM-N2FNX5N",
      dataLayerName: "Oto1Page",
    });

    TagManager.dataLayer({
      dataLayer: {
        event: "oto1PageView",
        pagePath: "Oto Page 1",
        pageTitle: "Gold 2CT Order Page",
      },
      dataLayerName: "oto1PageView",
    });
  }, []);
  return (
    <Main>
      <Helmet>
        <title>1CT Gold Studs</title>
      </Helmet>
      <Globalstyle />
      <Alert />
      <OtoScreen />
    </Main>
  );
};

Oto1.propTypes = {};

export default Oto1;
