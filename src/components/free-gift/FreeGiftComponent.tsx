import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronCircleRight,
  FaChevronCircleLeft,
} from "react-icons/fa";
import Timer from "../orderpage/hero/Timer";
import { StaticImage } from "gatsby-plugin-image";
const Container = styled.section`
  background-image: url("https://images.clickfunnels.com/ff/5f2423b73e4c86a1d828d92c945cb4/Hero-Banner-BG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  background-color: #fff;
`;
const Heading = styled.h1`
  font-size: 2rem;
  margin: 0.5rem 0;
  text-align: center;
`;
const SubHeading = styled.h2`
  font-weight: 100;
  color: #666;
  margin: 0.5rem 0;
  text-align: center;
  & span {
    color: #e26df2;
    font-weight: 700;
  }
`;
const ImageContainer = styled.div`
  max-width: 450px;
  margin: 2rem 0;
  & img {
    object-fit: contain;
    border-radius: 10px;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #e26df2;
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CenteredText = styled.p`
  text-align: center;
  font-weight: 100;
  max-width: 500px;
  color: #777;
  line-height: 1.5;
  & strong {
    color: #000;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  max-width: 700px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;
const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FreeGiftComponent = () => {
  return (
    <Container>
      <Content>
        <Heading>Congratulations!</Heading>
        <SubHeading>
          You’ve Been Selected To Receive This <span>Free Gift</span> 🎁
        </SubHeading>
        <Heading>Your Free Gift:</Heading>
        <SubHeading>
          2Ct Gold Solitaire Stud Earrings <br />
          (Also Available In Silver and Rose Gold)
        </SubHeading>
        <ImageContainer>
          <img
            src="https://images.clickfunnels.com/87/361d58cf104a12aa29c731bfb90632/1ct-studs.gif"
            alt="jewelry"
          />
        </ImageContainer>

        <Button>
          <FaChevronCircleRight
            color="#fff"
            size={20}
            style={{ margin: "0 10px" }}
          />{" "}
          Click Here To Get Started{" "}
          <FaChevronCircleLeft
            color="#fff"
            size={20}
            style={{ margin: "0 10px" }}
          />
        </Button>
        <SubHeading style={{ marginTop: "2rem" }}>
          But You Must Claim It Within The Next <br />
          10 Minutes for <span>Guaranteed Arrival</span> in 5 Business Days
        </SubHeading>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "09", secondsProp: "59" }}
        />
        <ImageContainer>
          <StaticImage
            src="../../images/gold-studs.png"
            placeholder="blurred"
            imgStyle={{ width: "100%" }}
            alt="gold studs"
          />
        </ImageContainer>
        <CenteredText>
          We use this <strong>free promotion</strong> to introduce our brand to
          consumers like you, we find it’s a win win for all, instead of
          expensive ad campaigns, we invest our ad dollars in our product and
          <strong>give it away</strong> so you can see the quality of our items
          and come back and buy more, that’s it. Its helped us{" "}
          <strong>serve over 125K customers</strong> since 2017.
        </CenteredText>
        <ImageContainer>
          <StaticImage
            src="../../images/co.png"
            imgStyle={{ width: "100%" }}
            placeholder="blurred"
            alt="collage"
          />
        </ImageContainer>
        <CenteredText>
          No forced subscriptions, no forced purchases. Just cover the small
          USPS shipping costs and
          <strong>
            {" "}
            we will send our super high quality 2CT solitaire stud earrings
          </strong>{" "}
          in our branded gift box to you in 5-10 business days.
        </CenteredText>
        <ImageContainer
          style={{
            border: "2px solid #eee",
            borderRadius: "100%",
            maxWidth: "350px",
          }}
        >
          <StaticImage
            src="../../images/square-gold-knots-labeled.png"
            imgStyle={{ width: "100%", borderRadius: "100%" }}
            placeholder="blurred"
            alt="collage"
          />
        </ImageContainer>
        <CenteredText
          style={{ fontStyle: "italic", fontSize: "1.5rem", fontWeight: "100" }}
        >
          "They are very beautiful and sparkly. I wear them all the time and
          they haven’t tarnished or turned my ears green. Thank you."
        </CenteredText>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "09", secondsProp: "59" }}
        />
        <CenteredText>
          Claim It Within The Next 10 Minutes for Guaranteed Arrival in 5
          Business Days
        </CenteredText>
        <Button>Click Here To Get Started</Button>
        <Heading style={{ marginTop: "2rem" }}>
          What Makes Our Earrings Shine So Much?💎
        </Heading>
        <ImageGrid>
          <ImageColumn>
            <img
              src="https://images.clickfunnels.com/43/2bff303ab74d7e84a8e517cb24a518/ft-1.png"
              alt="diamond"
              style={{ maxWidth: "150px" }}
            />
            <CenteredText>
              <strong>Our unique stones</strong> get a lab treatment to make
              them more diamond-like
            </CenteredText>
          </ImageColumn>
          <ImageColumn>
            <img
              src="https://images.clickfunnels.com/8b/bcff87c8df4ad7ab24266a5e22903f/ft-2.png"
              alt="diamond"
              style={{ maxWidth: "150px" }}
            />
            <CenteredText>
              Only <strong>highest quality</strong> materials are used
            </CenteredText>
          </ImageColumn>
          <ImageColumn>
            <img
              src="https://images.clickfunnels.com/9f/7966af0e524be3be7b2de37fd3695b/ft-3.png"
              alt="diamond"
              style={{ maxWidth: "150px" }}
            />
            <CenteredText>
              <strong> A unique process</strong> for a unique piece of jewelry
            </CenteredText>
          </ImageColumn>
        </ImageGrid>
      </Content>
    </Container>
  );
};

FreeGiftComponent.propTypes = {};

export default FreeGiftComponent;
