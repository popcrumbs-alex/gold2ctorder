import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Theme } from "../../constants/Colors";
import { ThemeContext } from "../../pages";

const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;
const Content = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 227, 0, 0.2);
  border: 2px dashed #333;
  border-radius: 5px;
`;
const Heading = styled.h2`
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  color: #222;
  & span {
    color: ${(props) => props.color};
    font-weight: 700;
  }
`;

const Message = () => {
  const context = useContext<Theme>(ThemeContext);
  return (
    <Container>
      <Content>
        <Heading color={context.main}>
          Supplies are <span>limited, so you must act now</span> to ensure you
          don’t miss out on this opportunity 👇
        </Heading>
      </Content>
    </Container>
  );
};

Message.propTypes = {};

export default Message;
