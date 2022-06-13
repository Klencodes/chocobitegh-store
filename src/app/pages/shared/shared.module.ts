import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './pagetitle/pagetitle.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PageTitleComponent
  ],

})
export class SharedModule { }
