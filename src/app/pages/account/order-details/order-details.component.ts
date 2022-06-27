import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderStatus, ResponseStatus } from 'src/app/core/enums/enums';
import { OrderService } from 'src/app/core/services/api-calls/order.service';

@Component({
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  isProcessing: boolean;
  orderDetails;
  orderStatus = OrderStatus;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      const orderId = params['id']
      if(orderId){
        this.fetchOrderDetails(orderId);
      }
    })
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Orders', link: '/account/orders' }, { label: 'Account Information', active: true }];
  }

  /**
   * Cancel order 
   * @param orderId 
   */
  cancelOrReOrder(orderId, orderStatus){
    this.isProcessing = true;
    this.orderService.updateOrderStatus({order_id: orderId, order_status: orderStatus}, (error, result) =>{
      this.isProcessing = false;
      if(result !== null && result.response === ResponseStatus.SUCCESSFUL){
        this.fetchOrderDetails(orderId)
      }
    })
  }
  /**
   * Repeat order or place order
   * @param order 
   */
  repeatOrder(order){
    console.log(order, 'ORDER')
  }

  /**
   * Fetch order details
   * @param orderId 
   */
  fetchOrderDetails(orderId) {
    this.isProcessing = true;
    this.orderService.fetchOrderDetails(orderId, (error, result)=>{
      this.isProcessing = false;
      if(result !== null && result.response === ResponseStatus.SUCCESSFUL){
        this.orderDetails = result.results;
      }
    })  }
}
