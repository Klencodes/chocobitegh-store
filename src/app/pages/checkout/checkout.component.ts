import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponseStatus } from 'src/app/core/enums/enums';
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
  addresses;
  cartData;

  constructor(
    private localAuth: LocalAuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private cartService: CartService,
  ) { 
    this.user = this.localAuth.userObj,
    this.cartService.cartDataObs$.subscribe(data =>{
      this.cartData = data;
    })
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Checkout', active: true }];
    this.fetchUserAddresses();
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
    this.userService.fetchUserAddresses((error, result)=>{
      this.isProcessing = false;
      if (result !== null) {
        this.addresses = result.results;
        this.addresses.filter(x => {
          if (x.primary === true) {
            this.deliveryAddress = x;
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

}
