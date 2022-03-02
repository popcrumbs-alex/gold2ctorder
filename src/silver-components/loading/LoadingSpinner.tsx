import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Theme } from "../../constants/Colors";
import { ThemeContext } from "../../pages";

const spin = keyframes`
0%{
    transform:rotateZ(0);
    border-top-color:#D62246;
}
25% {
    border-right-color: #D62246;
}
50% {
    border-bottom-color: #D62246
}
75% {
    border-left-color:#D62246;
}
100% {
    transform: rotateZ(360deg);
}`;

const Spinner = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 900px;
  border: 4px solid transparent;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = (props) => {
  const context = useContext<Theme>(ThemeContext);
  return <Spinner color={context.danger}></Spinner>;
};

export default LoadingSpinner;
