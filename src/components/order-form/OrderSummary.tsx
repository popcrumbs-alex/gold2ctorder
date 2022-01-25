import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectOrderState } from "../../redux/reducers/order.reducer";
import { RootState } from "../../redux/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemAndAmount = styled.p`
  font-weight: 700;
  color: #222;
`;
const Heading = styled.h2``;

const OrderSummary = () => {
  const orderState = useAppSelector(selectOrderState);

  return (
    <Container>
      <Heading>Today's Order Summary</Heading>
      <Row>
        <ItemAndAmount>Item</ItemAndAmount>
        <ItemAndAmount>Amount</ItemAndAmount>
      </Row>
    </Container>
  );
};

export default OrderSummary;
