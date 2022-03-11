export default {
  title: "We are holding your FREE Lab Diamond Earrings for",
  img: "silver-2ct.png",
  funnel_name: "Silver Earrings Funnel",
};

export const stickyConfig = {
  oto_billing_model: 2,
  recurring_billing_model: 3,
  sticky_campaign_id: 1,
  sticky_offer_id: 1,
  sticky_trial_product_id: 2,
  sticky_shipping_id: 2,
  sticky_next_recurring_product: 4,
};

const {
  oto_billing_model,
  recurring_billing_model,
  sticky_campaign_id,
  sticky_offer_id,
  sticky_next_recurring_product,
} = stickyConfig;

//TODO configure all products for sticky.io

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
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_trial_product_id: number | undefined;
  sticky_next_recurring_product_id: number | undefined;
  sticky_variant_object:
    | undefined
    | {
        attribute_name: string;
        attribute_value: string;
      };
};

//info is pulled from shopify
//id is product id in shopify
export type SelectedBump = {
  title: string;
  price: number;
  displayPrice: string;
  sku: string;
  type: string;
  id: number;
  isRecurring: boolean;
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_trial_product_id: number | undefined;
  sticky_next_recurring_product_id: number | undefined;
  sticky_variant_object:
    | undefined
    | {
        attribute_name: string;
        attribute_value: string;
      };
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
    sticky_product_id: 9,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_next_recurring_product_id: undefined,
    sticky_variant_object: undefined,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/ff/7daaa1cf4e4256a24c226d5b2f3ce1/Untitled-design---2020-07-09T145011.132.png",
    checkboxHeadline: "Added Bonus: If Checked This Matching Pendant is FREE!",
    otoHeadline: "Become a Part of our Insiders Club and Get This For FREE:",
    otoText:
      "Every month we curate a different piece of outstanding jewelry and ship it at no obligation to you (Return items you do not like), pieces are made with pure sterling silver, 14k gold or other precious metals. These are pieces that will last a lifetime and grow in value over time. For just $59.95 a month you’ll get first access to our very best pieces, try it for 10 days and get your first piece (Matching 2CT Pendant) sent at no cost to you.",
    sku: "1CTNECK-1",
    checkboxColor: "#ffe300",
    orderSummaryText: "Free Silver Stud Pendant With Insiders Club",
    displayPrice: "FREE",
    numPrice: 0,
    id: 4349439508580,
    isRecurring: true,
    sticky_product_id: 2,
    sticky_offer_id,
    sticky_billing_model_id: recurring_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: 2,
    sticky_next_recurring_product_id: sticky_next_recurring_product,
    sticky_variant_object: undefined,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/85/efd0f76ffb4e7787778d78af1daadf/gold-set.png",
    checkboxHeadline: "Yes! Add The 14K Gold Vermeil Earring & Pendant Set",
    otoHeadline: "{Sale] 14K Gold Vermeil Earring and Bracelet Set Only $34:",
    otoText:
      "Originally $99.95, Enhance your look with this stunning 14K gold vermeil 2CT pendant and earring set. The sparkle of the individual stones are stunning. This set will only be offered at this deep discounted price through this free earring promotion. Add this to your order today for ONLY $34.",
    sku: "GOLDEARPEND",
    checkboxColor: "#eeeeee",
    orderSummaryText: "Gold Earrings and Pendant",
    displayPrice: "$34.00",
    numPrice: 34.0,
    id: 4171609604196,
    isRecurring: false,
    sticky_product_id: 10,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_next_recurring_product_id: undefined,
    sticky_variant_object: undefined,
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
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_trial_product_id: undefined;
  sticky_variant_object:
    | undefined
    | {
        attribute_name: string;
        attribute_value: string;
      };
}

export const ProductSelectorItems: Array<ProductProps> = [
  {
    sku: "DVST11",
    title: "1 Pair of 2CT Ea. Lab Diamond Earrings in .925 Sterling Silver",
    displayPrice: "Free + $9.98 S/H",
    numPrice: 9.98,
    bestDeal: false,
    dealHeadline: undefined,
    id: 4349401399396,
    isRecurring: false,
    sticky_product_id: 1,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },

  {
    sku: "3STUDS",
    title: `3 Pairs of 2CT Lab Diamond Earrings: ( .925 Silver, Gold Vermeil, Rose Gold Vermeil) - (Originally $279.85)`,
    displayPrice: "$9/ea",
    numPrice: 27.0,
    bestDeal: true,
    dealHeadline: "BEST DEAL",
    id: 5598601019549,
    isRecurring: false,
    sticky_product_id: 11,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },
  {
    sku: "BBNK3SETS",
    title: `Raid The Vault - Get Our 2Ct Earrings + 2Ct Pendant in Silver, 14 Gold & 14K Rose Gold Vermeil - 3 Sets (MSRP: $289.85)`,
    displayPrice: "$98 + Free Shipping",
    numPrice: 98.0,
    bestDeal: false,
    dealHeadline: undefined,
    id: 6098425610432,
    isRecurring: false,
    sticky_product_id: 12,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
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
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_variant_object:
    | undefined
    | {
        attribute_name: string;
        attribute_value: string;
      };
};

export type OtoOptionProps = {
  sku: string;
  displayPrice: string;
  numPrice: number;
  id: number;
  ring_size: string;
  type: string;
  name: string;
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_variant_object:
    | undefined
    | {
        attribute_name: string;
        attribute_value: string;
      };
};

export const OtoDATA: Array<OTOProps> = [
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/9d/f475f375984ac089d9256d5319f4e8/IMG-3426-Facetune-25-01-2022-16-49-37-jpg.jpg",
    sku: "6MMStud-1",
    displayPrice: "$10.00",
    numPrice: 10.0,
    id: 5281985233053,
    title: "1CT Silver Studs",
    type: "OTO",
    options: undefined,
    sticky_product_id: 13,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_variant_object: undefined,
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
    sticky_product_id: 17,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_variant_object: {
      attribute_name: "Size",
      attribute_value: "5",
    },
    options: [
      {
        sku: "slvrbngr-5",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "5",
        type: "OTO",
        name: "5",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "5",
        },
      },
      {
        sku: "slvrbngr-6",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "6",
        type: "OTO",
        name: "6",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "6",
        },
      },
      {
        sku: "slvrbngr-7",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "7",
        type: "OTO",
        name: "7",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "7",
        },
      },
      {
        sku: "slvrbngr-8",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "8",
        type: "OTO",
        name: "8",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "8",
        },
      },
      {
        sku: "slvrbngr-9",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "9",
        type: "OTO",
        name: "9",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "9",
        },
      },
      {
        sku: "slvrbngr-10",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "10",
        type: "OTO",
        name: "10",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "10.0",
        },
      },
      {
        sku: "slvrbngr-65",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "6.5",
        type: "OTO",
        name: "6.5",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "6.5",
        },
      },
      {
        sku: "slvrbngr-75",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "7.5",
        type: "OTO",
        name: "7.5",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "7.5",
        },
      },
      {
        sku: "slvrbngr-85",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "8.5",
        type: "OTO",
        name: "8.5",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "8.5",
        },
      },
      {
        sku: "slvrbngr-95",
        displayPrice: "$38.00",
        numPrice: 38.0,
        id: 4354929885284,
        ring_size: "9.5",
        type: "OTO",
        name: "9.5",
        sticky_product_id: 17,
        sticky_offer_id,
        sticky_billing_model_id: oto_billing_model,
        sticky_quantity: 1,
        sticky_variant_object: {
          attribute_name: "Size",
          attribute_value: "9.5",
        },
      },
    ],
  },
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/05/8050bb7a4d4bcab8ecc4a1959bd448/Rose-Gold-2ct-Earrings.jpg",
    sku: "RGOLDEAR",
    id: 4273994367076,
    title: "Add The 2CT Rose Gold Studs Only $15",
    displayPrice: "Yes Add Just The Earrings For $15",
    numPrice: 15.0,
    type: "OTO",
    options: null,
    sticky_product_id: 37,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_variant_object: undefined,
  },
  {
    imgOrVideoSrc:
      "https://images.clickfunnels.com/55/fbc1b39d544a57b6ceb311fab07708/White-18.jpg",
    sku: "ROSEEARPEND",
    id: 4171609636964,
    title: "Add The 2CT Rose Gold Studs and Pendant - $25",
    displayPrice: "YES! Add The Set For $25",
    numPrice: 25.0,
    type: "OTO",
    options: null,
    sticky_product_id: 15,
    sticky_offer_id,
    sticky_billing_model_id: oto_billing_model,
    sticky_quantity: 1,
    sticky_variant_object: undefined,
  },
];
