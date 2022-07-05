import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    FooterComponent,
    TopbarComponent,
    AboutUsComponent, 
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
