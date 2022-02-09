import React from "react";
import styled, { keyframes } from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import {
  HiEmojiSad,
  FaSadTear,
  IoIosSad,
  FaShieldAlt,
  BiHappyHeartEyes,
} from "react-icons/all";
import { useContext } from "react";
import { ThemeContext } from "../../pages";
import { Theme } from "../../constants/Colors";
import { Link } from "gatsby";
import { navigate } from "gatsby";

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

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  background-color: #111;
  padding: 1rem 0;
  min-height: 4rem;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;
const NavContent = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 760px) {
    width: 80%;
    flex-direction: column;
  }
`;

const NavButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  background: red;
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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
const Tag = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  line-height: 1.2;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0.2rem 0;
  @media screen and (max-width: 760px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2rem;
  background-color: ${(props) => props.color};
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    margin: 1rem;
  }
`;
const ParagraphBox = styled.div`
  display: flex;
  padding: 0.5rem;
  border: 1px dotted #222;
  margin: 0.2rem 0;
  box-shadow: 0 1px 10px #22222222;
`;
const ImageContainer = styled.div`
  border: 3px solid #111;
`;
const AddToCartButton = styled.button`
  border: 0;
  box-shadow: 0 1px 10px #33333322;
  padding: 1rem;
  width: 100%;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  background-color: rgba(87, 191, 124, 0.98);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 2rem;
  border-radius: 5px;
  &:hover {
    transform: translateY(-2vh);
    cursor: pointer;
    text-transform: full-width;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
`;
const Lander = () => {
  const handleNavToNextPage = () => navigate("/order/OrderPage");

  return (
    <Section>
      <Nav>
        <NavContent>
          <StaticImage
            src="../../../images/lululogo.png"
            alt="logo"
            placeholder="blurred"
            objectFit="contain"
            style={{ width: "100%" }}
            imgStyle={{
              width: "100%",
            }}
          />
          <NavButton onClick={handleNavToNextPage}>
            Congratulations
            <br />
            <span>Click For a FREE Pair</span>
          </NavButton>
        </NavContent>
      </Nav>

      <Content>
        <BodySection />
        <GridContainer handleNavToNextPage={handleNavToNextPage} />
        <SmallParagraphSection />
        <PictureGrid handleNavToNextPage={handleNavToNextPage} />
        <div
          id="looxReviews"
          data-product-id="4273995350116"
          style={{ width: "100%" }}
        ></div>
        <PictureGridTwo />
        <PictureGridThree handleNavToNextPage={handleNavToNextPage} />
      </Content>
    </Section>
  );
};

const BodySection = () => {
  return (
    <>
      <Tag>
        Jewelers Are Shocked!... A Look Alike
        <br />
        "Diamond" That Fools Even Them
      </Tag>
      <StaticImage
        src="../../images/gold-studs.png"
        alt="gold-studs"
        placeholder="blurred"
        style={{ width: "100%" }}
        imgStyle={{
          width: "100%",
        }}
      />
      <Paragraph>
        <strong>
          For years jewelers and jewelry lovers have searched for an affordable
          and high-quality alternative{` `}
        </strong>
        to expensive blood diamonds and over-priced metals that rarely
        appreciate in value, in{" "}
        <span style={{ textDecoration: "underline", fontWeight: "700" }}>
          2021 that search was finally over
        </span>
        .{" "}
      </Paragraph>
    </>
  );
};

const GridContainer = ({
  handleNavToNextPage,
}: {
  handleNavToNextPage: () => void;
}) => {
  const context = useContext<Theme>(ThemeContext);
  return (
    <Grid color="rgba(87, 191, 124, 0.1);">
      <Column>
        <ParagraphBox>
          <Paragraph>
            Prior to our discovery the alternatives were, cubic zircons that
            almost always turn colors and look like crap after a few times in
            the shower or once your makeup gets close to it.
          </Paragraph>
        </ParagraphBox>
        <ParagraphBox>
          <Paragraph>
            Moissanite which quite frankly is just as expensive as a real
            diamond.
          </Paragraph>
        </ParagraphBox>
        <ParagraphBox>
          <Paragraph>
            Or Lab Grown diamonds which is even more expensive than moissanite.
          </Paragraph>
        </ParagraphBox>
        <Paragraph style={{ fontStyle: "italic" }}>
          Realizing the options were either
        </Paragraph>
        <Details>
          <HiEmojiSad
            color={context.danger}
            size={20}
            style={{ marginRight: "10px" }}
          />
          <Paragraph style={{ color: context.danger }}>
            {` `} Cheap crap CZ’s
          </Paragraph>
        </Details>
        <Details>
          <IoIosSad
            size={20}
            color={context.danger}
            style={{ marginRight: "10px" }}
          />
          <Paragraph style={{ color: context.danger }}>
            {` `} Expensive moissanite
          </Paragraph>
        </Details>
        <Details>
          <FaSadTear
            size={20}
            color={context.danger}
            style={{ marginRight: "10px" }}
          />
          <Paragraph style={{ color: context.danger }}>
            {` `} Or even more expensive Lab grown diamonds
          </Paragraph>
        </Details>
      </Column>
      <Column>
        <ImageContainer>
          <StaticImage
            src="../../images/etsy.png"
            alt="gold-studs"
            placeholder="blurred"
            style={{ width: "100%" }}
            imgStyle={{
              width: "100%",
            }}
          />
        </ImageContainer>
        <AddToCartButton onClick={handleNavToNextPage}>
          Add To Cart
        </AddToCartButton>
      </Column>
    </Grid>
  );
};

const SmallParagraphSection = () => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <Paragraph style={{ marginTop: "1rem" }}>
        <strong style={{ color: "#ff00ed" }}>Luciana Rose</strong> took her
        decades of jewelry experience and a little science and created what is
        widely considered the best diamond alternative for the price.
      </Paragraph>
      <Paragraph>
        Unlike a CZ Luciana roses diamond veneer will never turn colors or get
        cloudy. They will retain their brilliance for years to come just like a
        real diamond.
      </Paragraph>
    </div>
  );
};

const PictureGrid = ({
  handleNavToNextPage,
}: {
  handleNavToNextPage: () => void;
}) => {
  return (
    <Grid
      color="rgba(87, 191, 124, 0.1);"
      style={{
        border: "3px dashed rgba(87, 191, 124,1)",
        gridTemplateColumns: ".7fr 1fr",
      }}
    >
      <Column>
        <StaticImage
          src="../../images/woman.png"
          alt="gold-studs"
          placeholder="blurred"
          style={{ width: "100%", maxWidth: "350px" }}
          imgStyle={{
            width: "100%",
          }}
        />
      </Column>
      <Column>
        <Paragraph>
          And unlike moissanite or lab grown diamonds, Luciana Rose’s diamond
          veneer stones are actually really affordable, at a price point much
          closet to a CZ the average person can now have what looks just like a
          real diamond at the cost of a CZ and they never have to worry about
          their stone turning cloudy or looking like a cheap pair of earrings.
        </Paragraph>
        <Paragraph>
          People cant get enough of Luciana rose’s unique diamond veneer studs,
          just see some of the 1000’s of reviews we got just this year.
        </Paragraph>
        <AddToCartButton onClick={handleNavToNextPage}>
          Click Here and Have a Pair Sent To You For Just the Cost of Shipping
        </AddToCartButton>
      </Column>
    </Grid>
  );
};

const PictureGridTwo = () => {
  return (
    <Grid color="rgba(132, 114, 219, .10)">
      <Column>
        <Paragraph>
          <FaShieldAlt size={20} color="rgb(132, 114, 219)" />
          <strong style={{ color: "rgb(132, 114, 219)" }}>
            Backed by our good girl guarantee
          </strong>
        </Paragraph>
        <Paragraph>
          you’ll never have to worry about buyers’ remorse. You’ll love what we
          send you or get your money back, additionally if it ever turns colors,
          we will ship you a new one, even if that happens in 10 years from now,
          we will ship you a new pair no questions asked.
        </Paragraph>
        <Paragraph>
          <BiHappyHeartEyes size={20} color="rgb(132, 114, 219)" />
          <strong style={{ color: "rgb(132, 114, 219)" }}>
            We know our jewelry lasts forever and were prepared to stand by it
            forever!
          </strong>
        </Paragraph>
        <Paragraph>
          All our jewelry is right here in the United States and ready for
          immediate delivery using the United States Postal Service.
        </Paragraph>
      </Column>
      <Column>
        <StaticImage
          src="../../images/ll.png"
          alt="gold-studs"
          placeholder="blurred"
          style={{ width: "100%", maxWidth: "350px" }}
          imgStyle={{
            width: "100%",
          }}
        />
      </Column>
    </Grid>
  );
};

const PictureGridThree = ({
  handleNavToNextPage,
}: {
  handleNavToNextPage: () => void;
}) => {
  return (
    <Grid
      style={{
        border: "3px solid rgba(87, 191, 124, 1)",
        boxShadow: "inset 0 1px 20px #eee",
      }}
    >
      <Column>
        <Link
          to="/order/OrderPage"
          style={{ boxShadow: "0 1px 20px #33333322" }}
        >
          <StaticImage
            src="../../images/etsy.png"
            alt="gold-studs"
            placeholder="blurred"
            style={{ width: "100%", boxShadow: "0 1px 20px #33333322" }}
            imgStyle={{
              width: "100%",
              boxShadow: "0 1px 20px #33333322",
            }}
          />
        </Link>
      </Column>
      <Column>
        <Paragraph>
          When you order today your order will ship within 24 hours and take 2-7
          days to arrive depending on your local mail delivery times.
        </Paragraph>
        <AddToCartButton onClick={handleNavToNextPage}>
          Add To Cart
        </AddToCartButton>
      </Column>
    </Grid>
  );
};

export default Lander;
