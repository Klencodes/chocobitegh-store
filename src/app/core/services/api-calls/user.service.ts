import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ResponseStatus } from '../../enums/enums';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataProvider: DataProviderService,
    private constantValues: ConstantValueService,
    private toast: ToastrService
  ) { }
  /* Get a customer addresses from server
  * @param id ID of Order to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchUserAddresses(callback: ICallback) {
    this.dataProvider.getData(this.constantValues.FETCH_ADDRESSES).subscribe(result => {
      callback(null, result)
    }, error => {
      callback(error, null)
      // this.toast.error(error.message);

    })
  }
  /** Create customer address
* @data data to submit
* @callback ICallback function that returns an error or result
*/
  createUserAddress(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CREATE_ADDRESS, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '')
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message, '')
    })
  }
  /** Create customer address
* @data data to submit
* @callback ICallback function that returns an error or result
*/
  updateUserAddress(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.UPDATE_ADDRESS, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '')
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message, '')
    })
  }
  /**
* Delete customer address from server
* @data data to submit to server
* @callback ICallback function that returns an error or result
*/
  removeCartItem(id, callback: ICallback) {
    this.dataProvider.deleteData(this.constantValues.DELETE_ADDRESS + id + '/').subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null);
      this.toast.error('', error.message)
    });
  }
  /* Get a customer from server
  * @param id ID of Order to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchUserDetails(callback: ICallback) {
    this.dataProvider.getData(this.constantValues.FETCH_USER_DETAILS_ENDPOINT).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        // this.toast.success('', result.message)
      } else {
        this.toast.error(result.message, '')
      }
    }, error => {
      callback(error, null)
      // this.toast.error(error.message);

    })
  }

  /** Change customer delivery address
  * @data data to submit
  * @callback ICallback function that returns an error or result
  */
  updateUserPrimaryAddress(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.UPDATE_USER_PRIMARY_ADDRESS, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message, '')
    })
  }
  /** Update customer information
  * @data update data to submit
  * @callback ICallback function that returns an error or result
  */
  updateUserDetails(data, callback: ICallback) {
    this.dataProvider.updateData(this.constantValues.UPDATE_USER_DETAILS_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message, '')
    })
  }

}