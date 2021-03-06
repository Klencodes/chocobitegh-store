import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModule } from '../shared/shared.module';
import { AddOrEditAddressComponent } from './add-or-edit-address/add-or-edit-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/core/pipes/shared-pipes-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from 'src/app/core/modules/material.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    ProfileComponent,
    AccountComponent,
    TransactionsComponent,
    WishlistComponent,
    AddOrEditAddressComponent,
    UpdateUserDataComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SharedPipesModule,
    InfiniteScrollModule,
    PerfectScrollbarModule,
    MaterialModule
  ]
})
export class AccountModule { }
