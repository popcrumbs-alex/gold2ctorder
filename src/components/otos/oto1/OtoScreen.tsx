import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Timer from "../../orderpage/hero/Timer";
import { OtoDATA } from "../../../product/ProductData";
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
  max-width: 350px;
`;

const Divider = styled.div`
  display: block;
  height: 1.2px;
  width: 80%;
  background-color: #999;
`;

const OtoScreen = () => {
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(0);

  const aff_id =
    typeof window !== "undefined" && window.localStorage.getItem("ef_aff_id");

  const dispatch = useAppDispatch();

  const [updateOrder, { error, data, loading }] = useMutation(UPDATE_ORDER);

  //Everflow tracking api endpoint
  const [trackUpsell] = useMutation(EF_TRACK_UPSELL);

  //TODO Pass order into storage to continue order processing
  const handleAddOTOTToOrder = async () => {
    const currentOrderId = localStorage.getItem("order_id");
    try {
      dispatch(
        addOtoToOrder({
          price: OtoDATA[currentOtoIndex].numPrice,
          title: "1Ct Gold Studs",
          type: "OTO",
          isRecurring: false,
          id: OtoDATA[currentOtoIndex].id,
          displayPrice: OtoDATA[currentOtoIndex].displayPrice,
          sku: OtoDATA[currentOtoIndex].sku,
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
        console.log("everflow_tracking_:", aff_id);
      }
      console.log("request!", request);
      if (request.data.updateOrder.success) {
        navigate("/otos/Oto2");
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
          BONUS DEAL: <span>Add The 1CT Gold Studs</span>
        </Heading>
        <Subheading>
          Get the smaller version of the 2CT for this one time price of only $10
        </Subheading>
        <Divider />
        <HeadingTwo>
          Click The Button Below To Add To Your Order While Time Remains
        </HeadingTwo>
        <Timer />
        <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="product" />

        <Button onClick={() => handleAddOTOTToOrder()}>
          YES! Add The 1CT Gold Studs For Only $10 <span>Click Only Once</span>
        </Button>

        <Link to="/otos/Oto2">No thanks I don't need this now</Link>
      </Content>
    </Section>
  );
};

const EverflowMutationWrapper = ({ aff_id }: { aff_id: string }) => {
  const orderState = useAppSelector(selectOrderState);

  const [
    trackOrder,
    { error: trackError, data: trackData, loading: trackLoading },
  ] = useMutation(EF_TRACK_ORDER);

  console.log("order track?", trackError, trackData, trackLoading);

  useMemo(() => {
    trackOrder({
      variables: {
        everflowOrderInput: {
          aff_id,
          amount: orderState.myOrder.orderTotal,
        },
      },
    });
  }, []);

  return <></>;
};

export default OtoScreen;
