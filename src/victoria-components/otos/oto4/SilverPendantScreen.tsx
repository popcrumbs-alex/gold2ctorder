import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";
import { setAlert } from "../../../redux/reducers/alert.reducer";
import { OtoDATA } from "../../../product/VictoriaProductData";
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

const Section = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 1px solid #eee;
  margin: 2rem 0;
  padding: 2rem;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const HeadingTwo = styled.h2`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 1.5rem;
`;

const Heading = styled.h1`
  font-weight: 700;
  text-align: center;
  line-height: 1.5;
  margin: 0.2rem 0;
  font-size: 2rem;
  color: ${(props) => props.color};
  & span {
    color: rgb(255, 153, 25);
  }
`;

const Divider = styled.div`
  display: block;
  height: 1px;
  width: 90%;
  background-color: #eeee;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 5px;
  margin: 1rem 0;
  border: 0;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(1, 116, 199);
  transition: all 0.3s ease-in-out;
  & span {
    font-weight: 100;
    color: #ffffff80;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(1, 116, 199, 0.8);
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
  max-width: 500px;
  margin: 1rem 0;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
`;

const SilverPendantScreen = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(3);

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
    <Section>
      <Content color="rgba(232, 228, 227, 0.72)">
        <Heading>
          <span>Final Offer!</span> Add This Beautiful Silver Stud Pendant
        </Heading>
        <HeadingTwo color="rgb(255,153,25)">
          Add On Today For Unheard Of Discount On This Premium Pendant
        </HeadingTwo>
        <Text>Retails $99.95 --Today Only $20</Text>
        <Divider />
        <ImageContainer>
          <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="pendant" />
        </ImageContainer>

        <PaymentProcessorSelect
          orderType={orderType}
          cartButton={
            <AddToCartButton onClick={() => handleAddOTOToOrder(3)}>
              Yes! I Want The Silver Stud Pendant <br />
              <span>Only $20</span>
            </AddToCartButton>
          }
          nextPage={"/Thankyou"}
          items={[
            {
              price: OtoDATA[currentOtoIndex].numPrice,
              displayPrice: OtoDATA[currentOtoIndex].displayPrice,
              title: OtoDATA[currentOtoIndex].title,
              sku: OtoDATA[currentOtoIndex].sku,
              isRecurring: false,
              type: "OTO",
              id: OtoDATA[currentOtoIndex].id,
            },
          ]}
          orderTotal={OtoDATA[currentOtoIndex].numPrice}
        />
        <Link to="/Thankyou">
          No Thanks, I Don’t Want The ‘Thanks For Sticking With Us’ Offer
        </Link>
      </Content>
    </Section>
  );
};

export default SilverPendantScreen;
