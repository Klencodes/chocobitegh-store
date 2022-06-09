import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    TopbarComponent, 
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    RouterModule
  ],
  exports: [
    FooterComponent, 
    TopbarComponent
  ],
  providers: [
    
  ]
})
export class SharedModule { }
