import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home-component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
    
    { path: '', component: HomeComponent, data: { title: 'Home' } },
    
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    
    { path: 'product-details/:name/:id', component: ProductDetailsComponent, data: { title: 'Product Details' } },

    { path: 'cart', component: CartComponent, data: { title: 'Cart' } },

    { path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout' }, canActivate: [AuthGuard]  },
    
    { path: 'order-complete', component: OrderCompleteComponent, data: { title: 'Order Complete' }, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
