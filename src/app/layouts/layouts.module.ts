import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { LayoutsComponent } from './layouts.component';

@NgModule({
  declarations: [
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],

})
export class LayoutsModule { }
