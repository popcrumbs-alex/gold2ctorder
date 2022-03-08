import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { OtoDATA, OtoOptionProps } from "../../../product/VictoriaProductData";
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
  background-attachment: fixed;
`;

const Header = styled.nav`
  padding: 0.5rem 0;
  background-color: #d748cd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  width: 60%;
  @media screen and (max-width: 760px) {
    width: 95%;
  }
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2.3rem;
  margin: 0.5rem 0;
  text-align: center;
  max-width: 80%;
  & span {
    color: #ffe300;
    font-size: 2rem;
  }
  @media screen and (max-width: 760px) {
    line-height: 1.5;
    text-align: center;
  }
`;

const Subheading = styled.h3`
  color: #fff;
  font-size: 1.6rem;
  max-width: 80%;
  text-align: center;
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
  font-weight: 300;
  line-height: 1.5;
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
  width: 450px;
`;

const Details = styled.ul``;

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

const RoyaltyRingScreen = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(2);

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
          title: "Royalty Ring",
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
              title: "Royalty Ring",
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
        navigate("/victoria/otos/SilverPendant");
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
            <span>New Release!</span>
          </Heading>
        </HeaderContent>
      </Header>
      <Content>
        <Heading style={{ fontWeight: "100" }}>
          Be among the first to stand out with the Royalty Ring for $129.95 Just
          $38
        </Heading>

        <Subheading style={{ fontWeight: "100" }}>
          “The elegance, brilliance made my eyes bug out of my head.” — Lynda
          C., Verified purchase
        </Subheading>

        <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="product" />

        <Heading ref={ref}>
          <span>
            Reg $129.95 <br />
            $38 (Save 71%)
          </span>
        </Heading>

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
        <Text>100% No-Risk Money Back Guarantee</Text>
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
                  nextPage={"/victoria/otos/SilverPendant"}
                  fromOrderPage={false}
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

        <Heading>Your Royalty Ring Includes:</Heading>

        <Details>
          <li>
            <Text>
              ● Oval-cut Lab-Finished diamonds set in a 925 Sterling Silver band
            </Text>
          </li>
          <li>
            <Text>● Free shipping and handling</Text>
          </li>
          <li>
            <Text>● Hypoallergenic and Conflict-Free materials</Text>
          </li>
          <li>
            <Text>● A premium gift box</Text>
          </li>
        </Details>

        <Image
          src="https://images.clickfunnels.com/19/4652adb1bc4d48b785bcad1dc3fc27/Product-11.png"
          alt="product"
        />

        <Subheading style={{ fontStyle: "italic" }}>
          WHY would we do this, you’re probably wondering?
        </Subheading>
        <Text style={{ lineHeight: "1.5" }}>
          Our 4CT studs and Angel Ring are beautiful and elegant… but the
          Royalty Ring is pure, eye-catching extravagance that can take your
          look to an entirely new level.
        </Text>
        <Text style={{ lineHeight: "1.5" }}>
          And when you add the Royalty Ring to your order today, we save on the
          cost of shipping and fulfillment… which means we can pass those
          savings onto you. That’s why we want to give you a chance to add the
          Royalty Ring to your order now… at a greatly reduced and secret price
          that you won’t see anywhere else (and cheaper than we will even sell
          it for on Black Friday).
        </Text>

        <Button onClick={() => scrollToSizes()}>
          I want this ring for $38
        </Button>

        <Text>100% No-Risk Money Back Guarantee</Text>
        <Link
          to="/victoria/otos/SilverPendant"
          color="#eee"
          style={{ color: "#eee" }}
        >
          No Thanks, I Don’t Want to Take My Look to Another Level
        </Link>
        <Subheading style={{ marginTop: "6rem" }}>
          Your No-Risk Guarantee on This One-Time Offer
        </Subheading>
        <Text>
          Your purchase is backed by our 180/60-Day Money Back Guarantee.
        </Text>
        <Text>
          At Luciana Rose Couture, we stand behind the quality of our
          products--so we put all the risk on us. Our [industry-leading - 60 Day
          Money Back Guarantee means either you’re 100% satisfied, or you get a
          full refund of the purchase price of your items. You can place your
          order safely, knowing that absolutely nothing can go wrong.
        </Text>
        <Text>
          Click below and add the Royalty Ring for only $38 + Free Shipping and
          Handling (and an instant $91.95 savings).
        </Text>

        <Button onClick={() => scrollToSizes()}>Claim My Ring</Button>
      </Content>
    </Section>
  );
};

export default RoyaltyRingScreen;
