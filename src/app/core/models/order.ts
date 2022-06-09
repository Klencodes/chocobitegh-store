import { ProductModel } from "./product";
import { UserModel } from "./user";

export class OrderModel {
  id: string;
  channel: string;
  currency: string;
  date_created: string;
  delivery_option: string;
  is_cancelled: boolean;
  is_fulfilled: boolean;
  is_paid: boolean;
  is_archived : boolean;
  is_open: boolean;
  isSelected: boolean;
  note: string;
  customer: UserModel;
  pickup_date_time: string;
  pickup_date: string;
  pickup_time: string;
  order_code: string;
  order_items: Item[]
  sub_total: string;
  tax: string;
  total: string;
}

export class Item {
  date_created: string;
  id: string;
  product: ProductModel
  quantity: string;
  sub_total: string;
}