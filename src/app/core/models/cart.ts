import { ProductModel } from "./product";

export interface Items {
  id: string;
  date_created: string;
  product: ProductModel;
  quantity: string;
  sub_total: string;
}

export interface CartModelServer {
  data: [{
    product: ProductModel,
    numInCart: number,
  }],
  total: number,
  tax: number;
  coupon_code: string,
  delivery_fee: number
  discount: number
}

export interface CartModelClient {
  prodData: [{
    product_id: number,
    quantity: number
  }],
  total: number;
  tax: number;
  coupon_code: string;
  delivery_fee: number;
  discount: number;
}

export interface CouponModelServer {
  amount_paid: number;
  amount_saved: number;
  coupon_value: number;
  coupon_type: string;
}