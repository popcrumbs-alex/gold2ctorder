import React from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const Text = styled.p`
  color: #666;
  font-weight: 500;
  margin: 0.4rem 0;
  line-height: 1.5;
  font-size: ${(props) => props["data-font-size"]};
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 4rem;
  background-color: ${(props) => props.color};
`;

const Heading = styled.h1`
  color: #ff00ed;
  font-size: 1.5rem;
  font-style: italic;
  margin: 0.5rem 0;
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
`;

const ColumnsRow = styled.div`
  display: flex;
  background-color: #fff;
  padding: 3rem;
  align-items: flex-start;
  border: 2px solid #dddddd80;
  box-shadow: 0 1px 20px #dddddd90;
  border-radius: 2px;
  margin-top: 1rem;
  width: 60%;
  @media screen and (max-width: 760px) {
    width: 80%;
    flex-direction: column;
  }
`;

const SectionFive = () => {
  return (
    <Content>
      <ColumnsRow>
        <Column>
          <Heading>Assignment #1, make CZ’s last forever</Heading>
          <Text>We use only the best metals in our jewelry</Text>
          <Heading>Assignment #2, Make metal look like fine jewelry</Heading>
          <Text>Our secret is Vermeil</Text>
          <Text>What is Vermeil you might ask?</Text>
          <Text>
            Most fashion jewelry uses brass as a core, its this brass core which
            usually contains nickel that turns black and causes peoples ears to
            be irritated.
          </Text>
          <Text>
            Vermeil is a sterling silver core which contains no nickel and is
            known to not be an irritant to ears.
          </Text>
          <Text>
            We then take the solid silver core and coat it in gold or rose gold
            for that final look.
          </Text>
          <Text>
            Since we only use quality materials, the earrings never turn, not
            even for those wearing them in the shower daily.
          </Text>
        </Column>
        <Column>
          <ImageContainer>
            <StaticImage
              src="../../images/brandi.png"
              placeholder="blurred"
              imgStyle={{ width: "100%" }}
              alt="review"
            />
          </ImageContainer>
          <ImageContainer>
            <StaticImage
              src="../../images/holly.png"
              placeholder="blurred"
              imgStyle={{ width: "100%" }}
              alt="review"
            />
          </ImageContainer>
        </Column>
      </ColumnsRow>
    </Content>
  );
};

export default SectionFive;
