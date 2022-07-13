import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './pagetitle/pagetitle.component';
import { RouterModule } from '@angular/router';
import { ProductsLoadingComponent } from './products-loading/products-loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { EmptyRecordComponent } from './empty-record/empty-record.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    ProductsLoadingComponent,
    PageLoadingComponent,
    EmptyRecordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PageTitleComponent,
    ProductsLoadingComponent,
    PageLoadingComponent,
    EmptyRecordComponent,
  ],

})
export class SharedModule { }
