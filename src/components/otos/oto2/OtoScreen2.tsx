import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { OtoDATA, OtoOptionProps } from "../../../product/ProductData";
import { Link, navigate } from "gatsby";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addOtoToOrder } from "../../../redux/reducers/order.reducer";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../../graphql/mutations/order.mutation";
import { setAlert } from "../../../redux/reducers/alert.reducer";
import LoadingSpinner from "../../loading/LoadingSpinner";
import { StaticImage } from "gatsby-plugin-image";
import { EF_TRACK_UPSELL } from "../../../graphql/mutations/everflow.mutations";
import { InputSelector } from "../../../reusable/Inputs";
import Paypal from "../../orderpage/order-form/Paypal";

declare const window: any;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("https://images.clickfunnels.com/45/9bc61133b2473faad938e2a581fe65/Dark-BG-2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Header = styled.nav`
  padding: 0.5rem 0;
  background-color: #d748cd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 760px) {
    width:90%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  @media screen and (max-width: 760px) {
    width: 95%;
  }
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  & span {
    color: #ffe300;
  }
  @media screen and (max-width: 760px) {
    line-height: 1.5;
    text-align: center;
  }
`;

const Subheading = styled.h3`
  color: #fff;
  @media screen and (max-width: 760px) {
    text-align: center;
  }
`;

const ContinueBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  color: #fff;
  text-align: center;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 1rem 2rem;
  color: #d748cd;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #d748cd;
  border-radius: 120px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  margin-top: 1rem;
  & span {
    color: #999;
    font-weight: 300;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #d748cd;
    color: #fff;
  }
`;

const Image = styled.img`
  max-width: 350px;
`;

const Divider = styled.div`
  display: block;
  height: 1.2px;
  width: 80%;
  background-color: #999;
`;

const AddSizebutton = styled.button`
  border-radius: 120px;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #222;
  }
`;

const ToggleButton = styled.button`
  border-radius: 120px;
  border: 2px solid #d748cd33;
  background-color: #d748cd;
  color: #fff;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  margin: 3rem 0 0 0;
  &:hover {
    cursor: pointer;
    background-color: #d748cd99;
    color: #fff;
  }
`;

const ImageContainer = styled.div`
  transition: all 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const OtoScreen2 = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(1);

  const [ringGuideVisibility, toggleVisibility] = useState<boolean>(false);

  const [ringSizeSelected, selectRingSize] = useState<string>("");

  const [ringOptionSelected, selectRingOption] = useState<OtoOptionProps>(null);

  const [orderType, setOrderType] = useState<"paypal" | "credit" | "">(
    "credit"
  );
  //ref needed to scroll to top
  const ref = useRef(null);

  //this will exist within poptracker links only
  const aff_id =
    typeof window !== "undefined" && window.localStorage.getItem("ef_aff_id");

  const dispatch = useAppDispatch();

  const [updateOrder, { error, data, loading }] = useMutation(UPDATE_ORDER);

  const [trackUpsell] = useMutation(EF_TRACK_UPSELL);

  const scrollToSizes = () =>
    ref?.current.scrollIntoView({ top: 0, behavior: "smooth" });

  const handleSelectRingSize = (e: React.FormEvent<HTMLSelectElement>) => {
    const foundOption = OtoDATA[currentOtoIndex].options.filter(
      (option: OtoOptionProps) => option.name === e.currentTarget.value
    );
    console.log("option", foundOption[0], orderType);
    //set local state for text based ring size
    selectRingSize(e.currentTarget.value);
    //set the option selection in storage
    selectRingOption(foundOption[0]);
  };

  const handleAddOTOToOrder = async (oto: OtoOptionProps) => {
    const currentOrderId = localStorage.getItem("order_id");
    try {
      dispatch(
        addOtoToOrder({
          price: oto.numPrice,
          title: "Eternity Band",
          type: oto.type,
          isRecurring: false,
          id: oto.id,
          displayPrice: oto.displayPrice,
          sku: oto.sku,
        })
      );

      const request = await updateOrder({
        variables: {
          updateOrderInput: {
            product: {
              displayPrice: oto.displayPrice,
              price: oto.numPrice,
              title: "Eternity Band",
              sku: oto.sku,
              isRecurring: false,
              type: oto.type,
              id: oto.id,
            },
            orderId: currentOrderId,
          },
        },
      });
      //submit ef tracking endpoint
      if (aff_id !== "") {
        trackUpsell({
          variables: {
            everflowOrderInput: {
              aff_id: aff_id,
              amount: OtoDATA[currentOtoIndex].numPrice,
            },
          },
        });
        console.log("everflow_tracking_:", aff_id);
      }

      if (window.fbq) {
        window.fbq("track", "AddToCart", {
          currency: "USD",
          value: oto.numPrice,
        });
      }

      console.log("request!", request);
      if (request.data.updateOrder.success) {
        navigate("/otos/Oto3");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlert({ message: error.message, type: "danger" }));
    }
  }, [error]);

  //order type is imperrative for determining checkout process button
  useEffect(() => {
    if (typeof window !== "undefined") {
      //only set type if params are set and not empty
      if (window.localStorage.getItem("orderType") !== null) {
        setOrderType(window.localStorage.getItem("orderType"));
      } else setOrderType("credit");
    }
  }, []);

  if (loading) {
    return (
      <Section>
        <Content style={{ minHeight: "100vh", justifyContent: "center" }}>
          <Heading>Processing...</Heading>
          <LoadingSpinner />
        </Content>
      </Section>
    );
  }
  return (
    <Section>
      <Header>
        <HeaderContent>
          <Heading>
            <span>Congratulations! 🎉</span>
            <br /> You've Just Unlocked Wholesale Pricing On Some Of Our Best
            Items, Please Consider Adding These
            <span>Heavily Discounted Items</span> To Your Order Now As They Will
            Never Be Offered At This <span>Low a Price</span> Again.💎
          </Heading>
        </HeaderContent>
      </Header>
      <Content>
        <Heading>
          Add This Everlasting Eternity Band At a<br />
          <span> HUGE Discount %</span>
        </Heading>

        <Subheading>
          14K White Gold Vermeil Filled With Our Signature Lab Finished Stones
        </Subheading>
        <Divider />

        <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="product" />

        <Heading>
          <span> New Reduced Price $38</span>
        </Heading>
        <Subheading ref={ref}>(Originally $129.95)</Subheading>

        <InputSelector
          label="Select A Ring Size"
          options={OtoDATA[currentOtoIndex].options}
          name="ringSizeSelected"
          value={ringSizeSelected}
          callback={handleSelectRingSize}
          placeholder="Select a ring size"
          isRequired={true}
          type="select"
          labelStyle={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "2rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
          inputStyle={{ width: "400px" }}
        />
        {ringSizeSelected &&
          {
            credit: (
              <AddSizebutton
                onClick={() => handleAddOTOToOrder(ringOptionSelected)}
              >
                Yes I want the {OtoDATA[currentOtoIndex].title} in size{" "}
                {ringOptionSelected.name}
              </AddSizebutton>
            ),
            paypal: (
              <ContinueBox>
                <Text>Continue With Paypal</Text>
                <Paypal
                  orderTotal={ringOptionSelected.numPrice}
                  nextPage={"/otos/Oto3"}
                  items={[
                    {
                      price: ringOptionSelected.numPrice,
                      title: `${OtoDATA[currentOtoIndex].title} size:${ringOptionSelected.name}`,
                      isRecurring: false,
                      sku: ringOptionSelected.sku,
                      id: ringOptionSelected.id,
                      type: "OTO",
                      displayPrice: ringOptionSelected.displayPrice,
                    },
                  ]}
                />
              </ContinueBox>
            ),
          }[orderType]}

        <ToggleButton onClick={() => toggleVisibility(!ringGuideVisibility)}>
          Don't know your ring size? Click here to find out
        </ToggleButton>

        {ringGuideVisibility ? (
          <ImageContainer style={{ maxHeight: "160vh" }}>
            <StaticImage
              src="../../../images/ring-size-guide-FINAL.png"
              alt="ring size guide"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{ width: "100%", borderRadius: "5px" }}
              width={600}
              style={{
                boxShadow: "0 1px 20px #222",
                borderRadius: "5px",
                border: "4px solid #333",
              }}
            />
          </ImageContainer>
        ) : (
          <ImageContainer style={{ maxHeight: "0vh" }}></ImageContainer>
        )}

        <Heading>
          Add Our Angel Infinity Ring For <span>Only $38</span>
        </Heading>

        <Subheading>
          Made with 100% .925 Sterling Silver coated in 14K White Gold
        </Subheading>

        <Image
          src="https://images.clickfunnels.com/29/8e14b490ab4423a7e6905c7732b32e/Product-1.jpg"
          alt="product"
        />

        <Button onClick={() => scrollToSizes()}>
          I want this ring for $38
        </Button>

        <Link to="/otos/Oto3" color="#eee" style={{ color: "#eee" }}>
          No thanks I don't need this now
        </Link>
      </Content>
    </Section>
  );
};

export default OtoScreen2;
