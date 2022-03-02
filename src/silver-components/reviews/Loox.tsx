import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const Heading = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const Loox = () => {
  return (
    <Container>
      <Content>
        <Heading>
          See what people are saying about these straight-from-the-lab studs
        </Heading>
        <div
          id="looxReviews"
          data-product-id="4273995350116"
          style={{ width: "100%" }}
        ></div>
      </Content>
    </Container>
  );
};

Loox.propTypes = {};

export default Loox;
