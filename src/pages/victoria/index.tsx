import * as React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Colors, { victoriaColors } from "../../constants/Colors";
import { useEffect } from "react";
import HelmetWrapper from "../layout/HelmetWrapper";
import Lander from "../../victoria-components/landing-one/Lander";
import Footer from "../../reusable/footer";

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

export const ThemeContext = React.createContext(victoriaColors);

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
    <ThemeContext.Provider value={victoriaColors}>
      <Globalstyle />
      <HelmetWrapper pageTitle="Victoria Studs" efScript="" />
      <Main>
        <Lander />
      </Main>
      <Footer ThemeContext={ThemeContext} />
    </ThemeContext.Provider>
  );
};

export default IndexPage;
