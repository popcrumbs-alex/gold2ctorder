import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import ProductData from "../../../product/VictoriaProductData";
import Timer from "../../../reusable/Timer";

const Container = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${(props) => props.color};
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
  background: #fff;
  padding: 4rem 0;
`;
const Heading = styled.h1`
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 2rem;
  & span {
    color: dodgerblue;
  }
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;
const SubHeading = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #666;
  line-height: 1.5;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0.2rem 0;
  & span {
    color: dodgerblue;
    font-weight: 700;
    text-transform: uppercase;
  }
  @media screen and (max-width: 760px) {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
  }
`;
const Hero = () => {
  const { title } = ProductData;

  return (
    <Container color="#efefef">
      <Content>
        <Heading>
          We are holding your FREE <span>{title}</span> for
        </Heading>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "11", secondsProp: "59" }}
        />
        <SubHeading>
          Once the time runs out we will release your free pair to the next
          person in line, <span>so you must act now</span> to ensure you don’t
          miss out on this opportunity 👇
        </SubHeading>
        <StaticImage
          src="../../../images/victoria.png"
          alt={title}
          placeholder="blurred"
          objectFit="contain"
          imgStyle={{ width: "100%", borderRadius: "5px" }}
          width={400}
        />
        <SubHeading>
          Simply tell us where to send your order for guaranteed delivery in 3-9
          days (via USPS): 📦
        </SubHeading>
      </Content>
    </Container>
  );
};

export default Hero;
