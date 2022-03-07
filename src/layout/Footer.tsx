import React, { Context, useContext } from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { Theme } from "../constants/Colors";

const Container = styled.footer`
  width: 100%;
  background-color: #666;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;
const Content = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 760px) {
    width: 95%;
    flex-direction: column;
    align-items: center;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    margin-top: 1rem;
  }
`;

const Heading = styled.h4`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0.2rem 0;
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 1rem;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: 1rem;
  margin: 0.2rem 0;
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 0.8rem;
  }
`;

const Footer = ({ ThemeContext }: { ThemeContext: Context<Theme> }) => {
  const context = useContext<Theme>(ThemeContext);
  return (
    <Container>
      <Content>
        <StaticImage
          src="../../images/lululogo.png"
          alt="logo"
          placeholder="blurred"
          objectFit="contain"
          imgStyle={{ width: "100%" }}
        />
        <Column>
          <Heading color={context.text}>Need Support?</Heading>
          <Text color={context.text}>support@lulurosecouture.com</Text>
          <Text color={context.text}>(516) 289-9264</Text>
        </Column>
      </Content>
    </Container>
  );
};

export default Footer;
