import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  addOrderToStorage,
  ProductProp,
  selectOrderState,
} from "../../../redux/reducers/order.reducer";
import { setAlert } from "../../../redux/reducers/alert.reducer";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../../graphql/mutations/order.mutation";
import { navigate } from "gatsby";
import LoadingSpinner from "../../loading/LoadingSpinner";

const Paypal = () => {
  const orderState = useAppSelector(selectOrderState);

  const dispatch = useAppDispatch();

  const [createPaypalOrder, { error, loading }] = useMutation(CREATE_ORDER);

  const handlePaypalOrder = async (data_from_paypal: any) => {
    const formattedAddress: any = {
      email: data_from_paypal.payer.email_address,
      firstName: data_from_paypal.payer.name.given_name,
      lastName: data_from_paypal.payer.name.surname,
      address:
        data_from_paypal.purchase_units[0].shipping.address.address_line_1,
      city: data_from_paypal.purchase_units[0].shipping.address.admin_area_2,
      state: data_from_paypal.purchase_units[0].shipping.address.admin_area_1,
      zip: data_from_paypal.purchase_units[0].shipping.address.postal_code,
    };
    // console.log("formatted addy", data_from_paypal);
    try {
      const request = await createPaypalOrder({
        variables: {
          createOrderInput: {
            ...formattedAddress,
            products: [...orderState.myOrder.products],
            orderTotal: orderState.myOrder.orderTotal,
            paypal_transaction_id: data_from_paypal.id,
          },
        },
      });
      if (request.data.createOrder.success) {
        dispatch(addOrderToStorage({ id: request.data.createOrder.Order._id }));
        //on successful order go to next page
        navigate("/otos/Oto1");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  //if theres an error porcessing order, send alert to redux store
  useEffect(() => {
    if (error) {
      dispatch(setAlert({ message: error.message, type: "danger" }));
    }
  }, [error]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <LoadingSpinner /> <p>Processing paypal order...</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASyQ9pmZvoxvuzRZxVYCh44dHTljctKvuh_DqYwOkM0iM_2WcQv3s8HA1Ebu15hPINO7JIgfsYBar2Bt",
        intent: "authorize",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        forceReRender={[
          orderState.myOrder.products,
          orderState.myOrder.orderTotal,
        ]}
        fundingSource={"paypal"}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: orderState.myOrder.orderTotal.toFixed(2).toString(),
                  breakdown: {
                    item_total: {
                      /* Required when including the `items` array */
                      currency_code: "USD",
                      value: orderState.myOrder.orderTotal
                        .toFixed(2)
                        .toString(),
                    },
                  },
                },
                shipping: {
                  name: {
                    full_name: `${orderState.myOrder.contactInfo.firstName} ${orderState.myOrder.contactInfo.lastName}`,
                  },
                  address: {
                    address_line_1: orderState.myOrder.shippingInfo.address,
                    country_code: "US",
                    admin_area_2: orderState.myOrder.shippingInfo.city,
                    postal_code: orderState.myOrder.shippingInfo.zip,
                  },
                },
                items: orderState.myOrder.products
                  .map((product: ProductProp) => {
                    return {
                      name: product.title,
                      unit_amount: {
                        currency_code: "USD",
                        value: product.price.toFixed(2).toString(),
                      },
                      quantity: "1",
                    };
                  })
                  .concat({
                    name: "Shipping",
                    unit_amount: {
                      value: "0.00",
                      currency_code: "USD",
                    },
                    quantity: "1",
                  }),
              },
            ],
          });
        }}
        onError={(error) => {
          console.log("paypal error", error);
          return dispatch(
            setAlert({
              type: "danger",
              message: typeof error === "string" ? error : "",
            })
          );
        }}
        onApprove={(data, actions) => {
          return actions.order.authorize().then((response) => {
            handlePaypalOrder(response);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
