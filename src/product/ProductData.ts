export default {
  title: "14k Gold Lab Diamond Earrings",
  img: "gold-studs.png",
  funnel_name: "Gold 2CT Funnel",
};

export const stickyConfig = {
  oto_billing_model: 2,
  recurring_billing_model: 3,
  sticky_campaign_id: 3,
  sticky_offer_id: 3,
  sticky_trial_product_id: 3,
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
    sticky_billing_model_id: oto_billing_model,
    sticky_next_recurring_product_id: undefined,
    sticky_offer_id,
    sticky_product_id: 9,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
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
    sticky_billing_model_id: recurring_billing_model,
    sticky_next_recurring_product_id: 4,
    sticky_offer_id,
    sticky_product_id: 3,
    sticky_quantity: 1,
    sticky_trial_product_id: 3,
    sticky_variant_object: undefined,
  },
  {
    imgSrc:
      "https://images.clickfunnels.com/b0/b9943eab2048f58e780b4a90b5dd1e/White_15_1024x1024-2x-1-.jpg",
    checkboxHeadline: "Yes! Add The 2CT Silver Earrings + Pendant For Only $24",
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
    sticky_billing_model_id: oto_billing_model,
    sticky_next_recurring_product_id: undefined,
    sticky_offer_id,
    sticky_product_id: 16,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },
];

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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 39,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },
  {
    sku: "3STUDS-custom",
    title: `3 - Pairs of Lab Diamond Earrings (14K Gold, 14K Rose Gold, Sterling Silver) - Only $27`,
    displayPrice: "$9/Pair + Free Shipping",
    numPrice: 27.0,
    bestDeal: true,
    dealHeadline: `BEST DEAL`,
    id: 6550551625920,
    isRecurring: false,
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 12,
    sticky_quantity: 1,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },
  {
    sku: "GOLDEAR-3",
    title: `3 - Pairs of Gold 2ct Lab Diamond Earrings (Originally $475) Over 92% Off - Only $29.94`,
    displayPrice: "$9.98/Ea + Free Shipping",
    numPrice: 29.94,
    bestDeal: false,
    dealHeadline: undefined,
    id: 5595271987357,
    isRecurring: false,
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 39,
    sticky_quantity: 3,
    sticky_trial_product_id: undefined,
    sticky_variant_object: undefined,
  },
];

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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 14,
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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
        sticky_billing_model_id: oto_billing_model,
        sticky_offer_id,
        sticky_product_id: 17,
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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 37,
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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 15,
    sticky_quantity: 1,
    sticky_variant_object: undefined,
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
    sticky_billing_model_id: oto_billing_model,
    sticky_offer_id,
    sticky_product_id: 40,
    sticky_quantity: 1,
    sticky_variant_object: undefined,
  },
];
