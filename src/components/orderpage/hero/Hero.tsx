import { useQuery } from "@apollo/client";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import { TEST_ENDPOINT } from "../../../graphql/queries/order.query";
import ProductData from "../../../product/ProductData";
import Timer from "./Timer";

const Container = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${(props) => props.color};
  padding: 4rem 0;
  background: url("https://images.clickfunnels.com/97/42acb1ccfc43419713e76cb8037b17/SP-BG.png");
  background-size: cover;
  background-position: center;
  background-repeat: norepeat;
`;
const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h1`
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 2rem;
`;
const SubHeading = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #666;
  line-height: 2;
  font-size: 1.2rem;
  max-width: 700px;
  & span {
    color: dodgerblue;
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const Hero = () => {
  const { title } = ProductData;

  return (
    <Container color="#efefef">
      <Content>
        <Heading>We are holding your FREE {title} for</Heading>
        <Timer />
        <SubHeading>
          Simply tell us where to send your order for guaranteed delivery in 5
          days (via USPS): 📦 Items are <span>IN STOCK</span> and{" "}
          <span>READY TO SHIP</span>
          <span>WITHIN 24 HOURS</span> from our <span>US BASED</span>{" "}
          Warehouses.
        </SubHeading>
        <StaticImage
          src="../../images/gold-studs.png"
          alt={title}
          placeholder="blurred"
          objectFit="contain"
          imgStyle={{ width: "100%", borderRadius: "5px" }}
          width={400}
          style={{
            boxShadow: "0 1px 20px #ddd",
            borderRadius: "5px",
            border: "4px solid #333",
          }}
        />
      </Content>
    </Container>
  );
};

export default Hero;
