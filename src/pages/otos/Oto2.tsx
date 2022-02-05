import React, { FC } from "react";
import styled, { createGlobalStyle } from "styled-components";
import OtoScreen2 from "../../components/otos/oto2/OtoScreen2";

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
  return (
    <Main>
      <Globalstyle /> <OtoScreen2 />
    </Main>
  );
};

export default Oto2;
