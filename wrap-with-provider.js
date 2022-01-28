import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  return <Provider store={store}>{element}</Provider>;
};
