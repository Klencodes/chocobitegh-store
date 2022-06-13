import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      { path: '', component: ProfileComponent, data: { title: 'My Profile' } },
      { path: 'orders', component: OrdersComponent, data: { title: 'My Orders' } },
      { path: 'orders/order-details/:code', component: OrderDetailsComponent, data: { title: 'Order Details' } },
      { path: 'transactions', component: TransactionsComponent, data: { title: 'My Transactions' } },
      { path: 'wishlist', component: WishlistComponent, data: { title: 'My Wishlis' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
