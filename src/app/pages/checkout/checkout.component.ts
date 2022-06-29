import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DelievryOptionEnums, NetworkProviders, PaymentOptionEnums, ResponseStatus } from 'src/app/core/enums/enums';
import { UserModel } from 'src/app/core/models/user';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { DataProviderService } from 'src/app/core/services/helpers/data-provider.service';
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
  submitted = false;
  isGuestCheckout = true;
  deliveryAddress;
  isProcessing: boolean;
  cartData;
  statesData;
  userCheckoutData: FormGroup;
  guestCheckoutForm: FormGroup;
  paymentOptions = PaymentOptionEnums
  deliveryOptions = DelievryOptionEnums
  networkProviders = NetworkProviders
  stateCities;
  deliveryFee;
  couponCode;
  constructor(
    private localAuth: LocalAuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private cartService: CartService,
    private toast: ToastrService,
    private dataProvider: DataProviderService,

  ) {
    // this.dataProvider.getLocalData('assets/json/gh-states.json').subscribe(result => {
    //   if (result !== null) {
    //     this.statesData = result;
    //   }
    // })
    this.user = this.localAuth.userObj,
      this.cartService.cartDataObs$.subscribe(data => {
        this.cartData = data;
      })
  }

  ngOnInit(): void {
    this.fetchUserAddresses();
    // this.guestCheckoutForm = new FormGroup({
    //   is_guest_checkout: new FormControl(true, [Validators.required]),
    //   news_letter: new FormControl(false, [Validators.required]),
    //   first_name: new FormControl('', [Validators.required]),
    //   last_name: new FormControl('', [Validators.required]),
    //   phone_number: new FormControl('', [Validators.required]),
    //   apartment_number: new FormControl(''),
    //   address: new FormControl('', [Validators.required]),
    //   city: new FormControl('', [Validators.required]),
    //   state: new FormControl('', [Validators.required]),
    //   postal_code: new FormControl('', [Validators.required]),
    //   country: new FormControl('Ghana', [Validators.required]),
    //   order_note: new FormControl(''),

    //   delivery_method: new FormControl(this.deliveryOptions.NORMAL, [Validators.required]),
    //   payment_method: new FormControl(this.paymentOptions.MOMO, [Validators.required]),
    //   card_holder: new FormControl('', [Validators.required]),
    //   card_number: new FormControl('', [Validators.required]),
    //   card_expiry_date: new FormControl('', [Validators.required]),
    //   card_cvv: new FormControl('', [Validators.required]),
    //   network_provider: new FormControl('', [Validators.required]),
    //   payment_phone_number: new FormControl('', [Validators.required]),
    // })

    this.userCheckoutData = new FormGroup({
      is_guest_checkout: new FormControl(false, [Validators.required]),
      address_id: new FormControl('', [Validators.required]),
      coupon_code: new FormControl(this.cartData.coupon_code),
      order_note: new FormControl(''),
      delivery_fee: new FormControl(this.cartData.delivery_fee),
      delivery_method: new FormControl(this.deliveryOptions.NORMAL, [Validators.required]),
      payment_method: new FormControl(this.paymentOptions.MOMO, [Validators.required]),
      network_provider: new FormControl(this.networkProviders.MTN, [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      // card_holder: new FormControl('', [Validators.required]),
      // card_number: new FormControl('', [Validators.required]),
      // card_expiry_date: new FormControl('', [Validators.required]),
      // card_cvv: new FormControl('', [Validators.required]),
    })
    // this.formValidators();
    //Breadcrumb items
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Checkout', active: true }];
    // Check if the user is loggedin
    // if (this.user.auth_token !== null && this.user.auth_token !== undefined) {
    //   this.isGuestCheckout = false;
    // } else {
    //   this.dialog.open(GuestCustomerConfirmationComponent)
    // }
    // this.state.valueChanges.subscribe(value => {
    //   this.statesData.find(x => {
    //     if (x.name === value) {
    //       this.stateCities = x.cities;
    //       this.postal_code.setValue(x.postal_code)
    //       console.log(this.stateCities)
    //     }
    //   })
    // })
  }

  /**
   * Fetch user details
   */
  fetchUserAddresses() {
    this.isProcessing = true;
    if(this.user.auth_token){
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
   * On customer or guest checkout
   * @param data checkout data to submit to server
   */
  onCheckout(data) {
    if(this.userCheckoutData.invalid){
      this.submitted = true;
      this.userCheckoutData.markAllAsTouched();
      this.toast.error('Please enter all the required fields')
      return;
    }
    this.cartService.checkoutCart(data)

  }


  formValidators() {
    this.payment_method.valueChanges.subscribe(value => {
      this.userCheckoutData.clearValidators();
      this.userCheckoutData.updateValueAndValidity();

      if (value === this.paymentOptions.CARD) {
        this.card_cvv.setValidators([Validators.required])
        this.card_cvv.updateValueAndValidity();
        this.card_expiry_date.setValidators([Validators.required])
        this.card_expiry_date.updateValueAndValidity();
        this.card_number.setValidators([Validators.required])
        this.card_number.updateValueAndValidity();
        this.card_holder.setValidators([Validators.required])
        this.card_holder.updateValueAndValidity();
        this.phone_number.clearValidators();
        this.phone_number.updateValueAndValidity()
      } else if (value === this.paymentOptions.MOMO) {
        this.phone_number.setValidators([Validators.required]);
        this.phone_number.updateValueAndValidity()
        this.network_provider.setValidators([Validators.required]);
        this.network_provider.updateValueAndValidity()
      }
    })

  }
  get address_id() { return this.userCheckoutData.get('addres_id') }
  get delivery_method() { return this.userCheckoutData.get('delivery_method') }
  get payment_method() { return this.userCheckoutData.get('payment_method') }
  get coupon_code() { return this.userCheckoutData.get('coupon_code') }
  get card_holder() { return this.userCheckoutData.get('card_holder') }
  get card_number() { return this.userCheckoutData.get('card_number') }
  get card_expiry_date() { return this.userCheckoutData.get('card_expiry_date') }
  get card_cvv() { return this.userCheckoutData.get('card_cvv') }
  get network_provider() { return this.userCheckoutData.get('network_provider') }
  get phone_number() { return this.userCheckoutData.get('phone_number') }

  // get address() { return this.guestCheckoutForm.get('address') }
  // get apartment_number() { return this.guestCheckoutForm.get('apartment_number') }
  // get city() { return this.guestCheckoutForm.get('city') }
  // get state() { return this.guestCheckoutForm.get('state') }
  // get postal_code() { return this.guestCheckoutForm.get('postal_code') }
  // get country() { return this.guestCheckoutForm.get('country') }
  // get deliveryMethod() { return this.guestCheckoutForm.get('delivery_method') }
  // get paymentMethod() { return this.guestCheckoutForm.get('payment_method') }
  // get cardHolder() { return this.guestCheckoutForm.get('card_holder') }
  // get cardNumber() { return this.guestCheckoutForm.get('card_number') }
  // get cardExpiryDate() { return this.guestCheckoutForm.get('card_expiry_date') }
  // get cardCvv() { return this.guestCheckoutForm.get('card_cvv') }
  // get networkProvider() { return this.guestCheckoutForm.get('network_provider') }
  // get phoneNumber() { return this.guestCheckoutForm.get('phone_number') }
}
