import { ProductModel } from "./product";
export interface CartModel {
  id: string
  cart_items: Items [];
  tax: any;
  total: any;
  promo_code_value: any;
}

export interface Items {
    id: string;
    date_created: string;
    product: ProductModel;
    quantity: string;
    sub_total: string;
  }