import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Hero from "../components/hero/Hero";
import Nav from "../components/nav/Nav";
import Form from "../components/order-form/Form";
import Message from "../components/section/Message";
import Colors from "../constants/Colors";

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
  return (
    <ThemeContext.Provider value={Colors}>
      <Globalstyle />
      <Nav />
      <Main>
        <Hero />
        <Message />
        <Form />
      </Main>
    </ThemeContext.Provider>
  );
};

export default IndexPage;
