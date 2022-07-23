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
    this.user = this.localAuth.userObj,
    this.cartService.cartDataObs$.subscribe(data => {
      this.cartData = data;
      // this.tax?.setValue(this.cartData.tax.toFixed(2))
      // this.delivery_fee?.setValue(this.cartData.delivery_fee)
    })
   
   
  }

  ngOnInit(): void {
    this.fetchDeliveryLocations();
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
      order_note: new FormControl(''),
      // coupon_code: new FormControl(this.cartData.coupon_code),
      // delivery_fee: new FormControl('', [Validators.required]),
      // tax: new FormControl('', [Validators.required]),
      address_id: new FormControl('', [Validators.required]),
      is_guest_checkout: new FormControl(false, [Validators.required]),
      delivery_method: new FormControl(this.deliveryOptions.NORMAL, [Validators.required]),
      payment_method: new FormControl(this.paymentOptions.MOMO),
      network_provider: new FormControl(this.networkProviders.MTN),
      phone_number: new FormControl('', [Validators.required]),
      card_holder: new FormControl(''),
      card_number: new FormControl(''),
      card_expiry_date: new FormControl(''),
      card_cvv: new FormControl(''),
    })
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
    if (this.user.auth_token) {
      this.userService.fetchUserAddresses((error, result) => {
        this.isProcessing = false;
        if (result !== null && result.results) {
          this.fetchDeliveryLocations();
          result.results.find(address => {
            if (address.primary === true) {
              this.deliveryAddress = address;
              this.calculateDeliveryFee(this.deliveryAddress)
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
      .afterClosed().subscribe(address => {
        if (address) {
          this.fetchUserAddresses();
          this.calculateDeliveryFee(address)
        }
      })
  }
  /**
   * Calculate delivery fee on address changed
   * @param address 
   */
  calculateDeliveryFee(address) {
    this.fetchDeliveryLocations();
    this.statesData.find(state => {
      if (state.name === address.state) {
        state.cities.filter(x => {
          if (x.name === address.city) {
            this.cartService.cartDataServer.delivery_fee = parseFloat(x.price);
            this.cartService.cartDataClient.delivery_fee = this.cartService.cartDataServer.delivery_fee;
            localStorage.setItem('cart', JSON.stringify(this.cartService.cartDataClient));
            this.cartService.cartDataObs$.next({ ...this.cartService.cartDataServer });
          }
        })
      }
    })
    
  }
   /**
   * Add or Edit address
   * @param address 
   * @param isEdit 
   */
    addOrEditAddress(address, isEdit) {
      this.dialog.open(AddOrEditAddressComponent, { disableClose: true, data: {dialogData: address, isEdit: isEdit} })
        .afterClosed().subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            this.fetchUserAddresses()
          }
        });
    }


  /**
   * On customer or guest checkout
   * @param data checkout data to submit to server
   */
  onCheckout(data) {
    // console.log(data, 'DATA')
    if (this.userCheckoutData.invalid) {
      this.submitted = true;
      this.userCheckoutData.markAllAsTouched();
      this.toast.error('Please enter all the required fields')
      return;
    }
    this.cartService.checkoutCart(data)

  }

  paymentMethodChange(event) {
    this.payment_method.setValue(event?.innerText)
    this.formValidators(event?.innerText);
  }

  formValidators(value) {
    if (value) {
      this.card_cvv.clearValidators()
      this.card_cvv.updateValueAndValidity();
      this.card_expiry_date.clearValidators()
      this.card_expiry_date.updateValueAndValidity();
      this.card_number.clearValidators()
      this.card_number.updateValueAndValidity();
      this.card_holder.clearValidators()
      this.card_holder.updateValueAndValidity();
      this.phone_number.clearValidators();
      this.phone_number.updateValueAndValidity()
      this.network_provider.clearValidators();
      this.network_provider.updateValueAndValidity()

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
    }
  }
  /**
   * Fetch delivery locations
   */
  fetchDeliveryLocations(){
    this.dataProvider.getLocalData('assets/json/gh-states.json').subscribe(result => {
      if (result !== null) {
        this.statesData = result;
      }
    })
  }
  get address_id() { return this.userCheckoutData.get('addres_id') }
  get delivery_method() { return this.userCheckoutData.get('delivery_method') }
  get payment_method() { return this.userCheckoutData.get('payment_method') }
  // get tax() { return this.userCheckoutData.get('tax') }
  // get coupon_code() { return this.userCheckoutData.get('coupon_code') }
  // get delivery_fee() { return this.userCheckoutData.get('delivery_fee') }
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
