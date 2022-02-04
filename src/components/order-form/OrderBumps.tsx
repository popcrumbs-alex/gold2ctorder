import React, { Dispatch, FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { BumpProps, orderBumps, SelectedBump } from "../../product/ProductData";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  addBumpInOrder,
  removeBumpFromOrder,
} from "../../redux/reducers/order.reducer";
import { AnyAction } from "redux";

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

const OrderBumps: FC = () => {
  const bumpData: Array<BumpProps> = orderBumps;

  //dispatch for product addition
  const dispatch = useAppDispatch();

  return (
    <Bumps>
      {bumpData.map((bump: BumpProps, key: number) => {
        return (
          <BumpComponent
            bump={bump}
            key={key}
            index={key}
            dispatch={dispatch}
          />
        );
      })}
    </Bumps>
  );
};

const BumpComponent = ({
  index,
  bump,
  dispatch,
}: {
  index: number;
  bump: BumpProps;
  dispatch: Dispatch<AnyAction>;
}) => {
  const [selected, selectItem] = useState<boolean>(index === 1);

  const handleProductAddition = () => {
    const selectedBump: SelectedBump = {
      title: orderBumps[index].orderSummaryText,
      price: orderBumps[index].numPrice,
      displayPrice: orderBumps[index].displayPrice,
      sku: orderBumps[index].sku,
      type: "bump",
      id: orderBumps[index].id,
      isRecurring: orderBumps[index].isRecurring,
    };
    if (selected) {
      dispatch(addBumpInOrder(selectedBump));
    } else {
      dispatch(removeBumpFromOrder(selectedBump));
    }
  };

  const handleProductSelection = (e: React.FormEvent<HTMLInputElement>) =>
    selectItem(e.currentTarget.checked);

  useEffect(() => {
    handleProductAddition();
  }, [selected]);

  return (
    <Bump key={index}>
      <OTOImage src={bump.imgSrc} alt="product" />
      <CheckBoxContainer color={bump.checkboxColor}>
        <Content>
          <CheckBox
            type="checkbox"
            name={bump.otoHeadline}
            value={index}
            defaultChecked={index === 1}
            onChange={handleProductSelection}
          />{" "}
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
};

export default OrderBumps;
