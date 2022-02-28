import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import AffordableJewelryLanding from "../../components/landing-affordable-jewelry/AffordableJewelryLanding";
import HelmetWrapper from "../layout/HelmetWrapper";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

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
    <>
      <HelmetWrapper pageTitle="Affordable Jewelry" efScript="" />
      <Main>
        <Globalstyle />
        <AffordableJewelryLanding />
      </Main>
    </>
  );
};

AffordableJewelry.propTypes = {};

export default AffordableJewelry;
