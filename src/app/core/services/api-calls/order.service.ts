import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ResponseStatus } from '../../enums/enums';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private dataProvider: DataProviderService,
    private constantValues: ConstantValueService,
    private toast: ToastrService
  ) { }
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
    this.dataProvider.getData(this.constantValues.ORDER_DETAILS_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
 * Submit product to server
 * @data param data to submit to server
 * @callback ICallback function that returns an error or result
  */
  createOrder(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CREATE_ORDER_ENDPOINT, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.FAILED) {
        this.toast.error('', result.message)
      } else {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
}
