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
  
  get SEND_OTP_ENDPOINT() { return 'auth/send_opt/' }
  get VALIDATE_OTP_ENDPOINT() { return 'auth/validate_otp/' }
  get SIGNUP_ENDPOINT() { return 'auth/signup/' }
  get SIGNIN_ENDPOINT() { return 'auth/signin/' }
  get REQUEST_PASSWORD_RESET_OTP_ENDPOINT() { return 'auth/request_password_reset_otp/' }
  get VALIDATE_PASSWORD_RESET_OTP_ENDPOINT() { return 'auth/validate_password_reset_otp/' }
  get RESET_PASSWORD_ENDPOINT() { return 'auth/reset_password/' }
  get CHANGE_PASSWORD_ENDPOINT() { return 'auth/change_password/' }  

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