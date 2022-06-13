import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SwiperModule } from "swiper/angular";

import { MaterialModule } from '../core/modules/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedPipesModule } from '../core/pipes/shared-pipes-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home-component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { GuestCustomerConfirmationComponent } from './guest-customer-confirmation/guest-customer-confirmation.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [

    HomeComponent,
    ProductDetailsComponent,
    OrderCompleteComponent,
    CartComponent,
    CheckoutComponent,
    CategoryProductsComponent,
    GuestCustomerConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    PerfectScrollbarModule,
    SwiperModule,
    MaterialModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedPipesModule,
    NgxSpinnerModule,
    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class PagesModule { }
