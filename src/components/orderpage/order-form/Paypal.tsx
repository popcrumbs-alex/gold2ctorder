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
import { PayPalButton } from "react-paypal-button-v2";

const Paypal = ({
  orderTotal,
  nextPage,
  items,
}: {
  orderTotal: number;
  nextPage: string;
  items: ProductProp[];
}) => {
  const orderState = useAppSelector(selectOrderState);
  console.log("order total", orderTotal);
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
      //dynamically add order total for component reuse
      console.log("items", items);
      const request = await createPaypalOrder({
        variables: {
          createOrderInput: {
            ...formattedAddress,
            products: items,
            orderTotal,
            paypal_transaction_id: data_from_paypal.id,
            orderType: "paypal",
          },
        },
      });
      //set type in storage for otos
      window.localStorage.setItem("orderType", "paypal");

      if (request.data.createOrder.success) {
        dispatch(addOrderToStorage({ id: request.data.createOrder.Order._id }));
        //on successful order go to next page
        navigate(nextPage);
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
  //TODO add paypal button for each oto????
  return (
    <PayPalButton
      style={{ layout: "horizontal" }}
      options={{
        clientId:
          "AaXUIuu5MJJZH8XPBvC0zOYDKCn8V_jpr8mnApb05gva4Zd2UIgkdlv1-SltcOcdtiZmr4PhGO4aw1bQ",
        disableFunding: "card",
        intent: "capture",
      }}
      amount={orderState.myOrder.orderTotal.toFixed(2).toString()}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: orderTotal.toFixed(2).toString(),
                breakdown: {
                  item_total: {
                    /* Required when including the `items` array */
                    currency_code: "USD",
                    value: orderTotal.toFixed(2).toString(),
                  },
                },
              },
              shipping: {
                name: {
                  full_name:
                    `${orderState.myOrder.contactInfo.firstName} ${orderState.myOrder.contactInfo.lastName}` ||
                    "",
                },
                address: {
                  address_line_1: orderState.myOrder.shippingInfo.address || "",
                  country_code: "US",
                  admin_area_2: orderState.myOrder.shippingInfo.city || "",
                  postal_code: orderState.myOrder.shippingInfo.zip || "",
                },
              },
              items:
                items.length > 0
                  ? items
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
                      })
                  : [],
            },
          ],
        });
      }}
      onError={(error) => {
        console.log("paypal error", error);
        return dispatch(
          setAlert({
            type: "danger",
            message:
              typeof error === "string" ? error : "Paypal error:" + error,
          })
        );
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((response) => {
          console.log("appreove response", response);
          handlePaypalOrder(response);
        });
      }}
    />
  );
};

export default Paypal;
