import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 500;
  margin: 0.2rem 0;
  font-size: ${(props) => props["data-font-size"]};
  line-height: 1.5;
`;

const UnderlineHeading = styled.h2`
  color: #ff00ed;
  text-decoration: underline;
  font-style: italic;
  font-size: 2rem;
`;
const Content = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
  width: 100%;
  align-items: center;
  padding: 4rem 0;
  background: #eee;
  @media screen and (max-width: 760px) {
    padding: 2rem 0;
  }
`;

const ImageContainer = styled.div`
  margin-top: 2rem;
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
  width: 100%;
`;

const ColumnsRow = styled.div`
  display: flex;
  background-color: #fff;
  padding: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-top: 1rem;
  width: 60%;
  @media screen and (max-width: 760px) {
    width: 80%;
    flex-direction: column;
    padding: 1rem;
  }
`;

const SectionThree = () => {
  return (
    <Content>
      <ColumnsRow>
        <Column>
          <UnderlineHeading>There is no catch!</UnderlineHeading>
          <Text>
            We figure its{" "}
            <strong>easier to show you how high quality our jewelry is</strong>{" "}
            by offering the first piece at a huge discount,{" "}
            <strong>
              it saves us a lot of money in ad cost as more people respond to a
              free offer
            </strong>{" "}
            than a retail priced one.
          </Text>
        </Column>
      </ColumnsRow>
      <ColumnsRow>
        <Column>
          <UnderlineHeading>And it works for you and us</UnderlineHeading>
          <Text color="#666">
            You get a gorgeous pair of earrings at a crazy deal.
          </Text>
          <Text color="#666">
            We get the chance to WOW you with how high quality our product is.
          </Text>
          <Text color="#666">
            The result is 42% of customers make 2 or more purchases with, we
            have some customers with over 50 purchases.
          </Text>
          <Text color="#666">We put our product where our marketing is.</Text>
        </Column>
        <Column>
          <ImageContainer>
            <StaticImage
              src="../../images/carla-review.png"
              alt="review"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
        </Column>
      </ColumnsRow>
    </Content>
  );
};

export default SectionThree;
