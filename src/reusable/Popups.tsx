import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { io } from "socket.io-client";

const popin = keyframes`
0% {
    opacity:0;
    transform: translateY(50vh;)
}
100% {
    opacity:1;
    transform:translateY(0);
}`;

const popout = keyframes`0% {
    opacity:0;
    transform: translateY(0vh;)
}
100% {
    opacity:1;
    transform:translateY(50vh);
}`;

const Popup = styled.div`
  position: fixed;
  bottom: 5%;
  left: 5%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 1px 20px #33333322;
  width: 225px;
  border-radius: 100px;
  padding: 1rem;
  overflow: hidden;
  animation: ${popin} 2s linear forwards;
  transform: translateY(50vh);
  border: 1px solid #222;
`;

const PopupHide = styled.div`
  position: fixed;
  bottom: 5%;
  left: 5%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 1px 20px #33333322;
  min-width: 150px;
  border-radius: 100px;
  padding: 1rem;
  overflow: hidden;
  animation: ${popout} 2s linear forwards;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h4`
  margin: 0.2rem;
  font-weight: 700;
  color: #111;
  font-size: 0.7rem;
`;

const Location = styled.p`
  margin: 0.2rem;
  font-weight: 400;
  color: #666;
  font-size: 0.7rem;
`;

const Product = styled.p`
  margin: 0.2rem;
  font-weight: 400;
  color: #666;
  line-height: 1.2;
  font-size: 0.7rem;
`;
const Time = styled.p`
  font-weight: 700;
  font-style: italic;
  margin: 0.2rem;
  color: #666;
  font-size: 0.7rem;
`;
type PopupProps = {
  name: string;
  product: string;
  location: string;
  queued: boolean;
};

const uri =
  process.env.NODE_ENV === "production"
    ? "https://funnel-server.herokuapp.com/"
    : "http://localhost:3000";

const socket = io(uri);

const Popups = () => {
  const [currentPopup, setCurrentPopup] = useState<PopupProps>({
    name: "",
    product: "",
    location: "",
    queued: false,
  });

  const { name, product, location, queued } = currentPopup;

  const handleReceivePopupData = (data: PopupProps) => {
    if (!queued) {
      setCurrentPopup({ ...data, queued: true });
    }
    return data;
  };

  socket.on("order", (...data) =>
    !queued ? handleReceivePopupData(data[0]) : console.log("order queued")
  );

  //reset received data after 6 seconds
  useMemo(() => {
    if (queued) {
      setTimeout(() => {
        setCurrentPopup({
          name: "",
          product: "",
          location: "",
          queued: false,
        });
      }, 10000);
    }
    return () => clearTimeout();
  }, [queued]);

  return queued ? (
    <Popup>
      <Content>
        <Row>
          <Name>{name}</Name>
          <Location>from {location}</Location>
        </Row>
        <Row>
          <Product>
            Just bought: {product.substring(0, 60)}
            {product.length > 60 && "..."}
          </Product>
        </Row>
        <Row>
          <Time>A few seconds ago.</Time>
        </Row>
      </Content>
    </Popup>
  ) : (
    <PopupHide>
      <Content>
        <Row>
          <Name>{name}</Name>
          <Location>from {location}</Location>
        </Row>
        <Row>
          <Product>Just bought: {product}</Product>
        </Row>
        <Row>
          <Time>A few seconds ago.</Time>
        </Row>
      </Content>
    </PopupHide>
  );
};

export default Popups;
