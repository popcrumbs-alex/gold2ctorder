import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ProductProps, ProductSelectorItems } from "../../product/ProductData";
import {
  addProductToOrder,
  selectOrderState,
} from "../../redux/reducers/order.reducer";

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
  //action dispatcher to store hook
  const dispatch = useAppDispatch();
  //get order state
  const orderState = useAppSelector(selectOrderState);
  console.log("order state", orderState);
  //select products withint the product data array by utilitizing the index values
  const [productSelected, selectProduct] = useState<number>(1);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    selectProduct(parseFloat(e.currentTarget.value));

  useEffect(() => {
    dispatch(
      addProductToOrder({
        sku: "",
        title: ProductSelectorItems[productSelected].title,
        type: "main",
        price: ProductSelectorItems[productSelected].numPrice,
        displayPrice: ProductSelectorItems[productSelected].displayPrice,
      })
    );
  }, [productSelected]);
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
                <RadioButton
                  type="radio"
                  name="product"
                  value={key}
                  onChange={handleChange}
                  checked={productSelected === key}
                />
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
