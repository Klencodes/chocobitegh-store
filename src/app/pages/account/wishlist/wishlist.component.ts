import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { Wishlist } from 'src/app/core/models/wishlist';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { OrderService } from 'src/app/core/services/api-calls/order.service';
import { UserService } from 'src/app/core/services/api-calls/user.service';

@Component({
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  isProcessing: boolean;
  page = 1;
  listArrayOfProducts: Wishlist[] = [];
  displayedList: Wishlist[] = [];
  canLoadMore = true;
  isProcessingMore = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
  ) { this.loadMoreData(null) }

  ngOnInit(): void {
    this.isProcessing = true;
   this.fetchSavedItems()
  }
  fetchSavedItems() {
    this.userService.fetchsavedItems(this.page, (error, result) => {
      if (result !== null && result !== undefined) {
        this.listArrayOfProducts = result.results;
        this.displayedList = [...this.listArrayOfProducts];
      }
    })
   }
  /**
  * Add to cart
  */
  addToCart(id) {
    this.cartService.addProductToCart(id)
  }
  /**
  * View product details
  * @param product 
  */
  productDetails(product) {
    this.router.navigate(['/product-details', product.name, product.id])
  }
  /**
   * Remove saved items from server
   * @param id saved item id
   */
  removeItem(id) {
    this.userService.removeSavedItem(id, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.fetchSavedItems()
      }
    })
  }

  /**
   * Load more saved items 
   * @param ev 
   * @returns 
   */
  loadMoreData(ev: any) {
    if (ev == null) {
      this.page = 1;
      return;
    } else {
      this.page++;
      if (this.canLoadMore) {
        this.isProcessingMore = true;
        this.userService.fetchsavedItems(this.page, (error, result) => {
          this.isProcessingMore = false;
          if (result !== null && result !== undefined) {
            const products = result.results;
            this.listArrayOfProducts = this.listArrayOfProducts.concat(products);
            this.displayedList = [...this.listArrayOfProducts];
          } else {
            this.canLoadMore = false;
          }
        })
      }
    }
  }

}
