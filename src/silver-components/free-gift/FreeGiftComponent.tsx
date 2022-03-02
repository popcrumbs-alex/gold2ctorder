import React from "react";
import styled from "styled-components";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import Timer from "../../reusable/Timer";
import { StaticImage } from "gatsby-plugin-image";
import Video from "../../reusable/Video";
import { navigate } from "gatsby";

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
  padding-bottom: 4rem;
`;
const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  background-color: #fff;
  @media screen and (max-width: 760px) {
    width: 90%;
    background-color: #ffffff90;
    padding: 2rem 1rem;
  }
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
  font-size: 1.2rem;
  & strong {
    color: #000;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  max-width: 700px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    max-width: 80%;
  }
`;
const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  width: 800px;
  height: 400px;
  @media screen and (max-width: 760px) {
    width: 90vw;
    height: 40vh;
  }
`;

const NavigationButton = styled.button`
  background-color: #e26df2;
  padding: 1rem 2rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  border: 1px solid #e26df260;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #e26df290;
  }
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
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

        <Button onClick={() => navigate("/order/OrderPage/")}>
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
        <Button onClick={() => navigate("/order/OrderPage")}>
          Click Here To Get Started
        </Button>
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
        <CenteredText>
          ...Is our unique process, <strong>play the video below</strong> to
          learn more
        </CenteredText>
        <VideoContainer>
          <Video
            videoSrcURL={"https://www.youtube.com/embed/t5S3UpkLP5U"}
            videoTitle="Lab Ds"
          />
        </VideoContainer>
        <Heading style={{ marginTop: "2rem" }}>
          What Happens When I Click To The Next Page?
        </Heading>
        <CenteredText>
          Were going to ask for your shipping information, email and name and
          you get to <strong>pick just the free pair</strong>, an upgrade to get
          3 pairs (silver, gold and rose gold) at a{" "}
          <strong>big discount</strong> or a smaller (1CT size).{" "}
        </CenteredText>
        <CenteredText>
          We are also going to offer some amazing deals like{" "}
          <strong>75% off our tennis bracelet </strong>and a matching pendant
          that’s the belle of the ball.
        </CenteredText>
        <Timer
          timeProps={{ hoursProp: "00", minutesProp: "10", secondsProp: "59" }}
        />
        <CenteredText>
          Claim It Within The Next 10 Minutes for{" "}
          <strong style={{ color: "#e26df2" }}>Guaranteed Arrival</strong> in 5
          Business Days
        </CenteredText>
        <NavigationButton onClick={() => navigate("/order/OrderPage")}>
          Click Here To Get Started
        </NavigationButton>
        <CheckList>
          <ListItem>
            <CenteredText style={{ margin: ".5rem 0" }}>
              ✔️ Buy with confidence – 90 Day return policy.
            </CenteredText>
          </ListItem>
          <ListItem>
            <CenteredText style={{ margin: ".5rem 0" }}>
              ✔️ Ships from the USA and arrives in 3-7 days.
            </CenteredText>
          </ListItem>
          <ListItem>
            <CenteredText style={{ margin: ".5rem 0" }}>
              ✔️ 24/7/365 Customer service, responses 95% of the time within 2
              hours
            </CenteredText>
          </ListItem>
          <ListItem>
            <CenteredText style={{ margin: ".5rem 0" }}>
              ✔️ Support small businesses.
            </CenteredText>
          </ListItem>
        </CheckList>
        <SubHeading style={{ color: "#222", marginTop: "2rem" }}>
          See What Others Have To Say When They <br />
          Received <strong>Their Free Earrings</strong>
        </SubHeading>
        <div
          id="looxReviews"
          data-product-id="4349401399396"
          style={{ width: "100%" }}
        ></div>
      </Content>
      <Footer>
        <ImageContainer style={{ maxWidth: "100px" }}>
          <StaticImage
            src="../../images/logo-var-1.png"
            alt="logo"
            imgStyle={{ width: "100%" }}
            placeholder="blurred"
          />
        </ImageContainer>
        <CenteredText style={{ fontSize: "1rem", margin: "0.2rem 0" }}>
          @copyright {new Date().getFullYear()} Luciana Rose
        </CenteredText>
      </Footer>
    </Container>
  );
};

export default FreeGiftComponent;
