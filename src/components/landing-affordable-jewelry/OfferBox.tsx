import React from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";

const bounce = keyframes`
0% {
  transform:translateY(0);
}
50% {
  transform:translateY(-2vh);
}
60% {
  transform:translateY(0vh);
}
70% {
  transform:translateY(-2vh);
}
100% {
  transform:translateY(0);
}`;

const Text = styled.p`
  color: #666;
  font-style: italic;
  line-height: 2;
  font-weight: 100;
  text-align: center;
  font-size: 1.2rem;
  margin: 0.2rem 0;
  font-size: ${(props) => props["data-font-size"]};
  @media screen and (max-width: 760px) {
    line-height: 1.5;
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
  padding: 2rem 0;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 60%;
  background-color: #ecd93b1a;
  border: 3px dashed #222;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const Button = styled.button`
  background-color: #ff00ed;
  border-radius: 5px;
  padding: 1rem 2rem;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 700;
  margin: 1rem 0;
  width: 90%;
  animation: ${bounce} 1s linear infinite;
  & span {
    font-weight: 100;
    color: #eeeeee80;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const OfferBox = () => {
  return (
    <Content>
      <Column>
        <Text>
          Hurry and Claim This Offer. The Only Catch Is You Need to Cover the
          Small Expedited Shipping Charge These Earrings Retail For 8 times the
          cost of the shipping fee, this is an exceptional offer that over 200K
          people have already taken us up on. If you don’t like the earrings,
          they make amazing gifts that look like you spend a lot on when in fact
          you didn’t. If you love them, we hope to see you making other
          purchases with us in the future.
        </Text>
        <Button onClick={() => navigate("/order/OrderPage")}>
          claim your free pair <br />
          <span>click here</span>
        </Button>
      </Column>
    </Content>
  );
};

export default OfferBox;
