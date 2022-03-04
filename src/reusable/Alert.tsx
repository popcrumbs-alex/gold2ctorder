import React, { useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Theme } from "../constants/Colors";
import { ThemeContext } from "../pages";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { resetAlert, selectAlert } from "../redux/reducers/alert.reducer";
import { FiAlertCircle } from "react-icons/fi";

const slideIn = keyframes`
0%{
    transform: translateY(-10vh);
}70% {
    transform: translateY(2vh);
}
100% {
    transform:translateY(0);
}`;

const AlertContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: ${(props) => props.color + "cc"};
  border-bottom: 2px solid ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  animation: ${slideIn} 0.5s linear forwards;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertText = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
`;

const Alert = () => {
  const context = useContext<Theme>(ThemeContext);

  //redux alert store
  const alertState = useAppSelector(selectAlert);

  const dispatch = useAppDispatch();

  const { isVisible, alert } = alertState;

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(resetAlert());
      }, 6000);
    }
  }, [isVisible]);

  return (
    isVisible && (
      <AlertContainer color={alert.type === "danger" ? context.danger : ""}>
        <Content>
          <FiAlertCircle
            size={25}
            color="#fff"
            style={{ marginRight: "10px" }}
          />
          <AlertText> {alert.message}</AlertText>
        </Content>
      </AlertContainer>
    )
  );
};

Alert.propTypes = {};

export default Alert;
