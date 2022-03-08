export default {
  title: "Halo Stud Earrings",
  img: "victoria.png",
  funnel_name: "Victoria Funnel",
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
    sku: "TNNCK",
    checkboxColor: "#eeeeee",
    orderSummaryText: "Tennis Necklace - 99.95",
    displayPrice: "$99.95",
    numPrice: 99.95,
    id: 5353157427357,
    isRecurring: false,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/78/927c7704cd4c6d920c0394145a476d/victoria-pendant-gold.jpg",
    checkboxHeadline: "Added Bonus: If Checked This Matching Pendant is FREE!",
    otoHeadline: "Become a Part of our Insiders Club and Get This For FREE:",
    otoText:
      "Every month we curate a different piece of outstanding jewelry and ship it at no obligation to you (Return items you do not like), pieces are made with pure sterling silver, 14k gold or other precious metals. These are pieces that will last a lifetime and grow in value over time. For just $59.95 a month you’ll get first access to our very best pieces, try it for 10 days and get your first piece (14K Gold Vermeil Matching Victoria Pendant) sent at no cost to you",
    sku: "victpend-g",
    checkboxColor: "#ffe300",
    orderSummaryText: "Free Gold Victoria Pendant With Insiders Club",
    displayPrice: "FREE",
    numPrice: 0,
    id: 7154422120640,
    isRecurring: true,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/27/e6bc2932594b2790999dea9f8f1bad/Untitled-design-79-.png",
    checkboxHeadline: "Yes I Want The Matching Earring In 14K Gold Vermeil",
    otoHeadline: "Add the Halo Stud in 14K Gold Vermeil [Lowest Price Offered]",
    otoText:
      "Check the box above to add our very popular micro pave halo stud in 14K gold vermeil. For only $38 more you can add the 14K gold vermeil halo studs to your order, Originally $89.95, youll save over 60% when added on to your order today.",
    sku: "victg",
    checkboxColor: "#eeeeee",
    orderSummaryText: "Gold Victoria Earrings",
    displayPrice: "$38.00",
    numPrice: 38.0,
    id: 6629079515328,
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
    sku: "VICT-11",
    title:
      "Free Pair Of Victoria Earrings - (Originally $79.95) - Just Pay Expedited S/H",
    displayPrice: "Free + $9.99 S/H",
    numPrice: 9.98,
    bestDeal: false,
    dealHeadline: undefined,
    id: 4362661134436,
    isRecurring: false,
  },
  {
    sku: "VICT-3",
    title: `3 Pairs - 1CT Micro Pave Halo Victoria Earrings`,
    displayPrice: "$9/Pair + Free Shipping",
    numPrice: 27.0,
    bestDeal: true,
    dealHeadline: `BEST DEAL`,
    id: 2548826013796,
    isRecurring: false,
  },
  {
    sku: "VICT-6",
    title: `6 Pairs - 1CT Micro Pave Halo Victoria Earrings`,
    displayPrice: "$8/Ea + Free Shipping",
    numPrice: 48.0,
    bestDeal: false,
    dealHeadline: undefined,
    id: 2548826013796,
    isRecurring: false,
  },
];

export type OTOProps = {
  imgOrVideoSrc: string;
  displayPrice: string;
  numPrice: number;
  id: number;
  sku: string;
  title: string;
  type: string;
  options: Array<OtoOptionProps> | undefined;
};

export type OtoOptionProps = {
  sku: string;
  displayPrice: string;
  numPrice: number;
  id: number;
  ring_size: string;
  type: string;
  name: string;
};

export const OtoDATA: Array<OTOProps> = [
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/2a/8d7f08b8e74dfab9731ca1f66011ee/IMG_3408.jpg",
    sku: "6MMGOLD",
    displayPrice: "$10.00",
    numPrice: 10.0,
    id: 5778303189149,
    title: "1CT Gold Studs",
    type: "OTO",
    options: undefined,
  },
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/d4/d4ae06729b4e6091f05fcf25d88261/Gif-4.gif",
    sku: "slvrbngr-5",
    displayPrice: "$38.00",
    numPrice: 38.0,
    id: 4354929885284,
    title: "Eternity Band",
    type: "OTO",
    options: [
      {
        sku: "slvrbngr-5",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "5",
        type: "OTO",
        name: "5",
      },
      {
        sku: "slvrbngr-6",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "6",
        type: "OTO",
        name: "6",
      },
      {
        sku: "slvrbngr-7",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "7",
        type: "OTO",
        name: "7",
      },
      {
        sku: "slvrbngr-8",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "8",
        type: "OTO",
        name: "8",
      },
      {
        sku: "slvrbngr-9",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "9",
        type: "OTO",
        name: "9",
      },
      {
        sku: "slvrbngr-10",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "10",
        type: "OTO",
        name: "10",
      },
      {
        sku: "slvrbngr-65",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "6.5",
        type: "OTO",
        name: "6.5",
      },
      {
        sku: "slvrbngr-75",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "7.5",
        type: "OTO",
        name: "7.5",
      },
      {
        sku: "slvrbngr-85",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "8.5",
        type: "OTO",
        name: "8.5",
      },
      {
        sku: "slvrbngr-95",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "9.5",
        type: "OTO",
        name: "9.5",
      },
    ],
  },
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/9b/139fb6e990444ebdba9902d0ea7377/Royalty-Ring-2.gif",
    sku: "slrnst1-5",
    id: 4379186692196,
    title: "Royalty Ring",
    displayPrice: "$38 (Save 71%)",
    numPrice: 38.0,
    type: "OTO",
    options: [
      {
        sku: "slrnst1-5",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "5",
        type: "OTO",
        name: "5",
      },
      {
        sku: "slrnst1-6",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "6",
        type: "OTO",
        name: "6",
      },
      {
        sku: "slrnst1-7",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "7",
        type: "OTO",
        name: "7",
      },
      {
        sku: "slrnst1-8",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "8",
        type: "OTO",
        name: "8",
      },
      {
        sku: "slrnst1-9",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "9",
        type: "OTO",
        name: "9",
      },
      {
        sku: "slrnst1-10",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4379186692196,
        ring_size: "10",
        type: "OTO",
        name: "10",
      },
    ],
  },
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/52/b8a052b9bf4aa18124f3511f67977c/61Rem213S-L._UL1500_.jpg",
    sku: "1CTNECK",
    id: 4171607539812,
    title: "Silver Stud Pendant",
    displayPrice: "$20",
    numPrice: 20.0,
    type: "OTO",
    options: null,
  },
  {
    imgOrVideoSrc:
      "https://cdn.shopify.com/videos/c/vp/d97d88897caa47baa9cee1b5c4575037/d97d88897caa47baa9cee1b5c4575037.HD-1080p-7.2Mbps.mp4",
    sku: "VICT-11",
    id: 4362661134436,
    title: "Victoria Lab ‘Diamond’ Earrings",
    displayPrice: "$16",
    numPrice: 16.0,
    type: "OTO",
    options: null,
  },
];
