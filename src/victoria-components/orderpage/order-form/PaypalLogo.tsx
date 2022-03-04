import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px solid #eee;
  padding: 0.5rem 1rem;
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

const ImageContainer = styled.div`
  max-width: 200px;
  & img {
    object-fit: contain;
    width: 100%;
  }
`;

const PaypalLogo = ({
  toggle,
  isSelected,
}: {
  toggle: Dispatch<SetStateAction<"paypal" | "credit">>;
  isSelected: "paypal" | "credit";
}) => {
  return (
    <Row>
      <Toggler
        onClick={() => toggle("paypal")}
        color={isSelected === "paypal" ? "dodgerblue" : "#eee"}
        style={{
          border: isSelected === "paypal" ? "2px solid #eee" : "2px solid #222",
        }}
      />

      <ImageContainer>
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
          alt="PayPal Logo"
        />
      </ImageContainer>
    </Row>
  );
};

PaypalLogo.propTypes = {};

export default PaypalLogo;
