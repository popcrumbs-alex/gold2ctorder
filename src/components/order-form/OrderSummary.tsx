import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  ProductProp,
  selectOrderState,
} from "../../redux/reducers/order.reducer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ItemAndAmount = styled.p`
  font-weight: 700;
  color: #222;
  margin: 0.2rem 0;
`;
const Heading = styled.h2`
  text-align: center;
  font-weight: 300;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-weight: 100;
  color: #666;
  font-size: 0.9rem;
  text-align: start;
  line-height: 1.5;
`;

const Price = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: end;
  line-height: 1.5;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #eee;
  display: block;
  margin: 1% 0;
`;

const OrderSummary = () => {
  const orderState = useAppSelector(selectOrderState);

  const { myOrder } = orderState;
  console.log("my order sum", myOrder);

  return (
    <Container>
      <Heading>Today's Order Summary</Heading>
      <Divider />
      <Row>
        <ItemAndAmount>Item</ItemAndAmount>
        <ItemAndAmount>Amount</ItemAndAmount>
      </Row>
      <Divider />
      <Items>
        {myOrder.products.map((prod: ProductProp, key: number) => {
          return (
            <Row key={key}>
              <Item>
                <Column>
                  <Text>{prod.title}</Text>
                </Column>
                <Column>
                  <Price>{prod.displayPrice}</Price>
                </Column>
              </Item>
            </Row>
          );
        })}
      </Items>
      <Divider />
      <Row>
        <ItemAndAmount>Order Total</ItemAndAmount>
        <Price>${myOrder.orderTotal.toFixed(2)}</Price>
      </Row>
    </Container>
  );
};

export default OrderSummary;
