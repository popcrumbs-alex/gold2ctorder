import React from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { FaTruck } from "react-icons/fa";

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 300;
  margin: 0.2rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #fff;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #c82ce4;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  margin: 0.2rem 0;
`;
const ImageContainer = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  & img {
    object-fit: contain;
    width: 100%;
    box-shadow: 0 0 0 4px #eeeeee33;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0 2rem;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const ColumnsRow = styled.div`
  display: flex;
  padding: 2rem;
  align-items: flex-start;
  border: 1px solid #dddddd50;
  border-radius: 2px;
  margin-top: 1rem;
  width: 60%;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const SectionSix = () => {
  return (
    <Content>
      <Row>
        <FaTruck size={30} style={{ marginRight: "1rem" }} />
        <Heading>When you order today they arrive in 3-6 days</Heading>
      </Row>
      <ColumnsRow>
        <Column>
          <ImageContainer>
            <StaticImage
              src="../../images/gabriel.png"
              alt="review"
              imgStyle={{ width: "100%" }}
              placeholder="blurred"
            />
          </ImageContainer>
        </Column>
        <Column>
          <Text>
            Unlike many online stores, we maintain 100% of our own inventory
            here in the USA in 1 of 3 different warehouses (this is how we get
            them to you fast).
          </Text>
          <Text>
            Once your order is placed, our fulfillment team picks, packs and
            ships it within 24 hours and hands it off to the fastest shipping
            provider for your area.
          </Text>
          <Text>
            98% of orders arrive in under 5 days and are placed in your mailbox
            by your local mail delivery person.
          </Text>
        </Column>
      </ColumnsRow>
    </Content>
  );
};

export default SectionSix;
