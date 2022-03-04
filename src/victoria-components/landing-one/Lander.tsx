import React from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0075b2;
  padding: 1rem 0;
  min-height: 2rem;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;
const NavContent = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 760px) {
    width: 80%;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props["data-font-size"] || "1rem"};
  margin: 0.5rem 0;
`;
const Hero = styled.header`
  background-image: url("https://images.clickfunnels.com/1e/ce8e8b5ae54f9294460037ac195452/banner-img.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-poisition: center;
  display: flex;
  padding: 4rem 0;
  justify-content: center;
`;
const HeroHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  font-family: Playfair Display;
  margin: 0.5rem 0;
  @media screen and (max-width: 760px) {
    font-size: 2.5rem;
  }
`;

const Heading = styled(HeroHeading)`
  font-size: 2.5rem;
  text-align: center;
  line-height: 1.5;
  width: 90%;
  color: ${(props) => props.color};
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: 1rem;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;
const HeroContent = styled.div`
  display: flex;
  width: 70%;
  @media screen and (max-width: 760px) {
    width: 90%;
    flex-direction: column-reverse;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const Row = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: ${(props) => props["data-max-width"] || "350px"};
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  color: ${(props) => props["data-text-color"] || "#fff"};
  padding: 1.5rem;
  transition: all 0.3s ease-in-out;
  border: 0;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.color + "90"};
  }
`;

const Lander = () => {
  const handleNavToNextPage = () => navigate("/victoria/OrderPage");

  return (
    <>
      <Nav>
        <NavContent>
          <Text color="#fff" style={{ fontWeight: "700" }}>
            We're Giving Away 10,000 Pairs of Earrings This Month, Just Cover
            S/H.
          </Text>
        </NavContent>
      </Nav>
      <Hero>
        <HeroContent>
          <Column>
            <HeroHeading>
              Claim Your FREE Micro Pave Solitaire Studs
            </HeroHeading>
            <Text color="#f00395">
              <strong>Set in Sterling Silver</strong>
            </Text>
            <Text data-font-size="1.5rem">
              <strong>
                Only a Limited Number Are Given Away For Free Each Day
              </strong>
            </Text>
            <Button
              color="#ed28a5"
              data-font-color="#fff"
              style={{ alignSelf: "flex-start", margin: "1rem 0" }}
              onClick={handleNavToNextPage}
            >
              Click Here To Claim
            </Button>
          </Column>
          <Column>
            <ImageContainer style={{ alignSelf: "center" }}>
              <StaticImage
                src="../../images/victoria-in-container.png"
                alt="earrings"
                imgStyle={{ maxWidth: "100%" }}
                placeholder="blurred"
              />
            </ImageContainer>
          </Column>
        </HeroContent>
      </Hero>
      <Section>
        <Content>
          <Heading color="#666">
            Get our signature "diamond" stone in this sterling silver setting
            complete
          </Heading>
          <ImageContainer data-max-width="100%" style={{ margin: "2rem 0" }}>
            <StaticImage
              src="../../images/box-img.png"
              alt="img"
              imgStyle={{ width: "100%" }}
              placeholder="blurred"
            />
          </ImageContainer>

          <Button
            color="#ed28a5"
            data-font-color="#fff"
            onClick={handleNavToNextPage}
          >
            Yes! I Want This
          </Button>

          <ImageContainer style={{ margin: "2rem 0" }} data-max-width="100%">
            <StaticImage
              src="../../images/trust-signs.png"
              alt="img"
              placeholder="blurred"
              imgStyle={{ width: "100%" }}
            />
          </ImageContainer>
        </Content>
      </Section>
      <Section>
        <Content>
          <Row color="#2e313a">
            <Column>
              <ImageContainer data-max-width="100%">
                <StaticImage
                  src="../../images/victoria-img-with-bg.png"
                  alt="img"
                  placeholder="blurred"
                  imgStyle={{ width: "100%" }}
                />
              </ImageContainer>
            </Column>
            <Column>
              <Heading color="#fff" style={{ textAlign: "left" }}>
                Satisfaction Assured! All Our Orders Ship From The USA and
                Arrive in 3-10 Days Via The USPS
              </Heading>
              <Button
                color="#ed28a5"
                data-font-color="#fff"
                style={{ alignSelf: "flex-start" }}
                onClick={handleNavToNextPage}
              >
                Order Now
              </Button>
            </Column>
          </Row>
        </Content>
      </Section>
    </>
  );
};

export default Lander;
