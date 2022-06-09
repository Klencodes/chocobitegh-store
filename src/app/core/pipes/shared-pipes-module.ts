import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './price.pipe';
import { RemoveUnderScorePipe } from './remove-under-score.pipe';
import { ReplaceWhiteSpacePipe } from './replace-white-space.pipe';
import { ReplaceWhiteSpaceWithUnderScorePipe } from './replace-white-space-with-under-score.pipe';
 
@NgModule({
  declarations: [
    PricePipe, 
    RemoveUnderScorePipe, 
    ReplaceWhiteSpacePipe,
    ReplaceWhiteSpaceWithUnderScorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricePipe, 
    RemoveUnderScorePipe, 
    ReplaceWhiteSpacePipe,
    ReplaceWhiteSpaceWithUnderScorePipe 
  ]
})
export class SharedPipesModule { }