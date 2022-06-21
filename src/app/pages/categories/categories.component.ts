import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

@Component({
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  categories: CategoryModel[] = []
  isProcessing: boolean;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Categories', active: true }];

    this.isProcessing = true;
    this.productService.fetchCategories((error, result) => {
      // this.isProcessing = false;
      if (result !== null) {
        this.categories = result.results;
      }
    })

  }

  /**
 * View Category details
 * @param category 
 */
  viewCatDetails(category) {
    this.router.navigate(['/categories/category-details', category.name, category.id])
  }

}