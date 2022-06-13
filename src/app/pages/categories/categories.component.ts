import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  mainPageTitle = 'Categories'
  pageTitle = ''
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }
  /**
   * View Category details
   * @param category 
   */
  viewCatDetails(category) {
    this.router.navigate(['/categories/category-details', 'category name extra', 5520])
    // this.router.navigate(['/categories/category-details', category.name, category.id])
  }
}
