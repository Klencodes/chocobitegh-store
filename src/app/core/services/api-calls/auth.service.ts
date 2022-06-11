import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ICallback } from '../../classes/callback.interface';
import { ResponseStatus } from '../../enums/enums';
import { UserModel } from '../../models/user';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject$ = new BehaviorSubject<UserModel>(JSON.parse(null));

  constructor(
    private dataProvider: DataProviderService,
    private constantValues: ConstantValueService,
    private toast: ToastrService
  ) { }

  public get userValue(): UserModel {
    return this.userSubject$.value;
  }
  /**
  * Send OTP to User
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  sendOtp(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.SEND_OTP_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
  * Validate OTP
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  validateOtp(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.VALIDATE_OTP_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
  * Signup User
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  signUp(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.SIGNUP_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        // this.toast.success('', result.message)
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
  * Login User with email
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  signIn(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.SIGNIN_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        const user = result.results
        localStorage.setItem('user', JSON.stringify(user));
        // this.userSubject$.next(user);
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
  * Request password reset email 
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  requestPasswordResetOtp(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.REQUEST_PASSWORD_RESET_OTP_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message);
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
  * Validate reset password OTP 
  * @data data to submit to server
  * @callback ICallback back function that returns an error or result
  */
  validatePasswordResetOtp(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.VALIDATE_PASSWORD_RESET_OTP_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message);
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
* Reset password
* @data data to submit to server
* @callback ICallback back function that returns an error or result
*/
  resetPassword(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.RESET_PASSWORD_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message);
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }
  /**
* Reset password
* @data data to submit to server
* @callback ICallback back function that returns an error or result
*/
  changePassword(data, callback: ICallback) {
    this.dataProvider.updateData(this.constantValues.CHANGE_PASSWORD_ENDPOINT, data).subscribe(result => {
      callback(null, result)
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success('', result.message);
      }
    }, error => {
      callback(error, null)
      this.toast.error(error.message);
    })
  }


  /* Get a customer from server
  * @param id ID of Order to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchUserDetails(callback: ICallback) {
    this.dataProvider.getData(this.constantValues.USER_DETAILS_ENDPOINT).subscribe(result => {
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