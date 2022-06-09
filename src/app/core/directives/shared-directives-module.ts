import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaNumericOnlyDirective } from './alpha-numeric-only.directive';
import { AlphabetsOnlyDirective } from './alphabets-only.directive';
import { DecimalOnlyDirective } from './decimal-only.directive';
import { NoDuplicateDirective } from './no-duplicate-digit.directive';
import { NoSpecialCharacterDirective } from './no-special-character.directive';
import { NumberDirective } from './numbers-only.directive';
import { DataSortDirective } from './data-sort.directive';
import { DragDropDirective } from './drag-drop.directive';
 
@NgModule({
  declarations: [
    AlphaNumericOnlyDirective,
    AlphabetsOnlyDirective,
    DecimalOnlyDirective,
    NoDuplicateDirective,
    NoSpecialCharacterDirective,
    NumberDirective,
    DataSortDirective,
    DragDropDirective,
    
    
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    AlphaNumericOnlyDirective,
    AlphabetsOnlyDirective,
    DecimalOnlyDirective,
    NoDuplicateDirective,
    NoSpecialCharacterDirective,
    NumberDirective,
    DataSortDirective,
    DragDropDirective,
  ]
})
export class SharedDirectivesModule { }