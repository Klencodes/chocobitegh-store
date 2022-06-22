import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/api-calls/order.service';

@Component({
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  isProcessing: boolean;
  page = 1;
  // listArrayOfProducts: OrderModel[] = [];
  // displayedList: OrderModel[] = [];
  listArrayOfProducts;
  displayedList;
  canLoadMore = true;
  isProcessingMore = false;

  constructor(
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  repeatOrder() {

  }
  viewOrderDetails(order) {
    console.log(order)
    this.router.navigate(['/account/orders/order-details', order.order_code, order.id])
  }

  fetchOrders() {
    this.isProcessing = true;
    this.orderService.fetchOrders(this.page, (error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.listArrayOfProducts = result.results;
        this.displayedList = [...this.listArrayOfProducts];
        console.log(this.displayedList, 'ARRAY')

      }
    })
  }
  /**
   * Load more product 
   * @param ev 
   * @returns 
   */
  async loadMoreData(ev: any) {

    if (ev == null) {
      this.page = 1;
      return;
    } else {
      this.page++;
      if (this.canLoadMore) {
        this.isProcessingMore = true;
        this.orderService.fetchOrders(this.page, async (error, result) => {
          this.isProcessingMore = false;
          if (result !== null && result !== undefined) {
            const order = result.results;
            this.listArrayOfProducts = this.listArrayOfProducts.concat(order);
            this.displayedList = [...this.listArrayOfProducts];
          } else {
            this.canLoadMore = false;
          }
        })
      }
    }
  }
}