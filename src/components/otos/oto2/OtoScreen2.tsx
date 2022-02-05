import React, { useState } from "react";
import styled from "styled-components";
import Timer from "../../orderpage/hero/Timer";
import { OtoDATA } from "../../../product/ProductData";
import { Link } from "gatsby";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("https://images.clickfunnels.com/45/9bc61133b2473faad938e2a581fe65/Dark-BG-2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Header = styled.nav`
  padding: 0.5rem 0;
  background-color: #d748cd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  & span {
    color: #ffe300;
  }
`;

const Subheading = styled.h3`
  color: #fff;
`;

const HeadingTwo = styled.h2`
  font-weight: 100;
  color: #666;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 1rem 2rem;
  color: #d748cd;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #d748cd;
  border-radius: 120px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  margin-top: 1rem;
  & span {
    color: #999;
    font-weight: 300;
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #d748cd;
    color: #fff;
  }
`;

const Image = styled.img`
  max-width: 350px;
`;

const Divider = styled.div`
  display: block;
  height: 1.2px;
  width: 80%;
  background-color: #999;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 70%;
  margin-top: 2rem;
  justify-content: center;
  gap: 3rem;
`;
const AddSizebutton = styled.button`
  border-radius: 120px;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #222;
  }
`;

const ToggleButton = styled.button`
  border-radius: 120px;
  border: 2px solid #d748cd33;
  background-color: #d748cd;
  color: #fff;
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  margin: 2rem 0;
  &:hover {
    cursor: pointer;
    background-color: #d748cd99;
    color: #fff;
  }
`;

const OtoScreen2 = () => {
  const [currentOtoIndex, setCurrentOtoIndex] = useState<number>(1);

  return (
    <Section>
      <Header>
        <HeaderContent>
          <Heading>
            <span>Congratulations! 🎉</span>
            <br /> You've Just Unlocked Wholesale Pricing On Some Of Our Best
            Items, Please Consider Adding These
            <span>Heavily Discounted Items</span> To Your Order Now As They Will
            Never Be Offered At This <span>Low a Price</span> Again.💎
          </Heading>
        </HeaderContent>
      </Header>
      <Content>
        <Heading>
          Add This Everlasting Eternity Band At a<br />
          <span> HUGE Discount %</span>
        </Heading>

        <Subheading>
          14K White Gold Vermeil Filled With Our Signature Lab Finished Stones
        </Subheading>
        <Divider />

        <Image src={OtoDATA[currentOtoIndex].imgOrVideoSrc} alt="product" />

        <Heading>
          <span> New Reduced Price $38</span>
        </Heading>
        <Subheading>(Originally $129.95)</Subheading>
        {/* this page should have ring sizes */}
        {OtoDATA[currentOtoIndex].options && (
          <Options>
            {OtoDATA[currentOtoIndex].options.map(
              (option: { ring_size: number }, key: number) => {
                return (
                  <AddSizebutton key={key}>
                    Add Size {option.ring_size}
                  </AddSizebutton>
                );
              }
            )}
          </Options>
        )}

        <ToggleButton>
          Don't know your ring size? Click here to find out
        </ToggleButton>

        <Heading>
          Add Our Angel Infinity Ring For <span>Only $38</span>
        </Heading>

        <Subheading>
          Made with 100% .925 Sterling Silver coated in 14K White Gold
        </Subheading>

        <Image
          src="https://images.clickfunnels.com/29/8e14b490ab4423a7e6905c7732b32e/Product-1.jpg"
          alt="product"
        />

        <Button>I want this ring for $38</Button>

        <Link to="/otos/Oto3" color="#eee">
          No thanks I don't need this now
        </Link>
      </Content>
    </Section>
  );
};

export default OtoScreen2;
