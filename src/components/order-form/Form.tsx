import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FC } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { useContext } from "react";
import { ThemeContext } from "../../pages";
import { Theme } from "../../constants/Colors";
import { Select, TextInput } from "../../reusable/Inputs";
import states from "../../reusable/states";
import OrderBumps from "./OrderBumps";
import ProductSelector from "./ProductSelector";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  updateContactInfo,
  updateShippingInfo,
} from "../../redux/reducers/order.reducer";
import OrderSummary from "./OrderSummary";
import SecureOrder from "./SecureOrder";
import CreditCardForm from "./CreditCardForm";
import { selectAlert } from "../../redux/reducers/alert.reducer";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  background: #eee;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
  }
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  padding: 1rem 0;
`;
const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  margin: 0.5rem 0;
  color: #222;
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
  font-size: 1.5rem;
`;
const FormSubHeading = styled.h4`
  font-weight: 300;
  color: #666;
  margin-bottom: 0;
`;
const FormContainer = styled.div`
  background: #fff;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 1px 20px #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    width: auto;
  }
`;
const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #eee;
  display: block;
  margin: 3% 0;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 760px) {
    flex-wrap: wrap;
  }
`;

const Text = styled.p`
  color: #666;
  font-size: 0.9rem;
  & span {
    font-weight: 700;
    color: #222;
  }
`;

const SmallHeading = styled.h3`
  font-weight: 300;
  text-align: center;
  margin: 0.4rem 0;
`;

type ContactState = {
  firstName: string;
  lastName: string;
  email: string;
};

type ContactProp = {
  name: string;
  value: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  type: string;
};

type ShippingState = {
  address: string;
  city: string;
  state: string;
  zip: string;
};

const Form: FC = () => {
  const context = useContext<Theme>(ThemeContext);
  //actions
  const dispatch = useAppDispatch();

  const alertState = useAppSelector(selectAlert);

  //ref needed to scroll to when an error occurs in the form fields
  const sectionRef = useRef(null);

  //combine data across components
  const [customerData, combineData] = useState<ContactState & ShippingState>({
    firstName: "",
    lastName: "",
    email: "",
    zip: "",
    city: "",
    state: "",
    address: "",
  });

  const { firstName, lastName, email, zip, city, state, address } =
    customerData;

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    combineData({
      ...customerData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  //update redux store for contact info
  useEffect(() => {
    dispatch(updateContactInfo({ firstName, lastName, email }));
  }, [firstName, lastName, email]);

  //update redux store for shipping info
  useEffect(() => {
    dispatch(updateShippingInfo({ zip, city, state, address }));
  }, [zip, city, state, address]);

  //scroll to errors in form fields!
  //TODO set an alert for when user possibly misspells email
  useEffect(() => {
    if (alertState.localAlertNames.length > 0 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
    }
  }, [alertState.localAlertNames, sectionRef]);
  return (
    <Container ref={sectionRef}>
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
          </Column>
        </Row>
        <Row>
          <Column>
            <ColumnContent>
              <FormContainer>
                <ContactInfo
                  customerData={customerData}
                  handleInputChange={handleInputChange}
                />
                <ShippingAddress
                  customerData={customerData}
                  handleInputChange={handleInputChange}
                />
                <Security>
                  <Heading style={{ fontSize: "1.2rem" }}>
                    Today’s purchase is 100% risk-free to you
                  </Heading>
                  <Text style={{ textAlign: "center", color: "#666" }}>
                    We wholeheartedly believe in the quality of our products and
                    want to take all the risk off you. Just contact us within 90
                    days if you’re not satisfied. Simply return your unwanted
                    products and we’ll immediately apply a refund to your
                    account!
                  </Text>
                  <StaticImage
                    src="../../images/Shield_guarant.png"
                    alt="guarantee"
                    placeholder="blurred"
                    objectFit="contain"
                    imgStyle={{ width: "250px" }}
                    width={250}
                  />
                </Security>
              </FormContainer>
            </ColumnContent>
          </Column>
          <Column>
            <ColumnContent>
              <FormContainer>
                {/* Component of order bumps, dynamically rendered */}
                <OrderBumpComponent />
                {/* Small shipping text section */}
                <SmallHeading>Why Do We Ask For Shipping?</SmallHeading>
                <Text style={{ textAlign: "center" }}>
                  We offer <span>one pair for free</span> but do require you to
                  <span>cover the cost to pick, pack & ship</span> your item.{" "}
                  <span>
                    We are a US based company that takes care of its employees
                  </span>
                  , the small S/H fee allows us to cover their costs while
                  sharing our best pieces at a below market cost to you. Rest
                  assured your purchase today is safe.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    We know we must do right here to earn your future business.
                  </span>
                </Text>
                <Divider />
                {/* Main product only one per order select */}
                <ProductSelector />
                <Divider />
                {/*  array of selected products */}
                <OrderSummary />
                {/* small text section */}
                <Divider />
                <SecureOrder />
                {/* credit card form */}
                <CreditCardForm />
              </FormContainer>
            </ColumnContent>
          </Column>
        </Row>
      </Content>
    </Container>
  );
};

const ContactInfo = ({
  customerData,
  handleInputChange,
}: {
  handleInputChange: (
    val: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => any;
} & {
  customerData: ContactState & ShippingState;
}) => {
  const { firstName, lastName, email } = customerData;

  const DATA: Array<{
    name: string;
    value: string;
    placeholder: string;
    label: string;
    isRequired: boolean;
    type: string;
  }> = [
    {
      name: "firstName",
      value: firstName,
      placeholder: "First Name",
      label: "Enter Your First Name",
      type: "text",
      isRequired: true,
    },
    {
      name: "lastName",
      value: lastName,
      placeholder: "Enter Your Last Name",
      label: "Last Name",
      type: "text",
      isRequired: true,
    },
    {
      name: "email",
      value: email,
      placeholder: "Email Address...",
      label: "Email Address",
      type: "email",
      isRequired: true,
    },
  ];

  return (
    <FormColumn>
      <FormHeading>Tell Us Where To RUSH Ship Your Order Via USPS</FormHeading>
      <FormSubHeading>Step #1: Contact Information</FormSubHeading>
      <Divider />
      <InputSection>
        {DATA.map((input: ContactProp, key: number) => {
          return (
            <TextInput
              name={input.name}
              key={key}
              value={input.value}
              callback={handleInputChange}
              label={input.label}
              type={input.type}
              isRequired={input.isRequired}
              placeholder={input.placeholder}
            />
          );
        })}
      </InputSection>
    </FormColumn>
  );
};

const ShippingAddress = ({
  customerData,
  handleInputChange,
}: {
  handleInputChange: (
    val: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => any;
} & {
  customerData: ContactState & ShippingState;
}) => {
  const { address, city, state, zip } = customerData;

  const DATA: Array<ContactProp> = [
    {
      name: "address",
      label: "Full Address",
      placeholder: "Full Address...",
      isRequired: true,
      type: "text",
      value: address,
    },
    {
      name: "city",
      label: "City name",
      placeholder: "City Name...",
      isRequired: true,
      type: "text",
      value: city,
    },
    {
      name: "state",
      label: "Select State",
      placeholder: "Select State",
      isRequired: true,
      type: "select",
      value: state,
    },
    {
      name: "zip",
      label: "Zip Code",
      placeholder: "Zip Code...",
      isRequired: true,
      type: "text",
      value: zip,
    },
  ];

  return (
    <FormColumn>
      <FormSubHeading>Step #2: Shipping Address</FormSubHeading>
      <Divider />
      <InputSection>
        {DATA.map((input: ContactProp, key: number) => {
          return (
            <Fragment key={key}>
              {input.type === "text" && input.name !== "zip" && (
                <TextInput
                  name={input.name}
                  value={input.value}
                  callback={handleInputChange}
                  label={input.label}
                  type={input.type}
                  isRequired={input.isRequired}
                  placeholder={input.placeholder}
                />
              )}
            </Fragment>
          );
        })}
        <InputRow>
          <div style={{ marginRight: "20px", flex: 1 }}>
            <Select
              name={DATA[2].name}
              value={DATA[2].value}
              callback={handleInputChange}
              label={DATA[2].label}
              type={DATA[2].type}
              isRequired={DATA[2].isRequired}
              placeholder={DATA[2].placeholder}
              options={states}
            />
          </div>

          <TextInput
            name={DATA[3].name}
            value={DATA[3].value}
            callback={handleInputChange}
            label={DATA[3].label}
            type={DATA[3].type}
            isRequired={DATA[3].isRequired}
            placeholder={DATA[3].placeholder}
          />
        </InputRow>
      </InputSection>
    </FormColumn>
  );
};

const OrderBumpComponent = () => {
  return (
    <FormColumn>
      <FormHeading style={{ fontSize: "1.3rem", textAlign: "center" }}>
        Before We Finalize Your FREE Earring Offer, Check Out These
        Complementary Pieces at a HUGE Discount 🔥🛒
      </FormHeading>
      <Divider />
      <OrderBumps />
    </FormColumn>
  );
};

export default Form;
