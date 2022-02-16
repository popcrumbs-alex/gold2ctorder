import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaCreditCard } from "react-icons/fa";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-top: 0.5px solid #eee;
  padding: 1rem 1rem;
`;

const Toggler = styled.button`
  margin-right: 1rem;
  background-color: ${(props) => props.color};
  border-radius: 100%;
  height: 1rem;
  width: 1rem;
  border: 2px solid #222;
  transition: all 0.3s ease-in-out;
`;

const Text = styled.span`
  font-weight: 600;
  margin: 0;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const SelectCreditCard = ({
  toggle,
  isSelected,
}: {
  toggle: Dispatch<SetStateAction<"paypal" | "credit">>;
  isSelected: "paypal" | "credit";
}) => {
  return (
    <Row>
      <Toggler
        onClick={() => toggle("credit")}
        color={isSelected === "credit" ? "dodgerblue" : "#eee"}
        style={{
          border: isSelected === "credit" ? "2px solid #eee" : "2px solid #222",
        }}
      />
      <FaCreditCard color="#222" size={20} />
      <Text>Credit Card</Text>
    </Row>
  );
};

export default SelectCreditCard;
