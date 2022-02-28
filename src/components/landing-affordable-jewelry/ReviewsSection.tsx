import React from "react";
import styled from "styled-components";
import { FaSmile } from "react-icons/fa";

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h1`
  color: #222;
  font-size: 2rem;
  text-align: center;
  margin: 0.2rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewsSection = () => {
  return (
    <Content>
      <Row>
        <FaSmile size={35} style={{ marginRight: ".2rem" }} />
        <Heading>
          Don’t Just Listen To Us, Check Out What Our Customers Have To Say
        </Heading>
      </Row>
      <Column>
        <div
          id="looxReviews"
          data-product-id="4273995350116"
          style={{ width: "100%" }}
        ></div>
      </Column>
    </Content>
  );
};

export default ReviewsSection;
