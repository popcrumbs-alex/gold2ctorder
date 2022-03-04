import React, { ReactElement, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Video from "../../../reusable/Video";
import {
  FaGift,
  FaShippingFast,
  FaShoppingCart,
  FaUserShield,
} from "react-icons/fa";
import { GiCutDiamond, GiWorld } from "react-icons/gi";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { setAlert } from "../../../redux/reducers/alert.reducer";
import { OtoDATA } from "../../../product/ProductData";
import {
  addOtoToOrder,
  selectOrderState,
} from "../../../redux/reducers/order.reducer";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { UPDATE_ORDER } from "../../../graphql/mutations/order.mutation";
import { EF_TRACK_UPSELL } from "../../../graphql/mutations/everflow.mutations";
import PaymentProcessorSelect from "../../../reusable/PaymentProcessorSelect";
import LoadingSpinner from "../../loading/LoadingSpinner";

const move = keyframes`
0% {
    max-width:70%;
}
50% {
    max-width:90%;
}
75% {
    max-width:80%;
}
100% {
    max-width:60%;
}`;

const Section = styled.section`
  background-image: url("https://images.clickfunnels.com/d4/7756054ba3416282eceb6b25834cb0/Hero-Banner-OTO-9-1-.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTwo = styled.section`
  background-image: url("https://images.clickfunnels.com/81/2084b42da64d4880a247021a7f3c50/OTO-9-Sec-2-BG.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;

const SectionThree = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;
const SectionFour = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  background-color: rgba(215, 72, 205, 0.08);
`;

const SectionFive = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: ${(props) => props.color};
  padding: 2rem;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 5px;
  padding: 1rem 0;
  box-shadow: 0 0 0 4px #ffffff90;
`;

const ProgressContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d748cd;
  animation: ${move} 10s linear infinite;
  z-index: 0;
  border-radius: 5px;
`;

const ProgressText = styled.p`
  color: #fff;
  position: relative;
  z-index: 1;
  font-weight: 700;
`;

const HeadingTwo = styled.h2`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 1.5rem;
`;

const Heading = styled.h1`
  font-weight: 100;
  text-align: center;
  max-width: 60%;
  line-height: 1.5;
  margin: 0.2rem 0;
  font-size: 2rem;
  color: ${(props) => props.color};
`;

const Testimonial = styled.p`
  font-style: italic;
  font-weight: 100;
  text-align: center;
  max-width: 60%;
  line-height: 1.5;
  & span {
    font-weight: 700;
  }
`;

const VideoContainer = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 0 0 4px #ffffff90;
`;

const Pricing = styled.p`
  text-align: center;
  font-size: 1.4rem;
  margin: 2rem 0;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  background-color: #d748cd;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #d748cd90;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  text-align: center;
  line-height: 1.5;
  font-size: 1.2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  max-width: 400px;
`;

const OtoFourScreen = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(4);

  //everflow id being passed by url params and stored in storage on the order page
  //window check for buildtime since not available until successful build
  const aff_id =
    typeof window !== "undefined" && window.localStorage.getItem("ef_aff_id");

  //dispatching redux state actions
  const dispatch = useAppDispatch();

  //current order state at this point in order flow
  const orderState = useAppSelector(selectOrderState);

  //determine what payment processor to be used if user previously used credit or paypal
  const [orderType, setOrderType] = useState<"paypal" | "credit" | "" | string>(
    ""
  );

  //graphql mutation for adding oto product to order
  //only needed if payment was credit card
  const [updateOrder, { error, loading }] = useMutation(UPDATE_ORDER);

  //Everflow tracking api endpoint
  const [trackUpsell] = useMutation(EF_TRACK_UPSELL);

  //handle the order update in local redux state
  //send mutation to graphql endpoint for order update
  //handle everflow tracking via mutation to gql endpoint
  const handleAddOTOToOrder = async (selectedIndex: number) => {
    const currentOrderId = localStorage.getItem("order_id");

    const selectedProduct = {
      price: OtoDATA[selectedIndex].numPrice,
      title: OtoDATA[selectedIndex].title,
      type: "OTO",
      isRecurring: false,
      id: OtoDATA[selectedIndex].id,
      displayPrice: OtoDATA[selectedIndex].displayPrice,
      sku: OtoDATA[selectedIndex].sku,
    };

    try {
      dispatch(
        addOtoToOrder({
          ...selectedProduct,
        })
      );

      const request = await updateOrder({
        variables: {
          updateOrderInput: {
            product: {
              ...selectedProduct,
            },
            orderId: currentOrderId,
          },
        },
      });

      //pass revenue to oto
      if (aff_id !== "") {
        trackUpsell({
          variables: {
            everflowOrderInput: {
              aff_id: aff_id,
              amount: OtoDATA[selectedIndex].numPrice,
            },
          },
        });
      }
      console.log("request!", request);
      if (request.data.updateOrder.success) {
        navigate("/Thankyou");
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

  //getting an order type is required for loading specific checkout buttons
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
        <Content
          style={{
            minHeight: "100vh",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Heading>Processing...</Heading>
          <LoadingSpinner />
        </Content>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Content color="rgba(232, 228, 227, 0.72)">
          <ProgressBar>
            <ProgressContent />
            <ProgressText>Don't Miss This One Time Offer</ProgressText>
          </ProgressBar>
          <HeadingTwo color="#d748cd">
            Wow, that was a lot of offers!
          </HeadingTwo>
          <Heading>
            As a thank you for sticking with us, add the Victoria Lab ‘Diamond’
            Earrings for
            <br />
            <span style={{ textDecoration: "line-through" }}>$29.95</span>
            {` `}
            <span style={{ fontWeight: "700", color: "#d748cd" }}>
              Just $16
            </span>
          </Heading>
          <Testimonial>
            “They sparkle just like diamonds. This is my second pair that I have
            bought and I will continue to buy from Luciana Rose Couture.”
            <br />
            <span>- Nancy A. Verified purchase</span>
          </Testimonial>
          <VideoContainer>
            <Video
              videoSrcURL={`https://cdn.shopify.com/videos/c/vp/d97d88897caa47baa9cee1b5c4575037/d97d88897caa47baa9cee1b5c4575037.HD-1080p-7.2Mbps.mp4`}
              videoTitle="Earrings"
            />
          </VideoContainer>
          <Pricing>
            Reg <span style={{ textDecoration: "line-through" }}>$29.95</span>{" "}
            <br />
            <span style={{ fontWeight: "700", color: "#d748cd" }}>
              $16 (Save 47%)
            </span>
          </Pricing>

          <PaymentProcessorSelect
            orderType={orderType}
            items={[
              {
                id: OtoDATA[currentOtoIndex].id,
                displayPrice: OtoDATA[currentOtoIndex].displayPrice,
                sku: OtoDATA[currentOtoIndex].sku,
                title: OtoDATA[currentOtoIndex].title,
                type: "OTO",
                price: OtoDATA[currentOtoIndex].numPrice,
                isRecurring: false,
              },
            ]}
            cartButton={
              <AddToCartButton
                onClick={() => handleAddOTOToOrder(currentOtoIndex)}
              >
                <FaShoppingCart
                  size={30}
                  color="#fff"
                  style={{ marginRight: "1rem" }}
                />
                add to my order
              </AddToCartButton>
            }
            orderTotal={OtoDATA[currentOtoIndex].numPrice}
            nextPage="/Thankyou"
          />

          <Text color="#999">100% No-Risk Money Back Guarantee</Text>
          <Link to="/Thankyou" style={{ margin: "2rem 0" }}>
            No Thanks, I Don’t Want The ‘Thanks For Sticking With Us’ Offer
          </Link>
        </Content>
      </Section>
      <SectionTwo>
        <Heading color="#fff" style={{ fontWeight: "700" }}>
          Your Victoria Studs Include:
        </Heading>
        <IconGrid />
      </SectionTwo>
      <SectionThree>
        <Content>
          <Heading style={{ fontWeight: "700" }}>
            WHY would we do this, you’re probably wondering?
          </Heading>
          <Text color="#777">
            We get it, that was a lot of offers. And even though they were
            one-time deals on quality products at amazing prices -- it’s a bit
            overwhelming, right? As a thank you for sticking with us, enjoy the
            <strong style={{ color: "#d748cd" }}>Victoria Earrings</strong> at
            an amazing discount. These have sold out 3x this year, and they’re
            finally back in stock.
          </Text>
          <Text color="#777">
            And when you add the Victoria Earrings to your order today, we save
            on the cost of shipping and fulfillment… which means we can pass
            those savings onto you.
          </Text>
          <Text color="#777">
            That’s why we want to give you a chance to add the Victoria Earrings
            to your order now… at a greatly reduced and secret price that you
            won’t see anywhere else{" "}
            <strong style={{ color: "#d748cd" }}>
              (and cheaper than we will even sell it for on Black Friday).
            </strong>
          </Text>
          <ImageContainer>
            <StaticImage
              src="../../../images/victoria-girl.png"
              alt="girl"
              placeholder="blurred"
              imgStyle={{ width: "100%" }}
            />
          </ImageContainer>

          {/* handle different buttons for payment */}
          <PaymentProcessorSelect
            orderType={orderType}
            items={[
              {
                id: OtoDATA[currentOtoIndex].id,
                displayPrice: OtoDATA[currentOtoIndex].displayPrice,
                sku: OtoDATA[currentOtoIndex].sku,
                title: OtoDATA[currentOtoIndex].title,
                type: "OTO",
                price: OtoDATA[currentOtoIndex].numPrice,
                isRecurring: false,
              },
            ]}
            cartButton={
              <AddToCartButton
                onClick={() => handleAddOTOToOrder(currentOtoIndex)}
              >
                <FaShoppingCart
                  size={30}
                  color="#fff"
                  style={{ marginRight: "1rem" }}
                />
                ADD TO MY ORDER (Just $16)
              </AddToCartButton>
            }
            orderTotal={OtoDATA[currentOtoIndex].numPrice}
            nextPage="/Thankyou"
          />

          <Text>100% No-Risk Money Back Guarantee</Text>
          <Link to="/Thankyou">
            No Thanks, I Don’t Want The ‘Thanks For Sticking With Us’ Offer
          </Link>
        </Content>
      </SectionThree>
      <SectionFour>
        <Content>
          <Heading style={{ fontWeight: "700", maxWidth: "80%" }}>
            Your No-Risk Guarantee on This One-Time Offer
          </Heading>
          <HeadingTwo>
            Your purchase is backed by our 90-Day Money Back Guarantee.
          </HeadingTwo>
          <Text>
            At Luciana Rose Couture, we stand behind the quality of our
            products--so we put all the risk on us. Our{" "}
            <strong style={{ color: "#d748cd" }}>
              90 Day Money Back Guarantee
            </strong>{" "}
            means either you’re 100% satisfied, or you get a full refund of the
            purchase price of your items. You can place your order safely,
            knowing that absolutely nothing can go wrong.
          </Text>
          <Text>
            Click below and add the Princess Diana Studs for only $39 + Free
            Shipping and Handling (and an instant $100.95 savings).
          </Text>
          <PaymentProcessorSelect
            orderType={orderType}
            items={[
              {
                id: OtoDATA[currentOtoIndex].id,
                displayPrice: OtoDATA[currentOtoIndex].displayPrice,
                sku: OtoDATA[currentOtoIndex].sku,
                title: OtoDATA[currentOtoIndex].title,
                type: "OTO",
                price: OtoDATA[currentOtoIndex].numPrice,
                isRecurring: false,
              },
            ]}
            cartButton={
              <AddToCartButton
                onClick={() => handleAddOTOToOrder(currentOtoIndex)}
              >
                <FaShoppingCart
                  size={30}
                  color="#fff"
                  style={{ marginRight: "1rem" }}
                />
                ADD TO MY ORDER (Just $16)
              </AddToCartButton>
            }
            orderTotal={OtoDATA[currentOtoIndex].numPrice}
            nextPage="/Thankyou"
          />
          <Text>100% No-Risk Money Back Guarantee</Text>
          <Link to="/Thankyou">
            No Thanks, I Don’t Want The ‘Thanks For Sticking With Us’ Offer
          </Link>
        </Content>
      </SectionFour>
      <SectionFive>
        <Content>
          <Heading style={{ fontWeight: "700", maxWidth: "90%" }}>
            See what people are saying about the Victoria Earrings🤩
          </Heading>
          <ImageContainer style={{ maxWidth: "200px", margin: "2rem 0" }}>
            <StaticImage
              src="../../../images/5-stars.png"
              alt="stars"
              imgStyle={{ maxWidth: "100%" }}
            />
          </ImageContainer>
          <HeadingTwo>Based on 52 Reviews</HeadingTwo>
          <div
            id="looxReviews"
            data-product-id="4362661134436"
            style={{ width: "100%" }}
          ></div>

          <PaymentProcessorSelect
            orderType={orderType}
            items={[
              {
                id: OtoDATA[currentOtoIndex].id,
                displayPrice: OtoDATA[currentOtoIndex].displayPrice,
                sku: OtoDATA[currentOtoIndex].sku,
                title: OtoDATA[currentOtoIndex].title,
                type: "OTO",
                price: OtoDATA[currentOtoIndex].numPrice,
                isRecurring: false,
              },
            ]}
            cartButton={
              <AddToCartButton
                onClick={() => handleAddOTOToOrder(currentOtoIndex)}
              >
                <FaShoppingCart
                  size={30}
                  color="#fff"
                  style={{ marginRight: "1rem" }}
                />
                ADD TO MY ORDER (Just $16)
              </AddToCartButton>
            }
            orderTotal={OtoDATA[currentOtoIndex].numPrice}
            nextPage="/Thankyou"
          />
          <Text>100% No-Risk Money Back Guarantee</Text>
          <Link to="/Thankyou">
            No Thanks, I Don’t Want The ‘Thanks For Sticking With Us’ Offer
          </Link>
        </Content>
      </SectionFive>
    </>
  );
};

const IconGridComp = styled.div`
  margin: 2rem 0;
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #eee;
  border-radius: 900px;
  width: 100px;
  height: 100px;
`;

const IconGrid = () => {
  const DATA = [
    {
      icon: <FaShippingFast color="#d748cd" size={40} />,
      text: "Free shipping and handling",
    },
    {
      icon: <GiCutDiamond color="#d748cd" size={40} />,
      text: "1 CT 995 Sterling Silver circle studs",
    },
    {
      icon: <FaGift color="#d748cd" size={40} />,
      text: "A premium gift box",
    },
    {
      icon: <GiWorld color="#d748cd" size={40} />,
      text: "Hypoallergenic and Conflict-Free materials",
    },
    {
      icon: <FaUserShield color="#d748cd" size={40} />,
      text: "Our no-risk 100% Money Back Guarantee",
    },
  ];
  return (
    <IconGridComp>
      {DATA.map((item: { icon: ReactElement; text: string }, key: number) => {
        return (
          <Column key={key}>
            <IconContainer>{item.icon}</IconContainer>
            <Text
              color="#fff"
              style={{ fontWeight: "700", maxWidth: "70%", lineHeight: "1.5" }}
            >
              {item.text}
            </Text>
          </Column>
        );
      })}
    </IconGridComp>
  );
};

export default OtoFourScreen;
