import React from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { FaCheckCircle } from "react-icons/fa";
import { navigate } from "gatsby";

const bounce = keyframes`
0% {
  transform:translateY(0);
}
50% {
  transform:translateY(-2vh);
}
60% {
  transform:translateY(0vh);
}
70% {
  transform:translateY(-2vh);
}
100% {
  transform:translateY(0);
}`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 500;
  text-align: center;
  margin: 0.2rem 0;
  font-size: ${(props) => props["data-font-size"]};
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
`;
const ImageContainer = styled.div`
  margin-top: 2rem;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  & img {
    object-fit: contain;
    width: 100%;
    box-shadow: 0 0 0 4px #eeeeee33;
  }
`;

const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 60%;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColumnsRow = styled.div`
  display: flex;
  background-color: #fff;
  padding: 2rem;
  align-items: flex-start;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-top: 1rem;
  width: 50%;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddToCartButton = styled.button`
  border: 0;
  box-shadow: 0 1px 10px #ff00ed22;
  padding: 1rem;
  width: 100%;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  background-color: #ff00ed;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 2rem;
  border-radius: 5px;
  &:hover {
    transform: translateY(-2vh);
    cursor: pointer;
    box-shadow: 0 0 0 10px #ff00ed20;
  }
`;

const OutlineBox = styled.div`
  border: 2px solid #fff;
  padding: 2rem;
  width: 50%;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const Button = styled.button`
  background-color: #ff00ed;
  border-radius: 5px;
  padding: 1rem 2rem;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 700;
  margin: 1rem 0;
  animation: ${bounce} 1s linear infinite;
  & span {
    font-weight: 100;
    color: #eeeeee80;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

const SectionTwo = () => {
  return (
    <Content style={{ alignItems: "center", padding: "2rem 0" }}>
      <GridTwoCols>
        <Column>
          <ImageContainer>
            <StaticImage
              src="../../images/winner.jpg"
              alt="winner"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
          <ImageContainer>
            <StaticImage
              src="../../images/4-icons-gold.png"
              alt="winner"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
        </Column>
        <Column>
          <CheckList>
            <TextRow>
              <FaCheckCircle color="#ff00ed" size={20} />

              <Text color="#222" style={{ marginLeft: "10px" }}>
                Made with 14K Gold Vermeil
              </Text>
            </TextRow>
            <TextRow>
              <FaCheckCircle color="#ff00ed" size={20} />

              <Text color="#222" style={{ marginLeft: "10px" }}>
                1CT and 2CT Each Options
              </Text>
            </TextRow>
            <TextRow>
              <FaCheckCircle color="#ff00ed" size={20} />

              <Text color="#222" style={{ marginLeft: "10px" }}>
                Ships From The USA, Arrives In Days
              </Text>
            </TextRow>
          </CheckList>
          <TextRow>
            <Text color="#222">Get It For FREE While Supplies Last</Text>
          </TextRow>
          <AddToCartButton onClick={() => navigate("/order/OrderPage")}>
            Click Here To Try Us For FREE
          </AddToCartButton>
          <ImageContainer style={{ marginTop: "0rem", alignItems: "center" }}>
            <StaticImage
              src="../../images/secured.png"
              alt="winner"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
        </Column>
      </GridTwoCols>
    </Content>
  );
};

export default SectionTwo;
