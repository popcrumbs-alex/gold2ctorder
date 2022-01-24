import React, { FC } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { BumpProps, orderBumps } from "../../product/ProductData";

const Bumps = styled.div`
  display: flex;
  flex-direction: column;
`;
const Bump = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const OTOImage = styled.img`
  object-fit: contain;
  max-width: 300px;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
const CheckBox = styled.input``;
const ProductHeadline = styled.h3`
  font-size: 0.8rem;
`;
const TextContainer = styled.div``;
const OTOText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;
const OTOHeadline = styled.span`
  color: red;
  text-decoration: underline;
  font-weight: 700;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #eee;
  display: block;
  margin: 3% 0;
`;

const OrderBumps: FC = ({}) => {
  const bumpData: Array<BumpProps> = orderBumps;
  return (
    <Bumps>
      {bumpData.map((bump: BumpProps, key: number) => {
        return (
          <Bump key={key}>
            <OTOImage src={bump.imgSrc} alt="product" />
            <CheckBoxContainer color={bump.checkboxColor}>
              <Content>
                <CheckBox type="checkbox" />{" "}
                <ProductHeadline>{bump.checkboxHeadline}</ProductHeadline>
              </Content>
            </CheckBoxContainer>
            <TextContainer>
              <OTOText>
                <OTOHeadline>{bump.otoHeadline}&nbsp;</OTOHeadline>
                {bump.otoText}
              </OTOText>
            </TextContainer>
            <Divider />
          </Bump>
        );
      })}
    </Bumps>
  );
};

export default OrderBumps;
