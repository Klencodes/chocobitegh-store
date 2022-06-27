import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartModelServer } from 'src/app/core/models/cart';
import { UserModel } from 'src/app/core/models/user';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { GuestCustomerConfirmationComponent } from '../guest-customer-confirmation/guest-customer-confirmation.component';

@Component({
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  user: UserModel;
  breadCrumbItems: Array<{}>;
  cartData;
  couponCodeCtrl: FormControl = new FormControl('')
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private localAuth: LocalAuthService,
    private cartService: CartService
  ) { 
    this.user = this.localAuth.userObj,
    this.cartService.cartDataObs$.subscribe(data =>{
      this.cartData = data;
      // console.log(data)
    })
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Cart', active: true }];
  }

  checkout() {
    if (!this.user && !this.user.auth_token) {
      this.dialog.open(GuestCustomerConfirmationComponent)
    } else {
      this.router.navigate(['/checkout'])
    }
  }

  /**
   * Update cart quatity 
   * @param product 
   * @param increase 
   */
  updateCart(product, increase){
    this.cartService.UpdateCartData(product, increase)
  }

  //Clear cart
  clearCart(){
    this.cartService.clearCart()
  }

  //Remove an item from cart
  removeCartItem(product){
    this.cartService.removeCartProduct(product)
  }

  applyCoupon(){
    this.cartService.claimCoupon(this.couponCodeCtrl.value.toUpperCase())
  }
}
