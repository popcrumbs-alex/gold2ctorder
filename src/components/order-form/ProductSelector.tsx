import React from "react";
import styled from "styled-components";
import { ProductProps, ProductSelectorItems } from "../../product/ProductData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductSelect = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.color !== null ? props.color : "")};
  padding: 1.5rem 0.5rem;
  border: 1px solid ${(props) => (props.color ? "yellow" : "transparent")};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #eee;
  display: block;
  margin: 3% 0;
`;

const RadioButton = styled.input``;

const BestDealHeadline = styled.h4`
  color: #222;
  width: 100%;
  margin: 0.2rem 0.5rem;
  font-weight: 100;
`;

const Description = styled.p`
  color: #999;
  font-weight: 300;
  font-size: 0.9rem;
  text-align: start;
  margin: 0 0.5rem;
`;
const Price = styled.p`
  color: red;
  text-align: end;
  margin: 0;
  font-weight: 100;
  font-size: 0.9rem;
`;

const Text = styled.p`
  font-weight: 700;
  margin: 0.2rem 0;
  color: #999;
`;

const ProductSelector = () => {
  return (
    <Container>
      <Row>
        <Text>Item</Text>
        <Text>Price</Text>
      </Row>
      <Divider />
      {ProductSelectorItems.map((item: ProductProps, key: number) => {
        return (
          // Best deal items have different backgrounds
          <ProductSelect key={key} color={item.bestDeal ? "#fcfae8" : null}>
            <Column>
              <Row>
                <RadioButton type="radio" name="product" />
                <Column>
                  {item.bestDeal && (
                    <BestDealHeadline>{item.dealHeadline}</BestDealHeadline>
                  )}
                  <Description>{item.title}</Description>
                </Column>
              </Row>
            </Column>
            <Column>
              <Row>
                <Price>{item.displayPrice}</Price>
              </Row>
            </Column>
          </ProductSelect>
        );
      })}
    </Container>
  );
};

export default ProductSelector;
