import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #eee;
  padding: 2rem 0;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
`;
const Heading = styled.h1`
  font-size: 2rem;
`;

const OtoReviews = (props) => {
  return (
    <Section>
      <Content>
        <Heading>See what people are saying about the Royalty Ring</Heading>
        <Heading>They are crazy about this Royalty Ring 🤩</Heading>
        <div
          id="looxReviews"
          data-product-id="4379186692196"
          style={{ width: "100%" }}
        ></div>
      </Content>
    </Section>
  );
};

OtoReviews.propTypes = {};

export default OtoReviews;
