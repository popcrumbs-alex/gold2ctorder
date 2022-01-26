import React from "react";
import styled from "styled-components";
import { TextInput } from "../../reusable/Inputs";

const Container = styled.div`
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

const Button = styled.button``;

const CreditCardForm = () => {
  return (
    <Container>
      <Row>
        <TextInput
          label="Credit Card Number*"
          placeholder="Card Number"
          type="text"
          isRequired={true}
          value={null}
          callback={null}
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
            value={null}
            callback={null}
            name="expiry"
          />
        </Column>
        <Column>
          <TextInput
            label="CVC Code*"
            placeholder="123"
            type="text"
            isRequired={true}
            value={null}
            callback={null}
            name="cvc"
          />
        </Column>
      </Grid>
      <Button>Submit My Order For RUSH Shipping</Button>
    </Container>
  );
};

export default CreditCardForm;
