import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 700;
  margin: 0.2rem 0;
  font-size: ${(props) => props["data-font-size"]};
`;

const DividerContent = styled.section`
  background-color: ${(props) => props.color};
  padding: 2rem 0;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const OutlineBox = styled.div`
  border: 2px solid #fff;
  padding: 2rem;
  width: 50%;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const Divider = () => {
  return (
    <DividerContent color="#c82ce4">
      <OutlineBox>
        <Text color="#fff" data-font-size="2rem">
          Why Give Them Away For FREE, You Might Wonder, What's the Catch?
        </Text>
      </OutlineBox>
    </DividerContent>
  );
};

export default Divider;
