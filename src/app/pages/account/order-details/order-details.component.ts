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
      console.log(orderId)
      if(orderId){
        this.isProcessing = true;
        this.orderService.fetchOrderDetails(orderId, (error, result)=>{
          if(result !== null && result.response === ResponseStatus.SUCCESSFUL){
            this.orderDetails = result.results;
            console.log(this.orderDetails, 'this.orderDetails')
          }
        })
      }
    })
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Orders', link: '/account/orders' }, { label: 'Account Information', active: true }];

  }

}
