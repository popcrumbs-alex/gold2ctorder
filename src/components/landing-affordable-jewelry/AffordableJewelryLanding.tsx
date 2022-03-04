import React from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";
import SectionTwo from "./SectionTwo";
import Divider from "./Divider";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import ReviewsSection from "./ReviewsSection";
import OfferBox from "./OfferBox";

const pulse = keyframes`
    0% {
        box-shadow:0 1px 20px transparent;
    }
    50% {
        box-shadow:0 1px 20px #eeeeee80;
    }
    100% {
        box-shadow:0 1px 20px transparent;
    }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Nav = styled.nav`
  min-height: 4rem;
  background: #001111;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  @media screen and (max-width: 760px) {
    padding: 1rem 0;
  }
`;
const NavContent = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 760px) {
    width: 90%;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 500;
  text-align: center;
  margin: 0.2rem 0;
  font-size: ${(props) => props["data-font-size"]};
`;

const NavButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  background: #ff00ed;
  color: #fff;
  border: 0;
  font-weight: 700;
  font-size: 1.1rem;
  animation: ${pulse} 2s linear infinite;
  & span {
    font-weight: 100;
    color: #ffffff88;
    font-size: 0.9rem;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    margin-top: 0rem;
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
`;

const Hero = styled.header`
  background-image: url("https://images.clickfunnels.com/d5/3f7ae91eec48e6af3b961a66b0ded4/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  position: relative;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background: #000000;
    position: absolute;
    top: 0;
    opacity: 0.4;
    z-index: 0;
  }
`;
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const Heading = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
  margin: 0.2rem 0;
  @media screen and (max-width: 760px) {
    font-size: 2.2rem;
  }
`;
const Subheading = styled.h3`
  font-size: 2rem;
  text-align: center;
  margin: 0.2rem 0;
  color: ${(props) => props.color};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ff00ed;
  max-width: 700px;
  border-radius: 5px;
  margin-top: 1rem;
  border: 2px solid #22222280;
  box-shadow: 0 0 0 4px #ff00ed30;
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

const AffordableJewelryLanding = () => {
  return (
    <Container>
      <Nav>
        <NavContent>
          <ImageContainer
            style={{ border: "0", marginTop: "0", maxWidth: "150px" }}
          >
            <StaticImage
              src="../../images/lululogo.png"
              alt="logo"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
          <Text color="#fff" style={{ textAlign: "center" }}>
            Exquisite Faux Jewelry
          </Text>
          <NavButton onClick={() => navigate("/order/OrderPage")}>
            FREE PAIR OF EARRINGS
            <br />
            <span>Click Here</span>
          </NavButton>
        </NavContent>
      </Nav>
      <Content>
        <Hero>
          <HeroContent>
            <Heading>
              Do you love jewelry but <br />
              hate how expensive it is?
            </Heading>
            <Subheading color="#ff00ed">So do we!</Subheading>
            <TextBox>
              <TextRow style={{ borderBottom: "1px solid #22222280" }}>
                <Text color="#fff">
                  That’s why went to work and figured out EXACTLY how to create
                  fashion jewelry that lasted like fine jewelry, at a cost
                  EVERYONE can afford.
                </Text>
              </TextRow>

              <TextRow style={{ borderBottom: "1px solid #22222280" }}>
                <Text color="#fff">
                  Over 150K customers later, we can confidently say we created
                  pieces that will last a lifetime but wont cost a lifetimes pay
                  to own.
                </Text>
              </TextRow>
              <TextRow>
                <Text color="#fff">
                  To prove it to you, we are offering a FREE pair of solitaire
                  stud earrings to you today! Our most popular and classic item,
                  loved by both men and women.
                </Text>
              </TextRow>
            </TextBox>
            <ImageContainer>
              <img
                src="https://images.clickfunnels.com/87/361d58cf104a12aa29c731bfb90632/1ct-studs.gif"
                alt="jewelry"
              />
            </ImageContainer>
          </HeroContent>
        </Hero>
      </Content>
      {/*  content sections*/}
      <SectionTwo />
      {/*  */}
      <Divider />
      {/*  */}
      <SectionThree />
      {/*  content sections */}
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <ReviewsSection />
      <OfferBox />
    </Container>
  );
};

export default AffordableJewelryLanding;
