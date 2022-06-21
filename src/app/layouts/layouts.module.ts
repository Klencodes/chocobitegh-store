import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { LayoutsComponent } from './layouts.component';
import { MaterialModule } from '../core/modules/material.module';

@NgModule({
  declarations: [
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule
  ],

})
export class LayoutsModule { }
