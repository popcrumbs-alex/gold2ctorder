import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { ProductProp } from "../../redux/reducers/order.reducer";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_ORDER } from "../../graphql/queries/order.query";
import { useContext } from "react";
import { Theme } from "../../constants/Colors";
import { ThemeContext } from "../../pages";
import LoadingSpinner from "../loading/LoadingSpinner";
import { CLOSE_ORDER } from "../../graphql/mutations/order.mutation";
import { useEffect } from "react";
import { navigate } from "gatsby";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background: url("https://images.clickfunnels.com/35/6f62c828334a918a1f7bb952491b60/header-bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  border-bottom: 4px solid #222;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const Heading = styled.h1`
  font-size: 3rem;
`;

const OrderDisplay = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const OrderDisplayHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: 2px solid #ddd;
`;
const ItemPrice = styled.p`
  font-weight: 700;
  margin: 0.2rem 0;
`;
const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
`;
const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const Subheading = styled.h3`
  font-size: 2rem;
  line-height: 2;
  text-align: center;
`;
const OrderTotal = styled.h4`
  font-weight: 700;
  & span {
    font-weight: 100;
    color: ${(props) => props.color};
  }
`;
const Title = styled.p`
  margin: 0.2rem 0;
`;
const Price = styled.p`
  margin: 0.2rem 0;
  color: ${(props) => props.color};
`;
const ThankyouPage = () => {
  const context = useContext<Theme>(ThemeContext);

  const orderId =
    typeof window !== "undefined"
      ? window.localStorage.getItem("order_id")
      : null;

  const { error, data, loading, refetch } = useQuery(LOAD_ORDER, {
    variables: {
      findOrderInput: { id: orderId },
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      refetch();
    }
  }, [window]);

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, []);

  if (loading) {
    return (
      <Section>
        <Content>
          <Heading>Loading Order...</Heading>
          <LoadingSpinner />
        </Content>
      </Section>
    );
  }

  return (
    <Section>
      {/* an invisible component to fire a mutation */}
      <CompleteOrder />
      <Header>
        <StaticImage
          src="../../images/lululogo.png"
          alt="ring size guide"
          placeholder="blurred"
          objectFit="contain"
          imgStyle={{ width: "100%", borderRadius: "5px" }}
          width={200}
          style={{}}
        />
      </Header>
      <Content>
        <Heading>Thank You For Your Order</Heading>
        <OrderDisplay>
          <OrderDisplayHeading>
            <ItemPrice>Item</ItemPrice>
            <ItemPrice>Price</ItemPrice>
          </OrderDisplayHeading>

          {data &&
            data.findOrder.Order.products.length > 0 &&
            data.findOrder.Order.products.map(
              (product: ProductProp, key: number) => {
                return (
                  <ItemRow key={key}>
                    <ItemColumn>
                      <Title>{product.title}</Title>
                    </ItemColumn>
                    <ItemColumn>
                      <Price color={context.danger}>
                        {product.displayPrice}
                      </Price>
                    </ItemColumn>
                  </ItemRow>
                );
              }
            )}
          {data && (
            <OrderDisplayHeading
              style={{
                borderBottom: `2px solid transparent`,
                borderTop: "2px solid #222",
              }}
            >
              <span></span>
              <OrderTotal color={context.danger}>
                OrderTotal: <span>${data.findOrder.Order.orderTotal}</span>
              </OrderTotal>
            </OrderDisplayHeading>
          )}
        </OrderDisplay>
        <Subheading>
          Please wait while we transfer you to complete your account to track
          and manage your order.{" "}
          <a href="https://store.lulurosecouture.com/account/register">
            Click here
          </a>
          {` `}if you didn't automatically get transferred.
        </Subheading>
      </Content>
    </Section>
  );
};

const CompleteOrder = () => {
  const [closeOrder, { error, loading, data }] = useMutation(CLOSE_ORDER);

  useEffect(() => {
    if (localStorage.getItem("order_id")) {
      closeOrder({
        variables: {
          closeOrderInput: { orderId: localStorage.getItem("order_id") },
        },
      });
    }
  }, []);

  console.log("order completion:", error, data, loading);

  return <></>;
};

export default ThankyouPage;
