import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import Timer from "../../../reusable/Timer";
import { OtoDATA, OTOProps } from "../../../product/ProductData";
import { Link, navigate } from "gatsby";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  addOtoToOrder,
  selectOrderState,
} from "../../../redux/reducers/order.reducer";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../../graphql/mutations/order.mutation";
import { setAlert } from "../../../redux/reducers/alert.reducer";
import LoadingSpinner from "../../loading/LoadingSpinner";
import {
  EF_TRACK_ORDER,
  EF_TRACK_UPSELL,
} from "../../../graphql/mutations/everflow.mutations";
import Paypal from "../../orderpage/order-form/Paypal";

declare const window: any;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
  padding: 2rem;
`;

const Heading = styled.h1`
  & span {
    font-weight: 300;
  }
`;

const Subheading = styled.h3`
  color: #333;
`;

const HeadingTwo = styled.h2`
  font-weight: 100;
  color: #666;
`;

const Text = styled.p``;

const Button = styled.button`
  background-color: #111;
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
  box-shadow: 0 0 0 2px #eee;
  border-radius: 10px;
  margin-bottom: 1rem;
  & span {
    color: #999;
    font-weight: 300;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #333;
  }
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  border: 1px solid #eee;
`;

const Divider = styled.div`
  display: block;
  height: 1.2px;
  width: 100%;
  background-color: #99999920;
`;

const OTORow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
  }
`;
const OTOColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 0px 1px #eee;
`;

const OTOTitle = styled.h3`
  text-align: center;
  max-width: 70%;
  font-size: 1.2rem;
  line-height: 1.5;
`;

//IMPORTANT: this screen contains multiple products
//This is the first oto in the flow
const OtoThreeScreen = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number[]>([2, 3]);

  //everflow id being passed by url params and stored in storage on the order page
  //window check for buildtime since not available until successful build
  const aff_id =
    typeof window !== "undefined" && window.localStorage.getItem("ef_aff_id");

  //dispatching redux state actions
  const dispatch = useAppDispatch();

  //current order state at this point in order flow
  const orderState = useAppSelector(selectOrderState);

  //determine what payment processor to be used if user previously used credit or paypal
  const [orderType, setOrderType] = useState<"paypal" | "credit" | "">("");

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
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrderType(window.localStorage.getItem("orderType"));
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
      {aff_id && <EverflowMutationWrapper aff_id={aff_id} />}
      <Content>
        <Heading>
          <strong>PICK YOUR DEAL:</strong> Get Them In Rose Gold
        </Heading>
        <Subheading>
          Get Our Signature Studs In rose Gold for Only $15, Add The Pendant Too
          For Only $10 More.
        </Subheading>
        <Text>
          Click The Button Below To Add To Your Order While Time Remains
        </Text>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "10", secondsProp: "59" }}
        />
        <Divider style={{ margin: "2rem 0" }} />
        <OTORow>
          {OtoDATA.map((oto: OTOProps, index: number) => {
            return (
              currentOtoIndex.includes(index) && (
                <OTOColumn key={index}>
                  <Image src={oto.imgOrVideoSrc} alt={oto.title} />
                  <OTOTitle>{oto.title}</OTOTitle>
                  <PaymentProcessorButton
                    orderType={orderType}
                    oto={oto}
                    nextPage="/Thankyou"
                    handleAddOTOToOrder={handleAddOTOToOrder}
                    selectedIndex={index}
                    buttonText={oto.displayPrice}
                  />
                </OTOColumn>
              )
            );
          })}
        </OTORow>
        <Link to="/Thankyou">No thanks, I don't need this now</Link>
      </Content>
      {/* set conditional for paypal button & other payments */}
    </Section>
  );
};

const PaymentProcessorButton = ({
  orderType,
  oto,
  handleAddOTOToOrder,
  nextPage,
  buttonText,
  selectedIndex,
}: {
  orderType: "paypal" | "credit" | "";
  handleAddOTOToOrder: (index: number) => Promise<any>;
  oto: OTOProps;
  nextPage: string;
  buttonText: string;
  selectedIndex: number;
}) => {
  if (!orderType) {
    return (
      <Button onClick={() => handleAddOTOToOrder(selectedIndex)}>
        {buttonText}
      </Button>
    );
  }
  return {
    paypal: (
      <Paypal
        orderTotal={oto.numPrice}
        nextPage={nextPage}
        items={[
          {
            sku: oto.sku,
            title: oto.title,
            type: "OTO",
            displayPrice: oto.displayPrice,
            id: oto.id,
            price: oto.numPrice,
            isRecurring: false,
          },
        ]}
      />
    ),
    credit: (
      <Button onClick={() => handleAddOTOToOrder(selectedIndex)}>
        {buttonText}
      </Button>
    ),
  }[orderType];
};

const EverflowMutationWrapper = ({ aff_id }: { aff_id: string }) => {
  const orderState = useAppSelector(selectOrderState);

  const [trackOrder] = useMutation(EF_TRACK_ORDER);

  useMemo(() => {
    trackOrder({
      variables: {
        everflowOrderInput: {
          aff_id,
          amount: orderState.myOrder.orderTotal,
        },
      },
    });
    if (window.fbq) {
      window.fbq("track", "Purchase", {
        currency: "USD",
        value: orderState.myOrder.orderTotal,
      });
    }
  }, []);

  return <></>;
};

export default OtoThreeScreen;
