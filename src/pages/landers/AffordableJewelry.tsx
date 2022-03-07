import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import AffordableJewelryLanding from "../../components/landing-affordable-jewelry/AffordableJewelryLanding";
import Colors from "../../constants/Colors";
import Footer from "../../layout/Footer";
import HelmetWrapper from "../../layout/HelmetWrapper";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;
export const ThemeContext = React.createContext(Colors);

const Globalstyle = createGlobalStyle`
    @import url("https://use.typekit.net/wzi3sml.css");
    html, body {
    font-family: Raleway,sans-serif;
    font-weight: 400;
    font-style: normal; 
    font-size:16px;
    margin:0;
    padding:0;
    box-sizing:border-box;
}`;

const AffordableJewelry = () => {
  return (
    <ThemeContext.Provider value={Colors}>
      <HelmetWrapper pageTitle="Affordable Jewelry" efScript="" />
      <Main>
        <Globalstyle />
        <AffordableJewelryLanding />
        <Footer ThemeContext={ThemeContext} />
      </Main>
    </ThemeContext.Provider>
  );
};

AffordableJewelry.propTypes = {};

export default AffordableJewelry;
