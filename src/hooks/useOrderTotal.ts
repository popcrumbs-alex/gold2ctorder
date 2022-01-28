import { useCallback, useEffect, useState } from "react";
import {
  ProductProp,
  selectOrderState,
  updateOrderTotal,
} from "../redux/reducers/order.reducer";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useOrderTotal = () => {
  const dispatch = useAppDispatch();

  const orderState = useAppSelector(selectOrderState);

  const [total, setTotal] = useState<number>(0);

  const handleOrderTotalProcessing = useCallback(() => {
    const productAmount = orderState.myOrder.products
      .map((product: ProductProp) => product.price)
      .reduce((prev, next) => (prev += next), 0);

    let formattedTotal = Math.abs(productAmount);
    //set local state
    setTotal(formattedTotal);
    //pass to redux store
    dispatch(updateOrderTotal(formattedTotal));
  }, [orderState.myOrder]);

  useEffect(() => {
    handleOrderTotalProcessing();
  }, [orderState.myOrder]);

  return total;
};

export default useOrderTotal;
