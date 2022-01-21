import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FC } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { useContext } from "react";
import { ThemeContext } from "../../pages";
import { Theme } from "../../constants/Colors";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  background: #eee;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColumnContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const Security = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.color ? props.color : "inherit")};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  padding: 1rem;
`;
const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  margin: 0.5rem 0;
  color: #fff;
`;
const SubHeading = styled.h2`
  font-weight: 100;
  font-size: 1.2rem;
  color: #22222277;
  margin: 0.5rem 0;
  text-align: center;
`;

const FormHeading = styled.h3`
  font-weight: 300;
`;

const FormContainer = styled.div`
  background: #fff;
  width: 100%;
  padding: 1rem;
`;

const Form: FC = () => {
  const context = useContext<Theme>(ThemeContext);
  return (
    <Container>
      <Content>
        <Row>
          <Column>
            <ColumnContent>
              <Security color={context.main}>
                <Heading>Secure Order Form</Heading>
                <SubHeading>
                  Protected by Secure 256-Bit SSL Technology
                </SubHeading>
                <StaticImage
                  src="../../images/secure.png"
                  alt="secure"
                  placeholder="blurred"
                  objectFit="contain"
                  imgStyle={{ width: "250px" }}
                  width={250}
                />
              </Security>
            </ColumnContent>
            <ColumnContent>
              <ContactInfo />
            </ColumnContent>
          </Column>
        </Row>
      </Content>
    </Container>
  );
};

const ContactInfo = () => {
  return (
    <FormContainer>
      <FormHeading>Tell Us Where To RUSH Ship Your Order Via USPS</FormHeading>
    </FormContainer>
  );
};

Form.propTypes = {};

export default Form;
