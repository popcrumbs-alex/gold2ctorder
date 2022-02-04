import { Order } from "src/mongo/schemas/order.model";

export interface CustomerCreationProps {
  firstName: string;
  lastName: string;
  email: string;
  order: Order;
}
