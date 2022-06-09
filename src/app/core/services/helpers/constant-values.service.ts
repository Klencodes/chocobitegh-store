import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantValueService {
  constructor() { }
  //Core
  get BASE_URL() { return environment.BASE_URL; }
  get APP_NAME() { return 'Rose Garden' }
  //Dates Formats
  get MM_DD_YYYY_DATE_FORMAT() { return 'MM-DD-YYYY'; }
  get HH_MM_SS_TIME_FORMAT() { return 'hh:mm:ss'; }
  get DD_MM_YYYY_DATE_FORMAT() { return 'DD-MM-YYYY'; }
  
  get SIGNUP_ENDPOINT() { return 'user/signup/' }
  get SIGNIN_ENDPOINT() { return 'user/signin/' }
  get VERIFY_EMAIL_ENDPOINT() { return 'user/verify_email/' }
  get FORGET_PASSWORD_ENDPOINT() { return 'user/forget_password/' }
  get VERIFY_RESET_PASSWORD_ENDPOINT() { return 'user/verify_reset_password_link/' }
  get RESET_PASSWORD_ENDPOINT() { return 'user/reset_password/' }
  get CREATE_NEW_PASSWORD_ENDPOINT() { return 'user/create_password/' }
  
  get FETCH_TOP_PRODUCTS_OVERVIEW() { return 'top_products/' }

  get PRODUCTS_ENDPOINT() { return 'product/' }
  get SEARCH_PRODUCTS_ENDPOINT() { return 'product/search/' }

  get RELATED_PRODUCT_ENDPOINT() { return 'product/related_products/' }
  get FILTER_PRODUCT_ENDPOINT() { return 'product/filter/' }
  get PRODUCT_REVIEWS_ENDPOINT() { return 'product/review/' }
  get REPLY_REVIEW_ENDPOINT() { return 'product/reply_review/' }
  get USER_DETAILS_ENDPOINT() { return 'user/me/' }
  get UPDATE_USER_DETAILS_ENDPOINT() { return 'user/update_profile/' }
  
  
  get ORDERS_ENDPOINT() { return 'order/my_orders/' }
  get ORDER_DETAILS_ENDPOINT() { return 'order/my_order/' }
  get CREATE_ORDER_ENDPOINT() { return 'order/place_order/' }
  get CART_ENDPOINT() { return 'order/cart/' }
  get REDEEM_PROMO_CODE() { return 'order/redeem_promocode/' }
   
}