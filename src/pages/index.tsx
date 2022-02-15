import * as React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Colors from "../constants/Colors";
import { useEffect } from "react";
import Lander from "../components/landing-one/Lander";
import Footer from "../components/footer.tsx/Footer";
import HelmetWrapper from "./layout/HelmetWrapper";

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

declare const window: any;

const IndexPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("order_id")) {
        window.localStorage.removeItem("order_id");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //integrate this everwhere instead
      if (window.fbq) {
        console.log(window.fbq);
        window.fbq("track", "PageView");
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={Colors}>
      <Globalstyle />
      <HelmetWrapper pageTitle="Gold 2CT Studs" efScript="" />
      <Main>
        <Lander />
      </Main>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default IndexPage;
