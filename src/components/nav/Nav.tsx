import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../pages";
import { StaticImage } from "gatsby-plugin-image";
import { FC } from "react";
import { Theme } from "../../constants/Colors";

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  min-height: 4rem;
  background: ${(props) => props.color};
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

const Nav: FC = () => {
  const context = useContext<Theme>(ThemeContext);

  return (
    <NavContainer color={context.main}>
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
    </NavContainer>
  );
};

export default Nav;
