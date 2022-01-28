import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectOrderState } from "../../redux/reducers/order.reducer";
import { CleaveInput, TextInput } from "../../reusable/Inputs";

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: rgb(253, 92, 86);
  color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 0;
  font-weight: 700;
  margin-top: 10px;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: rgb(223, 92, 86);
  }
`;

type CardStateProps = {
  creditCardNum: string;
  expiry: string;
  cvc: string;
};

const CreditCardForm = () => {
  const [cardForm, setCardFormState] = useState<CardStateProps>({
    creditCardNum: "",
    expiry: "",
    cvc: "",
  });

  const orderState = useAppSelector(selectOrderState);

  const { creditCardNum, expiry, cvc } = cardForm;

  const handleCardNumber = (e: React.FormEvent<HTMLInputElement>) =>
    setCardFormState({ ...cardForm, creditCardNum: e.currentTarget.value });

  const handleExpiry = (e: React.FormEvent<HTMLInputElement>) => {
    const removeLetters = new RegExp(/[0-9]|\//, "g");

    //Step1. allow only numbers in input
    const filtered = e.currentTarget.value.match(removeLetters) || [""];
    //Step2. split the input in two with a backslash in the middle
    let tempArr = [];

    tempArr.push(...filtered);

    //this works because state is behind by one.
    //Main issue is when deleting the input(backtracking caused infinite loop of rendering backslash)
    if (tempArr.length == 2 && expiry.length < 2) {
      tempArr.splice(2, 0, "/");
    }
    if (filtered !== undefined && tempArr.length < 6) {
      setCardFormState({ ...cardForm, expiry: tempArr.join("") });
    }
  };

  const handleCVC = (e: React.FormEvent<HTMLInputElement>) =>
    e.currentTarget.value.split("").length < 6 &&
    setCardFormState({ ...cardForm, cvc: e.currentTarget.value });

  const submitOrder = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent
  ) => {
    e.preventDefault();
    console.log("card state", cardForm, orderState.myOrder);
  };

  console.log("cards", cardForm);
  return (
    <Container onSubmit={(e) => submitOrder(e)}>
      <Row>
        <CleaveInput
          label="Credit Card Number*"
          placeholder="Card Number"
          isRequired={true}
          value={creditCardNum}
          callback={handleCardNumber}
          name="creditCardNumber"
        />
      </Row>
      <Grid>
        <Column>
          <TextInput
            label="Expiry*"
            placeholder="MM/YY"
            type="text"
            isRequired={true}
            value={expiry}
            callback={handleExpiry}
            name="expiry"
          />
        </Column>
        <Column>
          <TextInput
            label="CVC Code*"
            placeholder="123"
            type="text"
            isRequired={true}
            value={cvc}
            callback={handleCVC}
            name="cvc"
          />
        </Column>
      </Grid>
      <Button onSubmit={(e) => submitOrder(e)}>
        Submit My Order For RUSH Shipping
      </Button>
    </Container>
  );
};

export default CreditCardForm;
