import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ApiVersion, Shopify } from '@shopify/shopify-api';
// config();

//Not sure this is needed
const shopifyGraphqlFactory = {
  provide: 'SHOPIFY_GRAPHQL',
  useFactory: () => {
    const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

    Shopify.Context.initialize({
      API_KEY,
      API_SECRET_KEY,
      SCOPES: [SCOPES],
      HOST_NAME: HOST.replace(/https:\/\//, ''),
      IS_EMBEDDED_APP: false,
      API_VERSION: ApiVersion.April21,
      IS_PRIVATE_APP: true,
    });

    return Shopify;
  },
};

@Module({
  providers: [shopifyGraphqlFactory],
  exports: ['SHOPIFY_GRAPHQL'],
})
export class ShopifyGraphqlModule {}
