import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { FaCheckCircle } from "react-icons/fa";

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
`;
const NavContent = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-weight: 500;
  text-align: center;
  margin: 0.2rem 0;
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
    margin-top: 1rem;
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
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
`;
const Heading = styled.h1`
  color: #fff;
  font-size: 3rem;
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
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0 0 4px #eeeeee33;
  }
`;

const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 60%;
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
  border-radius: 10px;
  padding: 2rem;
  width: 50%;
`;

const AffordableJewelryLanding = () => {
  return (
    <Container>
      <Nav>
        <NavContent>
          <StaticImage
            src="../../images/lululogo.png"
            alt="logo"
            placeholder="blurred"
            objectFit="contain"
            imgStyle={{
              width: "100%",
              maxWidth: "150px",
            }}
          />
          <Text>Exquisite Faux Jewelry</Text>
          <NavButton>
            FREE PAIR OF EARRINGS
            <br />
            <span>Click Here</span>
          </NavButton>
        </NavContent>
      </Nav>
      <Content>
        <Hero>
          <HeroContent>
            <Heading
              style={{
                textAlign: "center",
                margin: ".2rem 0",
                fontSize: "3rem",
              }}
            >
              Do you love jewelry but <br />
              hate how expensive it is?
            </Heading>
            <Text
              color="#ff00ed"
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                margin: "0.2rem 0",
              }}
            >
              So do we!
            </Text>
            <TextBox>
              <TextRow style={{ borderBottom: "1px solid #22222280" }}>
                <Text
                  color="#fff"
                  style={{
                    color: "#fff",
                    lineHeight: "1.5",
                    fontSize: "1.1rem",
                  }}
                >
                  That’s why went to work and figured out EXACTLY how to create
                  fashion jewelry that lasted like fine jewelry, at a cost
                  EVERYONE can afford.
                </Text>
              </TextRow>

              <TextRow style={{ borderBottom: "1px solid #22222280" }}>
                <Text
                  color="#fff"
                  style={{
                    lineHeight: "1.5",
                    fontSize: "1.1rem",
                  }}
                >
                  Over 150K customers later, we can confidently say we created
                  pieces that will last a lifetime but wont cost a lifetimes pay
                  to own.
                </Text>
              </TextRow>
              <TextRow>
                <Text
                  color="#fff"
                  style={{
                    lineHeight: "1.5",
                    fontSize: "1.1rem",
                  }}
                >
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
      {/*  ontent sections */}
      <SectionFour />

      <SectionFive />
      <Overlap />
    </Container>
  );
};

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

              <Text
                color="#222"
                style={{ fontSize: "1.3rem", marginLeft: "10px" }}
              >
                Made with 14K Gold Vermeil
              </Text>
            </TextRow>
            <TextRow>
              <FaCheckCircle color="#ff00ed" size={20} />

              <Text
                color="#222"
                style={{ fontSize: "1.3rem", marginLeft: "10px" }}
              >
                1CT and 2CT Each Options
              </Text>
            </TextRow>
            <TextRow>
              <FaCheckCircle color="#ff00ed" size={20} />

              <Text
                color="#222"
                style={{ fontSize: "1.3rem", marginLeft: "10px" }}
              >
                Ships From The USA, Arrives In Days
              </Text>
            </TextRow>
          </CheckList>
          <TextRow>
            <Text
              color="#222"
              style={{
                fontWeight: "700",
                fontStyle: "italic",
                fontSize: "1.5rem",
              }}
            >
              Get It For FREE While Supplies Last
            </Text>
          </TextRow>
          <AddToCartButton>Click Here To Try Us For FREE</AddToCartButton>
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

const Divider = () => {
  return (
    <Content
      style={{
        backgroundColor: "#c82ce4",
        padding: "2rem 0",
        alignItems: "center",
      }}
    >
      <OutlineBox>
        <Text
          color="#fff"
          style={{ fontSize: "2rem", fontWeight: "700", textAlign: "left" }}
        >
          Why Give Them Away For FREE, You Might Wonder, What's the Catch?
        </Text>
      </OutlineBox>
    </Content>
  );
};

const SectionThree = () => {
  return (
    <Content
      style={{
        backgroundColor: "#eee",
        padding: "2rem 0",
        alignItems: "center",
      }}
    >
      <Column
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          width: "50%",
          alignItems: "flex-start",
          border: "1px solid #ddd",
          borderRadius: "2px",
        }}
      >
        <Text
          color="#ff00ed"
          style={{
            textDecoration: "underline",
            fontSize: "2rem",
            fontStyle: "italic",
          }}
        >
          There is no catch!
        </Text>
        <Text color="#666" style={{ textAlign: "left", lineHeight: "1.5" }}>
          We figure its{" "}
          <strong>easier to show you how high quality our jewelry is</strong> by
          offering the first piece at a huge discount,{" "}
          <strong>
            it saves us a lot of money in ad cost as more people respond to a
            free offer
          </strong>{" "}
          than a retail priced one.
        </Text>
      </Column>
      <ColumnsRow>
        <Column>
          <Text
            color="#ff00ed"
            style={{
              textDecoration: "underline",
              fontSize: "2rem",
              textAlign: "left",
              fontStyle: "italic",
            }}
          >
            And it works for you and us
          </Text>
          <Text color="#666" style={{ textAlign: "left", lineHeight: "1.5" }}>
            You get a gorgeous pair of earrings at a crazy deal.
          </Text>
          <Text color="#666" style={{ textAlign: "left", lineHeight: "1.5" }}>
            We get the chance to WOW you with how high quality our product is.
          </Text>
          <Text color="#666" style={{ textAlign: "left", lineHeight: "1.5" }}>
            The result is 42% of customers make 2 or more purchases with, we
            have some customers with over 50 purchases.
          </Text>
          <Text color="#666" style={{ textAlign: "left", lineHeight: "1.5" }}>
            We put our product where our marketing is.
          </Text>
        </Column>
        <Column>
          <ImageContainer>
            <StaticImage
              src="../../images/carla-review.png"
              alt="review"
              placeholder="blurred"
              objectFit="contain"
              imgStyle={{
                width: "100%",
              }}
            />
          </ImageContainer>
        </Column>
      </ColumnsRow>
    </Content>
  );
};

const SectionFour = () => {
  return (
    <Content
      style={{
        backgroundColor: "#000",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
      <Column style={{ maxWidth: "55%" }}>
        <Heading style={{ fontSize: "1.7rem", textAlign: "center" }}>
          Now let’s show you the product, because it's anything but cheap
        </Heading>
      </Column>
    </Content>
  );
};

const Overlap = () => {
  return (
    <Content style={{ alignItems: "center" }}>
      <Column
        style={{
          backgroundColor: "#ff00ed",
          maxWidth: "50%",
          padding: "2rem",
          marginTop: "-2rem",
          border: "5px dashed #000",
          borderRadius: "5px",
        }}
      >
        <Text
          style={{
            fontSize: "1.2rem",
            color: "#fff",
            textAlign: "left",
            lineHeight: "1.5",
          }}
        >
          Unlike most cheap earrings our product will not fade, get cloudy or
          turn on you at any point. When we make our jewelry we add a little
          extra love to it, and make it better than the rest We take a normal CZ
          stone and seal it, so no moisture ever gets inside of it and makes it
          cloudy.
        </Text>
      </Column>
    </Content>
  );
};

const SectionFive = () => {
  return (
    <Content>
      <ColumnsRow>
        <Column>
          <Heading style={{ color: "#ff00ed", fontStyle: "italic" }}>
            Assignment #1, make CZ’s last forever
          </Heading>
          <Text>We use only the best metals in our jewelry</Text>
        </Column>
      </ColumnsRow>
    </Content>
  );
};

export default AffordableJewelryLanding;
