import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-loading',
  templateUrl: './products-loading.component.html'
})
export class ProductsLoadingComponent implements OnInit {
  @Input() isProcessing: string;
  @Input() isProcessingMore: string;

  constructor() { }
  ngOnInit(): void {
  }

}
