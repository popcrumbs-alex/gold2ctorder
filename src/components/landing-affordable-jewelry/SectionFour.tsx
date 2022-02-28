import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  @media screen and (max-width: 760px) {
    padding: 1rem 0;
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: rem;
  text-align: center;
  margin: 0.2rem 0;
  padding: 2rem 0;
  @media screen and (max-width: 760px) {
    padding: 2rem 1rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OverlapBox = styled.div`
  background-color: #c82ce4;
  width: 50%;
  padding: 2rem;
  border: 5px dashed #222;
  margin-top: -3rem;
  @media screen and (max-width: 760px) {
    width: 80%;
    padding: 1rem;
  }
`;

const Text = styled.p`
  color: #fff;
  line-height: 1.5;
  font-size: 1.2rem;
`;

const SectionFour = () => {
  return (
    <Section>
      <Content>
        <Column>
          <Heading>
            Now let’s show you the product, because it's anything but cheap
          </Heading>
        </Column>
      </Content>
      <Overlap />
    </Section>
  );
};

const Overlap = () => {
  return (
    <OverlapBox>
      <Column>
        <Text>
          Unlike most cheap earrings{" "}
          <strong style={{ color: "#222" }}>
            our product will not fade, get cloudy or turn on you at any point.
          </strong>{" "}
          When we make our jewelry we add a little extra love to it, and make it
          better than the rest We take a normal CZ stone and seal it, so no
          moisture ever gets inside of it and makes it cloudy.
        </Text>
      </Column>
    </OverlapBox>
  );
};

export default SectionFour;
