import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Timer from "../../../reusable/Timer";
import { OtoDATA } from "../../../product/SilverStudsProductData";
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
import { FaShoppingCart } from "react-icons/fa";

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
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;

    & span {
      font-weight: 600;
    }
  }
`;

const Subheading = styled.h3`
  color: #333;
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0.2rem;
  }
`;

const HeadingTwo = styled.h2`
  font-weight: 100;
  color: #666;
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 400;
    margin: 1rem 0;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;
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
  @media screen and (max-width: 760px) {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 0.2rem;
    padding: 0.5rem;
  }
`;

const Image = styled.img`
  max-width: 350px;
  @media screen and (max-width: 760px) {
    max-width: 250px;
  }
`;

const Divider = styled.div`
  display: block;
  height: 1.2px;
  width: 80%;
  background-color: #999;
`;

//This is the first oto in the flow
const OtoScreen = () => {
  //The oto to be selected from within the product data file
  //Not necessarily needed to be kept in local state
  //could just use index
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(0);

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
  const handleAddOTOToOrder = async () => {
    const currentOrderId = localStorage.getItem("order_id");
    try {
      dispatch(
        addOtoToOrder({
          price: OtoDATA[currentOtoIndex].numPrice,
          title: "1Ct Silver Studs",
          type: "OTO",
          isRecurring: false,
          id: OtoDATA[currentOtoIndex].id,
          displayPrice: OtoDATA[currentOtoIndex].displayPrice,
          sku: OtoDATA[currentOtoIndex].sku,
          sticky_billing_model_id:
            OtoDATA[currentOtoIndex].sticky_billing_model_id,
          sticky_offer_id: OtoDATA[currentOtoIndex].sticky_offer_id,
          sticky_product_id: OtoDATA[currentOtoIndex].sticky_product_id,
          sticky_quantity: OtoDATA[currentOtoIndex].sticky_quantity,
          sticky_trial_product_id: undefined,
          sticky_variant_object: undefined,
        })
      );

      const request = await updateOrder({
        variables: {
          updateOrderInput: {
            product: {
              displayPrice: OtoDATA[currentOtoIndex].displayPrice,
              price: OtoDATA[currentOtoIndex].numPrice,
              title: "1CT Gold Studs",
              sku: OtoDATA[currentOtoIndex].sku,
              isRecurring: false,
              type: "OTO",
              id: OtoDATA[currentOtoIndex].id,
              sticky_billing_model_id:
                OtoDATA[currentOtoIndex].sticky_billing_model_id,
              sticky_offer_id: OtoDATA[currentOtoIndex].sticky_offer_id,
              sticky_product_id: OtoDATA[currentOtoIndex].sticky_product_id,
              sticky_quantity: OtoDATA[currentOtoIndex].sticky_quantity,
              sticky_trial_product_id: undefined,
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
              amount: OtoDATA[currentOtoIndex].numPrice,
            },
          },
        });
      }
      console.log("request!", request);
      if (request.data.updateOrder.success) {
        navigate("/silverstuds/otos/EternityBand");
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
          BONUS DEAL: <span>Add The 1CT Silver Studs</span>
        </Heading>
        <Subheading>
          Get the smaller version of the 2CT for this one time price of only $10
        </Subheading>
        <Divider />
        <HeadingTwo>
          Click The Button Below To Add To Your Order While Time Remains
        </HeadingTwo>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "09", secondsProp: "59" }}
        />
        <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="product" />
        {/* set conditional for paypal button & other payments */}
        {!orderType && (
          <Button onClick={() => handleAddOTOToOrder()}>
            <Row>
              <FaShoppingCart
                color="#fff"
                size={30}
                style={{ marginRight: "10px" }}
              />
              {` `}
              YES! Add The 1CT Silver Studs For Only $10
            </Row>{" "}
            <span>Click Only Once</span>
          </Button>
        )}
        {
          {
            paypal: (
              <Paypal
                orderTotal={OtoDATA[currentOtoIndex].numPrice}
                nextPage={"/silverstuds/otos/EternityBand"}
                fromOrderPage={false}
                items={[
                  {
                    sku: OtoDATA[currentOtoIndex].sku,
                    title: OtoDATA[currentOtoIndex].title,
                    type: "OTO",
                    displayPrice: OtoDATA[currentOtoIndex].displayPrice,
                    id: OtoDATA[currentOtoIndex].id,
                    price: OtoDATA[currentOtoIndex].numPrice,
                    isRecurring: false,
                    sticky_billing_model_id:
                      OtoDATA[currentOtoIndex].sticky_billing_model_id,
                    sticky_offer_id: OtoDATA[currentOtoIndex].sticky_offer_id,
                    sticky_product_id:
                      OtoDATA[currentOtoIndex].sticky_product_id,
                    sticky_quantity: OtoDATA[currentOtoIndex].sticky_quantity,
                    sticky_trial_product_id: undefined,
                    sticky_variant_object: undefined,
                  },
                ]}
              />
            ),
            credit: (
              <Button onClick={() => handleAddOTOToOrder()}>
                <Row>
                  <FaShoppingCart color="#fff" size={30} />
                  YES! Add The 1CT Silver Studs For Only $10
                </Row>
                <span>Click Only Once</span>
              </Button>
            ),
          }[orderType]
        }

        <Link to="/silverstuds/otos/EternityBand">
          No thanks I don't need this now
        </Link>
      </Content>
    </Section>
  );
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

export default OtoScreen;
