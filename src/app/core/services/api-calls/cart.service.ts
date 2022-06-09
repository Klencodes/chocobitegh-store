import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from '../../enums/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICallback } from '../../classes/callback.interface';
import { DataProviderService } from '../helpers/data-provider.service';
import { ConstantValueService } from '../helpers/constant-values.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItemArray$ = new BehaviorSubject<any>(null);

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private dataProvider: DataProviderService,
    private constantValues: ConstantValueService,
  ) {
    this.fetchCartItems((error, result) => {
      if (result !== null) {
        this.cartItemArray$.next(result.results)
      }
    })
  }
  /**
  * Get orders with page number
  * @callback ICallback function that returns an error or result
  */
  fetchOrders(page: number, callback: ICallback) {
    this.dataProvider.getData(this.constantValues.ORDERS_ENDPOINT + '?page=' + page).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

  /* Get a single Order from server
  * @param id ID of Order to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchOrderDetails(id, callback: ICallback) {
    this.dataProvider.getData(this.constantValues.ORDERS_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
 * Fetch cart items from server
] * @callback ICallback function that returns an error or result
  */
  fetchCartItems(callback: ICallback) {
    this.dataProvider.getData(this.constantValues.CART_ENDPOINT).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.FAILED) {
        this.toast.error('', result.message)
      } else {
        this.cartItemArray$.next(result.results);
        // this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
 * Submit order to server
 * @data param data to submit to server
 * @callback ICallback function that returns an error or result
  */
  addToCart(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CART_ENDPOINT, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, `${result?.title}`);
      } else {
        this.toast.error('', result.message)
      }
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
 * Submit order to server
 * @data param data to submit to server
 * @callback ICallback function that returns an error or result
  */
  removeCartItem(id, callback: ICallback) {
    this.dataProvider.deleteData(this.constantValues.CART_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.error(result.message, `${result?.title}`)
      } else {
        this.toast.error('', result.message)
      }
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
* Submit promo to server
* @data data to submit to server
* @callback ICallback function that returns an error or result
*/
  applyPromoCode(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.REDEEM_PROMO_CODE, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '');
      }
    }, error => {
      callback(error, null);
      this.toast.error(error.message, '')
    });
  }

}



