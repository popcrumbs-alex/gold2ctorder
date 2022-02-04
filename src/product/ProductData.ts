export default {
  title: "14k Gold Lab Diamond Earrings",
  img: "gold-studs.png",
};

export type BumpProps = {
  imgSrc: string;
  checkboxHeadline: string;
  otoHeadline: string;
  otoText: string;
  sku: string;
  checkboxColor: string;
  orderSummaryText: string;
  displayPrice: string;
  numPrice: number;
  id: number;
  isRecurring: boolean;
};

export type SelectedBump = {
  title: string;
  price: number;
  displayPrice: string;
  sku: string;
  type: string;
  id: number;
  isRecurring: boolean;
};

export const orderBumps: Array<BumpProps> = [
  {
    imgSrc:
      "https://images.clickfunnels.com/c6/d69c9e3a2b4004ad27353df7016587/tennisnecklace.jpg",
    checkboxHeadline: "Yes, Add The 18K White Gold Vermeil Tennis Necklace",
    otoHeadline: "One Time Deal, Add On Now For This Discounted Price:",
    otoText:
      "Get our most exclusive piece at our biggest discount, ever! Made in 18K white gold vermeil our tennis necklace has over 5CT’s of Luciana’s roses exclusive diamond like stones. At 18 inches in length this necklace shines like no other. Add it for only $99.95. Get 90 days to return it for a full refund if you are not happy with it.",
    sku: "TNNCL",
    checkboxColor: "#eeeeee",
    orderSummaryText: "Tennis Necklace - 99.95",
    displayPrice: "$99.95",
    numPrice: 99.95,
    id: 5353157427357,
    isRecurring: false,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/f5/10777429e24c45b4548ee5059afabb/signature-lulu-couture-gold-pendants-1_1024x1024-2x.png",
    checkboxHeadline: "Added Bonus: If Checked This Matching Pendant is FREE!",
    otoHeadline: "Become a Part of our Insiders Club and Get This For FREE:",
    otoText:
      "Every month we curate a different piece of outstanding jewelry and ship it at no obligation to you (Return items you do not like), pieces are made with pure sterling silver, 14k gold or other precious metals. These are pieces that will last a lifetime and grow in value over time. For just $59.95 a month you’ll get first access to our very best pieces, try it for 10 days and get your first piece (14K Gold Vermeil Matching 2CT Pendant) sent at no cost to you",
    sku: "GOLDPEND",
    checkboxColor: "#ffe300",
    orderSummaryText: "Free 2CT Gold Pendant With Insiders Club",
    displayPrice: "FREE",
    numPrice: 0,
    id: 4255185109092,
    isRecurring: true,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/b0/b9943eab2048f58e780b4a90b5dd1e/White_15_1024x1024-2x-1-.jpg",
    checkboxHeadline:
      "Yes, I Add The 2CT Silver Earrings + Pendant For Only $24",
    otoHeadline: "{Almost Sold Out} - Discount Ends Soon:",
    otoText:
      "On sale today for only $24 more, get our signature Lulu Rose earrings with matching 2CT pendant in sterling silver Vermeil. Purchased separately these cost over $140 but today you get them for only $24 when added on to this order only.",
    sku: "SEARPEN",
    checkboxColor: "#eeeeee",
    orderSummaryText: "Silver Earrings and Pendant",
    displayPrice: "$24.00",
    numPrice: 24.0,
    id: 4348189933668,
    isRecurring: false,
  },
];

export interface ProductProps {
  sku: string;
  title: string;
  displayPrice: string;
  numPrice: number;
  bestDeal: boolean;
  dealHeadline: string | undefined;
  id: number;
  isRecurring: boolean;
}

export const ProductSelectorItems: Array<ProductProps> = [
  {
    sku: "GOLDEAR",
    title:
      "1 - Pair of FREE Gold 2ct Lab Diamond Earrings - (Originally $89.95) - Just Pay $9.98 Shipping",
    displayPrice: "Free + $9.98 S/H",
    numPrice: 9.98,
    bestDeal: false,
    dealHeadline: undefined,
    id: 4273995350116,
    isRecurring: false,
  },
  {
    sku: "3STUDS-custom",
    title: `3 - Pairs of Lab Diamond Earrings (14K Gold, 14K Rose Gold, Sterling Silver) - Only $27`,
    displayPrice: "$9/Pair + Free Shipping",
    numPrice: 27.0,
    bestDeal: true,
    dealHeadline: `VALENTINE'S DAY DEAL`,
    id: 6550551625920,
    isRecurring: false,
  },
  {
    sku: "GOLDEAR-5",
    title: `5 - Pairs of Gold 2ct Lab Diamond Earrings (Originally $475) Over 92% Off - Only $40`,
    displayPrice: "$8/Ea + Free Shipping",
    numPrice: 40.0,
    bestDeal: false,
    dealHeadline: undefined,
    id: 5595271987357,
    isRecurring: false,
  },
];
