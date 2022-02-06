import { Inject, Injectable } from '@nestjs/common';
import { OrderObjectParams } from '../interfaces/order.interface';
import { Product } from 'src/mongo/schemas/order.model';
import { UpdateShopifyOrderInput } from 'src/graphql/inputs/shopify.input';
import { TestResponse } from 'src/graphql/responses/order.response';
import axios from 'axios';
@Injectable()
export class ShopifyService {
  constructor(
    @Inject('SHOPIFY') private readonly shopify,
    @Inject('SHOPIFY_GRAPHQL') private readonly shopifyGraphql,
  ) {}
  async testGraphql({ req, res }): Promise<TestResponse> {
    // Load the current session to get the `accessToken`
    // GraphQLClient takes in the shop url and the accessToken for that shop.

    //STEP ONE IS TO OPEN AN ORDER FOR EDITING AND RECEIVE THE CALCULATEDORDER ID
    // const client = new Shopify.Clients.Graphql(
    //   `https://${process.env.SHOP}/admin/api/2021-07/graphql.json `,
    //   process.env.ADMIN_PASSWORD,
    // );
    // const request = await axios({
    //   url: `https://${process.env.SHOP}/admin/api/2021-04/graphql.json `,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Shopify-Access-Token': process.env.ADMIN_PASSWORD,
    //   },
    //   data: {
    //     query: `mutation orderEditBegin {
    //     orderEditBegin(id: "gid://shopify/Order/4326537134272") {
    //       calculatedOrder {
    //         id
    //       }
    //       userErrors {
    //         field
    //         message
    //       }
    //     }
    //   }`,
    //   },
    // })
    //   .then((response) =>
    //     console.log('response!', JSON.stringify(response.data)),
    //   )
    //   .catch((err) => console.error(err));

    // console.log('products', request.data);

    //NEXT IS TO ADD THE VARIAND ID TO THE ORDER IN THE EDITING PROCESS
    //HOWEVER AN ISSUE IS THAT PRICE CANNOT BE  OVERRIDEN HERE
    const request = await axios({
      url: `https://${process.env.SHOP}/admin/api/2021-04/graphql.json `,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.ADMIN_PASSWORD,
      },
      data: {
        query: `mutation orderEditAddVariant {
            orderEditAddVariant(id: "gid://shopify/CalculatedOrder/62876254400", quantity:1, variantId: "gid://shopify/ProductVariant/36854346416285", price: 10) {
              calculatedLineItem {
                id
                quantity
              }
              calculatedOrder {
                id

              }
              userErrors {
                field
                message
              }
            }
          }`,
      },
    })
      .then((response) =>
        console.log('response!', JSON.stringify(response.data)),
      )
      .catch((err) => console.error(err));

    //STEP 3 IS TO COMMIT THE ORDER FOR UPDATE AND BINGO BANGO
    //     const request = await axios({
    //       url: `https://${process.env.SHOP}/admin/api/2021-04/graphql.json `,
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Shopify-Access-Token': process.env.ADMIN_PASSWORD,
    //       },
    //       data: {
    //         query: `mutation orderEditCommit  {
    //   orderEditCommit(id: "gid://shopify/CalculatedOrder/62876090560") {
    //     order {
    //       id
    //     }
    //     userErrors {
    //       field
    //       message
    //     }
    //   }
    // }`,
    //   },
    // })
    //   .then((response) =>
    //     console.log('response!', JSON.stringify(response.data)),
    //   )
    //   .catch((err) => console.error(err));

    return {
      message: 'TES!',
      success: true,
      products: [],
    };
  }
  async getProducts(products: Array<Product>): Promise<Array<any>> {
    const foundProducts = await Promise.all(
      products.map(async (product: Product) => {
        //locate item in shopify store
        const foundProduct = await this.shopify.product.get(product.id);
        //variant is required to purchase through api
        const extractVariant = await foundProduct.variants.filter((variant) => {
          return variant.sku === product.sku;
        });

        //declaring a price overrides the store set price
        return extractVariant.map((variant) => ({
          variant_id: variant.id,
          quantity: 1,
          price: product.price,
        }));
      }),
    );

    const flattenRecursive = (arr: Array<any>) => {
      return arr.reduce((prev, next) => {
        return Array.isArray(next) ? prev.concat(next) : flattenRecursive(next);
      }, []);
    };

    return flattenRecursive(foundProducts);
  }

  async createOrder(orderObject: OrderObjectParams): Promise<any> {
    return await this.shopify.order.create(orderObject);
  }

  //TODO REST API CANNOT EDIT ORDER
  //NEED TO SETUP GRAPHQL API
  async updatePendingOrder(
    updateOrderInput: UpdateShopifyOrderInput,
  ): Promise<{ statusMessage: string; success: boolean; shopifyOrder: any }> {
    try {
      const { order_id, products } = updateOrderInput;

      const line_items = await this.getProducts(products);

      if (line_items.length === 0) throw new Error('Could not locate products');

      console.log('line items!', line_items);

      const foundOrderToUpdate = await this.shopify.order.update(order_id, {
        order: {
          line_items,
          note: 'Please add this product!!!!!!',
        },
      });

      if (!foundOrderToUpdate) throw new Error('This order does not exist :(');

      return {
        statusMessage: 'Updated an order in shopify',
        success: true,
        shopifyOrder: foundOrderToUpdate,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async locateOrder(id: string) {
    return await this.shopify.order.get(id);
  }
}
