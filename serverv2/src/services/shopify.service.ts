import { Inject, Injectable } from '@nestjs/common';
import { OrderObjectParams } from '../interfaces/order.interface';
import { Product } from 'src/mongo/schemas/order.model';

@Injectable()
export class ShopifyService {
  constructor(@Inject('SHOPIFY') private readonly shopify) {}

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

  async locateOrder(id: string) {
    return await this.shopify.order.get(id);
  }
}
