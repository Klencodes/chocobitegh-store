import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbTypeaheadModule, 
          NgbDropdownModule, NgbNavModule, NgbModalModule, 
          NgbProgressbarModule, NgbAccordionModule, NgbButtonsModule, 
          NgbCarouselModule, NgbCollapseModule, NgbPopoverModule,
          NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbNavModule,
    NgbDropdownModule,    
    NgbModalModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbAccordionModule,
    NgbCollapseModule,
  ],
  exports: [
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbAccordionModule,
    NgbCollapseModule,
  ]
})
export class BootstrapModule { }
