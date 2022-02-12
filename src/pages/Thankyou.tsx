import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeContext } from ".";
import Alert from "../components/alert/Alert";
import ThankyouPage from "../components/thankyou/ThankyouPage";
import Colors from "../constants/Colors";
import BodyTags from "./layout/BodyTags";
import HelmetWrapper from "./layout/HelmetWrapper";
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

const Thankyou = () => {
  return (
    <ThemeContext.Provider value={Colors}>
      <HelmetWrapper pageTitle="Thank You" efScript="" />
      <Main>
        <Globalstyle />
        <Alert />
        <ThankyouPage />
      </Main>
      <BodyTags />
    </ThemeContext.Provider>
  );
};

Thankyou.propTypes = {};

export default Thankyou;
