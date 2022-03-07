import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import FreeGiftComponent from "../../components/free-gift/FreeGiftComponent";
import Colors from "../../constants/Colors";
import Footer from "../../layout/Footer";
import HelmetWrapper from "../../layout/HelmetWrapper";

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

const FreeGift = () => {
  return (
    <>
      <HelmetWrapper pageTitle="Free Gift" efScript="" />
      <Main>
        <Globalstyle />
        <FreeGiftComponent />
        <Footer ThemeContext={ThemeContext} />
      </Main>
    </>
  );
};

FreeGift.propTypes = {};

export default FreeGift;
