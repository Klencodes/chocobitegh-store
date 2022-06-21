import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from '../../enums/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelClient, CartModelServer } from '../../models/cart';
import { ProductModel } from '../../models/product';
import { ProductService } from './product.service';
import { NavigationExtras, Router } from '@angular/router';
import { OrderService } from './order.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //Data variables to store client information on the client's localStorage
  private cartDataClient: CartModelClient = {
    prodData: [
      { quantity: 0, product_id: 0 }
    ],
    total: 0,
    // couponData: { total_price: 0, amount_saved: 0, coupon_value: 0, coupon_type: ''}
  }; // This will be sent to the backend Server as post data

  // Cart Data variable to store the cart information on the server (Angular not Backend)
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
    total: 0,
    // couponData: undefined
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  // couponData$ = new BehaviorSubject<any>(null);

  // Data variable to store the cart information on the client's local storage
  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);
  cartTotal: number;
  orderId;
  // couponDataSaved: CouponModelServer;
  // amountPaid = 0
  // amountSaved = 0
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: CartModelClient = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].quantity !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach((dataCart) => {
        const id: any = dataCart.product_id;
        this.productService.fetchProductDetails(id, (error, result) => {
          if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
            const actualProdInfo: ProductModel = result.results;
            // Use fecth product details to prepared items to set local items
            if (this.cartDataServer.data[0].numInCart === 0) {
              this.cartDataServer.data[0].numInCart = dataCart.quantity;
              this.cartDataServer.data[0].product = actualProdInfo;
              this.calculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                numInCart: dataCart.quantity,
                product: actualProdInfo
              });
              this.calculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({ ...this.cartDataServer });
          }
        });
      });
    }
  }

  // public get couponValue(): CouponModelServer {
  //   return this.couponData$.value;
  // }

  /**
   * Add product to cart
   * @param id 
   * @param quantity 
   */
  addProductToCart(id, quantity?: number) {
    //make a network call to fetch product details    
    this.productService.fetchProductDetails(id, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        const product: ProductModel = result.results;
        // If the cart is absolutely empty
        if (this.cartDataServer.data[0].product === undefined) {
          this.cartDataServer.data[0].product = product;
          this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
          this.calculateTotal();
          this.cartDataClient.prodData[0].quantity = this.cartDataServer.data[0].numInCart;
          this.cartDataClient.prodData[0].product_id = product.id;
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObs$.next({ ...this.cartDataServer });
          //Toast notification
          this.toast.success('added to your cart.', `${product.name}`);
        } // END of IF
        // Cart is not empty
        else {
          let index = this.cartDataServer.data.findIndex((p) => p.product.id === product.id);
          // 1. If chosen product is already in cart array
          if (index !== -1) {
            if (quantity !== undefined && quantity <= product.quantity) {
              this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < product.quantity ? quantity : product.quantity;
            } else {
              this.cartDataServer.data[index].numInCart < product.quantity ? this.cartDataServer.data[index].numInCart++ : product.quantity;
            }
            //Toast notification
            this.cartDataClient.prodData[index].quantity = this.cartDataServer.data[index].numInCart;
            this.toast.info('quantity updated in your cart.', `${product.name}`);
          }
          // 2. If chosen product is not in cart array
          else {
            this.cartDataServer.data.push({
              product: product,
              numInCart: 1,
            });
            this.cartDataClient.prodData.push({
              quantity: 1,
              product_id: product.id
            });
            //Toast notification
            this.toast.success('added to the cart.', `${product.name}`);
          }
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartDataObs$.next({ ...this.cartDataServer });
        } // END of ELSE
      }
    });
  }

  UpdateCartData(product: ProductModel, increase: Boolean) {
    let index = this.cartDataServer.data.findIndex((p) => p.product.id === product.id);
    if (increase) {
      this.cartDataServer.data[index].numInCart < this.cartDataServer.data[index].product.quantity ? this.cartDataServer.data[index].numInCart++ : this.cartDataServer.data[index].product.quantity;
      this.cartDataClient.prodData[index].quantity = this.cartDataServer.data[index].numInCart;
      this.calculateTotal();
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      this.cartDataServer.data[index].numInCart--;
      
      if (this.cartDataServer.data[index].numInCart < 1) {
        this.removeCartProduct(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].quantity = this.cartDataServer.data[index].numInCart;
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  removeCartProduct(index) {
    if (window.confirm('Are you sure you want to delete the item?')) {
      /**Recalculate total amount if an item is added or removed */
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      /**Clear cart if total amount in cart client data is 0 */
      if (this.cartDataClient.total === 0) {
        this.emptyCartClient()
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      /**Clear cart if total amount in cart server data is 0 */
      if (this.cartDataServer.total === 0) {
        this.emptyCartServer()
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }

    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }
  /**
   * 
   * @param data Claim available customer coupon 
   */
  // claimCoupon(data) {
  //   const cData = { initial_amount: this.cartDataClient.total, code: data.code, is_code: data.is_code, coupon_id: data.coupon_id }
  //   this.orderService.claimCoupon(cData, (error, result) => {
  //     if (result !== null && result.status_code === '100') {
  //       const coupon = result.data
  //       this.couponData$.next(coupon);
  //       this.amountPaid = this.couponData$.value.amount_paid;
  //       this.amountSaved = this.couponData$.value.amount_saved
  //     }
  //   })
  // }
  /**
   * 
   * @param data Checkout customer orders
   * Here Customer payment info is sent together with order
   */
  checkoutCart(data) {
    const orderData = { 'total': this.cartDataClient.total, 'order_items': this.cartDataClient.prodData, customer: data };
    console.log(orderData, 'orderData')
    this.orderService.createOrder(orderData, (error, result) => {
      console.log(result, 'result')
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.emptyCartServer();
        this.orderId = result.results.id
        this.orderService.fetchOrderDetails(this.orderId, (error, result) => {
          console.log(result, 'getOrderDetail')
          if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
            const navigationExtras: NavigationExtras = {
              state: {
                order: result.results
              }
            };
            this.spinner.hide().then();
            this.emptyCartClient();
            this.router.navigate(['/order-confirmation'], navigationExtras).then();
          }
        });
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to place your order`, "Order Status")
      }
    })

  }
  /**
* 
* @param index of cart item to delete (items are removed locally)
* @returns 
*/
  clearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will clear your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, Clear it!'
    }).then(result => {
      if (result.value) {
        this.emptyCartClient()
        this.emptyCartServer()
        Swal.fire('Cart Cleared!', 'Your cart has been cleared.', 'success');
      } else {
        return
      }
    });
  }

  ///Helper functions

  /**
   * Calculate Total
   */
  private calculateTotal() {
    let Total = 0;
    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const { sell_price }:any = p.product;
      Total += numInCart * sell_price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  /**
   * Calculate Subtotal
   * @param index 
   * @returns 
   */
  calculateSubTotal(index: any): Number {
    let subTotal = 0;
    let data = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = data.product.new_price * data.numInCart;
    return subTotal;
  }

  emptyCartClient() {
    this.cartDataClient = {
      prodData: [{ quantity: 0, product_id: 0 }],
      total: 0,
      // couponData: { total_price: 0, amount_saved: 0, coupon_value: 0, coupon_type: ''}
    };
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  }

  emptyCartServer() {
    this.cartDataServer = {
      data: [
        { product: undefined, numInCart: 0 }],
      total: 0,
      // couponData: undefined
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }

}
