import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantValueService {
  constructor() { }
  //Core
  get BASE_URL() { return environment.BASE_URL; }
  get APP_NAME() { return 'Chocolate Mall' }
  //Dates Formats
  get MM_DD_YYYY_DATE_FORMAT() { return 'MM-DD-YYYY'; }
  get HH_MM_SS_TIME_FORMAT() { return 'hh:mm:ss'; }
  get DD_MM_YYYY_DATE_FORMAT() { return 'DD-MM-YYYY'; }
  
  get SEND_OTP_ENDPOINT() { return 'user/send_opt/' }
  get VALIDATE_OTP_ENDPOINT() { return 'user/validate_otp/' }
  get SIGNUP_ENDPOINT() { return 'user/signup/' }
  get SIGNIN_ENDPOINT() { return 'user/signin/' }
  get REQUEST_PASSWORD_RESET_OTP_ENDPOINT() { return 'user/request_password_reset_otp/' }
  get VALIDATE_PASSWORD_RESET_OTP_ENDPOINT() { return 'user/validate_password_reset_otp/' }
  get RESET_PASSWORD_ENDPOINT() { return 'user/reset_password/' }
  get CHANGE_PASSWORD_ENDPOINT() { return 'user/change_password/' }  
  
  get FETCH_USER_DETAILS_ENDPOINT() { return 'user/me/' }
  get UPDATE_USER_PRIMARY_ADDRESS() { return 'user/update_primary_address/' }
  get CREATE_ADDRESS() { return 'user/add_address/' }
  get UPDATE_ADDRESS() { return 'user/update_address/' }
  get DELETE_ADDRESS() { return 'user/delete_address/' }
  get FETCH_ADDRESSES() { return 'user/fetch_addresses/' }

  
  get FETCH_TOP_PRODUCTS_OVERVIEW() { return 'top_products/' }

  get FETCH_CATEGORIES_ENDPOINT() { return 'fetch_categories/' }
  get CATEGORY_DETAILS_ENDPOINT() { return 'category_details/' }

  get FETCH_PRODUCTS_ENDPOINT() { return 'fetch_products/' }
  get PRODUCT_DETAILS_ENDPOINT() { return 'product_details/' }
  get SEARCH_PRODUCTS_ENDPOINT() { return 'product/search/' }

  get RELATED_PRODUCT_ENDPOINT() { return 'product/related_products/' }
  get FILTER_PRODUCT_ENDPOINT() { return 'product/filter/' }
  get PRODUCT_REVIEWS_ENDPOINT() { return 'product/review/' }
  get REPLY_REVIEW_ENDPOINT() { return 'product/reply_review/' }
  get UPDATE_USER_DETAILS_ENDPOINT() { return 'user/update_profile/' }
  
  get FETCH_ORDERS_ENDPOINT() { return 'fetch_orders/' }
  get ORDER_DETAILS_ENDPOINT() { return 'order_details/' }
  get CREATE_ORDER_ENDPOINT() { return 'place_order/' }
  
  get CART_ENDPOINT() { return 'order/cart/' }
  get REDEEM_PROMO_CODE() { return 'order/redeem_promocode/' }
   
}