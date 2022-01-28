import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { ThemeContext } from "../../pages";

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
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h4`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0.2rem 0;
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: 1rem;
  margin: 0.2rem 0;
`;

const Footer = (props) => {
  const context = useContext(ThemeContext);
  return (
    <Container>
      <Content>
        <StaticImage
          src="../../images/lululogo.png"
          alt="logo"
          placeholder="blurred"
          objectFit="contain"
          imgStyle={{ width: "200px" }}
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

Footer.propTypes = {};

export default Footer;
