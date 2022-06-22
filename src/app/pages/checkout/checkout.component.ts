import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DelievryOptionEnums, PaymentOptionEnums, ResponseStatus } from 'src/app/core/enums/enums';
import { UserModel } from 'src/app/core/models/user';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { AddOrEditAddressComponent } from '../account/add-or-edit-address/add-or-edit-address.component';
import { GuestCustomerConfirmationComponent } from '../guest-customer-confirmation/guest-customer-confirmation.component';
import { ChangeAddressComponent } from './change-address/change-address.component';

@Component({
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  user: UserModel;
  isGuestCheckout = true;
  deliveryAddress;
  isProcessing: boolean;
  cartData;
  userCheckoutData: FormGroup;
  paymentOptions = PaymentOptionEnums
  deliveryOptions = DelievryOptionEnums

  constructor(
    private localAuth: LocalAuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private cartService: CartService,
  ) {
    this.user = this.localAuth.userObj,
      this.cartService.cartDataObs$.subscribe(data => {
        this.cartData = data;
        console.log(this.cartData, 'this.cartData')
      })
  }

  ngOnInit(): void {
    this.fetchUserAddresses();
    this.userCheckoutData = new FormGroup({
      address_id: new FormControl('', [Validators.required]),
      order_note: new FormControl(''),
      delivery_method: new FormControl(this.deliveryOptions.NORMAL, [Validators.required]),
      payment_method: new FormControl(this.paymentOptions.MOMO, [Validators.required]),
      card_holder: new FormControl('', [Validators.required]),
      card_number: new FormControl('', [Validators.required]),
      card_expiry_date: new FormControl('', [Validators.required]),
      card_cvv: new FormControl('', [Validators.required]),
      network_provider: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
    })
    this.formValidators();
    //Breadcrumb items
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Checkout', active: true }];
    // Check if the user is loggedin
    if (this.user.auth_token !== null && this.user.auth_token !== undefined) {
      this.isGuestCheckout = false;
    } else {
      this.dialog.open(GuestCustomerConfirmationComponent)
    }
  }

  /**
   * Fetch user details
   */
  fetchUserAddresses() {
    this.isProcessing = true;
    this.userService.fetchUserAddresses((error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        result.results.find(x => {
          if (x.primary === true) {
            this.deliveryAddress = x;
            if (this.deliveryAddress !== null) {
              this.userCheckoutData.get('address_id').setValue(this.deliveryAddress?.id)
            }
          }
        })
      }
    })
  }
  /**
   * Change delivery address
   */
  changeDeliveryAddress() {
    this.dialog.open(ChangeAddressComponent)
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchUserAddresses();
        }
      })
  }
  /**
   * Change delivery address
   */
  addUserAddress() {
    this.dialog.open(AddOrEditAddressComponent)
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchUserAddresses();
        }
      })
  }

  /**
   * On customer checkout
   * @param data checkout data to submit to server
   */
  onCheckout(data) {
    console.log(data)
    this.cartService.checkoutCart(data)

  }
  /**
   * On guest checkout
   * @param data checkout data to submit to server
   */
  onGuestCheckout(data) {
    console.log(data)
  }

  submitDta() {
  }

  formValidators() {
    this.payment_method.valueChanges.subscribe(value => {
      this.userCheckoutData.clearValidators();
      this.userCheckoutData.updateValueAndValidity();

      if (value === this.paymentOptions.CARD) {
        // this.card_cvv.setValidators([Validators.required])
        // this.card_cvv.updateValueAndValidity();
        // this.card_expiry_date.setValidators([Validators.required])
        // this.card_expiry_date.updateValueAndValidity();
        // this.card_number.setValidators([Validators.required])
        // this.card_number.updateValueAndValidity();
        // this.full_name_on_card.setValidators([Validators.required])
        // this.full_name_on_card.updateValueAndValidity();
      }
    })

  }
  get address_id() { return this.userCheckoutData.get('addres_id') }
  get delivery_method() { return this.userCheckoutData.get('delivery_method') }
  get payment_method() { return this.userCheckoutData.get('payment_method') }
  get card_holder() { return this.userCheckoutData.get('card_holder') }
  get card_number() { return this.userCheckoutData.get('card_number') }
  get card_expiry_date() { return this.userCheckoutData.get('card_expiry_date') }
  get card_cvv() { return this.userCheckoutData.get('card_cvv') }
  get network_provider() { return this.userCheckoutData.get('network_provider') }
  get phone_number() { return this.userCheckoutData.get('phone_number') }
}
