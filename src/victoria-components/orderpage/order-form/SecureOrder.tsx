import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h2``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  font-size: 0.8rem;
  color: #999;
`;

const SecureOrder = () => {
  return (
    <Container>
      <Heading>Your Order Is Safe & Secure 🔒</Heading>
      <StaticImage
        src="../../../images/credit-only.png"
        alt="secure"
        placeholder="blurred"
        width={200}
        imgStyle={{ width: "200px" }}
      />
      <Row>
        <StaticImage
          src="../../../images/shield.png"
          alt="secure"
          placeholder="blurred"
          width={150}
          objectFit="contain"
          imgStyle={{ width: "50px" }}
        />
        <Text>
          Your order is protected by 256-bit encrypted SSL technology, the same
          security implemented for all sensitive financial, military, and
          government-owned data.
        </Text>
      </Row>
    </Container>
  );
};

export default SecureOrder;
