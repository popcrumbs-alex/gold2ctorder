import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Colors from "../constants/Colors";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import Lander from "../components/landing-one/Lander";
import Footer from "../components/footer.tsx/Footer";
import HelmetWrapper from "./layout/HelmetWrapper";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      TagManager.initialize({
        gtmId: "GTM-N2FNX5N",
        dataLayerName: "LandingPage1",
      });

      TagManager.dataLayer({
        dataLayer: {
          event: "landingPage",
          pagePath: "Landing Page",
          pageTitle: "Gold 2CT Landing Page 1",
        },
        dataLayerName: "LandingPage1",
      });
    }
  }, []);
  return (
    <ThemeContext.Provider value={Colors}>
      <Globalstyle />
      <HelmetWrapper pageTitle="Gold 2CT Studs" />
      <Main>
        <Lander />
      </Main>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default IndexPage;
